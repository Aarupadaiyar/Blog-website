# Setup & Deployment

## Local development (already working)

```bash
npm install
npm run dev
```

Local dev uses a SQLite file (`prisma/dev.db`) and stores uploaded images/PDFs in
`public/uploads`. No external accounts are needed to develop.

Your admin login (see `.env`):

- URL: `http://localhost:3000/admin/login`
- Email: `aarupadaiyarjeyapal@gmail.com`
- Password: `qpnC7YQA19Ym`

**Change this password before going live** — edit `ADMIN_PASSWORD` in `.env`,
then re-run `npm run db:seed` (it upserts, so it's safe to run again), or add a
"change password" flow later if you want to do it from the UI.

There's no signup page anywhere — the only way in is that one login form, and
it's not linked from the public site. Bookmark `/admin/login`.

## Comments

Readers can comment on any published post without creating an account (just a
name and the comment). New comments start **pending** and are invisible on the
site until you approve them from `/admin/comments` — the sidebar shows a badge
with the pending count. This default (moderate-first) is there to keep spam
and abuse off the site by default; if you'd rather comments post instantly,
change the `status: "pending"` default in `app/api/comments/route.ts` to
`"approved"`.

## Going live: what you need

### 1. A Postgres database (free)

1. Go to [neon.tech](https://neon.tech) (or [supabase.com](https://supabase.com)) and create a free project.
2. Copy the connection string it gives you (starts with `postgresql://`).
3. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
   to:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Delete the `prisma/migrations` folder (it was generated for SQLite) and run:
   ```bash
   npx prisma migrate dev --name init
   npm run db:seed
   ```

### 2. Cloudinary for images/PDFs (free tier)

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. From the dashboard, copy your **Cloud name**, **API Key**, and **API Secret**.
3. Set them as `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   in your environment. As soon as these are set, uploads automatically switch
   from local disk to Cloudinary — no code changes needed (see `lib/storage.ts`).

### 3. Video

Nothing to set up — paste a YouTube or Vimeo link into the post editor's "Video
link" field and it embeds automatically.

### 4. Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.example`:
   `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (your real domain),
   `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`, and the three `CLOUDINARY_*` vars.
4. Deploy. Vercel runs `npm run build`, which runs `prisma generate` automatically.
5. Run the seed once against production (from your machine, with the production
   `DATABASE_URL` in your shell): `npm run db:seed`.

## Replicating this for a client

This repo is intentionally self-contained (one client = one deployment, not a
shared multi-tenant system), so cloning it is straightforward:

1. Duplicate the repo (or use it as a GitHub template).
2. Edit `lib/site-config.ts` — site name, tagline, description, author name,
   and the starting category list.
3. Set up a fresh Neon/Supabase database and Cloudinary account for the client
   (steps 1–2 above) and put their credentials in a new `.env`.
4. Pick their admin email/password, run `npm run db:seed`.
5. Deploy as a new Vercel project (step 4 above) on their domain.

Everything else — the editor, categories, video embeds, PDF attachments, the
whole visual design — carries over unchanged.

## Notebook design system reference

The visual language (colors, fonts, sharp/pill button styles, the ruled-paper
background) lives in `app/globals.css` as CSS variables and utility classes
(`.btn-sharp`, `.paper-card`, `.wobbly-box`, `.font-hand`, `.font-mono-label`,
`.ruled-overlay`). Change the values there to re-theme the whole site at once.
