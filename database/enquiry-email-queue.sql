create table if not exists enquiry_email_queue (
  id text primary key,
  encrypted_payload text not null,
  status text not null check (status in ('pending', 'processing', 'sent', 'failed')),
  attempts integer not null default 0,
  next_attempt_at timestamptz not null default now(),
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  sent_at timestamptz
);

create index if not exists enquiry_email_queue_due_idx
  on enquiry_email_queue (status, next_attempt_at);

alter table enquiry_email_queue enable row level security;
revoke all on table enquiry_email_queue from anon, authenticated;
