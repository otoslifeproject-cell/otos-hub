// Vercel Serverless Function — weekly pipeline summary email.
// Triggered by the Vercel Cron in vercel.json (Monday 08:00 UK / 07:00 UTC).
// Emails a broader snapshot: outreach pipeline, week ahead, and work done last week.
//
// Uses the same env vars as api/daily-digest.js:
//   RESEND_API_KEY, DIGEST_TO  (required)   DIGEST_FROM, CRON_SECRET  (optional)
//   SUPABASE_URL / SUPABASE_KEY (default to the hub's public values)

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
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== 'Bearer ' + secret) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const today = new Date().toISOString().slice(0, 10);
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
  const weekAgoDate = weekAgo.slice(0, 10);
  const weekAhead = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);

  const [targets, dueSoon, openTasks, doneTasks, acts, docStatus] = await Promise.all([
    sb('tracker_targets?select=status'),
    sb('tracker_targets?select=name,organisation,followup_date&followup_date=lte.' + weekAhead + '&order=followup_date.asc'),
    sb('todos?select=title,owner,due_date&done=eq.false&due_date=lte.' + weekAhead + '&order=due_date.asc'),
    sb('todos?select=title&done=eq.true&updated_at=gte.' + weekAgo),
    sb('activity_log?select=actor&created_at=gte.' + weekAgo),
    sb('doc_status?select=ready')
  ]);

  // Pipeline breakdown by status
  const pipeline = {};
  (targets || []).forEach(t => { const s = t.status || 'not-contacted'; pipeline[s] = (pipeline[s] || 0) + 1; });
  const pipelineRows = Object.entries(pipeline).sort((a, b) => b[1] - a[1])
    .map(([s, n]) => '<tr><td style="padding:4px 10px;font:13px system-ui;color:#1a1a1a;">' + (STATUS_MAP[s] || s) + '</td><td style="padding:4px 10px;font:700 13px system-ui;text-align:right;color:#1a1a1a;">' + n + '</td></tr>').join('');

  const overdue = (dueSoon || []).filter(r => r.followup_date < today);
  const thisWeekFollow = (dueSoon || []).filter(r => r.followup_date >= today);
  const docsReady = (docStatus || []).filter(d => d.ready).length;
  const actByActor = {};
  (acts || []).forEach(a => { const k = a.actor || 'Unknown'; actByActor[k] = (actByActor[k] || 0) + 1; });

  const to = (process.env.DIGEST_TO || '').split(',').map(s => s.trim()).filter(Boolean);
  const cfg = await sb('hub_settings?select=value&key=eq.digest_recipients');
  const recipients = (cfg && cfg[0] && cfg[0].value) ? cfg[0].value.split(',').map(s => s.trim()).filter(Boolean) : to;
  if (!process.env.RESEND_API_KEY || !recipients.length) {
    return res.status(500).json({ error: 'missing RESEND_API_KEY or no recipients set' });
  }

  const list = (arr, fmt) => arr.length ? '<ul style="margin:6px 0 0;padding-left:18px;">' + arr.map(fmt).join('') + '</ul>' : '<p style="margin:6px 0 0;font:13px system-ui;color:#888;">None.</p>';
  const dfmt = d => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' });
  const sect = (t, inner) => '<h3 style="font:700 12px system-ui;letter-spacing:.08em;text-transform:uppercase;color:#a5761b;margin:22px 0 0;">' + t + '</h3>' + inner;

  const range = new Date(Date.now() - 7 * 86400000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) + ' – ' + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

  const html = '<div style="max-width:600px;margin:0 auto;font-family:system-ui;">' +
    '<h2 style="font:600 20px Georgia,serif;color:#1a1a1a;margin-bottom:2px;">OTOS Hub — Weekly Summary</h2>' +
    '<p style="color:#666;font-size:13px;margin-top:0;">' + range + '</p>' +
    '<table style="border-collapse:collapse;width:100%;margin:6px 0 4px;"><tr>' +
      ['<b>' + (doneTasks || []).length + '</b> tasks done', '<b>' + overdue.length + '</b> overdue follow-ups', '<b>' + thisWeekFollow.length + '</b> follow-ups this week', '<b>' + docsReady + '</b> docs ready']
        .map(c => '<td style="padding:10px;background:#faf8f3;border:1px solid #eee;border-radius:6px;font:13px system-ui;color:#1a1a1a;text-align:center;">' + c + '</td>').join('') +
    '</tr></table>' +
    sect('Outreach pipeline', '<table style="border-collapse:collapse;width:100%;">' + (pipelineRows || '<tr><td style="font:13px system-ui;color:#888;padding:4px 10px;">No contacts yet.</td></tr>') + '</table>') +
    sect('Follow-ups due this week', list(thisWeekFollow, r => '<li style="font:13px system-ui;color:#1a1a1a;margin-bottom:3px;">' + dfmt(r.followup_date) + ' — ' + r.name + (r.organisation ? ' <span style="color:#888;">(' + r.organisation + ')</span>' : '') + '</li>')) +
    (overdue.length ? sect('Overdue — action needed', list(overdue, r => '<li style="font:13px system-ui;color:#c0392b;margin-bottom:3px;">' + dfmt(r.followup_date) + ' — ' + r.name + '</li>')) : '') +
    sect('Tasks due next 7 days', list(openTasks || [], t => '<li style="font:13px system-ui;color:#1a1a1a;margin-bottom:3px;">' + (t.due_date ? dfmt(t.due_date) + ' — ' : '') + t.title + (t.owner ? ' <span style="color:#888;">(' + t.owner + ')</span>' : '') + '</li>')) +
    sect('Activity last 7 days', '<p style="font:13px system-ui;color:#1a1a1a;margin:6px 0 0;">' + (Object.entries(actByActor).map(([k, n]) => k + ': ' + n).join(' · ') || 'No activity logged.') + '</p>') +
    '<p style="color:#aaa;font-size:11px;margin-top:24px;">Generated automatically from hub.otos.network</p></div>';

  const send = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.DIGEST_FROM || 'OTOS Hub <onboarding@resend.dev>',
      to: recipients, subject: 'OTOS Weekly Summary — ' + range, html
    })
  });

  if (!send.ok) return res.status(502).json({ error: 'resend failed', detail: await send.text() });
  return res.status(200).json({ sent: true, tasksDone: (doneTasks || []).length, overdue: overdue.length });
}
