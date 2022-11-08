const router = require('express').Router()
const gigController = require('../controllers/gigController')

const auth = require("../middleware/auth.js")


router.post('/', auth.ownerAuth, gigController.addGig)
router.get('/', gigController.getAllGigs)
router.get('/:id', gigController.getOneGig)
router.put('/:id', auth.ownerAuth, gigController.updateGig)
router.delete('/:id', auth.ownerAuth, gigController.deleteGig)

module.exports = router