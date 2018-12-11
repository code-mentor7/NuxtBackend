import { Router } from "express"
import authRoutes from "./auth/routes"
import hotelDataRoutes from "./hotelData/routes"
import landingPageRoutes from "./landingPage/routes"
import merchantUserRoutes from "./merchantUsers/routes"
import productsRoutes from "./products/routes"
import merchantRolesRoutes from "./merchantRoles/routes"
import siteIdentityRoutes from "./siteIdentity/routes"
import transactionsRoutes from "./transactions/routes"
// import listEndpoints from "express-list-endpoints"
// import authenticate from '~/middleware/authenticate'
import { handleServerErrors } from "express-server-error"

const router = Router()

router.use("/", handleServerErrors())
router.use("/auth", authRoutes)
router.use("/users", merchantUserRoutes)
router.use("/hotelData", hotelDataRoutes)
router.use("/landing-page", landingPageRoutes)
router.use("/products", productsRoutes)
router.use("/roles", merchantRolesRoutes)
router.use("/site-identity", siteIdentityRoutes)
router.use("/transactions", transactionsRoutes)

// router.get("/", (req, res) => {
//   res.json(listEndpoints(router))
// })

export default router
