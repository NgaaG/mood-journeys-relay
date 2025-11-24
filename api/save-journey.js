import axios from "axios";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxHG_LlpJsANlHVJqhkl4EoM-_6F1pebnD5sLzhS7VtrOl7GaAf6e3EImsfxLhHn1Ea/exec";

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
