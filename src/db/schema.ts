import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const c2Posts = pgTable("c2Posts", {
  id: serial("id").primaryKey(),
  text: varchar("text", { length: 225 }).notNull(),
  imageUrl: text("image_url")
    .notNull()
    .default("https://picsum.photos/300/200"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertC2Post = typeof c2Posts.$inferInsert;
export type SelectC2Post = typeof c2Posts.$inferSelect;
