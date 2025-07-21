import { getClient } from "../config/dbClient.js";

export const deleteLink = async(shortCode)=>{
    try{
        const client = await getClient();
        await client.execute('delete from mapping where shortCode = ?',[shortCode]);
        return ;
    }catch(e){
        console.log(e);
        throw e;
    }
}