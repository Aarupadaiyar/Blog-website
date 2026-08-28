# Setup & Deployment

## Local development

```bash
npm install
npm run dev
```

This project runs on Postgres (via Supabase) both locally and in production —
`DATABASE_URL`/`DIRECT_URL` in `.env` point at the same database either way,
so there's no separate local-only database to keep in sync.

Your admin login (see `.env` — change these before this goes fully public):

- URL: `http://localhost:3000/admin/login`
- Email: `admin@example.com`
- Password: `12345678`

To change them: edit `ADMIN_EMAIL`/`ADMIN_PASSWORD` in `.env`, then re-run
`npm run db:seed` (it now upserts the password too, so it's safe to run again).

There's no signup page anywhere — the only way in is that one login form. It's
linked from the site footer ("Admin login"); remove that link in
`components/Footer.tsx` if you'd rather it stayed unlisted.

## Comments

Readers can comment on any published post without creating an account — just
a name, a required email (used for the mailing-list sync below, never shown
publicly), and the comment. New comments start **pending** and are invisible
on the site until you approve them from `/admin/comments` — the sidebar shows
a badge with the pending count. This default (moderate-first) is there to keep
spam and abuse off the site; if you'd rather comments post instantly, change
the `status: "pending"` default in `app/api/comments/route.ts` to `"approved"`.

### Syncing commenter emails to a Google Sheet

Optional — comments work fine without this, it just also appends each one as
a row (name, email, comment, post, date) to a Google Sheet you control.

1. Go to [console.cloud.google.com](https://console.cloud.google.com), create
   a project (or use an existing one).
2. **APIs & Services → Library** → search "Google Sheets API" → **Enable**.
3. **APIs & Services → Credentials** → **Create Credentials → Service account**.
   Give it any name, skip the optional permission/role steps.
4. Open the new service account → **Keys** tab → **Add Key → Create new key →
   JSON**. This downloads a `.json` file — keep it private, don't commit it.
5. From that JSON file, copy:
   - `client_email` → this is your `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → this is your `GOOGLE_PRIVATE_KEY` (keep the `\n`
     characters in it literally as text when you paste it into an env var —
     the code un-escapes them at runtime)
6. Create (or open) the Google Sheet you want emails to land in. Add a header
   row yourself: `Name, Email, Comment, Post, Date`.
7. Click **Share** on that sheet and share it with the `client_email` address
   from step 5, as **Editor**.
8. Copy the sheet's ID from its URL — the long string between `/d/` and
   `/edit`: `https://docs.google.com/spreadsheets/d/THIS_PART/edit`.
9. Set `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, and
   `GOOGLE_SHEET_ID` (and `GOOGLE_SHEET_NAME` if your tab isn't called
   "Sheet1") in your environment.

## Going live: what you need

### 1. Postgres (already set up)

Already using Supabase — if you ever need to point this at a different
Postgres instance (e.g. replicating for a client, see below), get its pooled
and direct connection strings (Supabase's "Connect" dialog → ORM → Prisma
gives you both, pre-formatted) and set them as `DATABASE_URL`/`DIRECT_URL`,
then run `npx prisma migrate deploy` and `npm run db:seed` against it.

### 2. Cloudinary for images/PDFs (free tier)

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. From the dashboard, copy either the single **API Environment variable**
   (`CLOUDINARY_URL=cloudinary://key:secret@cloud_name`), or the three
   separate **Cloud name** / **API Key** / **API Secret** values — either
   form works, `lib/storage.ts` picks up whichever is set.
3. **This is required before uploads work on Vercel** — its filesystem is
   read-only, so without Cloudinary configured, image/PDF uploads fail there
   (with a clear error message pointing back here) even though they work
   fine on your own machine via local disk.

### 3. Video

Nothing to set up — paste a YouTube or Vimeo link into the post editor's "Video
link" field and it embeds automatically.

### 4. Deploy to Vercel

1. Push this repo to GitHub (already connected).
2. In Vercel → Project → Settings → Environment Variables, add everything from
   `.env.example`: `DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_SECRET`,
   `NEXTAUTH_URL` (your real Vercel URL), `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
   `ADMIN_NAME`, the Cloudinary vars, and the Google Sheets vars if you're
   using that.
3. Deploy. Vercel runs `npm run build`, which runs `prisma generate` automatically.
4. **Important:** clicking "Redeploy" on an existing deployment reruns that
   exact old commit — it does **not** pick up new pushes or new env vars
   retroactively applied to old code. After pushing new code, or after adding
   new env vars, trigger a genuinely fresh deployment (the newest entry in the
   Deployments tab, not "Redeploy" on an old one).

## Replicating this for a client

This repo is intentionally self-contained (one client = one deployment, not a
shared multi-tenant system), so cloning it is straightforward:

1. Duplicate the repo (or use it as a GitHub template).
2. Edit `lib/site-config.ts` — site name, tagline, description, author name/
   bio/title, and the starting category list.
3. Set up a fresh Supabase (or Neon) database and Cloudinary account for the
   client (steps 1–2 above) and put their credentials in a new `.env`.
4. Pick their admin email/password, run `npx prisma migrate deploy` then
   `npm run db:seed`.
5. Deploy as a new Vercel project (step 4 above) on their domain.

Everything else — the editor, categories, video embeds, PDF attachments, the
whole visual design — carries over unchanged.

## Notebook design system reference

The visual language (colors, fonts, sharp/pill button styles, the ruled-paper
background) lives in `app/globals.css` as CSS variables and utility classes
(`.btn-sharp`, `.paper-card`, `.wobbly-box`, `.font-hand`, `.font-mono-label`,
`.ruled-overlay`, `.prose-big`). Change the values there to re-theme the whole
site at once.

## Why pages are marked "force-dynamic"

Several pages (`app/(public)/layout.tsx`, `app/admin/(dashboard)/layout.tsx`,
`app/sitemap.ts`) export `dynamic = "force-dynamic"`. Without it, Next.js
would bake a page's HTML in once at build time if it has no dynamic inputs —
which is wrong for a CMS where content changes constantly between deploys.
Leave these in place; removing them will make new posts/comments/resources
stop showing up until the next deployment.
