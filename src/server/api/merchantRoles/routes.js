import { Router } from "express"
import jwt from "express-jwt"

import controllers from "./controllers"

const router = Router()
router.use(jwt({ secret: process.env.SECRET }))

router.get("/", controllers.getAll)

export default router
