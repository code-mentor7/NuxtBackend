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
  { name: "main_carousel#0", maxCount: 1 },
  { name: "main_carousel#1", maxCount: 1 },
  { name: "main_carousel#2", maxCount: 1 },
  { name: "main_carousel#3", maxCount: 1 },
  { name: "hotel_destination_1#0", maxCount: 1 },
  { name: "hotel_destination_1#1", maxCount: 1 },
  { name: "hotel_destination_1#2", maxCount: 1 },
  { name: "hotel_destination_1#3", maxCount: 1 },
  { name: "hotel_destination_1#4", maxCount: 1 },
  { name: "hotel_destination_1#5", maxCount: 1 },
  { name: "hotel_destination_2#0", maxCount: 1 },
  { name: "hotel_destination_2#1", maxCount: 1 },
  { name: "hotel_destination_2#2", maxCount: 1 },
  { name: "hotel_destination_2#3", maxCount: 1 },
  { name: "hotel_destination_2#4", maxCount: 1 },
  { name: "hotel_destination_2#5", maxCount: 1 }
])

const router = Router()
router.use(jwt({ secret: process.env.SECRET }))

router.get("/", controllers.getAll)

router.put("/:id", upload, controllers.updateOneById)

export default router
