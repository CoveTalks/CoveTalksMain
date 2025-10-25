activity

create table public.activity (
  id uuid not null default extensions.uuid_generate_v4 (),
  actor_id uuid null,
  target_id uuid null,
  activity_type public.activity_type not null,
  opportunity_id uuid null,
  application_id uuid null,
  organization_id uuid null,
  review_id uuid null,
  description text null,
  metadata jsonb null,
  is_public boolean null default true,
  created_at timestamp with time zone null default now(),
  constraint activity_pkey primary key (id),
  constraint activity_application_id_fkey foreign KEY (application_id) references applications (id) on delete set null,
  constraint activity_opportunity_id_fkey foreign KEY (opportunity_id) references speaking_opportunities (id) on delete set null,
  constraint activity_actor_id_fkey foreign KEY (actor_id) references members (id) on delete CASCADE,
  constraint activity_review_id_fkey foreign KEY (review_id) references reviews (id) on delete set null,
  constraint activity_target_id_fkey foreign KEY (target_id) references members (id) on delete set null,
  constraint activity_organization_id_fkey foreign KEY (organization_id) references organizations (id) on delete set null
) TABLESPACE pg_default;

create index IF not exists idx_activity_actor on public.activity using btree (actor_id) TABLESPACE pg_default;

create index IF not exists idx_activity_target on public.activity using btree (target_id) TABLESPACE pg_default;

create index IF not exists idx_activity_type on public.activity using btree (activity_type) TABLESPACE pg_default;

create index IF not exists idx_activity_created on public.activity using btree (created_at desc) TABLESPACE pg_default;

applications

create table public.applications (
  id uuid not null default extensions.uuid_generate_v4 (),
  opportunity_id uuid null,
  speaker_id uuid null,
  cover_letter text null,
  proposed_topics text[] null,
  requested_fee numeric(10, 2) null,
  availability_confirmed boolean null default false,
  status public.application_status null default 'Pending'::application_status,
  reviewed_at timestamp with time zone null,
  reviewed_by uuid null,
  rejection_reason text null,
  notes text null,
  messages jsonb null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint applications_pkey primary key (id),
  constraint applications_opportunity_id_speaker_id_key unique (opportunity_id, speaker_id),
  constraint applications_opportunity_id_fkey foreign KEY (opportunity_id) references speaking_opportunities (id) on delete CASCADE,
  constraint applications_reviewed_by_fkey foreign KEY (reviewed_by) references members (id) on delete set null,
  constraint applications_speaker_id_fkey foreign KEY (speaker_id) references members (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_applications_opportunity on public.applications using btree (opportunity_id) TABLESPACE pg_default;

create index IF not exists idx_applications_speaker on public.applications using btree (speaker_id) TABLESPACE pg_default;

create index IF not exists idx_applications_status on public.applications using btree (status) TABLESPACE pg_default;

create index IF not exists idx_applications_created on public.applications using btree (created_at desc) TABLESPACE pg_default;

create trigger increment_application_trigger
after INSERT on applications for EACH row
execute FUNCTION increment_application_count ();

create trigger update_applications_updated_at BEFORE
update on applications for EACH row
execute FUNCTION update_updated_at_column ();

contact_submissions

create table public.contact_submissions (
  id uuid not null default extensions.uuid_generate_v4 (),
  member_id uuid null,
  name text not null,
  email text not null,
  phone text null,
  company text null,
  subject text not null,
  message text not null,
  submission_type text null default 'General'::text,
  status text null default 'New'::text,
  assigned_to uuid null,
  response_sent boolean null default false,
  response_text text null,
  responded_at timestamp with time zone null,
  ip_address inet null,
  user_agent text null,
  referrer text null,
  created_at timestamp with time zone null default now(),
  constraint contact_submissions_pkey primary key (id),
  constraint contact_submissions_assigned_to_fkey foreign KEY (assigned_to) references members (id) on delete set null,
  constraint contact_submissions_member_id_fkey foreign KEY (member_id) references members (id) on delete set null
) TABLESPACE pg_default;

faqs

create table public.faqs (
  id uuid not null default gen_random_uuid (),
  question text not null,
  answer text not null,
  category text not null,
  sort_order integer null default 0,
  is_featured boolean null default false,
  view_count integer null default 0,
  helpful_count integer null default 0,
  not_helpful_count integer null default 0,
  tags text[] null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  published boolean null default true,
  constraint faqs_pkey primary key (id),
  constraint faqs_category_check check (
    (
      category = any (
        array[
          'general'::text,
          'speakers'::text,
          'organizations'::text,
          'billing'::text,
          'technical'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_faqs_category on public.faqs using btree (category) TABLESPACE pg_default;

create index IF not exists idx_faqs_published on public.faqs using btree (published) TABLESPACE pg_default;

create index IF not exists idx_faqs_sort_order on public.faqs using btree (sort_order) TABLESPACE pg_default;

create index IF not exists idx_faqs_featured on public.faqs using btree (is_featured) TABLESPACE pg_default;

help_articles

create table public.help_articles (
  id uuid not null default gen_random_uuid (),
  title text not null,
  slug text not null,
  category text not null,
  content text not null,
  excerpt text null,
  is_popular boolean null default false,
  is_new boolean null default false,
  view_count integer null default 0,
  helpful_count integer null default 0,
  not_helpful_count integer null default 0,
  tags text[] null,
  meta_description text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  published boolean null default true,
  author_id uuid null,
  search_vector tsvector null,
  constraint help_articles_pkey primary key (id),
  constraint help_articles_slug_key unique (slug),
  constraint help_articles_author_id_fkey foreign KEY (author_id) references members (id),
  constraint help_articles_category_check check (
    (
      category = any (
        array[
          'speakers'::text,
          'organizations'::text,
          'billing'::text,
          'technical'::text,
          'getting_started'::text,
          'best_practices'::text,
          'account'::text,
          'payments'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_help_articles_category on public.help_articles using btree (category) TABLESPACE pg_default;

create index IF not exists idx_help_articles_slug on public.help_articles using btree (slug) TABLESPACE pg_default;

create index IF not exists idx_help_articles_published on public.help_articles using btree (published) TABLESPACE pg_default;

create index IF not exists idx_help_articles_search on public.help_articles using gin (search_vector) TABLESPACE pg_default;

create trigger update_help_search_vector_trigger BEFORE INSERT
or
update on help_articles for EACH row
execute FUNCTION update_help_search_vector ();

members
create table public.members (
  id uuid not null default extensions.uuid_generate_v4 (),
  email text not null,
  name text not null,
  member_type public.member_type not null,
  status public.member_status null default 'Active'::member_status,
  phone text null,
  location text null,
  bio text null,
  website text null,
  linkedin_url text null,
  booking_link text null,
  profile_image_url text null,
  specialties text[] null,
  years_experience integer null,
  speaking_fee_range jsonb null,
  languages text[] null default array['English'::text],
  stripe_customer_id text null,
  average_rating numeric(3, 2) null default 0.00,
  total_reviews integer null default 0,
  profile_views integer null default 0,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  last_login timestamp with time zone null,
  linkedin text null,
  title text null,
  preferred_audience_size text null,
  preferred_formats text[] null,
  notification_preferences jsonb null default '{}'::jsonb,
  privacy_settings jsonb null default '{"show_fees": true, "show_contact": true, "public_profile": true}'::jsonb,
  typical_audience_size text null,
  verified boolean null default false,
  constraint members_pkey primary key (id),
  constraint members_email_key unique (email),
  constraint members_stripe_customer_id_key unique (stripe_customer_id),
  constraint fk_auth_user foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_members_search on public.members using gin (
  to_tsvector(
    'english'::regconfig,
    (
      (
        (
          (COALESCE(name, ''::text) || ' '::text) || COALESCE(bio, ''::text)
        ) || ' '::text
      ) || COALESCE(location, ''::text)
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_members_email on public.members using btree (email) TABLESPACE pg_default;

create index IF not exists idx_members_type on public.members using btree (member_type) TABLESPACE pg_default;

create index IF not exists idx_members_status on public.members using btree (status) TABLESPACE pg_default;

create trigger update_members_updated_at BEFORE
update on members for EACH row
execute FUNCTION update_updated_at_column ();

message_notifications

create table public.message_notifications (
  id uuid not null default gen_random_uuid (),
  message_id uuid not null,
  notification_type text null default 'email'::text,
  status text null default 'pending'::text,
  sent_at timestamp with time zone null,
  error_message text null,
  attempts integer null default 0,
  created_at timestamp with time zone null default now(),
  metadata jsonb null default '{}'::jsonb,
  constraint message_notifications_pkey primary key (id),
  constraint message_notifications_message_id_fkey foreign KEY (message_id) references messages (id) on delete CASCADE,
  constraint message_notifications_notification_type_check check (
    (
      notification_type = any (array['email'::text, 'sms'::text, 'push'::text])
    )
  ),
  constraint message_notifications_status_check check (
    (
      status = any (
        array[
          'pending'::text,
          'sent'::text,
          'failed'::text,
          'bounced'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_notifications_message on public.message_notifications using btree (message_id) TABLESPACE pg_default;

create index IF not exists idx_notifications_status on public.message_notifications using btree (status) TABLESPACE pg_default;

messages 

create table public.messages (
  id uuid not null default gen_random_uuid (),
  sender_id uuid not null,
  recipient_id uuid not null,
  subject text not null,
  message text not null,
  opportunity_id uuid null,
  status text null default 'unread'::text,
  read_at timestamp with time zone null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  parent_message_id uuid null,
  thread_id uuid null,
  metadata jsonb null default '{}'::jsonb,
  constraint messages_pkey primary key (id),
  constraint messages_opportunity_id_fkey foreign KEY (opportunity_id) references speaking_opportunities (id) on delete set null,
  constraint messages_parent_message_id_fkey foreign KEY (parent_message_id) references messages (id) on delete CASCADE,
  constraint messages_recipient_id_fkey foreign KEY (recipient_id) references members (id) on delete CASCADE,
  constraint messages_sender_id_fkey foreign KEY (sender_id) references members (id) on delete CASCADE,
  constraint messages_status_check check (
    (
      status = any (
        array['unread'::text, 'read'::text, 'archived'::text]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_messages_sender on public.messages using btree (sender_id) TABLESPACE pg_default;

create index IF not exists idx_messages_recipient on public.messages using btree (recipient_id) TABLESPACE pg_default;

create index IF not exists idx_messages_opportunity on public.messages using btree (opportunity_id) TABLESPACE pg_default;

create index IF not exists idx_messages_status on public.messages using btree (status) TABLESPACE pg_default;

create index IF not exists idx_messages_created on public.messages using btree (created_at desc) TABLESPACE pg_default;

create index IF not exists idx_messages_thread on public.messages using btree (thread_id) TABLESPACE pg_default
where
  (thread_id is not null);

create trigger update_messages_updated_at BEFORE
update on messages for EACH row
execute FUNCTION update_updated_at_column ();

organization_members

create table public.organization_members (
  organization_id uuid not null,
  member_id uuid not null,
  role text null default 'Member'::text,
  joined_at timestamp with time zone null default now(),
  constraint organization_members_pkey primary key (organization_id, member_id),
  constraint organization_members_member_id_fkey foreign KEY (member_id) references members (id) on delete CASCADE,
  constraint organization_members_organization_id_fkey foreign KEY (organization_id) references organizations (id) on delete CASCADE
) TABLESPACE pg_default;

organizations
create table public.organizations (
  id uuid not null default extensions.uuid_generate_v4 (),
  name text not null,
  organization_type public.organization_type not null,
  description text null,
  website text null,
  address text null,
  city text null,
  state text null,
  country text null default 'USA'::text,
  phone text null,
  email text null,
  typical_audience_size integer null,
  event_frequency text null,
  preferred_topics text[] null,
  budget_range jsonb null,
  logo_url text null,
  verified boolean null default false,
  tax_id text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  location text null,
  constraint organizations_pkey primary key (id)
) TABLESPACE pg_default;

create index IF not exists idx_organizations_name on public.organizations using btree (name) TABLESPACE pg_default;

create index IF not exists idx_organizations_type on public.organizations using btree (organization_type) TABLESPACE pg_default;

create trigger update_organizations_updated_at BEFORE
update on organizations for EACH row
execute FUNCTION update_updated_at_column ();

payments
create table public.payments (
  id uuid not null default extensions.uuid_generate_v4 (),
  member_id uuid null,
  subscription_id uuid null,
  stripe_payment_intent_id text null,
  stripe_invoice_id text null,
  stripe_charge_id text null,
  amount numeric(10, 2) not null,
  currency text null default 'USD'::text,
  status public.payment_status null default 'Pending'::payment_status,
  description text null,
  payment_method_type text null,
  card_last4 text null,
  card_brand text null,
  invoice_url text null,
  receipt_url text null,
  payment_date timestamp with time zone null default now(),
  metadata jsonb null,
  created_at timestamp with time zone null default now(),
  constraint payments_pkey primary key (id),
  constraint payments_stripe_payment_intent_id_key unique (stripe_payment_intent_id),
  constraint payments_member_id_fkey foreign KEY (member_id) references members (id) on delete CASCADE,
  constraint payments_subscription_id_fkey foreign KEY (subscription_id) references subscriptions (id) on delete set null
) TABLESPACE pg_default;

create index IF not exists idx_payments_member on public.payments using btree (member_id) TABLESPACE pg_default;

create index IF not exists idx_payments_subscription on public.payments using btree (subscription_id) TABLESPACE pg_default;

create index IF not exists idx_payments_status on public.payments using btree (status) TABLESPACE pg_default;

reviews
create table public.reviews (
  id uuid not null default extensions.uuid_generate_v4 (),
  speaker_id uuid null,
  organization_id uuid null,
  opportunity_id uuid null,
  reviewer_id uuid null,
  rating integer null,
  title text null,
  review_text text null,
  content_rating integer null,
  delivery_rating integer null,
  professionalism_rating integer null,
  event_date date null,
  verified boolean null default false,
  helpful_count integer null default 0,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint reviews_pkey primary key (id),
  constraint reviews_opportunity_id_fkey foreign KEY (opportunity_id) references speaking_opportunities (id) on delete set null,
  constraint reviews_organization_id_fkey foreign KEY (organization_id) references organizations (id) on delete CASCADE,
  constraint reviews_speaker_id_fkey foreign KEY (speaker_id) references members (id) on delete CASCADE,
  constraint reviews_reviewer_id_fkey foreign KEY (reviewer_id) references members (id) on delete set null,
  constraint reviews_professionalism_rating_check check (
    (
      (professionalism_rating >= 1)
      and (professionalism_rating <= 5)
    )
  ),
  constraint reviews_rating_check check (
    (
      (rating >= 1)
      and (rating <= 5)
    )
  ),
  constraint reviews_content_rating_check check (
    (
      (content_rating >= 1)
      and (content_rating <= 5)
    )
  ),
  constraint reviews_delivery_rating_check check (
    (
      (delivery_rating >= 1)
      and (delivery_rating <= 5)
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_reviews_speaker on public.reviews using btree (speaker_id) TABLESPACE pg_default;

create index IF not exists idx_reviews_org on public.reviews using btree (organization_id) TABLESPACE pg_default;

create index IF not exists idx_reviews_rating on public.reviews using btree (rating) TABLESPACE pg_default;

create trigger update_reviews_updated_at BEFORE
update on reviews for EACH row
execute FUNCTION update_updated_at_column ();

create trigger update_speaker_rating_trigger
after INSERT
or DELETE
or
update on reviews for EACH row
execute FUNCTION update_speaker_rating ();

saved_speakers

create table public.saved_speakers (
  organization_id uuid not null,
  speaker_id uuid not null,
  notes text null,
  tags text[] null,
  saved_at timestamp with time zone null default now(),
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint saved_speakers_pkey primary key (organization_id, speaker_id),
  constraint saved_speakers_organization_id_fkey foreign KEY (organization_id) references organizations (id) on delete CASCADE,
  constraint saved_speakers_speaker_id_fkey foreign KEY (speaker_id) references members (id) on delete CASCADE
) TABLESPACE pg_default;

speaking_opportunities

create table public.speaking_opportunities (
  id uuid not null default extensions.uuid_generate_v4 (),
  organization_id uuid null,
  posted_by uuid null,
  title text not null,
  description text not null,
  event_date date null,
  event_time time without time zone null,
  duration_hours numeric(3, 1) null,
  location text null,
  venue_name text null,
  event_format public.event_format null default 'In-Person'::event_format,
  topics text[] null,
  required_specialties text[] null,
  preferred_experience_years integer null,
  audience_size integer null,
  audience_type text null,
  compensation_amount numeric(10, 2) null,
  compensation_type text null,
  travel_covered boolean null default false,
  accommodation_covered boolean null default false,
  status public.opportunity_status null default 'Open'::opportunity_status,
  application_deadline date null,
  application_count integer null default 0,
  view_count integer null default 0,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  additional_benefits text null,
  speaker_type text null,
  additional_terms text null,
  constraint speaking_opportunities_pkey primary key (id),
  constraint speaking_opportunities_organization_id_fkey foreign KEY (organization_id) references organizations (id) on delete CASCADE,
  constraint speaking_opportunities_posted_by_fkey foreign KEY (posted_by) references members (id) on delete set null
) TABLESPACE pg_default;

create index IF not exists idx_opportunities_org on public.speaking_opportunities using btree (organization_id) TABLESPACE pg_default;

create index IF not exists idx_opportunities_status on public.speaking_opportunities using btree (status) TABLESPACE pg_default;

create index IF not exists idx_opportunities_date on public.speaking_opportunities using btree (event_date) TABLESPACE pg_default;

create index IF not exists idx_opportunities_topics on public.speaking_opportunities using gin (topics) TABLESPACE pg_default;

create index IF not exists idx_opportunities_search on public.speaking_opportunities using gin (
  to_tsvector(
    'english'::regconfig,
    (
      (COALESCE(title, ''::text) || ' '::text) || COALESCE(description, ''::text)
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_opportunities_deadline on public.speaking_opportunities using btree (application_deadline) TABLESPACE pg_default;

create trigger update_opportunities_updated_at BEFORE
update on speaking_opportunities for EACH row
execute FUNCTION update_updated_at_column ();

specialties_lookup
create table public.specialties_lookup (
  id uuid not null default extensions.uuid_generate_v4 (),
  name text not null,
  category text null,
  created_at timestamp with time zone null default now(),
  constraint specialties_lookup_pkey primary key (id),
  constraint specialties_lookup_name_key unique (name)
) TABLESPACE pg_default;

subscriptions
create table public.subscriptions (
  id uuid not null default extensions.uuid_generate_v4 (),
  member_id uuid null,
  stripe_subscription_id text null,
  stripe_price_id text null,
  plan_type public.plan_type null default 'Free'::plan_type,
  billing_period public.billing_period null,
  status public.subscription_status null default 'Active'::subscription_status,
  amount numeric(10, 2) null,
  currency text null default 'USD'::text,
  start_date date null default CURRENT_DATE,
  current_period_start date null,
  current_period_end date null,
  cancel_at_period_end boolean null default false,
  cancelled_at timestamp with time zone null,
  ended_at timestamp with time zone null,
  trial_ends_at timestamp with time zone null,
  metadata jsonb null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint subscriptions_pkey primary key (id),
  constraint subscriptions_stripe_subscription_id_key unique (stripe_subscription_id),
  constraint subscriptions_member_id_fkey foreign KEY (member_id) references members (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_subscriptions_member on public.subscriptions using btree (member_id) TABLESPACE pg_default;

create index IF not exists idx_subscriptions_status on public.subscriptions using btree (status) TABLESPACE pg_default;

create index IF not exists idx_subscriptions_stripe on public.subscriptions using btree (stripe_subscription_id) TABLESPACE pg_default;

create trigger update_subscriptions_updated_at BEFORE
update on subscriptions for EACH row
execute FUNCTION update_updated_at_column ();

success_stories

create table public.success_stories (
  id uuid not null default gen_random_uuid (),
  title text not null,
  slug text not null,
  excerpt text not null,
  content text not null,
  quote text null,
  story_type text not null,
  category text null,
  author_name text not null,
  author_role text not null,
  author_avatar text null,
  author_company text null,
  image_url text null,
  video_url text null,
  event_name text null,
  event_date date null,
  event_size integer null,
  location text null,
  rating numeric(2, 1) null,
  impact_metric text null,
  speaker_fee numeric(10, 2) null,
  is_featured boolean null default false,
  published boolean null default true,
  view_count integer null default 0,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  meta_description text null,
  tags text[] null,
  constraint success_stories_pkey primary key (id),
  constraint success_stories_slug_key unique (slug),
  constraint success_stories_category_check check (
    (
      category = any (
        array[
          'conference'::text,
          'workshop'::text,
          'keynote'::text,
          'panel'::text,
          'webinar'::text,
          'corporate'::text,
          'education'::text,
          'nonprofit'::text
        ]
      )
    )
  ),
  constraint success_stories_rating_check check (
    (
      (rating >= (0)::numeric)
      and (rating <= (5)::numeric)
    )
  ),
  constraint success_stories_story_type_check check (
    (
      story_type = any (array['speaker'::text, 'organization'::text])
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_success_stories_slug on public.success_stories using btree (slug) TABLESPACE pg_default;

create index IF not exists idx_success_stories_type on public.success_stories using btree (story_type) TABLESPACE pg_default;

create index IF not exists idx_success_stories_featured on public.success_stories using btree (is_featured) TABLESPACE pg_default;

create index IF not exists idx_success_stories_published on public.success_stories using btree (published) TABLESPACE pg_default;

testimonials
create table public.testimonials (
  id uuid not null default gen_random_uuid (),
  author_name text not null,
  author_role text not null,
  author_company text null,
  avatar_url text null,
  content text not null,
  rating integer null,
  testimonial_type text null,
  is_featured boolean null default false,
  published boolean null default true,
  created_at timestamp with time zone null default now(),
  constraint testimonials_pkey primary key (id),
  constraint testimonials_rating_check check (
    (
      (rating >= 1)
      and (rating <= 5)
    )
  ),
  constraint testimonials_testimonial_type_check check (
    (
      testimonial_type = any (
        array[
          'speaker'::text,
          'organization'::text,
          'general'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_testimonials_type on public.testimonials using btree (testimonial_type) TABLESPACE pg_default;

create index IF not exists idx_testimonials_featured on public.testimonials using btree (is_featured) TABLESPACE pg_default;
