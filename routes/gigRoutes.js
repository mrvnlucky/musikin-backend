const router = require('express').Router()
const gigController = require('../controllers/gigController')
const upload = require('../utils/multer')
const auth = require("../middleware/auth.js")


router.post('/', auth.ownerAuth, upload.single('location_photo'), gigController.addGig)
router.get('/', gigController.getAllGigs)
router.get('/:id', gigController.getOneGig)
router.put('/:id', auth.ownerAuth, upload.single('location_photo'), gigController.updateGig)
router.delete('/:id', auth.ownerAuth, gigController.deleteGig)

router.get('/gig', auth.adminAuth, gigController.getAllGigs)
router.get('/gig/:id', auth.adminAuth, gigController.getOneGig)
router.delete('/gig/:id', auth.adminAuth, gigController.deleteGig)


module.exports = router