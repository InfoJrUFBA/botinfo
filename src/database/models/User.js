import mongoose from 'mongoose'
const { Schema, model } = mongoose

const schema = new Schema({
  discord_id: {
    type: String,
    unique: true,
    required: true
  },
  gitlab: String,
  name: { type: String, required: true },
  bio: String,
  curso: String
}, { timestamps: true })

schema.virtual('meetPresences', {
  ref: 'MeetPresence',
  localField: '_id',
  foreignField: 'owner'
})

export const User = model('User', schema)
