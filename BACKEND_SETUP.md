# Backend Setup Guide

Backend untuk YouTube MP4 Downloader sudah siap untuk deploy!

## Struktur Backend

```
api/
├── download.js    ← API untuk download MP4 & MP3
└── search.js      ← API untuk search YouTube
```

## File Konfigurasi

- **vercel.json** - Deploy config untuk Vercel
- **.env.example** - Template untuk environment variables

## Persiapan Deploy

### Step 1: Setup Environment Variables di Vercel

1. Buka https://vercel.com
2. Create New Project → Import dari GitHub repo ini
3. Di "Environment Variables", tambahkan:
   - `YOUTUBE_API_KEY` = API key YouTube kamu
   - `FERDEV_API_KEY` = key-elfs (atau custom jika ada)

### Step 2: Deploy

```bash
# Push ke GitHub
git add .
git commit -m "Add backend APIs"
git push origin main

# Vercel otomatis deploy
# Tunggu sampai deploy selesai
```

### Step 3: Gunakan di Frontend

Backend API URL format:
```
https://your-vercel-domain.vercel.app/api/download?url=...&format=mp4
https://your-vercel-domain.vercel.app/api/search?q=...
```

## API Endpoints

### Download (MP4 & MP3)

**Endpoint:**
```
GET /api/download?url=YOUTUBE_URL&format=mp4|mp3
```

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Video Title",
    "dlink": "https://...",
    "size": 1024000,
    "thumbnail": "https://..."
  }
}
```

### Search YouTube

**Endpoint:**
```
GET /api/search?q=query&maxResults=5
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": { "videoId": "..." },
      "snippet": {
        "title": "...",
        "thumbnails": { ... },
        "channelTitle": "..."
      }
    }
  ],
  "totalResults": 1000
}
```

## Teknologi

- **Runtime**: Node.js 18.x
- **Platform**: Vercel Serverless Functions
- **Method**: HTTP GET

## Catatan

- API keys tidak disimpan di GitHub (protected by .gitignore)
- Semua environment variables di-set di Vercel dashboard
- Automatic deployment dari GitHub push
- CORS sudah enable untuk semua origin

## Testing Lokal (Optional)

Jika ingin test lokal sebelum deploy:

```bash
# Install dependencies
npm install

# Set environment variables
export YOUTUBE_API_KEY=your_key
export FERDEV_API_KEY=key-elfs

# Start server (untuk development)
npm run dev
```

## Troubleshooting

**Problem**: API key 403 error
- **Solution**: Check Vercel environment variables sudah set

**Problem**: CORS error
- **Solution**: Backend sudah handle CORS, check browser console

**Problem**: YouTube API quota
- **Solution**: Batasi request atau upgrade YouTube API quota

---

**Backend siap deploy! 🚀**
