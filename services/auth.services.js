import { add_user } from "../model/addUser.js";
import { validate_login } from "../model/validateLogin.js";

export const login_post= async(req,res)=>{
    // res.setHeader('Set-Cookie', "isLoggedIn=true; path=/;")
    let isValid = await validate_login(req.body.username, req.body.password);
    if(isValid[0]){
        res.cookie('is_logged_in',true);
        res.redirect('/');
    }
    else{
        req.session.logInStatus = {status:'failure',msg:isValid[1]};
        res.redirect('/login');
    }
}

export const getLoginPage=(req,res)=>{
    const logInStatus = req.session.logInStatus || {status:'',msg:''};
    req.session.logInStatus = null;
    res.render('auth/login',logInStatus);
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
        res.status(500).send(e.message);
    }
}