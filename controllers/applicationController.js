const Application = require('../models').Application

exports.addApplication = async (req, res) => {
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Masukkan judul Application"
  //   })
  //   return
  // }

  // const application = req.body
  // await Application.create(application)
  //   .then(data => {
  //     res.status(200).send({
  //       success: true,
  //       data
  //     })
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: err.message || "Some error occured while creating Application"
  //     })
  //   })

  const { gig_id, user_id, performer_name, portofolio_link, status } = req.body

  try {
    if (!req.body.performer_name) {
      res.status(400).send({ message: "Masukkan nama panggung" })
      return
    }


    const application = await Application.create({
      gig_id: gig_id,
      user_id: user_id,
      performer_name: performer_name,
      portofolio_link: portofolio_link,
      status: status
    })
    let data = {
      id: application.id,
      gig_id: application.gig_id,
      user_id: application.user_id,
      performer_name: application.performer_name,
      portofolio_link: application.portofolio_link,
      status: application.status
    }
    res.status(200).send({
      success: true,
      message: "Application created",
      data
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while creating application"
    })
  }



}

exports.getAllApplications = async (req, res) => {
  try {
    let gigs = await Application.findAll()
    res.status(200).send({
      succes: true,
      gigs
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while getting gigs"
    })
  }
}

exports.getOneApplication = async (req, res) => {
  try {
    let id = req.params.id
    let application = await Application.findOne({ where: { id: id } })
    res.status(200).send({
      success: true,
      application
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while getting application"
    })
  }
}

exports.updateApplication = async (req, res) => {
  try {
    let id = req.params.id
    const application = await Application.update(req.body, { where: { id: id } })
    const updatedApplication = await Application.findOne({ where: { id: id } })
    res.status(200).send({
      succes: true,
      updatedApplication
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while updating application"
    })
  }
}

exports.deleteApplication = async (req, res) => {
  try {
    let id = req.params.id
    const deletedApplication = await Application.findOne({ where: { id: id } })
    await Application.destroy({ where: { id: id } })
    res.status(200).send({
      success: true,
      message: "Application is deleted",
      deletedApplication
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while deleting application"
    })
  }
}