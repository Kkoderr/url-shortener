import load_data from "../model/loadData(drizzle).js";
import { update_link } from "../model/updateLink.js";

export const update_links_controller = async (req,res)=>{
    const id = req.params.id;
    const url = req.body.url;
    const shortCode = req.body.shortCode;
    await update_link({id,url,shortCode});
    res.redirect('/my_page');
}