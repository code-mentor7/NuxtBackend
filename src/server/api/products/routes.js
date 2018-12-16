import { Router } from "express"
import jwt from "express-jwt"
import controllers from "./controllers"

const router = Router()

// router.param("id", controllers.findByParam)

router.use(jwt({ secret: process.env.SECRET }))

router.route("/")
  .get(controllers.getAll)
  .post(controllers.createOne)

router.route("/edit/:id")
  .get(controllers.findById)
  .put(controllers.updateOneById)

router.route("/slug/:slug")
  .get(controllers.findByQuery)

router.route("/count")
  .get(controllers.getAllCount)

export default router
