const router = require('express').Router()

// Router imports go here
const userRoutes = require('./userRoutes')
const ownerRoutes = require('./ownerRoutes')
const protectedRoutes = require('./protectedRoutes')
const gigRoutes = require('./gigRoutes')
const applicationRoutes = require('./applicationRoutes')

router.use('/user', userRoutes)
router.use('/owner', ownerRoutes)
router.use('/protected', protectedRoutes)
router.use('/gig', gigRoutes)
router.use('/application', applicationRoutes)

module.exports = router