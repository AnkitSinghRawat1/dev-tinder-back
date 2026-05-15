const adminAuth = (req, res, next) => {
  // logic of checking if the requested user is authorized
  const token = "tkz";
  const isAdminAUthorized = token === "tkz";
    console.log('auth middleware')
  if (!isAdminAUthorized) {
    res.status(401).send("Unauthorized Request");
  } else {
    next();
  }
} 

const userAuth = (req, res, next) => {
  // logic of checking if the requested user is authorized
  const token = "tkz";
  const isAdminAUthorized = token === "tkz";
    console.log('user auth middleware')
  if (!isAdminAUthorized) {
    res.status(401).send("Unauthorized user");
  } else {
    next();
  }
} 

module.exports = {adminAuth, userAuth}