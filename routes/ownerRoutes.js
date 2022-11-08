const router = require('express').Router()
const ownerController = require('../controllers/ownerController')

router.post('/login', ownerController.loginOwner)
router.post('/register', ownerController.signupOwner)
router.get('/', ownerController.getAllOwners)
router.get('/:id', ownerController.getOneOwner)
router.put('/:id', ownerController.updateOwner)
router.delete('/:id', ownerController.deleteOwner)


module.exports = router