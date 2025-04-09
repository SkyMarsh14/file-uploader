const indexController = {
  get_main: async (req, res) => {
    res.redirect(`/upload/${req.user.id}`);
  },
};

export default indexController;
