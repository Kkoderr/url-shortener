import { Router } from "express";
import { getLoginPage, getRegistrationPage, login_post, logout, register } from "../controller/auth.controller.js";

const auth_router = Router()

auth_router.get('/login', getLoginPage);
auth_router.post('/login', login_post);
auth_router.get('/logout', logout);
auth_router.get('/registration',getRegistrationPage);
auth_router.post('/register', register);

export default auth_router;