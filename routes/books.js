import { Router } from "express"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as booksCtrl from '../controllers/books.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', booksCtrl.index)
router.get('/:bookId', booksCtrl.show)
router.get('/OLId/:OLId', booksCtrl.showByOLId)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, booksCtrl.create)
router.post('/:bookId/comments', checkAuth, booksCtrl.createComment)
router.post('/:bookId/reviews', checkAuth, booksCtrl.createReview)
router.put('/:bookId/comments/:commentId', checkAuth, booksCtrl.updateComment)
router.put('/:bookId/reviews/:reviewId', checkAuth, booksCtrl.updateReview)
router.delete('/:bookId/comments/:commentId', checkAuth, booksCtrl.deleteComment)
router.delete('/:bookId/reviews/:reviewId', checkAuth, booksCtrl.deleteReview)

export { router }