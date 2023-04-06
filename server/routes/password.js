const Router = require('express').Router;
const router = new Router();
const { password } = require("../controllers");
const {checkJWTSign} = require('../middlewares/jwtCheck.middleware')

router.route("/:id").get(checkJWTSign, password.getAll)
router.route("/create").put(checkJWTSign, password.create)
router.route("/:id").post(checkJWTSign, password.update)
router.route("/:id").delete(checkJWTSign, password.delete)

module.exports = router;
