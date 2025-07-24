import { and, eq } from "drizzle-orm";
import { db } from "../config/dbClient(drizzle).js"
import { mapping2 } from "../drizzle/schema.js"

export const update_link = async({id, url, shortCode})=>{
    try{
        await db.update(mapping2).set({url: url, shortCode: shortCode}).where(eq(mapping2.id, id));
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}