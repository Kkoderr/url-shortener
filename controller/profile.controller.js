import load_data from "../model/loadData(drizzle).js";

export const get_profile_page = async(req,res)=>{
    console.log('Triggered!!')
    if(!req.cookies.is_logged_in){
        return res.redirect('/');
    }
    const user = req.user;
    if(!user){
        req.flash('status', 'failure');
        req.flash('error_msg', "Login to view profile!!");
        return res.redirect("/login");
    }
    const links = await load_data(user.id);
    const is_logged_in = req.cookies?.is_logged_in;
    const email = req.user?.email;
    const isVerified = req.cookies?.isVerified==='true';
    const profileUrl = req.cookies?.profileUrl;
    console.log(isVerified)
    res.render('profile/myPage',{user, links, email, is_logged_in, isVerified, profileUrl});
}