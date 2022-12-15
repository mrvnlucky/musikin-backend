const Owner = require('../models').Owner
const Gig = require('../models').Gig
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cloudinary = require('../utils/cloudinary')


const createToken = (id) => {
  const payload = { id }
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "1d" })
}

exports.loginOwner = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      res.status(400).send("All fields must be filled")
      return
    }

    // if (!validator.isEmail(email)) {
    //   res.status(400).send("Email not valid")
    // }


    const owner = await Owner.findOne({ where: { owner_email: email } })
    if (!owner) {
      res.status(401).send('Owner not found')
      return
    }

    const match = await bcrypt.compare(password, owner.owner_password)
    if (!match) {
      res.status(401).send("Incorrect password!")
      return
    }


    const token = createToken(owner.id)

    const data = {
      id: owner.id,
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

exports.signupOwner = async (req, res) => {
  const { email, name, password, phone } = req.body

  try {
    if (!email || !password || !name || !phone) {
      res.status(400).send("All fields must be filled")
      return
    }
    const oldOwner = await Owner.findOne({ where: { owner_email: email } })

    if (oldOwner) {
      res.status(400).send("Email is already in use")
      return
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
      id: owner.id,
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

exports.getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.findAll()
    res.status(200).send({
      success: true, owners
    })
    // const limit = req.query.size || 10
    // const offset = req.query.page || 0

    // const owners = await Owner.findAndCountAll({
    //   limit: limit,
    //   offset: offset,
    //   attributes: ['id', 'owner_email', 'owner_name', 'owner_phone', 'owner_photo', 'createdAt', 'updatedAt']
    // })
    res.status(200).send({
      success: true,
      owners,
      totalPages: Math.ceil(owners.count / Number.parseInt(limit))
    })
  } catch (err) {
    res.status(500).send({
      message: err.messagee || "Some error occured while geeting owners"
    })
  }
}

exports.getOneOwner = async (req, res) => {
  try {
    let id = req.params.id
    let owner = await Owner.findOne({ where: { id: id } })
    res.status(200).send({
      success: true,
      owner
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while getting owner"
    })
  }
}

// Update without password
exports.updateOwner = async (req, res) => {
  try {
    const { owner_name, owner_email, owner_phone } = req.body
    let id = req.params.id

    if (req.file) {
      const img = await cloudinary.uploader.upload(req.file.path, {
        folder: "musikin/owner/"
      })

      const owner = await Owner.update({
        owner_name: owner_name,
        owner_email: owner_email,
        owner_phone: owner_phone,
        owner_photo: img.secure_url
      }, { where: { id: id } })
    } else {
      const owner = await Owner.update({
        owner_name: owner_name,
        owner_email: owner_email,
        owner_phone: owner_phone,
      }, { where: { id: id } })
    }
    const updatedOwner = await Owner.findOne({ where: { id: id } })
    res.status(200).send({
      succes: true,
      updatedOwner
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while updating owner"
    })
  }
}

// FIX: image for deleted item is not deleted from cloudinary storage
exports.deleteOwner = async (req, res) => {
  try {
    let id = req.params.id
    const deletedOwner = await Owner.findOne({ where: { id: id } })
    await Owner.destroy({ where: { id: id } })
    res.status(200).send({
      success: true,
      message: "Owner is deleted",
      deletedOwner
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while deleting owner"
    })
  }
}

exports.updateOwnerPassword = async (req, res) => {
  try {
    const { password, verifyPassword } = req.body
    let id = req.params.id

    if (password !== verifyPassword) {
      res.status(400).send("Please verify the password")
      return
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await Owner.update({
      owner_password: hash
    }, { where: { id: id } })

    const updatedOwner = await Owner.findOne({ where: { id: id } })
    res.status(200).send({
      succes: true,
      updatedOwner
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while updating owner password"
    })
  }
}

exports.getMyGigs = async (req, res) => {
  try {
    let id = req.params.id
    let gig = await Gig.findAll({ where: { owner_id: id } })
    res.status(200).send({
      success: true,
      gig
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while getting your gigs"
    })
  }
}
