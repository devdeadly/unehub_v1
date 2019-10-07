const Rider = require('../models/Rider')
const { handleServerError } = require('../utils/error')

const getAllRiders = async (req, res) => {
  try {
    const riders = await Rider.find()
    res.json(riders)
  } catch (error) {
    handleServerError(error, res)
  }
}

const upsertRider = async (req, res) => {
  try {
    const {
      location,
      birthday,
      website,
      bio,
      disciplines,
      sponsors,
      achievement,
      youtube,
      facebook,
      twitter,
      instagram,
    } = req.body

    const r = {}
    console.log(req.rider.id)
    // r.rider = req.rider.id
    if (location) r.location = location
    if (birthday) r.birthday = birthday
    if (website) r.website = website
    if (bio) r.bio = bio
    if (disciplines) {
      r.disciplines = disciplines.split(',').map(s => s.trim())
    }

    r.social = {}
    if (youtube) r.social.youtube = youtube
    if (facebook) r.social.facebook = facebook
    if (twitter) r.social.twitter = twitter
    if (instagram) r.social.instagram = instagram

    let rider = await Rider.findOne({ _id: req.rider.id })

    if (rider) {
      // update rider
      rider = await Rider.findOneAndUpdate(
        { _id: req.rider.id },
        { $set: r },
        { new: true }
      )
      return res.json(rider)
    }

    // create rider
    rider = new Rider(r)
    await rider.save()

    res.json(rider)
  } catch (error) {
    handleServerError(error, res)
  }
}

const deleteAuthd = async (req, res) => {
  try {
    // remove rider
    await Rider.findOneAndRemove({ _id: req.rider.id })

    res.status(204).json({ msg: 'Rider deleted' })
  } catch (error) {
    handleServerError(error, res)
  }
}

module.exports = {
  deleteAuthd,
  getAllRiders,
  upsertRider,
}
