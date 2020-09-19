import mongoose from 'mongoose'
const { Schema, model } = mongoose

const schema = new Schema({
  name: { type: String, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  voice_channel: {
    id: String,
    name: String
  },
  startTime: Date,
  endTime: Date,
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true })

export const MeetPresence = model('MeetPresence', schema)
