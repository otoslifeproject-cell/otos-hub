-- OTOS Hub — Activity feed (Supabase)
-- Run this once: Dashboard → SQL Editor → New query → paste → Run
-- (schema.sql must already be applied first)

create table if not exists activity_log (
  id          bigint generated always as identity primary key,
  actor       text,               -- optional, unused for now (no login identity yet)
  doc_label   text not null,      -- e.g. '03 · Academic Concept Note' or 'Prof. Barbara Sahakian'
  detail      text not null,      -- e.g. 'marked ready' / 'status set to Replied' / 'note updated'
  created_at  timestamptz not null default now()
);

alter table activity_log enable row level security;
create policy "anon full access" on activity_log for all using (true) with check (true);

create index if not exists activity_log_created_at_idx on activity_log (created_at desc);
