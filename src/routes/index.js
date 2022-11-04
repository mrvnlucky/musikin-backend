const router = require('express').Router()

// Router imports go here
const userRoutes = require('./userRoutes')
const ownerRoutes = require('./ownerRoutes')
const protectedRoutes = require('./protectedRoutes')
const gigRoutes = require('./gigRoutes')
const auth = require("../middleware/auth.js")

router.use('/user', userRoutes)
router.use('/owner', ownerRoutes)
router.use('/protected', protectedRoutes)
router.use('/gig', gigRoutes)

module.exports = router