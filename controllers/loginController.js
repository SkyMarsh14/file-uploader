import { body, validationResult } from "express-validator";
import capWord from "./../lib/string.js";
import query from "./../db/query.js";
import passport from "passport";
const usernameLength = { min: 3, max: 20 };
const passwordLength = { min: 3, max: 40 };
const lengthErr = (field, length) => {
  return `${capWord(field)} must be between ${length.min} to ${
    length.max
  } letters.`;
};
const validateUsername = [
  body("username")
    .trim()
    .custom(async (username) => {
      const user = await query.user.findByUsername(username);
      if (user) {
        throw new Error("Username already in use.");
      }
      return true;
    }),
];
const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength(usernameLength)
    .withMessage(lengthErr("username", usernameLength)),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength(passwordLength)
    .withMessage(lengthErr("password", passwordLength)),
];
const validateConfirmationPassword = [
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Password confirmation is required.")
    .custom((value, { req }) => {
      if (!value === req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),
];
const loginController = {
  sign_in_get: async (req, res) => {
    res.render("home", {
      page: "login",
      type: "sign-in",
      usernameLength,
      passwordLength,
    });
  },
  sign_in_post: [
    validateUser,
    async (req, res, next) => {
      next();
    },
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/sign-in",
      failureMessage: true,
    }),
  ],
  sign_up_get: async (req, res) => {
    res.render("home", {
      page: "login",
      type: "sign-up",
      usernameLength,
      passwordLength,
    });
  },
  sign_up_post: [
    validateUser,
    validateUsername,
    validateConfirmationPassword,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("home", {
          page: "login",
          type: "sign-up",
          usernameLength,
          passwordLength,
          errors: errors.array(),
        });
      }
      const { username, password } = req.body;
      await query.user.register(username, password);
      res.redirect("/sign-in");
    },
  ],
};

export default loginController;
