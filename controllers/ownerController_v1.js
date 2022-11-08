const Owner = require("../models").Owner
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body

    if (!(email && password && name && phone)) {
      res.status(400).send("Please input all required fields")
    }

    const oldUser = await Owner.findOne({ where: { owner_email: email } })
    if (oldUser) {
      return res.status(409).send("Owner with this email already exist")
    }

    var encryptedPassword = await bcrypt.hash(req.body.password, 10)

    const owner = await Owner.create({
      owner_name: name,
      owner_email: email,
      owner_password: encryptedPassword,
      owner_phone: phone,
      owner_photo: '',
    })
    res.status(201).send({
      status: 201,
      success: true,
      message: "Owner registered"
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
      res.status(400).send("All input is required")
    }

    const owner = await Owner.findOne({ where: { owner_email: email } })

    if (owner && (await bcrypt.compare(password, owner.owner_password))) {
      const token = jwt.sign({
        owner_id: owner.id, email
      }, process.env.JWT_SECRET, {
        expiresIn: "24h"
      })
      data = {
        name: owner.owner_name,
        emai: owner.owner_email,
        phone: owner.owner_phone,
        photo: owner.owner_photo,
        token: token,
      }
      res.status(200).send({
        message: "Owner logged in",
        data: data
      })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while login"
    })
  }
}