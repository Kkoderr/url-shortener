import { Router } from "express";
import { redirect_controller } from "../controller/redirect.controller.js";

const redirect_router = Router()

redirect_router.get('/:shortCode',redirect_controller);

export default redirect_router;