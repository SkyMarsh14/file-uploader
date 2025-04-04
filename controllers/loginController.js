import { body, validationResult } from "express-validator";
import capWord from "./../lib/string.js";
const usernameLength = { min: 3, max: 20 };
const passwordLength = { min: 3, max: 40 };
const lengthErr = (field, length) => {
  return `${capWord(field)} must be between ${length.min} to ${
    length.max
  } letters.`;
};
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
      if (value === req.body.password) true;
      else {
        throw new Error("Passwords do not match.");
      }
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
    async (req, res) => {
      const error = validationResult(req);
      res.redirect("/sign-in");
    },
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
    validateConfirmationPassword,
    async (req, res) => {
      validationResult(req);
      res.redirect("/sign-up");
    },
  ],
};

export default loginController;
