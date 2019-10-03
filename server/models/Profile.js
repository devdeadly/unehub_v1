const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  // create reference to user model, since every profile should be associated with a user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  location: {
    type: String,
    trim: true,
  },
  birthday: {
    type: Date,
  },
  disciplines: {
    type: [String],
    required: true,
  },
  website: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  sponsors: [
    {
      name: {
        type: String,
        trim: true,
      },
      website: {
        type: String,
        trim: true,
      },
    },
  ],
  achievements: [
    {
      rank: {
        type: String,
        required: true,
        trim: true,
      },
      date: {
        type: Date,
        required: true,
      },
      location: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)
