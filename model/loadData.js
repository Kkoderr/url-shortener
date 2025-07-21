import { getClient } from "../config/dbClient.js";

const load_data = async()=>{
    const client = await getClient();
    try{
        const [data,schema] = await client.execute('select * from mapping;')
        return data;
    }catch(e){
        console.log(e.message);
        throw new Error('Error Fetching Data!')
    }

}

export default load_data;