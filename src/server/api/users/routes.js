import { Router } from "express"
// import authenticate from '~/middleware/authenticate'
import { index } from "./controllers"

const router = Router()

router.get("/", index.get)

// router.get('/check', check.get)

// router.post('/sign-in', signIn.post)
// router.post('/sign-out', authenticate(), signOut.post)

// router.route('/:username')
//   .all(authenticate())
//   .get(username.get)
//   .post(username.post)
//   .delete(username.delete)

export default router
