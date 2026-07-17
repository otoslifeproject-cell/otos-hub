// Vercel Serverless Function — automatic daily "Today" digest email.
// Triggered by the Vercel Cron defined in vercel.json (08:00 UK / 07:00 UTC daily).
// Reads due follow-ups + open tasks from Supabase and emails them via Resend.
//
// Required Vercel env vars (Project → Settings → Environment Variables):
//   RESEND_API_KEY   — from resend.com (free tier is fine)
//   DIGEST_TO        — recipient(s), comma-separated e.g. "dean@otos.life,gareth@..."
// Optional:
//   DIGEST_FROM      — verified sender (default: "OTOS Hub <onboarding@resend.dev>")
//   CRON_SECRET      — if set, requests must send  Authorization: Bearer <CRON_SECRET>
//   SUPABASE_URL / SUPABASE_KEY — default to the hub's public project values below

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ibpvgyopwuciaqfzjxdm.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_WltftZWjHemFq1FNOFOFVQ_X-hgvSGI';

const STATUS_MAP = {
  'not-contacted': 'Not contacted', emailed: 'Emailed — awaiting reply', 'called-no-answer': 'Called — no answer',
  voicemail: 'Voicemail left', replied: 'Replied', 'call-booked': 'Call booked', 'meeting-held': 'Meeting held',
  'no-response': 'No response after follow-up', declined: 'Declined', referred: 'Referred elsewhere',
  'callback-requested': 'Callback requested', 'not-interested': 'Not interested', 'wrong-contact': 'Wrong contact'
};

async function sb(path) {
  const r = await fetch(SUPABASE_URL + '/rest/v1/' + path, {
    headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY }
  });
  return r.ok ? r.json() : [];
}

export default async function handler(req, res) {
  // Auth: if CRON_SECRET is set, require it. Vercel Cron sends it automatically
  // when a CRON_SECRET env var exists.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== 'Bearer ' + secret) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const today = new Date().toISOString().slice(0, 10);
  const [contacts, todos] = await Promise.all([
    sb('tracker_targets?select=name,organisation,status,owner,followup_date&followup_date=lte.' + today + '&order=followup_date.asc'),
    sb('todos?select=title,owner,due_date,due_time,done&done=eq.false&due_date=lte.' + today + '&order=due_date.asc')
  ]);

  const items = [];
  (contacts || []).forEach(r => {
    const over = r.followup_date < today;
    const days = Math.floor((Date.now() - new Date(r.followup_date).getTime()) / 86400000);
    items.push({ badge: over ? days + 'd overdue' : 'Today', title: 'Follow up with ' + r.name,
      sub: [r.organisation, STATUS_MAP[r.status]].filter(Boolean).join(' · ') });
  });
  (todos || []).forEach(t => {
    const over = (t.due_date || today) < today;
    items.push({ badge: over ? 'Overdue' : 'Today', title: t.title,
      sub: 'To-do' + (t.owner ? ' · ' + t.owner : '') + (t.due_time ? ' · ' + t.due_time.slice(0, 5) : '') });
  });

  const dstr = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'long' });
  let to = (process.env.DIGEST_TO || '').split(',').map(s => s.trim()).filter(Boolean);
  const cfg = await sb('hub_settings?select=value&key=eq.digest_recipients');
  if (cfg && cfg[0] && cfg[0].value) to = cfg[0].value.split(',').map(s => s.trim()).filter(Boolean);
  if (!process.env.RESEND_API_KEY || !to.length) {
    return res.status(500).json({ error: 'missing RESEND_API_KEY or no recipients set', items: items.length });
  }

  if (!items.length) {
    // Nothing due — skip sending (comment out this block to always send).
    return res.status(200).json({ sent: false, reason: 'nothing due today' });
  }

  const rows = items.map(it =>
    '<tr><td style="padding:6px 10px;font:700 11px system-ui;color:#a5761b;white-space:nowrap;">' + it.badge + '</td>' +
    '<td style="padding:6px 10px;font:14px system-ui;color:#1a1a1a;">' + it.title +
    (it.sub ? '<div style="font:12px system-ui;color:#888;">' + it.sub + '</div>' : '') + '</td></tr>'
  ).join('');
  const html = '<div style="max-width:560px;margin:0 auto;font-family:system-ui;">' +
    '<h2 style="font:600 18px Georgia,serif;color:#1a1a1a;">OTOS Hub — Today</h2>' +
    '<p style="color:#666;font-size:13px;">' + dstr + ' · <b>' + items.length + '</b> item' + (items.length === 1 ? '' : 's') + ' need you today</p>' +
    '<table style="border-collapse:collapse;width:100%;">' + rows + '</table>' +
    '<p style="color:#aaa;font-size:11px;margin-top:20px;">Generated automatically from hub.otos.network</p></div>';

  const text = 'OTOS Hub — Today, ' + dstr + '\n\n' + items.length + ' items need you today:\n\n' +
    items.map(it => '• [' + it.badge + '] ' + it.title + (it.sub ? ' — ' + it.sub : '')).join('\n');

  const send = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.DIGEST_FROM || 'OTOS Hub <onboarding@resend.dev>',
      to, subject: 'OTOS Today — ' + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) + ' (' + items.length + ' due)',
      html, text
    })
  });

  if (!send.ok) return res.status(502).json({ error: 'resend failed', detail: await send.text() });
  return res.status(200).json({ sent: true, count: items.length });
}
