import { db } from "../config/dbClient(drizzle).js";
import { mapping2 } from "../drizzle/schema.js";


const load_data = async()=>{
    try{
        const data = await db.select().from(mapping2);
        return data;
    }catch(e){
        console.log(e.message);
        throw new Error('Error Fetching Data!')
    }

}

export default load_data;