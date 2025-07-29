// import { getLink } from "../model/getLink.js";
import { getLink } from "../model/getLink(drizzle).js";
// import load_data from "../model/loadData.js";
import load_data from "../model/loadData(drizzle).js";

export const redirect_controller = async(req, res)=>{
    let url = req.url.slice(1);
    const data = await getLink(url);
    console.log('Redirecting to the shortCode url!')
    if(data[0]){
        console.log('Redirecting to ',data[0].url);
        res.redirect(data[0].url);
    }else{
        console.log('Failed to Redirect!');
        res.redirect('/');
    }
}

export const home_redirect = async(req, res)=>{
    const is_logged_in = req.cookies?.is_logged_in === 'true';
    const email = req.user?.email || "";
    // console.log(is_logged_in);
    // console.log(req.user)
    if(is_logged_in !== true){
        res.render('index',{links:[], is_logged_in, email});
    }else{
        const data = await load_data(req.user?.id);
        res.render('index', {links:data, is_logged_in, email});
    }
}

