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
    res.render('auth/registration');
}

export const register = (req,res)=>{
    
}