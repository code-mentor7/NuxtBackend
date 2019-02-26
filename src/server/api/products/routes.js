import { Router } from "express"
import jwt from "express-jwt"
import multer from "multer"

import controllers from "./controllers"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/uploads/")
  }
})
const router = Router()

let upload = multer({ storage }).fields([
  { name: "other_image_ids", maxCount: 6 },
  { name: "primary_image_id", maxCount: 1 },
  { name: "travel_insurance_file_id", maxCount: 1 }
])

router.use(jwt({ secret: process.env.SECRET }))

router.route("/")
  .get(controllers.getAll)
  .post(upload, controllers.createOne)

router.route("/edit/:id")
  .get(controllers.findById)
  .put(upload, controllers.updateOneById)

router.route("/slug/:slug")
  .get(controllers.findByQuery)

router.route("/count")
  .get(controllers.getAllCount)

export default router
