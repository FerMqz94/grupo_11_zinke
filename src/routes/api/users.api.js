const router = require("express").Router()
const {} = require("../../controllers/api/users")
const {userDetail} = require("../../controllers/api/users/index")

//   /user   detalle api 
router.get("users/detail/:id",userDetail)

module.exports = router;