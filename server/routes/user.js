const Router = require('express').Router;
const router = new Router();
const { user } = require("../controllers");

router.route("/registration/:id").post(user.registration)
// router.route("/registrationFirst").post(user.FirstRegistration)

router.route("/login").post(user.login)
router.route("/logout").post(user.logout)
router.route("/refresh").post(user.refreshToken)

//admin
router.route("/").get(user.getAll)

module.exports = router;
