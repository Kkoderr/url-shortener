import { db } from "../config/dbClient(drizzle).js"
import { sessionTable } from "../drizzle/schema.js"
import { eq } from "drizzle-orm";

export const get_userId_from_sesssionId = async(sessionId)=>{
    try{
        const data = await db.select().from(sessionTable).where(eq(sessionTable.id, sessionId));
        // console.log(data[0]);
        return data[0];
    }catch(e){
        console.log(e);
        throw new Error(e.message);
    }
}