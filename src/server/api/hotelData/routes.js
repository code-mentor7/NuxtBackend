import { Router } from "express"
import jwt from "express-jwt"
import multer from "multer"

import controllers from "./controllers"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/uploads/")
  }
})

let upload = multer({ storage }).fields([
  { name: "hotel_file", maxCount: 1 }
])

const router = Router()
router.use(jwt({ secret: process.env.SECRET }))

router.route("/")
  .post(controllers.textSearch)

router.route("/count")
  .post(controllers.textSearchCount)

router.route("/upload")
  .post(upload, controllers.bulkUpload)

export default router
