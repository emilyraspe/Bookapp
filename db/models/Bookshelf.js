import mongoose from "mongoose";
const { Schema } = mongoose;

const bookshelfSchema = new Schema({
  name: { type: String, required: true },
  created: { type: String, default: Date.now },
  userId: { type: String },
});

const Bookshelf =
  mongoose.models.Bookshelf || mongoose.model("Bookshelf", bookshelfSchema);

export default Bookshelf;
