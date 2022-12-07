const Application = require('../models').Application
const User = require('../models').User

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
    const user = await User.findOne({ where: { id: application.user_id }, attributes: ['user_photo', 'user_phone'] })
    let data = {
      id: application.id,
      gig_id: application.gig_id,
      user_id: application.user_id,
      user_photo: user.user_photo,
      user_phone: user.user_phone,
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
    let applications = await Application.findAll({
      include: [{
        association: "user",
        attributes: ['user_photo', 'user_phone']
      }]
    })
    res.status(200).send({
      success: true,
      applications
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while getting applications"
    })
  }
}

exports.getOneApplication = async (req, res) => {
  try {
    let id = req.params.id
    let application = await Application.findOne({
      where: { id: id },
      include: [{
        association: 'user',
        attributes: ['user_photo', 'user_phone']
      }]
    })
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


exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body
    let id = req.params.id

    if (status === "accepted" || status === "rejected") {
      await Application.update({ status: status }, { where: { id: id } })

      const updatedApplication = await Application.findOne({ where: { id: id } })
      res.status(200).send({
        success: true,
        updatedApplication
      })
    } else {
      res.status(500).send({
        message: "Invalid status sent"
      })
      return
    }


  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while updating application status"
    })
  }
}

exports.getApplicants = async (req, res) => {
  try {
    let id = req.params.id
    let applications = await Application.findAll({
      where: {
        gig_id: id
      },
      include: [{
        association: "user",
        attributes: ['user_photo', 'user_phone']
      }]
    })

    // let applications = await Application.findAll({
    //   include: [{
    //     association: "user",
    //     attributes: ['user_photo', 'user_phone']
    //   }]
    // }, { where: { gig_id: id } })
    res.status(200).send({
      success: true,
      applications
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while getting applicants"
    })
  }
}