// import load_data from "../model/loadData.js";
import load_data from "../model/loadData(drizzle).js";

const loadController = async (req, res) => {
  try {
    res.redirect('/')
  } catch (error) {
    console.error("Error loading data:", error);
    res.status(500).send("Server error while loading data.");
  }
};

export default loadController;
