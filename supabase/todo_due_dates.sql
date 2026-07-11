-- OTOS Hub — Due dates for to-do items (Supabase)
-- Run this once: Dashboard → SQL Editor → New query → paste → Run
-- (schema.sql, activity_log.sql and owner_and_todos.sql must already be applied first)

alter table todos add column if not exists due_date date;
