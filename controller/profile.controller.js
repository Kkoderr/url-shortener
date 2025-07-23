import load_data from "../model/loadData(drizzle).js";

export const get_profile_page = async(req,res)=>{
    console.log('Triggered!!')
    if(!req.cookies.is_logged_in){
        return res.redirect('/');
    }
    const user = req.user;
    const links = await load_data();
    const is_logged_in = req.cookies?.is_logged_in === 'true';
    const email = req.user?.email;
    res.render('profile/myPage',{user, links, email, is_logged_in})
}