import { Router } from "express";
import { email_verify, getLoginPage, getRegistrationPage, login_post, logout, register } from "../services/auth.services.js";

const auth_router = Router()

auth_router.get('/login', getLoginPage);
auth_router.post('/login', login_post);
auth_router.get('/logout', logout);
auth_router.get('/registration',getRegistrationPage);
auth_router.post('/register', register);
auth_router.get('/verify-email', email_verify)

export default auth_router;