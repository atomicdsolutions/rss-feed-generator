-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Create user tiers enum
create type user_tier as enum ('basic', 'premium');

-- Update users table (extends Supabase auth.users)
create table public.user_profiles (
  id uuid references auth.users on delete cascade primary key,
  tier user_tier default 'basic',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  ai_usage_count integer default 0,
  api_key_count integer default 0,
  constraint api_key_limit check (
    (tier = 'basic' and api_key_count <= 1) or
    (tier = 'premium')
  )
);

-- Media items table
create table public.media_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  title text not null,
  description text,
  file_url text not null,
  file_type text not null,
  file_size integer not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  status text default 'pending',
  ai_generated boolean default false,
  source text default 'upload',
  metadata jsonb default '{}'::jsonb,
  constraint file_size_limit check (
    file_size <= 104857600
  )
);

-- RSS feeds table
create table public.rss_feeds (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  title text not null,
  description text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  active boolean default true,
  settings jsonb default '{}'::jsonb
);

-- Approval workflow table
create table public.approval_queue (
  id uuid default uuid_generate_v4() primary key,
  media_id uuid references public.media_items on delete cascade,
  status text default 'pending',
  reviewer_id uuid references auth.users,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  feedback text,
  metadata jsonb default '{}'::jsonb
);

-- RLS Policies
alter table public.user_profiles enable row level security;
alter table public.media_items enable row level security;
alter table public.rss_feeds enable row level security;
alter table public.approval_queue enable row level security;

-- User Profiles policies
create policy "Users can view their own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

-- Media Items policies
create policy "Users can view their own media"
  on public.media_items for select
  using (auth.uid() = user_id);

create policy "Users can create their own media"
  on public.media_items for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own media"
  on public.media_items for update
  using (auth.uid() = user_id);

create policy "Users can delete their own media"
  on public.media_items for delete
  using (auth.uid() = user_id);

-- RSS Feeds policies
create policy "Users can view their own feeds"
  on public.rss_feeds for select
  using (auth.uid() = user_id);

create policy "Users can create feeds within their tier limit"
  on public.rss_feeds for insert
  with check (
    auth.uid() = user_id and
    (
      (select tier from public.user_profiles where id = auth.uid()) = 'premium' or
      (select count(*) from public.rss_feeds where user_id = auth.uid()) < 3
    )
  );

-- Approval Queue policies
create policy "Users can view their own approval items"
  on public.approval_queue for select
  using (
    exists (
      select 1 from public.media_items
      where media_items.id = approval_queue.media_id
      and media_items.user_id = auth.uid()
    )
  );

-- Functions
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, tier)
  values (new.id, 'basic');
  return new;
end;
$$ language plpgsql security definer;

-- Triggers
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();