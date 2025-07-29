import jwt from 'jsonwebtoken';

import { add_user } from "../model/addUser.js";
import { registerUserSchema } from "../validation/auth-schema.js";
import { validate_login } from "../model/validateLogin.js";
import { sessionTable } from '../drizzle/schema.js';
import { db } from '../config/dbClient(drizzle).js';
import { eq } from 'drizzle-orm';

export const generate_token = ({id, name, email})=>{
    return  jwt.sign(
        {id, name, email},
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        });
};

const createSession = async(userId, {ip, userAgent})=>{
    const [session] = await db.insert(sessionTable).values({
        user_id: userId,
        ip,
        userAgent
    }).$returningId();
    return session;
};

export const createAccessToken = ( {id, name, email, sessionId})=>{
    return jwt.sign({id,name,email,sessionId},
        process.env.JWT_SECRET,
        {
            expiresIn: "1m",
        }
    )
};

const createRefreshToken = (sessionId)=>{
    return jwt.sign({sessionId},
        process.env.JWT_SECRET,
        {
            expiresIn: "1hr",
        }
    )
};

const login = async(req, res, {email, password})=>{
    try {
        let isValid = await validate_login(email, password);
        if (isValid[0]) {
            // let jwt_token = generate_token(isValid[2]);
            console.log(isValid[2]);
            let user = isValid[2];
            
            const session = await createSession(user.id, {
                ip: req.clientIp,
                userAgent: req.headers['user-agent']
            });

            const access_token = createAccessToken({
                id: user.id,
                name: user.name,
                email: user.email,
            });
            
            const refresh_token = createRefreshToken(session.id);
            console.log(user);

            // res.cookie('access_token', jwt_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

            const baseConfig = {httpOnly: true, secure: true};

            res.cookie('access_token', access_token, {
                ...baseConfig,
                maxAge: 1*60*1000,
            });
            res.cookie('refresh_token', refresh_token, {
                ...baseConfig,
                maxAge: 60 * 60 * 1000
            });
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

export const login_post= async(req,res)=>{
    // res.setHeader('Set-Cookie', "isLoggedIn=true; path=/;")
    try{
        const { email, password } = req.body;
        await login(req, res, {email, password});
    }catch(e){
        console.error(e);
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

const clearUserSession = async(sessionId)=>{
    await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export const logout = async(req,res)=>{
    req.session.destroy(async err => {
        if(err){
            console.error('Failed to destroy session:', err);
        }
        const refresh_token = req.cookies.refresh_token;
        const decodedRefreshCode = jwt.verify(refresh_token, process.env.JWT_SECRET);
        let sessionId = decodedRefreshCode.sessionId;
        await clearUserSession(sessionId);
        res.clearCookie('profileUrl');
        res.clearCookie('isVerified');
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
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
        await login(req,res,{'email':data.email, 'password':data.password});
        return ;
    }catch(e){
        console.log(e);
        req.flash('register_status','failure');
        req.flash("register_msg", e.message || 'Registration failed!');
        return res.redirect('/registration');
    }
}

const get_verify_email_page = async(req, res)=>{
    return res.render('auth/verifyEmail',{email: req.user?.email||'', successMessage:"", errorMessage:""});
}

export const email_verify = async(req,res)=>{
    await get_verify_email_page(req,res);
    return 
}