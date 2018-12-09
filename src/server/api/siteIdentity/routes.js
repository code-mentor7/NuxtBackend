import { Router } from "express"
import jwt from "express-jwt"
import multer from "multer"

import controllers from "./controllers"

let upload = multer({
  limits: {
    fileSize: 1 * 1024 * 1024 // 1MB
  }
})

const router = Router()
router.use(jwt({ secret: process.env.SECRET }))

router.get("/", controllers.getAll)

router.put("/:id", upload.fields([
  { name: "footer_logo_id", maxCount: 1 },
  { name: "nav_logo_id", maxCount: 1 }
]), controllers.updateOneById)

export default router
