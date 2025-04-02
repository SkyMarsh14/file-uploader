const indexController = {
  sign_in_get: async (req, res) => {
    res.render("home", { page: "login", type: "sign-in" });
  },
  sign_up_get: async (req, res) => {
    res.render("home", { page: "login", type: "sign-up" });
  },
};

module.exports = indexController;
