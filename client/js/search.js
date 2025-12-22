let searchTimeout;

// Get backend API base URL
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : '';

document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('urlInput');
    const searchResults = document.getElementById('searchResults');
    const downloadForm = document.getElementById('downloadForm');

    urlInput.addEventListener('input', function(e) {
        const query = e.target.value.trim();
        
        clearTimeout(searchTimeout);
        
        if (!query) {
            searchResults.innerHTML = '';
            return;
        }
        
        // Check if it's a URL
        if (query.includes('youtube.com') || query.includes('youtu.be')) {
            searchResults.innerHTML = '';
            return;
        }
        
        // Search YouTube
        searchTimeout = setTimeout(() => {
            searchYouTube(query);
        }, 300);
    });

    downloadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const url = urlInput.value.trim();
        
        if (url) {
            window.location.href = `/download.html?url=${encodeURIComponent(url)}`;
        }
    });
});

async function searchYouTube(query) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '<div class="search-loading">Searching...</div>';
    
    try {
        // Call backend API (Vercel) instead of YouTube directly
        const apiUrl = `${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}&maxResults=6`;
        const response = await fetch(apiUrl);
        
        const data = await response.json();
        
        if (data.success && data.data && data.data.length > 0) {
            displaySearchResults(data.data);
        } else {
            searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
        }
    } catch (error) {
        console.error('Search error:', error);
        searchResults.innerHTML = '<div class="search-error">Search failed. Please try again.</div>';
    }
}

function displaySearchResults(items) {
    const searchResults = document.getElementById('searchResults');
    
    let html = '<div class="search-results-grid">';
    
    items.forEach(item => {
        const videoId = item.id.videoId;
        const title = escapeHtml(item.snippet.title);
        const channel = escapeHtml(item.snippet.channelTitle);
        const thumbnail = item.snippet.thumbnails.medium.url;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        
        html += `
            <div class="search-result-card" onclick="selectVideo('${videoUrl}')">
                <div class="card-thumbnail">
                    <img src="${thumbnail}" alt="Video thumbnail">
                    <div class="card-play-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-title">${title}</div>
                    <div class="card-channel">${channel}</div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    searchResults.innerHTML = html;
}

function selectVideo(videoUrl) {
    window.location.href = `/download.html?url=${encodeURIComponent(videoUrl)}`;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
