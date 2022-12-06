const router = require('express').Router()
const ownerController = require('../controllers/ownerController')
const { ownerAuth, adminAuth } = require('../middleware/auth')
const upload = require('../utils/multer')

router.post('/login', ownerController.loginOwner)
router.post('/register', ownerController.signupOwner)
router.get('/', ownerController.getAllOwners)
router.get('/:id', ownerController.getOneOwner)
router.put('/:id', upload.single('owner_photo'), ownerController.updateOwner)
router.delete('/:id', ownerController.deleteOwner)
router.put('/:id/changepassword', ownerAuth, ownerController.updateOwnerPassword)
router.get('/:id/gigs', ownerAuth, ownerController.getMyGigs)

router.get('/', adminAuth, ownerController.getAllOwners)
router.get('/:id', adminAuth, ownerController.getOneOwner)
router.delete('/:id', adminAuth, ownerController.deleteOwner)

module.exports = router