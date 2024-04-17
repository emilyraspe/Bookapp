import dbConnect from "../../../db/connect";
import Bookshelf from "../../../db/models/Bookshelf";

export default async function handler(request, response) {
  await dbConnect();

  // Adding Books to Bookshelf
  if (request.method === "PUT") {
    try {
      const { id } = request.query;

      const updatedBookshelf = await Bookshelf.findByIdAndUpdate(
        id,
        request.body,
        { new: true }
      );

      return response.status(200).json(updatedBookshelf);
    } catch (error) {
      console.log("ERROR", error);
      response.status(500).json({ error: error.message });
    }
  }
  // Deleting from Bookshelf
  else if (request.method === "DELETE") {
    try {
      const { id } = request.query;
      const bookId = request.body;
      console.log("request", typeof bookId);
      console.log("Received bookId:", bookId);
      const getBookshelf = await Bookshelf.findById(id);

      const updatedBooksArray = getBookshelf.books.filter(
        (book) => book.items[0].id === bookId
      );

      getBookshelf.books = updatedBooksArray;

      const updatedBookshelf = await Bookshelf.findByIdAndUpdate(
        id,
        getBookshelf
      );

      console.log("updatedBookshelf", updatedBookshelf);
      // console.log("ITEMS", updatedBookshelf.books[0].items[0].id);
      return response.status(200).json(updatedBookshelf);
    } catch (error) {
      console.log("ERROR", error);
      response.status(500).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
