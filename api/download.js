import fetch from 'node-fetch';

export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { url, format = 'mp4' } = req.query;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL parameter is required'
      });
    }

    const apiKey = process.env.FERDEV_API_KEY || 'key-elfs';
    
    // Detect video type
    const isShort = url.includes('/shorts/');
    
    // Determine endpoint based on format
    let endpoint;
    if (format === 'mp3') {
      endpoint = 'ytmp3';
    } else if (isShort) {
      endpoint = 'ytshorts';
    } else {
      endpoint = 'ytmp4';
    }

    const apiUrl = `https://api.ferdev.my.id/downloader/${endpoint}?link=${encodeURIComponent(url)}&apikey=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    // Return response
    return res.status(response.status).json(data);

  } catch (error) {
    console.error('Download API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
};
