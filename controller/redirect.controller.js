import { getLink } from "../model/getLink.js";
import load_data from "../model/loadData.js";

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

export const home_redirect = async(req, res)=>{
    const data = await load_data();
    const is_logged_in = req.cookies?.is_logged_in === 'true';
    res.render('index', {links:data, is_logged_in:is_logged_in})
}

