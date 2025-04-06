const indexController = {
  get_main: async (req, res) => {
    res.render("home", { page: "main", user: req.user });
  },
};

export default indexController;
