import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await pool.query("SELECT * FROM recipe");
    res.status(200).json(data.rows);
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ error: "failed to load data" });
  }
}
