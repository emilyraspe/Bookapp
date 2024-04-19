import dbConnect from "../../../db/connect";
import ReadBooks from "../../../db/models/ReadBooks";

export default async function handler(request, response) {
  await dbConnect();

  // Adding Books to Readbooks
  if (request.method === "PUT") {
    try {
      const { book, userId } = request.body;

      const updatedReadBooksList = await ReadBooks.findOneAndUpdate(
        { userId },
        { $push: { books: book } },
        { new: true, upsert: true } //this creates a new one if theres no entry
      );
      return response.status(200).json(updatedReadBooksList);
    } catch (error) {
      console.log("ERROR", error);
      response.status(500).json({ error: error.message });
    }
  } else if (request.method === "GET") {
    try {
      const readBooksData = await ReadBooks.find();

      return response.status(200).json(readBooksData);
    } catch (error) {
      console.error("ERROR", error);
      return response.status(500).json({ error: error.message });
    }
  }
  //deleting book
  else if (request.method === "DELETE") {
    const { userId } = request.body;
    const { currentBook } = request.body;

    const updatedReadBooks = await ReadBooks.findOneAndUpdate(
      { userId: userId },
      { $pull: { books: { id: currentBook } } },
      { new: true }
    );

    console.log("updatedReadBooks", updatedReadBooks);

    return response.status(200).json(updatedReadBooks);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
