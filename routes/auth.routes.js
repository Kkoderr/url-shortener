import { Router } from "express";
import { home_redirect } from "../controller/redirect.controller.js";

const auth_router = Router()

auth_router.get('/login',(req, res) => {
    res.render('auth/login')
})
auth_router.post('/login', home_redirect)
auth_router.get('/registration',(req, res) => {
    res.render('auth/registration')
})

export default auth_router;