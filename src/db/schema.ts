import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

export const bills = pgTable("bills", {
  id: serial("id").primaryKey(),
  baseName: text("base_name").notNull(),
  originChamber: text("origin_chamber").notNull(), // "house" or "senate"
  title: text("title").notNull(),
  name: text("name").notNull(), // e.g., "HB1001.07.ENRS"
  digest: text("digest").notNull(),
  shortDescription: text("short_description").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const billSummaries = pgTable("bill_summaries", {
  id: serial("id").primaryKey(),
  billId: serial("bill_id")
    .notNull()
    .references(() => bills.id),
  content: text("content").notNull(),
  type: text("type").notNull(), // e.g., "summary", "analysis", "highlight"
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Relations configuration
export const billRelations = relations(bills, ({ many }) => ({
  summaries: many(billSummaries),
}));

export const billSummariesRelations = relations(billSummaries, ({ one }) => ({
  bill: one(bills, {
    fields: [billSummaries.billId],
    references: [bills.id],
  }),
}));

// Types for TypeScript
export type Bill = typeof bills.$inferSelect;
export type NewBill = typeof bills.$inferInsert;
export type BillSummary = typeof billSummaries.$inferSelect;
export type NewBillSummary = typeof billSummaries.$inferInsert;
