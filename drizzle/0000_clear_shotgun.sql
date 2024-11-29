CREATE TABLE IF NOT EXISTS "bills" (
	"id" serial PRIMARY KEY NOT NULL,
	"baseName" text NOT NULL,
	"originChamber" text NOT NULL,
	"title" text NOT NULL,
	"name" text NOT NULL,
	"digest" text NOT NULL,
	"shortDescription" text NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
