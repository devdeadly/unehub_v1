const express = require('express')
const { check } = require('express-validator')

const Profile = require('../models/Profile')
const { genError, handleServerError } = require('../utils/error')

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
  } catch (error) {
    handleServerError(error, res)
  }
}

const getProfileById = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.user_id }).populate(
      'user',
      ['name', 'avatar']
    )

    if (!profile) {
      return res.status(400).send(genError('Profile not found'))
    }

    res.json(profile)
  } catch (error) {
    // if an invalid ObjectId was sent in Profile.findOne, we don't want the user to see server error, just the same message as above
    if (error.kind == 'ObjectId') {
      return res.status(400).send(genError('Profile not found'))
    }
    handleServerError(error, res)
  }
}

const getAuthdProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      // now we want the name and avatar field that exist on the User model to also be returned in this query
      // to do this, we can utilize the populate method
      .populate('user', ['name', 'avatar'])

    if (!profile) {
      return res
        .status(400)
        .send(genError('There is no profile associated with this account'))
    }

    res.json(profile)
  } catch (error) {
    handleServerError(error, res)
  }
}

const upsertProfile = async (req, res) => {
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

    const p = {}
    p.user = req.user.id
    if (location) p.location = location
    if (birthday) p.birthday = birthday
    if (website) p.website = website
    if (bio) p.bio = bio
    if (disciplines) {
      p.disciplines = disciplines.split(',').map(s => s.trim())
    }

    p.social = {}
    if (youtube) p.social.youtube = youtube
    if (facebook) p.social.facebook = facebook
    if (twitter) p.social.twitter = twitter
    if (instagram) p.social.instagram = instagram

    let profile = await Profile.findOne({ user: req.user.id })

    if (profile) {
      // update profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: p },
        { new: true }
      )
      return res.json(profile)
    }

    // create profile
    profile = new Profile(p)
    await profile.save()

    res.json(profile)
  } catch (error) {
    handleServerError(error, res)
  }
}

module.exports = {
  getAllProfiles,
  getProfileById,
  getAuthdProfile,
  upsertProfile,
}
