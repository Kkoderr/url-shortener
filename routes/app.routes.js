import { Router } from "express";
import shorten_controller from "../services/shorten.services.js";
import load_controller from "../controller/load.controller.js";
import { delete_controller } from "../controller/delete.controller.js";
import {update_links_controller } from "../controller/update.controller.js";

const router = Router();

router.post('/shorten', shorten_controller);
router.get('/load', load_controller);
router.post("/delete/:short_code", delete_controller);
router.post('/update-link/:id', update_links_controller);
export default router;