# OTOS Hub — Automated Digest Setup (Resend + Vercel Cron)

The hub already has the code for automated daily & weekly digest emails:
`api/daily-digest.js`, `api/weekly-summary.js`, `vercel.json`.
They stay dormant until the steps below are done. One-time setup, ~20 minutes.

---

## Step 0 — Create the Supabase settings table (once)

Supabase → SQL Editor → New query → paste → Run:

```sql
create table if not exists hub_settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);
alter table hub_settings enable row level security;
create policy "anon read hub_settings"   on hub_settings for select using (true);
create policy "anon insert hub_settings" on hub_settings for insert with check (true);
create policy "anon update hub_settings" on hub_settings for update using (true) with check (true);
insert into hub_settings (key, value)
values ('digest_recipients', 'dean.butler@otos.digital, gareth.owen@otos.digital')
on conflict (key) do nothing;
```

This lets the recipient picker on the hub's About screen save live, and the cron
functions read the recipient list from it.

---

## Step 1 — Create a Resend account

1. Go to https://resend.com → sign up (free tier = 3,000 emails/month, plenty).
2. Verify your account email.

---

## Step 2 — Add & verify the sending domain

Send from a subdomain so it never clashes with the Zoho SPF/DKIM already on otos.digital.

1. Resend → **Domains → Add Domain** → enter: `send.otos.digital`
2. Resend shows a set of DNS records (usually 3): an **MX**, a **TXT (SPF)**, and a
   **TXT (DKIM)**, all on the `send` subdomain.
3. Add each one at **Hostinger DNS** exactly as shown. Typical shape:
   - `MX`   host `send`        → `feedback-smtp.eu-west-1.amazonses.com` (priority 10)
   - `TXT`  host `send`        → `v=spf1 include:amazonses.com ~all`
   - `TXT`  host `resend._domainkey.send` → the long `p=…` key Resend gives you
   (Copy the real values from Resend — do not type these from memory.)
4. Back in Resend, click **Verify**. Wait 15–30 min for DNS if it doesn't pass first time.

---

## Step 3 — Get the API key

Resend → **API Keys → Create API Key** → name it "OTOS Hub" → copy the key
(starts `re_…`). You only see it once.

---

## Step 4 — Add environment variables in Vercel

Vercel → the otos-hub project → **Settings → Environment Variables** → add:

| Name             | Value                                             |
|------------------|---------------------------------------------------|
| `RESEND_API_KEY` | the `re_…` key from Step 3                         |
| `DIGEST_FROM`    | `OTOS Hub <hub@send.otos.digital>`                |
| `DIGEST_TO`      | `dean.butler@otos.digital, gareth.owen@otos.digital` (fallback if hub_settings is empty) |

Optional: `CRON_SECRET` (any random string) to lock the endpoints so only Vercel
Cron can trigger them.

Set them for **Production** (and Preview if you want).

---

## Step 5 — Redeploy

Vercel → Deployments → **Redeploy** the latest (or just push any commit).
On deploy, Vercel reads `vercel.json` and registers the two crons automatically:
- `api/daily-digest`  → every day 07:00 UTC (08:00 UK)
- `api/weekly-summary` → Mondays 07:00 UTC

(Change times in `vercel.json`, or use the time picker on the hub's About screen
which generates the exact cron lines for you.)

---

## Step 6 — Test

- On the hub's **About** screen, click **"Send daily digest now"** and
  **"Send weekly summary now"**. A ✓ means it sent; check both inboxes.
- Or visit `https://hub.otos.network/api/daily-digest` directly.
- The daily digest only emails when something is actually due — if nothing is due
  it returns "nothing due today" and sends no email (by design).

---

## Notes

- **Recipients** are controlled from the hub's About screen (saved to `hub_settings`)
  — no redeploy needed to change who gets the digests.
- **The hub never emails your contacts.** These digests only go to the internal
  recipient list (you and Gareth).
- Vercel Hobby plan allows a limited number of cron invocations/day — two daily
  crons is well within it.
