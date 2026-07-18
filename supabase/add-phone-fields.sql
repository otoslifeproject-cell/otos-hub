-- OTOS Hub — extra contact fields (Supabase)
-- Run this once: Dashboard → SQL Editor → New query → paste → Run
-- The hub works without it; these fields just won't persist (and will log a
-- harmless 400) until it's run. Running it enables Phone, Contact person and Tags.

alter table tracker_targets add column if not exists phone text;
alter table tracker_targets add column if not exists contact_person text;
alter table tracker_targets add column if not exists tags text;
