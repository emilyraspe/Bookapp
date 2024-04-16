import mongoose from "mongoose";
const { Schema } = mongoose;

const bookshelfSchema = new Schema({
  name: { type: String, required: true },
  created: { type: String, default: Date.now },
  /*   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, */
});

const Bookshelf =
  mongoose.models.Bookshelf || mongoose.model("Bookshelf", bookshelfSchema);

export default Bookshelf;
