-- =============================================================================
-- headshot.ai — Seed data
-- =============================================================================
-- Minimum rows the app needs so the generate wizard's first steps render:
--   • 1 Stripe-mirrored `products` row
--   • 50 `packs` rows matching every slug in src/data/photo-packs.ts
--
-- Run this AFTER supabase/schema.sql has been applied.
--
-- ⚠ This does NOT include `packs.attire`, `packs.background`, or `packs.prompts`
--   — those JSON blobs exist only in the original Supabase project and are not
--   in this repo. With them NULL the wizard renders up to the attire step,
--   then stops because there are no options to pick. To finish the flow you
--   must populate those columns (typically with an UPDATE per pack) using
--   data exported from the original project.
--
-- Idempotent: safe to re-run.
-- =============================================================================


-- 1. Stripe product anchor row.
-- If you have a real Stripe product, replace 'prod_headshot_pack' with its id.
INSERT INTO public.products (id, name, description, product_type) VALUES
  ('prod_headshot_pack', 'Headshot Pack',
   'One-time AI headshot pack purchase', 'one_time')
ON CONFLICT (id) DO NOTHING;


-- 2. All 50 packs from src/data/photo-packs.ts
-- `choices` uses a sensible default of {starter: 2, basic: 3, premium: "all"}
-- for both attire and background. Adjust per-pack if needed.
INSERT INTO public.packs (product_id, slug, title, description, is_active, pro, choices) VALUES
  ('prod_headshot_pack', 'actor-headshots',             'Actor Headshots',              'Land more roles with stunning AI actor headshots',                                true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'corporate-headshots',         'Corporate Headshots',          'Look sharp and professional with AI corporate headshots',                          true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'dating-photos',               'Dating Headshots',             'Get noticed instantly with eye-catching AI dating headshots',                      true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'doctor-headshots',            'Doctor Headshots',             'Build patient trust with polished AI doctor headshots',                            true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'eras-headshots',              'ERAS Headshots',               'Ace your residency applications with perfect AI ERAS headshots',                   true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'executive-headshots',         'Executive Headshots',          'Showcase leadership with powerful AI executive headshots',                         true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'graduation-headshots',        'Graduation Headshots',         'Mark your milestone with timeless AI graduation headshots',                        true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'lawyer-headshots',            'Lawyer Headshots',             'Win client confidence with credible AI lawyer headshots',                          true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'linkedin-headshots',          'LinkedIn Headshots',           'Boost recruiter attention with optimized AI LinkedIn headshots',                   true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'professional-headshots',      'Professional Headshots',       'Boost your career profile with AI professional headshots',                         true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'realtor-headshots',           'Real Estate Agent Headshots',  'Close more deals with standout AI real estate agent headshots',                    true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'teacher-headshots',           'Teacher Headshots',            'Present warmth and authority with AI teacher headshots',                           true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'architect-headshots',         'Architect Headshots',          'Showcase your vision with polished AI architect headshots',                        true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'author-headshots',            'Author Headshots',             'Connect with readers with polished AI author headshots',                           true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'ballet-dancer-headshots',     'Ballet Dancer Headshots',      'Capture elegance with graceful AI ballet dancer headshots',                        true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'beauty-pageant-headshots',    'Beauty Pageant Headshots',     'Radiate elegance and poise with AI beauty pageant headshots',                      false, false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'black-and-white-headshots',   'Black and White Headshots',    'Add timeless elegance with classic AI black and white headshots',                  true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'bumble-headshots',            'Bumble Headshots',             'Make connections faster with standout AI Bumble headshots',                        true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'business-headshots',          'Business Headshots',           'Make strong first impressions with AI business headshots',                         true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'casting-headshots',           'Casting Headshots',            'Get noticed by directors with striking AI casting headshots',                      true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'ceo-headshots',               'CEO Headshots',                'Command respect with powerful AI CEO headshots',                                   true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'chef-headshots',              'Chef Headshots',               'Showcase your craft with polished AI chef headshots',                              true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'dancer-headshots',            'Dancer Headshots',             'Capture your energy with dynamic AI dancer headshots',                             true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'data-analyst-headshots',      'Data Analyst Headshots',       'Stand out to recruiters with sharp AI data analyst headshots',                     true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'dentist-headshots',           'Dentist Headshots',            'Build patient trust with friendly AI dentist headshots',                           true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'entrepreneur-headshots',      'Entrepreneur Headshots',       'Launch your brand with bold AI entrepreneur headshots',                            true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'esthetician-headshots',       'Esthetician Headshots',        'Attract more clients with radiant AI esthetician headshots',                       true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'hairdresser-headshots',       'Hairdresser Headshots',        'Fill your chair with stylish AI hairdresser headshots',                            true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'hair-stylist-headshots',      'Hair Stylist Headshots',       'Get more bookings with stylish AI hair stylist headshots',                         true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'hinge-headshots',             'Hinge Headshots',              'Get more likes with charming AI Hinge headshots',                                  true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'interior-designer-headshots', 'Interior Designer Headshots',  'Impress clients with refined AI interior designer headshots',                      true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'makeup-artist-headshots',     'Makeup Artist Headshots',      'Book more clients with beautiful AI makeup artist headshots',                      true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'massage-therapist-headshots', 'Massage Therapist Headshots',  'Put clients at ease with calming AI massage therapist headshots',                  true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'model-headshots',             'Model Headshots',              'Get scouted faster with striking AI model headshots',                              true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'musician-headshots',          'Musician Headshots',           'Get noticed with eye-catching AI musician headshots',                              true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'nail-technician-headshots',   'Nail Technician Headshots',    'Grow your clientele with polished AI nail technician headshots',                   true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'nurse-headshots',             'Nurse Headshots',              'Build patient trust with caring AI nurse headshots',                               true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'nurse-practitioner-headshots','Nurse Practitioner Headshots', 'Inspire patient trust with caring AI nurse practitioner headshots',                true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'personal-trainer-headshots',  'Personal Trainer Headshots',   'Sign more clients with energetic AI personal trainer headshots',                   true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'professor-headshots',         'Professor Headshots',          'Inspire students with distinguished AI professor headshots',                       true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'psychologist-headshots',      'Psychologist Headshots',       'Build client trust with warm AI psychologist headshots',                           true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'sales-executive-headshots',   'Sales Executive Headshots',    'Seal more deals with confident AI sales executive headshots',                      true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'sales-manager-headshots',     'Sales Manager Headshots',      'Lead your team with polished AI sales manager headshots',                          true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'singer-headshots',            'Singer Headshots',             'Get noticed with captivating AI singer headshots',                                 true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'software-engineer-headshots', 'Software Engineer Headshots',  'Level up your profile with modern AI software engineer headshots',                 true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'surgeon-headshots',           'Surgeon Headshots',            'Build patient confidence with trusted AI surgeon headshots',                       true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'theatrical-headshots',        'Theatrical Headshots',         'Own the stage with dramatic AI theatrical headshots',                              true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'therapist-headshots',         'Therapist Headshots',          'Put clients at ease with warm AI therapist headshots',                             true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'tinder-headshots',            'Tinder Headshots',             'Get more right swipes with attractive AI Tinder headshots',                        true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb),
  ('prod_headshot_pack', 'yoga-teacher-headshots',      'Yoga Teacher Headshots',       'Attract students with serene AI yoga teacher headshots',                           true,  false, '{"attire":{"starter":2,"basic":3,"premium":"all"},"background":{"starter":2,"basic":3,"premium":"all"}}'::jsonb)
ON CONFLICT (slug) DO UPDATE
  SET title       = EXCLUDED.title,
      description = EXCLUDED.description,
      is_active   = EXCLUDED.is_active,
      pro         = EXCLUDED.pro,
      choices     = EXCLUDED.choices;


-- =============================================================================
-- Optional: example prices block (uncomment + replace stripe_price_id values).
-- Needed only when you reach the wizard's pricing step.
-- =============================================================================
-- INSERT INTO public.prices (product_id, stripe_price_id, plan_name, amount_cents, currency, interval, headshot_count) VALUES
--   ('prod_headshot_pack', 'price_REPLACE_STARTER', 'starter', 2900, 'usd', 'one_time', 40),
--   ('prod_headshot_pack', 'price_REPLACE_BASIC',   'basic',   4900, 'usd', 'one_time', 100),
--   ('prod_headshot_pack', 'price_REPLACE_PREMIUM', 'premium', 6900, 'usd', 'one_time', 150)
-- ON CONFLICT (stripe_price_id) DO NOTHING;


-- Sanity check (run as a separate query if you want to confirm):
-- SELECT slug, title, is_active FROM public.packs ORDER BY title;
