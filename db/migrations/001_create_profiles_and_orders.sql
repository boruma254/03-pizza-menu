-- SQL migration to create `profiles` and `orders` tables for Supabase
-- Run this in Supabase SQL Editor (or via your migration tooling)

-- Create profiles table (basic profile information)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  email text,
  created_at timestamptz default now()
);

-- Create orders table (store orders as JSON for now)
create table if not exists public.orders (
  id text primary key,
  user_id uuid references auth.users(id) on delete set null,
  email text,
  order_data jsonb,
  total numeric,
  status integer default 0,
  created_at timestamptz default now()
);

-- Index for quick lookup by user
create index if not exists idx_orders_user_id on public.orders (user_id);
