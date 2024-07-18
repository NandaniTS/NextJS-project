import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnect from "../../../lib/db/index";
import Data from "../../../lib/db/model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "DELETE":
      try {
        let deletedData;
        deletedData = await Data.findOneAndDelete({ id: id });

        if (!deletedData) {
          return res.status(404).json({ message: "Document not found" });
        } else {
          return res.status(200).json({ message: "OK", Data: deletedData });
        }
      } catch (error) {
        console.error("Error in DELETE handler:", error);
        return res.status(500).json({ message: "Server Error" });
      }
    case "GET":
      try {
        const data = await Data.findOne({ id: id });
        if (!data){
          return res.status(404).json({ success: false });
        }
        return res.status(200).json(data);
      } catch (error){
        console.log(error);
        return res.status(500).json({ success: false, error });
      }

    case "PATCH":
      try {
        const { id, name, price, review, description } = req.body;
        console.log(req.body)
        const updatedItem = await Data.findOneAndUpdate(
          { id: id },
          { id,name, price, review, description },
          { new: true }
        );
        if (!updatedItem) {
          return res.status(404).json({ message: "Item not found" });
        }
        return res.status(200).json(updatedItem);
      } catch (error) {
        console.error("Error updating item:", error);
        return res.status(500).json({ error: "Error updating item" });
      }

    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
