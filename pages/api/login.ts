import { NextApiRequest,NextApiResponse } from "next";
import dbConnect from "../../lib/db/index";
import LoginDetail from "../../lib/db/loginmodel";
// import { NextResponse } from "next/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
    if (req.method === 'POST') {
      const { email, password } = req.body;
      const loginData= await LoginDetail.findOne({email,password})
      if (loginData) {
        return res.status(200).json({ message: "Login Successful" });
      } else {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
    }
     else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);  
    }
  }