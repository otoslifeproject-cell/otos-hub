-- OTOS Hub — Owner field + To-Do list (Supabase)
-- Run this once: Dashboard → SQL Editor → New query → paste → Run
-- (schema.sql and activity_log.sql must already be applied first)

alter table tracker_targets add column if not exists owner text;
alter table doc_status add column if not exists owner text;

create table if not exists todos (
  id          bigint generated always as identity primary key,
  title       text not null,
  owner       text,
  done        boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table todos enable row level security;
create policy "anon full access" on todos for all using (true) with check (true);

create index if not exists todos_done_idx on todos (done, created_at desc);
