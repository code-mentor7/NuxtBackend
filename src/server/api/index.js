import { Router } from "express"
import authRoutes from "./auth/routes"
// import customerRoutes from "./customers/routes"
import hotelRoutes from "./hotels/routes"
import landingPageRoutes from "./landingPage/routes"
import productsRoutes from "./products/routes"
import siteIdentityRoutes from "./siteIdentity/routes"
import transactionsRoutes from "./transactions/routes"
// import listEndpoints from "express-list-endpoints"
// import authenticate from '~/middleware/authenticate'
import { handleServerErrors } from "express-server-error"

const router = Router()

router.use("/", handleServerErrors())
router.use("/auth", authRoutes)
// router.use("/customers", customerRoutes)
router.use("/hotels", hotelRoutes)
router.use("/landing-page", landingPageRoutes)
router.use("/products", productsRoutes)
router.use("/site-identity", siteIdentityRoutes)
router.use("/transactions", transactionsRoutes)

// router.get("/", (req, res) => {
//   res.json(listEndpoints(router))
// })

export default router
