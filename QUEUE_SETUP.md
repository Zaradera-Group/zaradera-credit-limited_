# Enquiry email retry queue

The website attempts to send every enquiry immediately. If Resend rejects the message or is temporarily unavailable, the complete email is encrypted and written to PostgreSQL. A protected scheduled worker retries pending messages with increasing delays and stops after ten failed attempts.

## Required production configuration

1. Create a PostgreSQL database using Supabase or another PostgreSQL provider. For a serverless deployment, use its transaction-pooler connection string.
2. Run `database/enquiry-email-queue.sql` against that database. The migration enables row-level security and removes browser-role access to the queue.
3. Add these environment variables to the deployment:

   - `DATABASE_URL`: the PostgreSQL connection string.
   - `ENQUIRY_QUEUE_KEY`: a base64-encoded 32-byte encryption key. Generate one with `openssl rand -base64 32` and keep it stable and secret.
   - `CRON_SECRET`: a long random secret used to protect the retry endpoint.
   - `RESEND_API_KEY`, `COMPANY_EMAIL`, and `ENQUIRY_FROM_EMAIL`: the existing mail settings.

4. Redeploy the site. `vercel.json` requests the retry worker every five minutes at `/api/cron/retry-enquiries`.

## Important

The queue protects enquiries from temporary delivery failures, but it does not replace Resend domain verification. Once the sender domain is verified, queued messages will be delivered by subsequent retries. Rows marked `failed` after ten attempts remain encrypted in the database for manual review or a controlled requeue operation.
