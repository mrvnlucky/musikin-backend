const User = require("../models").User
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body

    if (!(email && password && name && phone)) {
      res.status(400).send("Please input all required fields")
    }

    const oldUser = await User.findOne({ where: { user_email: email } })
    if (oldUser) {
      return res.status(409).send("User with this email already exist")
    }

    var encryptedPassword = await bcrypt.hash(req.body.password, 10)

    const user = await User.create({
      user_name: name,
      user_email: email,
      user_password: encryptedPassword,
      user_phone: phone,
      user_photo: '',
    })
    res.status(201).send({
      status: 201,
      success: true,
      message: "User registered"
    })
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while register"
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).send("Email and password are required")
    }

    const user = await User.findOne({ where: { user_email: email } })
    if (!user) {
      res.status(401).send("User not found")
    }

    if (await bcrypt.compare(password, user.user_password)) {
      const payload = { id: user.id, name: user.user_name, email: user.user_email, photo: user.user_photo, phone: user.user_phone }
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
        res
      )
      data = {
        name: user.user_name,
        email: user.user_email,
        phone: user.user_phone,
        photo: user.user_photo,
        token: token,
      }
      res.status(200).send({
        message: "User logged in",
        data: data
      })
    } else {
      res.status(401).send("Failed to authorize user")
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while login"
    })
  }
}