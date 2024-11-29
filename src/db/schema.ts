import { pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const bills = pgTable("bills", {
  id: serial().primaryKey(),
  baseName: text().notNull(),
  originChamber: text().notNull(), // "house" or "senate"
  title: text().notNull(),
  name: text().notNull(), // e.g., "HB1001.07.ENRS"
  digest: text().notNull(),
  shortDescription: text().notNull(),
  summary: text().notNull().default(""),
  createdAt: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Types for TypeScript
export type Bill = typeof bills.$inferSelect;
