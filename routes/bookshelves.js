import { Router } from "express"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as bookshelvesCtrl from '../controllers/bookshelves.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, booksCtrl.create)
router.get('/:bookshelfId', checkAuth, bookshelvesCtrl.show) 
router.put('/:bookshelfId/:bookId', checkAuth, bookshelvesCtrl.update)
router.delete('/:bookshelfId/:bookId', checkAuth, bookshelvesCtrl.delete)

export { router }
