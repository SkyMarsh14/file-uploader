const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send("Login to access this page.");
};
export default isAuth;
