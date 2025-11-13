const axios = require('axios');

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqmt3SyidND_gTaBINfErwGCsUvN6V6rr5oVFrNTRzJx-5B_PnCgj0gbI0zRPvDH79Eg/exec';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const journeyData = req.body;
    const response = await axios.post(APPS_SCRIPT_URL, journeyData, {
      headers: { 'Content-Type': 'application/json' }, timeout: 10000
    });

    res.status(200).json({
      success: true,
      message: 'Journey saved to Google Sheets',
      timestamp: new Date().toISOString(),
      journeyId: journeyData.id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};
