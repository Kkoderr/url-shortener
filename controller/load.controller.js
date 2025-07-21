import load_data from "../model/loadData.js";

const loadController = async (req, res) => {
  try {
    const links = await load_data();
    res.render('index', { links });
  } catch (error) {
    console.error("Error loading data:", error);
    res.status(500).send("Server error while loading data.");
  }
};

export default loadController;
