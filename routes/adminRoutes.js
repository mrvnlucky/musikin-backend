const router = require('express').Router()
const adminController = require('../controllers/adminController')

router.post('/login', adminController.loginAdmin)
router.post('/register', adminController.signupAdmin)
router.get('/', adminController.getAllAdmins)
router.get('/:id', adminController.getOneAdmin)
router.put('/:id', adminController.updateAdmin)
router.delete('/:id', adminController.deleteAdmin)



module.exports = router