-- Run once in the Neon SQL editor
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password_hash TEXT,           -- null for Google-only accounts
  provider TEXT NOT NULL DEFAULT 'credentials',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
