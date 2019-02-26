import { Router } from "express"
// import authenticate from '~/middleware/authenticate'
import controllers from "./controllers"
import jwt from "express-jwt"

// var multer = require("multer")
// var upload = multer({
//   limits: {
//     fileSize: 1 * 1024 * 1024 // 1MB
//   }
// })

const router = Router()
router.use(jwt({ secret: process.env.SECRET }))

router.put("/:id", controllers.updateOneById)
// router.put("/:id", upload.single("avatar"), controllers.updateOneById)
// router.route("/:id", upload.single("avatar"))
//   .put(controllers.updateOneById)

// router.put("/", jwt({ secret: process.env.SECRET }), controllers.updateOne)

export default router
