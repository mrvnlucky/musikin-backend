const Owner = require('../models').Owner
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const createToken = (id) => {
  const payload = { id }
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "1d" })
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      res.status(400).send("All fields must be filled")
    }

    // if (!validator.isEmail(email)) {
    //   res.status(400).send("Email not valid")
    // }


    const owner = await Owner.findOne({ where: { owner_email: email } })
    if (!owner) {
      res.status(401).send('Owner not found')
    }

    const match = await bcrypt.compare(password, owner.owner_password)
    if (!match) {
      res.status(401).send("Incorrect password!")
    }


    const token = createToken(owner.id)

    const data = {
      email: owner.owner_email,
      name: owner.owner_name,
      phone: owner.owner_phone,
      photo: owner.owner_photo,
      token: token
    }

    res.status(200).send({
      success: true,
      message: "Owner logged in",
      data
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.signupUser = async (req, res) => {
  const { email, name, password, phone } = req.body

  try {
    if (!email || !password || !name || !phone) {
      res.status(400).send("All fields must be filled")
    }
    const oldUser = await Owner.findOne({ where: { owner_email: email } })

    if (oldUser) {
      res.status(400).send("Email is already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const owner = await Owner.create({
      owner_email: email,
      owner_name: name,
      owner_password: hash,
      owner_phone: phone,
      owner_photo: ""
    })

    const token = createToken(owner.id)
    const data = {
      email: owner.owner_email,
      name: owner.owner_name,
      phone: owner.owner_phone,
      photo: owner.owner_photo,
      token: token
    }


    res.status(200).send({
      success: true,
      message: "Owner registered",
      data
    })

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}