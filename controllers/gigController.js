const Gig = require('../models').Gig

exports.addGig = async (req, res) => {
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Masukkan judul Gig"
  //   })
  //   return
  // }

  // const gig = req.body
  // await Gig.create(gig)
  //   .then(data => {
  //     res.status(200).send({
  //       success: true,
  //       data
  //     })
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: err.message || "Some error occured while creating Gig"
  //     })
  //   })

  const { owner_id, location, fee, title, description, location_photo } = req.body

  try {
    if (!req.body.title) {
      res.status(400).send({ message: "Masukkan judul gig" })
      return
    }

    const gig = await Gig.create({
      owner_id: owner_id,
      location: location,
      fee: fee,
      title: title,
      description: description,
      location_photo: location_photo
    })

    let data = {
      id: gig.id,
      owner_id: gig.owner_id,
      location: gig.location,
      fee: gig.fee,
      title: gig.title,
      description: gig.description,
      location_photo: gig.location_photo
    }
    res.status(200).send({
      success: true,
      message: "Gig created",
      data
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while creating gig"
    })
  }



}

exports.getAllGigs = async (req, res) => {
  try {
    let gigs = await Gig.findAll()
    res.status(200).send({
      success: true,
      gigs
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while getting gigs"
    })
  }
}

exports.getOneGig = async (req, res) => {
  try {
    let id = req.params.id
    let gig = await Gig.findOne({ where: { id: id } })
    res.status(200).send({
      success: true,
      gig
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while getting gig"
    })
  }
}

exports.updateGig = async (req, res) => {
  try {
    let id = req.params.id
    const gig = await Gig.update(req.body, { where: { id: id } })
    const updatedGig = await Gig.findOne({ where: { id: id } })
    res.status(200).send({
      succes: true,
      updatedGig
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while updating gig"
    })
  }
}

exports.deleteGig = async (req, res) => {
  try {
    let id = req.params.id
    const deletedGig = await Gig.findOne({ where: { id: id } })
    await Gig.destroy({ where: { id: id } })
    res.status(200).send({
      success: true,
      message: "Gig is deleted",
      deletedGig
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while deleting gig"
    })
  }
}