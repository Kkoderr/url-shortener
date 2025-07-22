// import { deleteLink } from "../model/deleteData.js";
import { deleteLink } from "../model/deleteData(drizzle).js";

export const delete_controller = async (req, res) => {
  try {
    // Delete link safely and wait for completion
    await deleteLink(req.params.short_code);

    // Redirect back to home page (or list page)
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).send('Failed to delete link');
  }
};
