create extension if not exists pgcrypto;

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  excerpt text not null,
  content text not null,
  cover_image text not null default '',
  category text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  author text not null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists blog_posts_public_idx on blog_posts (status, published_at desc);
create index if not exists blog_posts_category_idx on blog_posts (category);

alter table blog_posts enable row level security;
-- The website accesses this table only through authenticated server code using DATABASE_URL.
-- Do not add anonymous write policies.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-media', 'blog-media', true, 8000000, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
drop policy if exists "Public blog media is readable" on storage.objects;
create policy "Public blog media is readable"
on storage.objects for select
using (bucket_id = 'blog-media');
