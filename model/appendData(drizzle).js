import { eq, and } from "drizzle-orm";
import { db } from "../config/dbClient(drizzle).js";
import { mapping2 } from "../drizzle/schema.js";

export const append_data = async(data, user_id)=>{
    if (!data.shortCode || data.shortCode.trim() === '') {
        throw new Error("ShortCode cannot be empty!");
    }
    try{
        const query1 = await db.select().from(mapping2).where(and(eq(mapping2.shortCode, data.shortCode), eq(mapping2.userId, user_id)));
        if(query1.length > 0){
            throw new Error('ShortCode already present!')
        }
    }catch(e){
        throw new Error('Unexpected validation error!'+ e.message);
    }
    try{
        if(data.shortCode===''){
            throw new Error("Error updating the db!");
        }
        await db.insert(mapping2).values({shortCode: data.shortCode, url: data.url, userId:user_id});
        return true;
    }catch(e){
        throw new Error("Error updating the DB!")
    }
}