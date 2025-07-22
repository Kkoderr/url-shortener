import { eq } from "drizzle-orm";
import { db } from "../config/dbClient(drizzle).js";
import { users } from "../drizzle/schema.js";

export const add_user = async (data) => {
    try {
        const check_if_exists = await db.select().from(users).where(eq(users.email, data.email));
        if (check_if_exists.length > 0) {
            return {msg:'Email already present!', status:'failure'};
        } else {
            await db.insert(users).values({
                name: data.username,
                email: data.email,
                password: data.password
            });
            return {msg:'User Added!', status:'success!'};  // ✅ return success
        }
    } catch (e) {
        console.error('add_user error:', e);
        return {msg:"User not added!", status:"failure"};
    }
};
