import dbConnect from "../../../db/connect";
import Bookshelf from "../../../db/models/Bookshelf";
import { getSession } from "next-auth/react";

export default async function handler(request, response) {
  // get user
  const { method, body } = request;
  /*   const session = await getSession({ req: request }); */
  await dbConnect();

  if (method === "POST") {
    console.log("========================", body);
    try {
      await Bookshelf.create(body);
      response.status(200).json({ status: "uploaded new bookshelf", body });
    } catch (error) {
      console.log("ERROR", error);
      response.status(500).json({ error: error.message });
    }
  }
}
