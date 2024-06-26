import mongoose from "mongoose";
const { Schema } = mongoose;

const readBooksSchema = new Schema({
  userId: { type: String },
  books: [{ type: Object }],
});

const ReadBooks =
  mongoose.models.ReadBooks || mongoose.model("ReadBooks", readBooksSchema);

export default ReadBooks;
