-- =============================================================================
-- headshot.ai — Supabase schema bootstrap
-- =============================================================================
-- Reconstructed from src/types/database.types.ts plus the columns/buckets
-- actually referenced by the codebase (server actions, API routes, generate
-- wizard). The types file is auto-generated and was missing packs.choices —
-- that column is added here because attire-step.tsx / background-step.tsx
-- read it at runtime.
--
-- How to use:
--   1. Open Supabase SQL Editor for your project.
--   2. Paste this entire file.
--   3. Run.
--   4. After it succeeds, seed `products`, `prices`, and `packs` (see the
--      bottom of this file for example INSERTs you can copy + adapt).
--
-- This script is idempotent: safe to re-run.
-- =============================================================================


-- =============================================================================
-- 1. Enums
-- =============================================================================

DO $$ BEGIN
  CREATE TYPE album_status AS ENUM ('generating', 'done', 'failed', 'training');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE order_status AS ENUM ('paid', 'unpaid', 'refunded');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE price_interval AS ENUM ('one_time', 'week', 'year');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE product_type AS ENUM ('one_time', 'subscription');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE subscription_status AS ENUM ('active', 'past_due', 'canceled', 'inactive');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE training_status AS ENUM ('queued', 'processing', 'ready', 'failed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- =============================================================================
-- 2. Tables
-- =============================================================================

-- profiles (1:1 with auth.users) — auto-populated by trigger below
CREATE TABLE IF NOT EXISTS public.profiles (
  id                  uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email               text,
  full_name           text,
  stripe_customer_id  text,
  review_dismissed_at timestamptz,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

-- Stripe products mirror
CREATE TABLE IF NOT EXISTS public.products (
  id           text PRIMARY KEY,
  name         text NOT NULL,
  description  text,
  product_type product_type NOT NULL
);

-- Stripe prices mirror
CREATE TABLE IF NOT EXISTS public.prices (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      text NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  stripe_price_id text UNIQUE,
  plan_name       text,            -- 'starter' | 'basic' | 'premium' (read by helper.ts)
  amount_cents    integer NOT NULL,
  currency        text DEFAULT 'usd',
  interval        price_interval NOT NULL,
  headshot_count  integer          -- 40 | 100 | 150
);

-- Photo packs (50 profession-specific packs)
-- NOTE: `choices` is NOT in database.types.ts but IS read by:
--   - src/components/generate/attire-step.tsx:83
--   - src/components/generate/background-step.tsx:52
--   - src/components/generate/main-steps.tsx:32
--   - src/store/form-store.ts:40
CREATE TABLE IF NOT EXISTS public.packs (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id     text NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  slug           text NOT NULL UNIQUE,
  title          text NOT NULL,
  description    text,
  attire         jsonb,            -- { man: [...], woman: [...] }
  background     jsonb,            -- [{ name, vaule, thumbnail, description }]
  choices        jsonb,            -- { attire: {starter,basic,premium}, background: {...} }
  prompts        jsonb,            -- nested gender / attire / background prompts
  display_images text[],
  is_active      boolean DEFAULT true,
  pro            boolean DEFAULT false
);

-- LoRA training jobs (Replicate)
CREATE TABLE IF NOT EXISTS public.trainings (
  id                              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status                          training_status NOT NULL DEFAULT 'queued',
  replicate_training_id           text,
  replicate_trained_model_version text,
  uploaded_images                 text[],
  user_selection                  jsonb,
  created_at                      timestamptz NOT NULL DEFAULT now()
);

-- Subscriptions (must exist before albums since albums.subscription_id FKs it)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  price_id               uuid NOT NULL REFERENCES public.prices(id) ON DELETE RESTRICT,
  status                 subscription_status NOT NULL,
  stripe_subscription_id text UNIQUE,
  current_period_start   timestamptz NOT NULL,
  current_period_end     timestamptz NOT NULL,
  max_models             integer NOT NULL DEFAULT 1,
  packs_per_period       integer NOT NULL DEFAULT 1,
  created_at             timestamptz NOT NULL DEFAULT now()
);

-- One album = one generation run for a (user, pack, training)
CREATE TABLE IF NOT EXISTS public.albums (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pack_id         uuid NOT NULL REFERENCES public.packs(id) ON DELETE RESTRICT,
  training_id     uuid NOT NULL REFERENCES public.trainings(id) ON DELETE CASCADE,
  subscription_id uuid REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  status          album_status NOT NULL DEFAULT 'generating',
  generated_count integer DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Replicate-generated headshots
CREATE TABLE IF NOT EXISTS public.generated_images (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id     uuid NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
  storage_path text NOT NULL,
  width        integer,
  height       integer,
  favourite    boolean DEFAULT false,
  edited       boolean DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- One-time Stripe purchases (carries the credit until consumed by training)
CREATE TABLE IF NOT EXISTS public.orders (
  id                         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pack_id                    uuid NOT NULL REFERENCES public.packs(id) ON DELETE RESTRICT,
  price_id                   uuid NOT NULL REFERENCES public.prices(id) ON DELETE RESTRICT,
  qty                        integer NOT NULL DEFAULT 1,
  status                     order_status NOT NULL DEFAULT 'unpaid',
  stripe_checkout_session_id text UNIQUE,
  used                       boolean DEFAULT false,
  editor_credits_granted     boolean DEFAULT false,
  purchased_at               timestamptz NOT NULL DEFAULT now()
);

-- Per-period pack consumption for subscription users
CREATE TABLE IF NOT EXISTS public.subscription_pack_usage (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id uuid NOT NULL REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  pack_id         uuid NOT NULL REFERENCES public.packs(id) ON DELETE RESTRICT,
  album_id        uuid NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
  used_at         timestamptz NOT NULL DEFAULT now()
);

-- Editor tool source images (typo in name is INTENTIONAL — matches code references)
CREATE TABLE IF NOT EXISTS public.image_uplods_for_edit (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  storage_path jsonb,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- Editor tool outputs
CREATE TABLE IF NOT EXISTS public.edited_images (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  storage_path jsonb,
  metadata     jsonb,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- User reviews of completed albums
CREATE TABLE IF NOT EXISTS public.reviews (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  album_id       uuid NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
  rating         integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text    text,
  reviewer_name  text,
  reviewer_email text,
  job_title      text,
  headshot_url   text,
  share_consent  boolean DEFAULT false,
  created_at     timestamptz NOT NULL DEFAULT now()
);


-- =============================================================================
-- 3. Indexes (hot foreign keys)
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_albums_user_id              ON public.albums(user_id);
CREATE INDEX IF NOT EXISTS idx_albums_training_id          ON public.albums(training_id);
CREATE INDEX IF NOT EXISTS idx_albums_pack_id              ON public.albums(pack_id);
CREATE INDEX IF NOT EXISTS idx_generated_images_album_id   ON public.generated_images(album_id);
CREATE INDEX IF NOT EXISTS idx_trainings_user_id           ON public.trainings(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id              ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id       ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subpackusage_subscription   ON public.subscription_pack_usage(subscription_id);
CREATE INDEX IF NOT EXISTS idx_edited_images_user_id       ON public.edited_images(user_id);
CREATE INDEX IF NOT EXISTS idx_image_uplods_user_id        ON public.image_uplods_for_edit(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_album_id            ON public.reviews(album_id);
CREATE INDEX IF NOT EXISTS idx_packs_slug_active           ON public.packs(slug) WHERE is_active = true;


-- =============================================================================
-- 4. Auto-create a profiles row whenever a new auth.users row appears
-- =============================================================================
-- The dashboard / sidebar / welcome-email all SELECT FROM profiles WHERE id = sub.
-- Without this trigger every newly signed-up user would 500 the first page load.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill profiles for users that already exist (e.g. accounts created before this script ran)
INSERT INTO public.profiles (id, email, full_name)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1))
FROM auth.users
ON CONFLICT (id) DO NOTHING;


-- =============================================================================
-- 5. RLS — DEV-FRIENDLY DEFAULT
-- =============================================================================
-- All public tables have RLS disabled so the existing server actions (which use
-- the user's session cookie) and the cron / webhook routes (which use the
-- service-role key) both Just Work.
--
-- ⚠ This is INSECURE for production: with the anon key alone a client could
--    read any row in any table. Replace each DISABLE below with proper
--    policies before deploying publicly.

ALTER TABLE public.profiles                DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products                DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.prices                  DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.packs                   DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainings               DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions           DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.albums                  DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_images        DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders                  DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_pack_usage DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.image_uplods_for_edit   DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.edited_images           DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews                 DISABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 6. Storage buckets
-- =============================================================================
-- Buckets referenced by the code (grep '\.from\(.user-uploads' etc.):
--   user-uploads    — selfies users upload for LoRA training
--   output-images   — Replicate generation outputs (signed URLs served via /api/image)
--   recent-uploads  — source images for editor tools
--   edited-images   — editor tool outputs

INSERT INTO storage.buckets (id, name, public) VALUES
  ('user-uploads',   'user-uploads',   false),
  ('output-images',  'output-images',  false),
  ('recent-uploads', 'recent-uploads', false),
  ('edited-images',  'edited-images',  false)
ON CONFLICT (id) DO NOTHING;

-- Permissive dev-only object policies (server uses service-role; this just
-- lets signed URLs minted for `authenticated` work). Tighten before prod.
DROP POLICY IF EXISTS "auth users select" ON storage.objects;
CREATE POLICY "auth users select"
  ON storage.objects FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth users insert" ON storage.objects;
CREATE POLICY "auth users insert"
  ON storage.objects FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth users update" ON storage.objects;
CREATE POLICY "auth users update"
  ON storage.objects FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "auth users delete" ON storage.objects;
CREATE POLICY "auth users delete"
  ON storage.objects FOR DELETE TO authenticated USING (true);


-- =============================================================================
-- 7. Seed data — EXAMPLES TO COPY + ADAPT (not run by default)
-- =============================================================================
-- The following block is commented out. Uncomment + adjust before running so
-- the generate flow has something to query.

-- -- (a) One Stripe product to anchor the foreign keys
-- INSERT INTO public.products (id, name, product_type)
-- VALUES ('prod_headshot_pack', 'Headshot Pack', 'one_time')
-- ON CONFLICT (id) DO NOTHING;
--
-- -- (b) Three one-time prices the wizard's pricing step reads by plan_name
-- --     Replace 'price_REPLACE_*' with real Stripe Price ids from your dashboard.
-- INSERT INTO public.prices (product_id, stripe_price_id, plan_name, amount_cents, currency, interval, headshot_count)
-- VALUES
--   ('prod_headshot_pack', 'price_REPLACE_STARTER', 'starter', 2900, 'usd', 'one_time', 40),
--   ('prod_headshot_pack', 'price_REPLACE_BASIC',   'basic',   4900, 'usd', 'one_time', 100),
--   ('prod_headshot_pack', 'price_REPLACE_PREMIUM', 'premium', 6900, 'usd', 'one_time', 150)
-- ON CONFLICT (stripe_price_id) DO NOTHING;
--
-- -- (c) At least one pack so /generate/one-time/<slug> doesn't redirect to /dashboard.
-- --     Note: attire/background/prompts are still NULL — the wizard will only
-- --     get past the gender step once you populate those JSON blobs from the
-- --     original Supabase project (no source for them in this repo).
-- INSERT INTO public.packs (product_id, slug, title, description, is_active, pro, choices)
-- VALUES
--   ('prod_headshot_pack', 'professional-headshots', 'Professional Headshots',
--    'Professional headshots in minutes', true, false,
--    '{
--      "attire":     {"starter": 2, "basic": 3, "premium": "all"},
--      "background": {"starter": 2, "basic": 3, "premium": "all"}
--    }'::jsonb)
-- ON CONFLICT (slug) DO UPDATE
--   SET title = EXCLUDED.title,
--       description = EXCLUDED.description,
--       choices = EXCLUDED.choices,
--       is_active = true;


-- =============================================================================
-- End of schema.sql
-- =============================================================================
