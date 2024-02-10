import { Router } from "express"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as booksCtrl from '../controllers/books.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', checkAuth, booksCtrl.index)
router.get('/:bookId', checkAuth, booksCtrl.show)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, booksCtrl.create)
router.put('/:bookId', checkAuth, booksCtrl.update)
router.post('/:bookId/comments', checkAuth, booksCtrl.createComment)
router.post('/:bookId/reviews', checkAuth, booksCtrl.createReview)
router.delete('/:bookId/comments/:commentId', checkAuth, blogsCtrl.deleteComment)
router.delete('/:bookId/reviews/:reviewId', checkAuth, blogsCtrl.deleteReview)

export { router }