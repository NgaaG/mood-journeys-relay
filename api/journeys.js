import axios from 'axios';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqmt3SyidND_gTaBINfErwGCsUvN6V6rr5oVFrNTRzJx-5B_PnCgj0gbI0zRPvDH79Eg/exec';

export default async function handler(req, res) {
  // CORS headers
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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('📥 Fetching journeys from Google Sheets...');

    const response = await axios.get(APPS_SCRIPT_URL, {
      timeout: 10000
    });

    console.log('✅ Journeys fetched');

    return res.status(200).json(response.data);

  } catch (error) {
    console.error('❌ Error fetching journeys:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
