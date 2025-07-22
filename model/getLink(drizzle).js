import { eq } from "drizzle-orm";
import { db } from "../config/dbClient(drizzle).js";
import { mapping2 } from "../drizzle/schema.js";

export const getLink= async(shortCode)=>{
    try{
        const data = await db.select().from(mapping2).where(eq(mapping2.shortCode, shortCode))
        return data;
    }catch(e){
        console.log(e.message);
    }
}