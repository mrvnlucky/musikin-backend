const jwt = require('jsonwebtoken')
const User = require('../models').User

const userAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).send({ error: "Authorization token required" })
  }

  const token = authorization.split(' ')[1]

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findOne({ where: { id: id } })
    next()
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Request is not authorized" })
  }
}

const ownerAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).send({ error: "Authorization token required" })
  }

  const token = authorization.split(' ')[1]

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findOne({ where: { id: id } })
    next()
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Request is not authorized" })
  }
}

module.exports = {
  userAuth,
  ownerAuth
}