import { mysqlTable, varchar, text, int, timestamp } from "drizzle-orm/mysql-core";

export const mapping2 = mysqlTable('mapping2',{
    id: int('id').notNull().primaryKey(),
    shortCode: varchar('shortCode',{length:255}).notNull(),
    url: text('url').notNull()
});

export const users = mysqlTable("users", {
    id: int("id").notNull().primaryKey(),
    name: varchar("name",{length:255}).notNull(),
    email: text("email").notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().onUpdateNow()
});