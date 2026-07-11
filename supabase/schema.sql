-- OTOS Hub — Supabase schema
-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run

-- 1) Outreach tracker rows (doc 19)
create table if not exists tracker_targets (
  id            text primary key,           -- stable slug, e.g. 'sahakian'
  sort_order    int not null default 0,
  name          text not null,
  organisation  text,
  role_fit      text,
  email         text,
  contact_url   text,
  status        text not null default 'not-contacted',
  date_contacted date,
  followup_date  date,
  sent_material  text,
  response       text,
  next_action    text,
  comm_log       text default '',
  updated_at     timestamptz not null default now(),
  updated_by     text
);

-- 2) Per-document review state + notes (hub index + any doc page)
create table if not exists doc_status (
  doc_id        text primary key,           -- e.g. '01-funding-route-summary'
  gareth_reviewed boolean not null default false,
  dean_reviewed   boolean not null default false,
  ready           boolean not null default false,
  note            text default '',
  updated_at      timestamptz not null default now(),
  updated_by      text
);

-- 3) Free-text "notes on this document" boxes (e.g. bottom of tracker)
create table if not exists doc_notes (
  doc_id      text primary key,             -- e.g. '19-outreach-tracker'
  body        text default '',
  updated_at  timestamptz not null default now(),
  updated_by  text
);

-- Row Level Security: internal 2-person tool, already sitting behind
-- Cloudflare Access — open read/write for the anon key is acceptable here.
alter table tracker_targets enable row level security;
alter table doc_status      enable row level security;
alter table doc_notes       enable row level security;

create policy "anon full access" on tracker_targets for all using (true) with check (true);
create policy "anon full access" on doc_status      for all using (true) with check (true);
create policy "anon full access" on doc_notes       for all using (true) with check (true);

-- Seed the 16 outreach targets currently in the tracker
insert into tracker_targets (id, sort_order, name, organisation, role_fit, email, contact_url, next_action) values
('sahakian',      1, 'Prof. Barbara Sahakian', 'Cambridge Psychiatry / BCNI', 'Topic fit', null, 'psychiatry.cam.ac.uk staff profile', 'Send first'),
('ford',          2, 'Prof. Tamsin Ford / Psychiatry office', 'Cambridge Psychiatry', 'Dept gateway', 'HoDPsychiatry@medschl.cam.ac.uk', 'psychiatry.cam.ac.uk', 'Send first'),
('dixonwoods',    3, 'Prof. Mary Dixon-Woods / THIS', 'THIS Institute, Cambridge', 'Implementation science', null, 'thisinstitute.cam.ac.uk contact', 'Send first'),
('bowdenjones',   4, 'Prof. Henrietta Bowden-Jones', 'Cambridge Psychiatry (hon.) / UCL / CNWL', 'Addiction credibility', null, 'Institutional profile (UCL/CNWL)', 'Send first'),
('cph_network',   5, 'Cambridge Public Health network', 'Public Health & Primary Care, Cambridge', 'PH / health econ', null, 'cph.cam.ac.uk/contact-us', 'Send first'),
('robbins',       6, 'Prof. Trevor Robbins', 'Cambridge BCNI/Psychology', 'Senior steer', null, 'psychol.cam.ac.uk staff profile', 'Verify status, then send'),
('nihr_arc_eoe',  7, 'NIHR ARC East of England', 'NIHR ARC EoE', 'Feasibility design', null, 'arc-eoe.nihr.ac.uk contact form', 'Send'),
('nihr_brc',      8, 'NIHR Cambridge BRC', 'Cambridge Biomedical Campus', 'Clinical routing', null, 'cambridgebrc.nihr.ac.uk contact', 'Send'),
('cam_enterprise',9, 'Cambridge Enterprise', 'University of Cambridge', 'Route 4 / translational', 'enquiries@enterprise.cam.ac.uk', 'Alt: iaa@admin.cam.ac.uk (Univ. IAA team)', 'Send — priority for Route 4'),
('brayne',       10, 'Prof. Carol Brayne', 'Public Health & Primary Care, Cambridge', 'PH / epidemiology', null, 'Cambridge Public Health staff profile', 'Verify focus, then send'),
('phpc_gateway', 11, 'Public Health & Primary Care gateway', 'University of Cambridge', 'Dept gateway', null, 'phpc.cam.ac.uk/contact', 'Send'),
('nord',         12, 'Prof. Camilla Nord', 'University of Cambridge', 'Mechanism / Wellcome fit', null, 'MRC CBU / Psychiatry staff profile', 'Send'),
('dalgleish',    13, 'Prof. Tim Dalgleish', 'MRC CBU, Cambridge', 'Clinical psychology', null, 'MRC CBU staff profile', 'Send'),
('baroncohen',   14, 'Prof. Simon Baron-Cohen / ARC', 'Autism Research Centre, Cambridge', 'Adjacent, low priority', null, 'autismresearchcentre.com', 'Only if relevant'),
('psych_office', 15, 'Dept of Psychiatry research office', 'University of Cambridge', 'Dept gateway', 'HoDPsychiatry@medschl.cam.ac.uk', 'psychiatry.cam.ac.uk', 'Send'),
('cpft_rd',      16, 'CPFT Research & Development', 'CPFT', 'Governance / local site', null, 'cpft.nhs.uk/contactus (ask for R&D)', 'Route via existing contact, not cold')
on conflict (id) do nothing;
