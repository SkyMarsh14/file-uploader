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
const loginController = {
  sign_in_get: async (req, res) => {
    res.render("home", {
      page: "login",
      type: "sign-in",
      usernameLength,
      passwordLength,
    });
  },
  sign_in_post: async (req, res) => {
    res.redirect("/sign-in");
  },
  sign_up_get: async (req, res) => {
    res.render("home", {
      page: "login",
      type: "sign-up",
      usernameLength,
      passwordLength,
    });
  },
  sign_up_post: async (req, res) => {},
};

export default loginController;
