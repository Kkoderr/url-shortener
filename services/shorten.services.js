// import append_data from "../model/appendData.js";
import { append_data } from "../model/appendData(drizzle).js";

const shorten_controller = async(req, res)=>{
    let data = req.body;
    data.shortCode = data.shortCode.replace(' ', '_');
    try{
        if(req.cookies?.is_logged_in !== true){
            console.log('Login required!');
            return res.status(401).send('Login Required!');
        }
        await append_data(data);
        return res.status(200).send('Link Shortened!');
    }catch(e){
        if(e.message === 'ShortCode already present!')
            return res.status(402).send(e.message);
        return res.status(500).send(e.message);
    }
}

export default shorten_controller;