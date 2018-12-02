import { Router } from "express"
// import authenticate from '~/middleware/authenticate'
import controllers from "./controllers"

const router = Router()

router.param("id", controllers.findByParam)

router.get("/", controllers.getAll)
router.route("/:id")
  .get(controllers.getOne)

export default router
