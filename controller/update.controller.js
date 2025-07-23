import load_data from "../model/loadData(drizzle).js";
import { update_link } from "../model/updateLink.js";

export const update_links_controller = async (req,res)=>{
    const id = req.params.id;
    const url = req.body.url;
    await update_link({id,url});
    const user = req.user;
    const links = await load_data();
    res.redirect('/my_page');
}