exports.testUser = async (req, res) => {
  res.status(200).send("Hello USER")
}
exports.testOwner = async (req, res) => {
  res.status(200).send("Hello OWNER")
}