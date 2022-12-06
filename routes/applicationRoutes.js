const router = require('express').Router()
const applicationController = require('../controllers/applicationController')

const auth = require("../middleware/auth.js")


router.post('/', auth.userAuth, applicationController.addApplication)
router.get('/', applicationController.getAllApplications)
router.get('/:id', applicationController.getOneApplication)
router.put('/:id', auth.userAuth, applicationController.updateApplication)
router.delete('/:id', auth.userAuth, applicationController.deleteApplication)
router.put('/:id/status', auth.ownerAuth, applicationController.updateApplicationStatus)
router.get('/gig/:id', auth.ownerAuth, applicationController.getApplicants)

router.get('/application', auth.adminAuth, applicationController.getAllApplications)
router.get('/application/:id', auth.adminAuth, applicationController.getOneApplication)
router.delete('/application/:id', auth.adminAuth, applicationController.deleteApplication)

module.exports = router