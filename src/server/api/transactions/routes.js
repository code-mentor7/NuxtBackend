import { Router } from "express"
// import authenticate from '~/middleware/authenticate'
import controllers from "./controllers"

const router = Router()

router.route("/customer/:custid")
  .post(controllers.findByQuery)

export default router
