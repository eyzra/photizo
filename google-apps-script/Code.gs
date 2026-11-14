/**
 * Photizo Global website forms → Google Sheet
 *
 * Receives the Contact, IMMERSION registration and Dear Atheist question forms,
 * saves each to its own tab, emails an alert, and sends the person a thank-you.
 * Setup steps are in SETUP.md beside this file.
 */

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------
const ALERT_EMAIL = 'message.theezraanya@gmail.com'; // receives an alert for every new entry
const MINISTRY_NAME = 'Photizo Global';
const REPLY_TO = 'mail.photizoglobal@gmail.com'; // where replies to the thank-you email go
const WEBSITE = 'https://eyzra.github.io/photizo/';

const FORMS = {
  contact: {
    tab: 'Contact & Prayer',
    columns: ['Submitted', 'Name', 'Email', 'Phone', 'Topic', 'Message', 'Page'],
    fields: ['name', 'email', 'phone', 'topic', 'message', 'page'],
    required: ['name', 'email', 'message'],
    alertSubject: (d) => `New ${d.topic || 'message'} from ${d.name}`,
    replySubject: () => 'We received your message',
    replyBody: (d) =>
      `<p>Hello ${esc(first(d.name))},</p>
       <p>Thank you for reaching out to ${MINISTRY_NAME}. We have received your message${d.topic ? ` (${esc(d.topic)})` : ''} and someone from the team will get back to you soon.</p>
       ${d.topic === 'Prayer request' ? '<p>We are standing with you in prayer.</p>' : ''}
       <p>Grace and peace,<br>${MINISTRY_NAME}</p>`,
  },
  immersion: {
    tab: 'IMMERSION Registration',
    columns: ['Submitted', 'Edition', 'Name', 'Phone', 'Email', 'How they heard', 'Page'],
    fields: ['edition', 'name', 'phone', 'email', 'heard', 'page'],
    required: ['edition', 'name', 'phone', 'email'],
    alertSubject: (d) => `New IMMERSION registration: ${d.name}`,
    replySubject: (d) => `You're registered for ${d.edition}`,
    replyBody: (d) =>
      `<p>Hello ${esc(first(d.name))},</p>
       <p>Thank you for registering for <strong>${esc(d.edition)}</strong>. We are glad you're coming and we'll send any updates you need before the camp meeting.</p>
       <p>Come expecting to be immersed to rise.</p>
       <p>Grace and peace,<br>${MINISTRY_NAME}</p>`,
  },
  question: {
    tab: 'Dear Atheist Questions',
    columns: ['Submitted', 'Name', 'Email', 'Question', 'Page'],
    fields: ['name', 'email', 'question', 'page'],
    required: ['question'],
    alertSubject: (d) => `New Dear Atheist question${d.name ? ` from ${d.name}` : ''}`,
    replySubject: () => 'Thank you for your question',
    replyBody: (d) =>
      `<p>Hello${d.name ? ' ' + esc(first(d.name)) : ''},</p>
       <p>Thank you for sending your question to the Dear Atheist series. Ezra reads every one, and it may shape a future letter.</p>
       <p>You asked:</p>
       <blockquote style="border-left:3px solid #F58220;margin:0;padding:4px 12px;color:#34516C">${esc(d.question)}</blockquote>
       <p>Grace and peace,<br>${MINISTRY_NAME}</p>`,
  },
};

// ---------------------------------------------------------------------------
// Web app entry points
// ---------------------------------------------------------------------------
function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Spam trap: real visitors never see or fill the "website" field
    if (data.website) return json({ ok: true });

    const form = FORMS[data.form];
    if (!form) return json({ ok: false, error: 'Unknown form' });

    const clean = {};
    form.fields.forEach((f) => (clean[f] = tidy(data[f])));
    const missing = form.required.filter((f) => !clean[f]);
    if (missing.length) return json({ ok: false, error: 'Missing: ' + missing.join(', ') });
    if (clean.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) return json({ ok: false, error: 'Invalid email' });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = tabFor(form);
      sheet.appendRow([new Date()].concat(form.fields.map((f) => safeCell(clean[f]))));
    } finally {
      lock.releaseLock();
    }

    notify(form, clean);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'Server error' });
  }
}

function doGet() {
  return json({ ok: true, message: 'Photizo Global forms endpoint is running.' });
}

/** Run once from the editor: creates every tab with its header row. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(FORMS).forEach((k) => tabFor(FORMS[k]));
  // Remove Google's empty starter tab once the real tabs exist
  const starter = ss.getSheetByName('Sheet1');
  if (starter && starter.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(starter);
  ss.toast('Photizo forms are ready.');
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function tabFor(form) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(form.tab);
  if (!sheet) {
    sheet = ss.insertSheet(form.tab);
    sheet.appendRow(form.columns);
    sheet.getRange(1, 1, 1, form.columns.length).setFontWeight('bold').setBackground('#071D49').setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
  }
  return sheet;
}

function notify(form, d) {
  const rows = form.fields
    .filter((f) => f !== 'page' && d[f])
    .map((f, i) => `<tr><td style="padding:6px 12px 6px 0;color:#34516C;vertical-align:top">${form.columns[form.fields.indexOf(f) + 1]}</td><td style="padding:6px 0">${esc(d[f]).replace(/\n/g, '<br>')}</td></tr>`)
    .join('');
  const sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();

  // Alert to the ministry
  MailApp.sendEmail({
    to: ALERT_EMAIL,
    subject: '[Website] ' + form.alertSubject(d),
    htmlBody: `<table style="font-family:Arial,sans-serif;font-size:14px">${rows}</table><p style="font-family:Arial,sans-serif;font-size:13px"><a href="${sheetUrl}">Open the sheet</a></p>`,
    name: MINISTRY_NAME + ' Website',
    replyTo: d.email || REPLY_TO,
  });

  // Thank-you to the person, when they gave an email
  if (d.email) {
    MailApp.sendEmail({
      to: d.email,
      subject: form.replySubject(d),
      htmlBody: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#071D49;max-width:560px">${form.replyBody(d)}<p style="font-size:13px;color:#34516C"><a href="${WEBSITE}">${WEBSITE}</a></p></div>`,
      name: MINISTRY_NAME,
      replyTo: REPLY_TO,
    });
  }
}

function tidy(v) {
  return String(v == null ? '' : v).trim().slice(0, 5000);
}
// Stops a submission from being read as a spreadsheet formula
function safeCell(v) {
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}
function esc(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function first(name) {
  return String(name || '').split(' ')[0];
}
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
