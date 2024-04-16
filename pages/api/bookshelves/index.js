import dbConnect from "../../../db/connect";
import Bookshelf from "../../../db/models/Bookshelf";
import { getSession } from "next-auth/react";

export default async function handler(request, response) {
  // get user
  const { method, body } = request;
  /*   const session = await getSession({ req: request }); */
  await dbConnect();

  if (request.method === "POST") {
    console.log("========================", request.body);
    try {
      const newBookshelf = await Bookshelf.create(request.body);
      response
        .status(200)
        .json({ status: "uploaded new bookshelf", newBookshelf });
    } catch (error) {
      console.log("ERROR", error);
      response.status(500).json({ error: error.message });
    }
  }

  if (request.method === "GET") {
    const bookshelves = await Bookshelf.find();
    return response.status(200).json(bookshelves);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
