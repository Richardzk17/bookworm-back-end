import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
// this route will also populate the bookshelf data
router.get('/:profileId', checkAuth, profilesCtrl.show)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)
router.put('/:profileId/bookshelf/:bookId', checkAuth, profilesCtrl.addToBookshelf)
router.delete('/:profileId/bookshelf/:bookId', checkAuth, profilesCtrl.deleteFromBookshelf)

export { router }
