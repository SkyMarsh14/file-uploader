import query from "./../db/query.js";
async function authenticateUser(username, password) {
  const user = await query.user.findByUsername(username);
  if (!user) {
    throw new Error("User not found.");
  }
  if (user.password !== password) {
    throw new Error("Incorrect Password");
  }
  return true;
}
export default authenticateUser;
