import axios from "axios";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw_jq59RWh7WwZO0sIqgLB_7ppnEGo3acdjoNJtb7srYxKSTHJTrb9FGasdWAtYgU9hPA/exec";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const response = await axios.get(APPS_SCRIPT_URL);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
