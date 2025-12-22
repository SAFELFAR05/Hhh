# YouTube MP4 Downloader

A free, fast, and easy YouTube video downloader supporting regular videos, Shorts, and audio extraction in MP3 format.

## Features

✨ **Video Download**
- Download YouTube videos in MP4 format
- Download YouTube Shorts
- Auto-detect video type (Shorts vs regular)
- High quality output

🎵 **Audio Extraction**
- Extract audio from videos in MP3 format
- View file size before download

🔍 **Search Integration**
- Search YouTube videos directly on the website
- Click results to download instantly
- Bilingual support (English & Indonesian)

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Hosting**: Netlify (auto-deploy from GitHub)
- **APIs**: 
  - YouTube API v3 (search)
  - ferdev.my.id (video/audio download)

## Project Structure

```
├── client/
│   ├── index.html              # English homepage
│   ├── index-id.html           # Indonesian homepage
│   ├── download.html           # Download results page
│   ├── css/
│   │   ├── styles.css         # Main styles
│   │   └── download.css       # Download page styles
│   ├── js/
│   │   ├── search.js          # YouTube search functionality
│   │   └── download.js        # Download logic
│   └── attached_assets/        # Generated images
├── netlify.toml                # Netlify deployment config
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## How to Deploy

### 1. GitHub Setup
```bash
# Push code to GitHub
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Netlify Auto-Deploy
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account
4. Select this repository
5. **Build settings** (auto-detected):
   - Publish directory: `client`
   - Build command: (leave empty)
6. Deploy!

That's it! Every push to GitHub = automatic deploy to Netlify 🚀

## Environment Setup (for backend later)

Create `.env` file (not committed to GitHub):
```
API_KEY=your_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key
```

**Important**: `.env` is in `.gitignore` - never commit API keys!

## Usage

### On Website
1. **Search**: Type video title in search box
2. **Paste Link**: Paste YouTube URL directly
3. **Download**: Click a search result or submit link
4. **Choose Format**: 
   - MP4 for full video
   - MP3 for audio only

### Supported URLs
- Regular videos: `youtube.com/watch?v=...`
- Shorts: `youtube.com/shorts/...`
- Short links: `youtu.be/...`

## API Endpoints Used

### Video Download (MP4)
```
GET https://api.ferdev.my.id/downloader/ytmp4?link=URL&apikey=key-elfs
```

### Audio Download (MP3)
```
GET https://api.ferdev.my.id/downloader/ytmp3?link=URL&apikey=key-elfs
```

### YouTube Shorts
```
GET https://api.ferdev.my.id/downloader/ytshorts?link=URL&apikey=key-elfs
```

### YouTube Search
```
GET https://www.googleapis.com/youtube/v3/search
```

## Bilingual Support

- **English**: `index.html`
- **Indonesian**: `index-id.html`
- Auto-detect based on IP geolocation
- Manual language switcher in navbar

## Future Improvements

- [ ] Backend API to hide API keys
- [ ] User interface for playlist downloads
- [ ] Download history (localStorage)
- [ ] Custom output quality selection
- [ ] Format conversion (WebM, MP4, etc.)

## License

Free to use for personal purposes.

## Support

For issues or questions, check:
1. Network connection
2. Valid YouTube URL
3. Video availability (not age-restricted)
4. Browser console for errors

---

**Live at**: [Your Netlify URL]
**Repository**: [Your GitHub URL]
