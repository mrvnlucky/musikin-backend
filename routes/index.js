const router = require('express').Router()

// Router imports go here
const userRoutes = require('./userRoutes')
const ownerRoutes = require('./ownerRoutes')
const gigRoutes = require('./gigRoutes')
const applicationRoutes = require('./applicationRoutes')
const adminRoutes = require('./adminRoutes')
const testRoutes = require('./testRoutes')

router.use('/user', userRoutes)
router.use('/owner', ownerRoutes)
router.use('/gig', gigRoutes)
router.use('/application', applicationRoutes)
router.use('/admin', adminRoutes)
router.use('/test', testRoutes)

module.exports = router