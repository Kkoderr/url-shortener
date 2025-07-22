import { eq } from "drizzle-orm";
import { db } from "../config/dbClient(drizzle).js";
import { mapping2 } from "../drizzle/schema.js";

export const deleteLink = async(shortCode)=>{
    try{
        await db.delete(mapping2).where(eq(mapping2.shortCode, shortCode));
        return ;
    }catch(e){
        console.log(e);
        throw e;
    }
}