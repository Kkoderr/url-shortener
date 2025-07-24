import { relations } from "drizzle-orm";
import { mysqlTable, varchar, text, int, timestamp } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: int("id").notNull().primaryKey().autoincrement(),
    name: varchar("name",{length:255}).notNull(),
    email: text("email").notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().onUpdateNow()
});

export const mapping2 = mysqlTable('mapping2',{
    id: int('id').notNull().primaryKey().autoincrement(),
    shortCode: varchar('shortCode',{length:255}).notNull(),
    url: text('url').notNull(),
    userId: int("userId").notNull().references(()=> users.id,{
        onDelete: 'cascade',
        onUpdate: 'cascade'
    })
});


export const userRelation = relations(
    users, 
    ({many})=>({
        mapping2: many(mapping2)
    })
);

export const mappingRelation = relations(
    mapping2,
    ({one})=>({
        users: one(users, {
            fields: [mapping2.userId],
            references: [users.id]
        })
    })
);



