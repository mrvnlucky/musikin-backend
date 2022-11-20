const router = require('express').Router()
const ownerController = require('../controllers/ownerController')
const { ownerAuth } = require('../middleware/auth')
const upload = require('../utils/multer')

router.post('/login', ownerController.loginOwner)
router.post('/register', ownerController.signupOwner)
router.get('/', ownerController.getAllOwners)
router.get('/:id', ownerController.getOneOwner)
router.put('/:id', upload.single('owner_photo'), ownerController.updateOwner)
router.delete('/:id', ownerController.deleteOwner)
router.put('/:id/changepassword', ownerAuth, ownerController.updateOwnerPassword)

module.exports = router