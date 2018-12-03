import { Router } from "express"
import verifyToken from "~/middleware/verify-token"
import { login, user, logout, check, signup, verify, resendVE, forgotPass, resetPass } from "./controllers"

const jwt = require("express-jwt")

const router = Router()

router.post("/forgot-password", forgotPass.post)
router.post("/login", login.post)
router.post("/logout", jwt({ secret: process.env.SECRET }), logout.post)

router.post("/signup", signup.post)
router.post("/resend-ve", resendVE.post)
router.post("/reset-password", resetPass.post)

router.get("/user", jwt({ secret: process.env.SECRET }), user.get)

router.post("/user/check", check.post)
router.post("/verify", verifyToken, verify.post)
router.post("/verify-token", verifyToken)

export default router
