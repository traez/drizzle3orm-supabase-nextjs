import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const c2Profiles = pgTable("c2Profiles", {
  id: serial("id").primaryKey(),
  firstname: varchar("firstname", { length: 30 }).notNull(),
  lastname: varchar("lastname", { length: 30 }).notNull(),
  username: varchar("username", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertC2Profiles = typeof c2Profiles.$inferInsert;
export type SelectC2Profiles = typeof c2Profiles.$inferSelect;
