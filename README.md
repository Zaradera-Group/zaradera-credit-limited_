# Zaradera Credit Limited website

## Local development

Copy `.env.example` to `.env.local`, fill in the values, then run `npm install` and `npm run dev`.

## Supabase blog setup

1. Run `database/blog-cms.sql` in the Supabase SQL Editor. It creates the posts table, indexes, RLS configuration, and public `blog-media` Storage bucket.
2. Set `DATABASE_URL` to the Supabase Transaction Pooler URI.
3. Set `NEXT_PUBLIC_SUPABASE_URL` to the Project URL and `SUPABASE_SERVICE_ROLE_KEY` to the service-role key. Never expose or commit the service-role key.
4. Add these variables to the relevant Vercel environments.

## Create the CMS administrator

Generate a scrypt password value locally:

```bash
node -e "const c=require('crypto'),p=process.argv[1],s=c.randomBytes(16).toString('hex');console.log(s+':'+c.scryptSync(p,s,64).toString('hex'))" "YOUR STRONG PASSWORD"
```

Set that output as `ADMIN_PASSWORD_SCRYPT`, set `ADMIN_EMAIL`, and generate `ADMIN_SESSION_SECRET` with `openssl rand -hex 32`. Credentials are never stored in source code. Sign in at `/admin/login`.

## Publishing

The CMS supports drafts, future publication dates, categories, cover uploads, editing, and deletion. Formatting supports `#`/`##` headings, `**bold**`, `-` list items, and `[label](https://example.com)` links. Only published posts whose publication date has passed appear publicly.
