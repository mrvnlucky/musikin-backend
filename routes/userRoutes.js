const router = require('express').Router()
const userController = require('../controllers/userController')
const upload = require('../utils/multer')

router.post('/login', userController.loginUser)
router.post('/register', userController.signupUser)
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getOneUser)
router.put('/:id', upload.single('user_photo'), userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router