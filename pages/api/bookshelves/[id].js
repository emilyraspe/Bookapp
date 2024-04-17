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

      if (!updatedBookshelf) {
        return response.status(404).json({ error: "Bookshelf not found" });
      }
      return response.status(200).json(updatedBookshelf);
    } catch (error) {
      console.log("ERROR", error);
      response.status(500).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
