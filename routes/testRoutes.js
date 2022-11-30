const express = require("express");
const auth = require("../middleware/auth.js")

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).send(
      "Hello World"
    )
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while getting owner"
    })
  }
})

module.exports = router;