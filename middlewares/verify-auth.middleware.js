import jwt from 'jsonwebtoken';
import { get_userId_from_sesssionId } from '../model/getUserId.js';
import { load_user } from '../model/loadUsers.js';
import { createAccessToken } from '../services/auth.services.js';

// export const verifyAuthentication = (req,res,next)=>{
//     const access_token = req.cookies.access_token;
//     if(!access_token) {
//         req.user = null;
//         res.cookie('is_logged_in', false);
//     }else{
//         try{
//             const decodedCode = jwt.verify(access_token, process.env.JWT_SECRET);
//             if(decodedCode) {
//                 req.user = decodedCode;
//                 res.cookie('is_logged_in', true);
//             }
//         }catch(e){
//             req.user = null;
//             res.cookie('is_logged_in', false);
//             res.clearCookie('access_token');
//             console.log(e);        

//         }
//     }
//     next();
// }

export const verifyAuthentication = async(req,res,next)=>{
    const access_token = req.cookies.access_token;
    const refresh_token = req.cookies.refresh_token;
    const baseConfig = {httpOnly: true, secure: true};
    
    if(!access_token && !refresh_token){
        req.user = null;
        res.cookie('is_logged_in', false);
        return next()
    }
    if(!access_token){
        try{
            const decodedRefreshCode = jwt.verify(refresh_token, process.env.JWT_SECRET);
            let sessionId = decodedRefreshCode.sessionId;
            let user_id_row = await get_userId_from_sesssionId(sessionId);
            console.log(user_id_row)
            if(!user_id_row){
                req.user = null;
                console.log("User not present (access_token failed)!")
                res.cookie('is_logged_in', false);
                return next();
            }
            const user = await load_user(user_id_row.user_id);
            if(!user){
                req.user = null;
                res.cookie('is_logged_in', false);
                return next();
            }
            req.user = {...user, sessionId};
            // res.locals.isVerified = user.isVerified;
            // res.locals.profileUrl = user.profilePic;
            res.cookie('isVerified', user.isVerified);
            res.cookie("profileUrl", user.profilePic);
            console.log(user);
            const new_access_token = createAccessToken(req.user);
            res.cookie('access_token', new_access_token, {
                ...baseConfig,
                maxAge: 1*60*1000,
        });
            res.cookie('is_logged_in', true);
            console.log('New Access Token!')
            return next();
        }catch(e){
            console.error('❌ Refresh token invalid:', e);
            req.user = null;
            res.cookie('is_logged_in', false);
            res.clearCookie('refresh_token');
            res.clearCookie('access_token');
        }
        return next();
    }
    res.cookie('is_logged_in', true);

    try{
        const decodedAccessCode = jwt.verify(access_token, process.env.JWT_SECRET);
        if(decodedAccessCode) {
            req.user = decodedAccessCode;
            // console.log(decodedAccessCode);
            res.cookie('is_logged_in', true);
        }
    }catch(e){
        req.user = null;
        res.cookie('is_logged_in', false);
        res.clearCookie('access_token');
        console.log(e);        
    }
    return next();
}