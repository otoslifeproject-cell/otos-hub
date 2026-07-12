-- OTOS Hub — one-off cleanup: remove leftover test row from earlier "+Add new target" testing
-- Run this once: Dashboard → SQL Editor → New query → paste → Run

delete from tracker_targets where name = 'Untitled target';
