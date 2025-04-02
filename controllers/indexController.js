const indexController = {
  sign_up_get: async (req, res) => {
    res.render("home", { page: "sign-up" });
  },
};

module.exports = indexController;
