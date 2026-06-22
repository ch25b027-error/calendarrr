import mongoose from "mongoose";

const spaceSchema = new mongoose.Schema({
  name: String,
  joinCode: { type: String, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  expiresAt: {type: Date, expires: 0}
});

export default mongoose.model('Space', spaceSchema);
