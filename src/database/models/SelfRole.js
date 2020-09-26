import mongoose from 'mongoose'
const { Schema, model } = mongoose

const schema = new Schema({
  message: {
    id: { type: String, unique: true },
    content: String
  },
  roles: [{
    emoji: String,
    roleId: String
  }]
}, { timestamps: true })

export const SelfRole = model('SelfRole', schema)
