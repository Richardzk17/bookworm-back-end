import { Router } from "express"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as booksCtrl from '../controllers/books.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', booksCtrl.index)
router.get('/:bookId', booksCtrl.show)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, booksCtrl.create)
router.post('/:bookId/comments', checkAuth, booksCtrl.createComment)
router.post('/:bookId/reviews', checkAuth, booksCtrl.createReview)
// router.delete('/:bookId/comments/:commentId', checkAuth, booksCtrl.deleteComment)
// router.delete('/:bookId/reviews/:reviewId', checkAuth, booksCtrl.deleteReview)
// router.put('/:bookId', checkAuth, booksCtrl.update)

export { router }