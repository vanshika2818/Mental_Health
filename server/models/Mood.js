import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
  text: { type: String, required: true },
  emotion: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Mood', moodSchema);
