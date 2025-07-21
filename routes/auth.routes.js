import { Router } from "express";

const auth_router = Router()

auth_router.get('/login',(req, res) => {
    res.render('auth/login')
})
auth_router.get('/registration',(req, res) => {
    res.render('auth/registration')
})

export default auth_router;