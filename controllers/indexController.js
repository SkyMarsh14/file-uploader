import query from "../db/query.js";
const indexController = {
  get_main: async (req, res) => {
    const rootId = await query.user.findRootFolder(req.user.id);
    res.redirect(`/upload/${rootId}`);
  },
};

export default indexController;
