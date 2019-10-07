const mongoose = require('mongoose')

const RiderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
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

module.exports = Rider = mongoose.model('rider', RiderSchema)
