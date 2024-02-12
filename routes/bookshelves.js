import { Router } from "express"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as bookshelvesCtrl from '../controllers/bookshelves.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, bookshelvesCtrl.create)
router.delete('/:bookId', checkAuth, bookshelvesCtrl.delete)

export { router }
