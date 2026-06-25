# Lead form → Google Sheet setup

Every submission of the website contact form is saved as a row in a Google Sheet.

**How it flows:** Website form → `POST /api/contact` (validates + blocks spam) → Google Apps Script Web App → appends a row to your Sheet.

You do this **once**. ~5 minutes.

---

## 1. Create the Google Sheet
1. Go to <https://sheets.new> and create a sheet. Name it e.g. **"Crafted — Website Leads"**.
2. (Optional) Rename the first tab to **`Leads`** (the script writes a header row automatically).

## 2. Add the Apps Script
1. In the sheet: **Extensions → Apps Script**.
2. Delete whatever is there and paste the script below.
3. Change `SHARED_SECRET` to any random string (letters/numbers). Remember it — you'll paste the same value into the website env var in step 4.
4. Click **Save** (💾).

```javascript
// Crafted Kitchen & Bath — lead intake. Appends each website lead as a row.
const SHARED_SECRET = "CHANGE_ME_to_a_random_string";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (String(data.secret || "") !== SHARED_SECRET) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: "unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Leads") || ss.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Full Name", "Email", "Phone", "Service",
        "City", "Preferred Contact", "Description", "Source"
      ]);
    }

    sheet.appendRow([
      new Date(),
      data.fullName || "",
      data.email || "",
      data.phone || "",
      data.service || "",
      data.city || "",
      data.contactMethod || "",
      data.description || "",
      data.source || "website"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. Deploy as a Web App
1. Top-right: **Deploy → New deployment**.
2. Gear icon → **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** **Anyone**  ← required so the website can post to it
4. Click **Deploy**, authorize when prompted (it's your own script, safe).
5. Copy the **Web app URL** — it looks like `https://script.google.com/macros/s/AKfyc…/exec`.

> If you ever edit the script, use **Deploy → Manage deployments → edit (✏️) → Version: New version** so changes go live (the URL stays the same).

## 4. Add two environment variables to the website
Wherever the site is hosted (Vercel project → Settings → Environment Variables), add:

| Name | Value |
|---|---|
| `SHEETS_WEBHOOK_URL` | the `…/exec` URL from step 3 |
| `SHEETS_WEBHOOK_SECRET` | the same `SHARED_SECRET` string from step 2 |

Then redeploy the site so the new env vars take effect.

## 5. Test
Submit the form on the contact page. A new row should appear in the Sheet within a couple seconds. If not, see troubleshooting below.

---

## Notes & troubleshooting
- **Spam protection:** the form has a hidden "honeypot" field; bot submissions that fill it are silently dropped server-side. The shared secret also prevents anyone who finds the script URL from writing junk rows.
- **No env vars set?** The form returns a clear error ("Form is temporarily unavailable. Please call…") and the failure is logged — leads are never silently lost like before.
- **Want an email/text ping too?** Easy add-on: the Apps Script can also `MailApp.sendEmail(...)` on each row, or the API route can email via Resend. Ask and we'll wire it.
- **Local dev:** put the same two vars in a `.env.local` file (gitignored) to test locally.
