import query from "../db/query.js";
import bcrypt from "bcryptjs";
async function authUser(username, password, done) {
  try {
    const user = await query.user.findByUsername(username);
    if (!user) {
      return done(null, false, { message: "User not found." });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect Password." });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}
export default authUser;
