// import load_data from "../model/loadData.js";
import load_data from "../model/loadData(drizzle).js";

const loadController = async (req, res) => {
  try {
    const links = await load_data();
    const is_logged_in = req.cookies?.is_logged_in === 'true';
    res.render('index', {links, is_logged_in:is_logged_in});
  } catch (error) {
    console.error("Error loading data:", error);
    res.status(500).send("Server error while loading data.");
  }
};

export default loadController;
