import { eq,and } from "drizzle-orm";
import { db } from "../config/dbClient(drizzle).js";
import { mapping2 } from "../drizzle/schema.js";

export const deleteLink = async(shortCode,id)=>{
    try{
        await db.delete(mapping2).where(and(eq(mapping2.shortCode, shortCode),eq(mapping2.userId, id)));
        return ;
    }catch(e){
        console.log(e);
        throw e;
    }
}