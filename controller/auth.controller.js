import { add_user } from "../model/addUser.js";

export const login_post= (req,res)=>{
    // res.setHeader('Set-Cookie', "isLoggedIn=true; path=/;")
    res.cookie('is_logged_in',true);
    res.redirect('/');
}

export const getLoginPage=(req,res)=>{
    res.render('auth/login');
}

export const logout = (req,res)=>{
    res.cookie('is_logged_in',false);
    res.redirect("/");
}

export const getRegistrationPage=(req,res)=>{
    res.render('auth/registration', {status:'', msg:""});
}

export const register = async(req,res)=>{
    try{
        const registration_data = req.body;
        const status_info = await add_user(registration_data);
        res.render("auth/registration",{status: status_info.status, msg:status_info.msg});
    }catch(e){
        console.log(e);
        res.send(500,e);
    }
}