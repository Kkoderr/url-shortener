import { db } from "../config/dbClient(drizzle).js";
import { users } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

export const load_user = async(user_id)=>{
    try{
        const [user] = await db.select().from(users).where(eq(users.id, user_id));
        console.log(user);
        return user;
    }catch(e){
        console.log(e);
        throw new Error(e.message);
    }
}