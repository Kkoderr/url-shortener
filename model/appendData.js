import {getClient} from "../config/dbClient.js"

const append_data = async(data)=>{
    const client = await getClient();
    try{
        let [result] = await client.execute(`select * from mapping where shortCode=?`, [data.shortCode]);
        if(result.length != 0){
            throw new Error('ShortCode already present!')
        }
    }catch(e){
        throw new Error('Unexpected validation error!'+ e.message)
    }

    try{
        if(data.shortCode == ""){
            throw new Error('Error updating the DB!')
        }
        await client.execute(`insert into mapping values (?,?)`,[data.shortCode, data.url]);
        return true;
    }catch(e){
        throw new Error("Error updating the DB!")
    }
}

export default append_data;