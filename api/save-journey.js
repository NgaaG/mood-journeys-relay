import axios from "axios";

const APPS_SCRIPT_URL = "YOUR_APPS_SCRIPT_EXEC_URL_HERE";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const response = await axios.post(APPS_SCRIPT_URL, req.body, {
      headers: { "Content-Type": "application/json" }
    });

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
