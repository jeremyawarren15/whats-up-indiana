CREATE TABLE IF NOT EXISTS "bill_summaries" (
	"id" serial PRIMARY KEY NOT NULL,
	"bill_id" serial NOT NULL,
	"content" text NOT NULL,
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bills" (
	"id" serial PRIMARY KEY NOT NULL,
	"base_name" text NOT NULL,
	"origin_chamber" text NOT NULL,
	"title" text NOT NULL,
	"name" text NOT NULL,
	"digest" text NOT NULL,
	"short_description" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bill_summaries" ADD CONSTRAINT "bill_summaries_bill_id_bills_id_fk" FOREIGN KEY ("bill_id") REFERENCES "public"."bills"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
