import jwt from 'jsonwebtoken';

export const verifyAuthentication = (req,res,next)=>{
    const access_token = req.cookies.access_token;
    if(!access_token) {
        req.user = null;
        res.cookie('is_logged_in', false);
    }else{
        try{
            const decodedCode = jwt.verify(access_token, process.env.JWT_SECRET);
            if(decodedCode) {
                req.user = decodedCode;
                res.cookie('is_logged_in', true);
            }
        }catch(e){
            req.user = null;
            res.cookie('is_logged_in', false);
            res.clearCookie('access_token');
            console.log(e);        

        }
    }
    next();
}