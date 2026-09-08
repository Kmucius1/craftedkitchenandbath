# Lead capture

Website contact form, quote questionnaire, and newsletter signup all save to
the same `leads` table in Supabase. Leads are managed in the separate
**Crafted CRM** app (crafted-crm-topaz.vercel.app), not in this repo — there
is no in-repo admin dashboard.

**Flow:** form → `POST /api/contact` (or `/api/quote`, `/api/subscribe`) →
validates + blocks spam → `leads` table (Supabase Postgres) → visible in the
Crafted CRM.

---

## One-time setup

### 1. Database
Leads are stored in the same Supabase project the portal and CRM already
use. `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` must be set in Vercel for
this project.

### 2. (Optional) Email alert on each new lead
Set these and new leads also email you (otherwise the CRM is the only place
they land):
| Name | Value |
|---|---|
| `RESEND_API_KEY` | a Resend API key |
| `LEAD_NOTIFY_EMAIL` | where alerts go, e.g. `info@craftedkitchenandbath.com` |
| `LEAD_NOTIFY_FROM` | a verified Resend sender, e.g. `Crafted Leads <leads@craftedkitchenandbath.com>` |

SMS/text alerts can be added later (Twilio).

## Notes
- **No lead is ever silently lost:** if the DB isn't reachable, the form tells the visitor to call (727) 383-7550 and the error is logged.
- **Spam:** hidden honeypot field on the form; bot submissions are dropped server-side.
- **Local dev:** `vercel env pull .env.local` to get the Supabase env vars, then `npm run dev`.
