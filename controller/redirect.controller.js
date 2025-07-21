import { getLink } from "../model/getLink.js";

export const redirect_controller = async(req, res)=>{
    let url = req.url.slice(1);
    const data = await getLink(url);
    if(data[0]){
        console.log('Redirecting to ',data[0].url);
        res.redirect(data[0].url);
    }else{
        res.redirect('/')
    }
}