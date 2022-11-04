const router = require('express').Router()
const ownerController = require('../controllers/ownerController')

router.post('/login', ownerController.loginUser)
router.post('/register', ownerController.signupUser)

module.exports = router