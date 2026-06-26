-- ===========================================================================
-- Onboarding-generated (Gemini) headshots — backend for the dashboard view.
-- Run this in the Supabase SQL editor (or via the CLI) on your project.
-- Safe to run more than once (uses IF NOT EXISTS / idempotent guards).
-- ===========================================================================

-- 1) Private storage bucket for the generated headshots ----------------------
insert into storage.buckets (id, name, public)
values ('onboarding-headshots', 'onboarding-headshots', false)
on conflict (id) do nothing;

-- 2) Table holding one row per generated headshot ----------------------------
create table if not exists public.onboarding_headshots (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  storage_path text not null,
  plan         text,
  attire       text[],
  background   text[],
  prompt_file  text,
  session_id   text,
  created_at   timestamptz not null default now()
);

create index if not exists onboarding_headshots_user_idx
  on public.onboarding_headshots (user_id, created_at desc);

-- 3) Row Level Security ------------------------------------------------------
-- The app reads/writes with the SERVICE ROLE key (which bypasses RLS), so these
-- policies are mainly a safety net in case you later read with the user client.
alter table public.onboarding_headshots enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename  = 'onboarding_headshots'
      and policyname = 'own_headshots_select'
  ) then
    create policy own_headshots_select
      on public.onboarding_headshots
      for select
      using (auth.uid() = user_id);
  end if;
end $$;

-- 4) Storage policies (only needed if you ever serve via the user client; the
--    app currently signs URLs with the service role, which bypasses these). ---
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename  = 'objects'
      and policyname = 'onboarding_headshots_read_own'
  ) then
    create policy onboarding_headshots_read_own
      on storage.objects
      for select
      using (
        bucket_id = 'onboarding-headshots'
        and (storage.foldername(name))[1] = auth.uid()::text
      );
  end if;
end $$;
