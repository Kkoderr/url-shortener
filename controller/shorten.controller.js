// import append_data from "../model/appendData.js";
import { append_data } from "../model/appendData(drizzle).js";

const shorten_controller = async(req, res)=>{
    let data = req.body;
    data.shortCode = data.shortCode.replace(' ', '_');
    try{
        await append_data(data);
        res.status(200).send('Link Shortened!');
    }catch(e){
        res.status(500).send(e.message);
    }
}

export default shorten_controller;