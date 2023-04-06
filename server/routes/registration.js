const Router = require('express').Router;
const router = new Router();
const { registration } = require("../controllers");
const {checkJWTSign} = require('../middlewares/jwtCheck.middleware')

router.route("/").get(checkJWTSign, registration.getAll)
router.route("/create").put(checkJWTSign, registration.create)

router.route("/:id").delete(registration.delete)

module.exports = router;
