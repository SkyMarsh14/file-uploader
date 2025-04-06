import passport from "passport";
import LocalStrategy from "passport-local";
import authUser from "../lib/authUser.js";
import query from "../db/query.js";
passport.use(new LocalStrategy(authUser));
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await query.user.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
