const express = require("express");
const auth = require("../middleware/auth.js")

const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).send("hello world")

}

)
module.exports = router;