import { add_user } from "../model/addUser.js";
import { validate_login } from "../model/validateLogin.js";
import jwt from 'jsonwebtoken';
import { registerUserSchema } from "../validation/auth-schema.js";

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
    try {
        const { email, password } = req.body;
        let isValid = await validate_login(email, password);
        if (isValid[0]) {
            let jwt_token = generate_token(isValid[2]);
            res.cookie('access_token', jwt_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            res.cookie('is_logged_in', true);
            return res.redirect('/');
        } else {
            req.flash('status', 'failure');
            req.flash('error_msg', isValid[1]);
            return res.redirect('/login');
        }
    } catch (e) {
        console.error(e);
        req.flash('status', 'failure');
        req.flash('error_msg', 'An unexpected error occurred');
        return res.redirect('/login');
    }
}

export const getLoginPage=(req,res)=>{
    const status = req.flash('status')[0];
    const msg = req.flash('error_msg')[0];
    if(status === 'failure'){
        return res.render('auth/login',{status, msg});
    }else{
        return res.render('auth/login',{status:'',msg:''});
    }
}

export const logout = (req,res)=>{
    req.session.destroy(err => {
        if(err){
            console.error('Failed to destroy session:', err);
        }
        res.clearCookie('access_token');
        res.cookie('is_logged_in',false);
        res.clearCookie('connect.sid', {path: '/'});
        return res.redirect("/");
    });
}

export const getRegistrationPage=(req,res)=>{
    const status = req.flash('register_status') || [''];
    const msg = req.flash("register_msg") || [""];
    // console.log(status[0],msg[0]);
    return res.render('auth/registration', {status:status[0], msg:msg[0]});
}

export const register = async(req,res)=>{
    try{
        const result =  registerUserSchema.safeParse(req.body);
        if(!result.success){
            throw new Error(result.error.issues[0]?.message || 'Invalid input!')
        }
        let data = result.data;
        const status_info = await add_user(data);
        req.flash('register_status',status_info.status);
        req.flash("register_msg", status_info.msg);
        return res.redirect('/registration');
    }catch(e){
        console.log(e);
        req.flash('register_status','failure');
        req.flash("register_msg", e.message || 'Registration failed!');
        return res.redirect('/registration');
    }
}