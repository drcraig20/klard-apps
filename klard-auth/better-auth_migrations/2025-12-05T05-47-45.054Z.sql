create table "jwks" ("id" text not null primary key, "publicKey" text not null, "privateKey" text not null, "createdAt" timestamptz not null, "expiresAt" timestamptz);

create table "rateLimit" ("id" text not null primary key, "key" text not null, "count" integer not null, "lastRequest" bigint not null);