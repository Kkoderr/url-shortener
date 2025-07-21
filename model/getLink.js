import { getClient } from "../config/dbClient.js";

export const getLink= async(shortCode)=>{
    const client = await getClient();
    try{
        const [data, schema] = await client.query("select * from mapping where shortCode = ?", [shortCode]);
        return data;
    }catch(e){
        console.log(e.message);
    }
}