const Admin = require('../models').Admin
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const createToken = (id) => {
  const payload = { id }
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "1d" })
}

exports.loginAdmin = async (req, res) => {
  const { userName, password } = req.body

  try {
    if (!userName || !password) {
      res.status(400).send("All fields must be filled")
      return
    }

    // if (!validator.isEmail(userName)) {
    //   res.status(400).send("Email not valid")
    // }


    const admin = await Admin.findOne({ where: { userName: userName } })
    if (!admin) {
      res.status(401).send('Admin not found')
      return
    }

    const match = await bcrypt.compare(password, admin.password)

    if (!match) {
      res.status(401).send("Incorrect password!")
      return
    }

    const token = createToken(admin.id)

    const data = {
      id: admin.id,
      userName: admin.userName,
      token: token
    }
    res.status(200).send({
      success: true,
      message: "Admin logged in",
      data
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.signupAdmin = async (req, res) => {
  const { userName, password } = req.body

  try {
    if (!userName || !password) {
      res.status(400).send("All fields must be filled")
      return
    }
    const oldAdmin = await Admin.findOne({ where: { userName: userName } })

    if (oldAdmin) {
      res.status(400).send("Email is already in use")
      return
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const admin = await Admin.create({
      userName: userName,
      password: hash
    })

    const token = createToken(admin.id)

    const data = {
      id: admin.id,
      userName: admin.userName,
      token: token
    }
    res.status(200).send({
      success: true,
      message: "Admin logged in",
      data
    })

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getAllAdmins = async (req, res) => {
  try {
    // let admins = await Admin.findAll()
    // res.status(200).send({
    //   success: true, admins
    // })

    const limit = req.query.size || 10
    const offset = req.query.page || 0

    const admins = await Admin.findAndCountAll({
      limit: limit,
      offset: offset,
      attributes: ['id', 'userName', 'password']
    })
    res.status(200).send({
      success: true,
      admins,
      totalPages: Math.ceil(admins.count / Number.parseInt(limit))
    })
  } catch (err) {
    res.status(500).send({
      message: err.messagee || "Some error occured while geeting admins"
    })
  }
}

exports.getOneAdmin = async (req, res) => {
  try {
    let id = req.params.id
    let admin = await Admin.findOne({ where: { id: id } })
    res.status(200).send({
      success: true,
      admin
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while getting admin"
    })
  }
}

exports.updateAdmin = async (req, res) => {
  try {
    const { userName, password } = req.body
    let id = req.params.id

    const admin = await Admin.update({
      userName: userName,
      password: password
    }, {
      where: {
        id: id
      }
    })

    const updatedAdmin = await Admin.findOne({ where: { id: id } })
    res.status(200).send({
      succes: true,
      updatedAdmin
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while updating admin"
    })
  }
}

// FIX: image for deleted item is not deleted from cloudinary storage
exports.deleteAdmin = async (req, res) => {
  try {
    let id = req.params.id
    const deletedAdmin = await Admin.findOne({ where: { id: id } })
    await Admin.destroy({ where: { id: id } })
    res.status(200).send({
      success: true,
      message: "Admin is deleted",
      deletedAdmin
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while deleting admin"
    })
  }
}