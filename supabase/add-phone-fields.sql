-- OTOS Hub — Phone + Contact person fields (Supabase)
-- Run this once: Dashboard → SQL Editor → New query → paste → Run
-- (optional — the hub works without it; these two fields just won't persist until it's run)

alter table tracker_targets add column if not exists phone text;
alter table tracker_targets add column if not exists contact_person text;
