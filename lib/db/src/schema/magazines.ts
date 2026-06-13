import { pgTable, serial, text, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const magazinesTable = pgTable("magazines", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  edition: text("edition").notNull(),
  publishedAt: date("published_at", { mode: "string" }).notNull(),
  coverImageUrl: text("cover_image_url").notNull(),
  pdfUrl: text("pdf_url"),
  description: text("description"),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertMagazineSchema = createInsertSchema(magazinesTable).omit({ id: true, createdAt: true });
export type InsertMagazine = z.infer<typeof insertMagazineSchema>;
export type Magazine = typeof magazinesTable.$inferSelect;
