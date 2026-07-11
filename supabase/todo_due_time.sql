-- OTOS Hub — Due time for to-do items (Supabase)
-- Run this once: Dashboard → SQL Editor → New query → paste → Run

alter table todos add column if not exists due_time time;
