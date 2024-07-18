import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db/index";
import Data from "../../../lib/db/model";
// import dbConnect from "@/lib/db";
// import Data from "@/lib/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  //   console.log(req);

  switch (req.method) {
    case "GET":
      try {
        const data = await Data.find();
        if (!data) {
          return res.status(404).json({ success: false });
        }
        return res.status(200).json(data);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error });
      }
      break;

    case "GET":
      const { id } = req.query;
      
      break;

  

    case "POST":
      try {
        const { id, name, price, review, description } = req.body;
        console.log(req.body); // Log body params for POST
        await Data.insertMany([{ id, name, price, review, description }]);
        return res.status(201).json({ message: "Item added successfully" });
      } catch (error) {
        console.error("Error adding item:", error);
        return res.status(500).json({ error: "Error adding item" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
