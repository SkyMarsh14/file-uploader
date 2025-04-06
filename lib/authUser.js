import query from "../db/query.js";
async function authUser(username, password, done) {
  try {
    const user = await query.user.findByUsername(username);
    if (!user) {
      return done(null, false, { message: "User not found." });
    }
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect Password." });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}
export default authUser;
