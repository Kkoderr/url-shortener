import { relations } from "drizzle-orm";
import { mysqlTable, varchar, text, int, timestamp, boolean } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const users = mysqlTable("users", {
    id: int("id").notNull().primaryKey().autoincrement(),
    name: varchar("name",{length:255}).notNull(),
    email: text("email").notNull(),
    password: text('password').notNull(),
    isVerified: boolean('is_verified').default(false),
    profilePic: text('profile_pic').default('/img/default-profile-url.png'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().onUpdateNow()
});

export const sessionTable = mysqlTable('sessions',{
    id: int('id').primaryKey().autoincrement().notNull(),
    user_id: int('user_id').notNull().references(()=>users.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
    }),
    valid: boolean().default(true).notNull(),
    userAgent: text('user_agent'),
    ip: varchar({length:255}),
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

export const emailVerificationTable = mysqlTable('email_verification',{
    id: int('id').notNull().autoincrement().primaryKey(),
    user_id: int('user_id').notNull().references(()=>users.id,{
        onDelete: "cascade",
        onUpdate: 'cascade'
    }),
    token: varchar('token',{length:255}).notNull(),
    expiresAt: timestamp("expires_at").notNull().default(sql`(CURRENT_TIMESTAMP + INTERVAL 1 DAY)`),
})

export const userRelation = relations(
    users, 
    ({many})=>({
        mapping2: many(mapping2),
        sessions: many(sessionTable)
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

export const sessionRelation = relations(
    sessionTable,
    ({one})=>({
        users: one(users, {
            fields: [sessionTable.user_id],
            references: [users.id]
        })
    })
);

export const emailVerificationTableRelation = relations(
    emailVerificationTable,
    ({one})=>({
        users: one(users, {
            fields:[emailVerificationTable.user_id],
            references:[users.id]
        })
    })
);