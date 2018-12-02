import { Router } from "express"
import authRoutes from "./auth/routes"
// import adminRoutes from './admin/routes'
import listEndpoints from "express-list-endpoints"
// import authenticate from '~/middleware/authenticate'
import { handleServerErrors } from "express-server-error"

const router = Router()

router.use("/", handleServerErrors())
router.use("/auth", authRoutes)
// router.use('/admin', authenticate(), adminRoutes)

router.get("/", (req, res) => {
  res.json(listEndpoints(router))
})

export default router
