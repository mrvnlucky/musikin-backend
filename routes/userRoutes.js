const router = require('express').Router()
const userController = require('../controllers/userController')
const { userAuth, adminAuth } = require('../middleware/auth')
const upload = require('../utils/multer')

router.post('/login', userController.loginUser)
router.post('/register', userController.signupUser)
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getOneUser)
router.put('/:id', upload.single('user_photo'), userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.put('/:id/changepassword', userAuth, userController.updateUserPassword)
router.get('/:id/applications', userAuth, userController.getMyApplications)


// For Admin
router.get('', adminAuth, userController.getAllUsers)
router.get('/:id', adminAuth, userController.getOneUser)
router.delete('/:id', adminAuth, userController.deleteUser)

module.exports = router