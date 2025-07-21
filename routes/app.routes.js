import { Router } from "express";
import shorten_controller from "../controller/shorten.controller.js";
import load_controller from "../controller/load.controller.js";
import { delete_controller } from "../controller/delete.controller.js";

const router = Router();

router.post('/shorten', shorten_controller);
router.get('/load', load_controller);
router.post("/delete/:short_code", delete_controller);
export default router;