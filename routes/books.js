import { Router } from "express"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import { router } from "./profiles.js"

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

export { router }