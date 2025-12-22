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
    const { q, maxResults = '5' } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Query parameter is required'
      });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'YouTube API key not configured'
      });
    }

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&type=video&maxResults=${maxResults}&key=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'YouTube API error');
    }

    return res.status(200).json({
      success: true,
      data: data.items || [],
      totalResults: data.pageInfo?.totalResults || 0
    });

  } catch (error) {
    console.error('Search API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
};
