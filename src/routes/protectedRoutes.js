const express = require("express");
const auth = require("../middleware/auth.js")

const protectedController = require('../controllers/protectedController')
const router = express.Router();

router.get(
  "/user", auth.userAuth, protectedController.testUser
);
router.get(
  "/owner", auth.ownerAuth, protectedController.testOwner
);

module.exports = router;