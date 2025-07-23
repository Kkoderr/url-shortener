import { Router } from "express";
import { redirect_controller } from "../controller/redirect.controller.js";
import { home_redirect } from "../controller/redirect.controller.js";
import { get_profile_page } from "../controller/profile.controller.js";

const redirect_router = Router()

redirect_router.get('/', home_redirect);
redirect_router.get('/my_page', get_profile_page)
redirect_router.get('/:shortCode',redirect_controller);

export default redirect_router;