import { Router } from "express";
import { getLoginPage, login_post, logout } from "../controller/auth.controller.js";

const auth_router = Router()

auth_router.get('/login', getLoginPage)
auth_router.post('/login', login_post)
auth_router.get('/logout', logout)
auth_router.get('/registration',(req, res) => {
    res.render('auth/registration')
})

export default auth_router;