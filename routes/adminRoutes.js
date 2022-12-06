const router = require('express').Router()
const adminController = require('../controllers/adminController')
const applicationController = require('../controllers/applicationController')
const gigController = require('../controllers/gigController')
const userController = require('../controllers/userController')
const ownerController = require('../controllers/ownerController')
const { adminAuth } = require('../middleware/auth')

router.post('/login', adminController.loginAdmin)
router.post('/register', adminController.signupAdmin)
router.get('/', adminController.getAllAdmins)
router.get('/:id', adminController.getOneAdmin)
router.put('/:id', adminController.updateAdmin)
router.delete('/:id', adminController.deleteAdmin)



module.exports = router