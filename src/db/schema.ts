import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  text,
} from "drizzle-orm/pg-core";

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

export const c2Notes = pgTable("c2Notes", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 30 }).notNull(),
  text: varchar("text", { length: 250 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const c2Users = pgTable("c2Users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").notNull().unique(),
});

export const c2Posts = pgTable("c2Posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => c2Users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertC2Profiles = typeof c2Profiles.$inferInsert;
export type SelectC2Profiles = typeof c2Profiles.$inferSelect;

export type InsertC2Notes = typeof c2Notes.$inferInsert;
export type SelectC2Notes = typeof c2Notes.$inferSelect;

export type InsertC2Users = typeof c2Users.$inferInsert;
export type SelectC2Users = typeof c2Users.$inferSelect;

export type InsertC2Posts = typeof c2Posts.$inferInsert;
export type SelectC2Posts = typeof c2Posts.$inferSelect;