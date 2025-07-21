import { Router } from "express";
import shorten_controller from "../controller/shorten.controller.js";
import load_controller from "../controller/load.controller.js";
import load_data from "../model/loadData.js";
import { redirect_controller } from "../controller/redirect.controller.js";
import { delete_controller } from "../controller/delete.controller.js";

const router = Router();

router.post('/shorten', shorten_controller);
router.get('/load', load_controller);
router.post("/delete/:short_code", delete_controller);
router.get('/login',(req, res) => {
    res.render('auth/login')
})
router.get('/registration',(req, res) => {
    res.render('auth/registration')
})
router.get('/',async(req,res)=>{
    const data = await load_data();
    res.render('index', {links:data})
});
router.get('/:shortCode',redirect_controller);
export default router;