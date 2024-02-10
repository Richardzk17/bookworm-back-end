import { Router } from "express"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import { router } from "./profiles.js"
import * as booksCtrl from '../controllers/book.js'

const router = Router()

/*---------- Public Routes ----------*/

router.use(decodeUserFromToken)
router.get('/', checkAuth, booksCtrl.index)
router.get('/:bookId', checkAuth, booksCtrl.show)
router.post('/', checkAuth, booksCtrl.create)
router.post('/:bookId/comments', checkAuth, booksCtrl.createComment)
router.put('/:bookId', checkAuth, booksCtrl.update)
router.delete('/:bookId', checkAuth, booksCtrl.delete)

router.post('/:bookId/reviews', checkAuth, booksCtrl.createReviews)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

export { router }