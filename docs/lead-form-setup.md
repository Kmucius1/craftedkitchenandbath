# Lead capture + Admin dashboard

Website contact form → saved to Postgres → viewable in a login-protected admin
dashboard at **`/admin/leads`** (search, filter, status tracking, notes, CSV export).
Optionally emails you on every new lead.

**Flow:** form → `POST /api/contact` (validates + blocks spam) → `leads` table (Vercel Postgres / Neon) → `/admin/leads`.

---

## One-time setup

### 1. Create the database (Vercel Postgres / Neon) — your one click
1. Vercel → the **crafted-kitchen-bath** project → **Storage** tab.
2. **Create Database → Neon (Postgres)** → accept the free plan → **Connect to project** (all environments).
   - This auto-adds `DATABASE_URL` / `POSTGRES_URL` env vars to the project.
3. Tell Claude it's connected — the `leads` table migration (`db/schema.sql`) gets run and the project redeploys.

### 2. Admin login env vars (Claude sets these)
| Name | Value |
|---|---|
| `ADMIN_PASSWORD` | the password you'll type at `/admin` |
| `ADMIN_SESSION_SECRET` | a long random string (the session cookie value) |

Sign in at **`/admin`**, then you're taken to **`/admin/leads`**.

### 3. (Optional) Email alert on each new lead
Set these and new leads also email you (otherwise the dashboard is the only place they land):
| Name | Value |
|---|---|
| `RESEND_API_KEY` | a Resend API key |
| `LEAD_NOTIFY_EMAIL` | where alerts go, e.g. `info@craftedkitchenandbath.com` |
| `LEAD_NOTIFY_FROM` | a verified Resend sender, e.g. `Crafted Leads <leads@craftedkitchenandbath.com>` |

SMS/text alerts can be added later (Twilio).

---

## The admin dashboard (`/admin/leads`)
- Spreadsheet-style table: date, name, click-to-email/call contact, service, city.
- **Status** per lead: New → Contacted → Quoted → Won → Lost (saved instantly).
- **Details** row: full description, preferred contact method, editable internal notes.
- **Search** + **status filter** + **Export CSV** (of the current view).
- **Sign out** clears the session.

## Notes
- **No lead is ever silently lost:** if the DB isn't reachable, the form tells the visitor to call (727) 383-7550 and the error is logged.
- **Spam:** hidden honeypot field on the form; bot submissions are dropped server-side.
- `/admin` is `noindex` and gated by `proxy.ts`.
- **Local dev:** `vercel env pull .env.local` to get the DB string, then `npm run dev`.
