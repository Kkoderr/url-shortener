import { add_user } from "../model/addUser.js";
import { validate_login } from "../model/validateLogin.js";
import jwt from 'jsonwebtoken';

export const generate_token = ({id, name, email})=>{
    return  jwt.sign(
        {id, name, email},
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        });
}

export const login_post= async(req,res)=>{
    // res.setHeader('Set-Cookie', "isLoggedIn=true; path=/;")
    let isValid = await validate_login(req.body.email, req.body.password);
    if(isValid[0]){
        let jwt_token = generate_token(isValid[2]);
        res.cookie('access_token',jwt_token);
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
    res.clearCookie('access_token')
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
        res.render('auth/registration',{status:status_info, msg:e});
    }
}