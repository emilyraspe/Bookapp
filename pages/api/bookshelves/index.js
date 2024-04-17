import dbConnect from "../../../db/connect";
import Bookshelf from "../../../db/models/Bookshelf";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const newBookshelf = await Bookshelf.create(request.body);
      console.log(newBookshelf);
      response
        .status(200)
        .json({ status: "uploaded new bookshelf", newBookshelf });
    } catch (error) {
      console.log("ERROR", error);
      response.status(500).json({ error: error.message });
    }
  } else if (request.method === "GET") {
    const bookshelves = await Bookshelf.find();
    return response.status(200).json(bookshelves);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
