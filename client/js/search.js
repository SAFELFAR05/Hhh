const YOUTUBE_API_KEY = 'AIzaSyAPozavhnaoDbUarZB6rQlfar1K6qlLnCE';
let searchTimeout;

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

    document.addEventListener('click', function(e) {
        if (e.target.closest('.search-result-item')) {
            return;
        }
        if (!e.target.closest('.search-wrapper')) {
            searchResults.innerHTML = '';
        }
    });
});

async function searchYouTube(query) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '<div class="search-loading">Searching...</div>';
    
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`
        );
        
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            displaySearchResults(data.items);
        } else {
            searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
        }
    } catch (error) {
        console.error('Search error:', error);
        searchResults.innerHTML = '<div class="search-error">Search failed</div>';
    }
}

function displaySearchResults(items) {
    const searchResults = document.getElementById('searchResults');
    const urlInput = document.getElementById('urlInput');
    
    let html = '<div class="search-results-list">';
    
    items.forEach(item => {
        const videoId = item.id.videoId;
        const title = escapeHtml(item.snippet.title);
        const channel = escapeHtml(item.snippet.channelTitle);
        const thumbnail = item.snippet.thumbnails.default.url;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        
        html += `
            <div class="search-result-item" onclick="selectVideo('${videoUrl}')">
                <img src="${thumbnail}" alt="Video thumbnail" class="search-result-thumbnail">
                <div class="search-result-info">
                    <div class="search-result-title">${title}</div>
                    <div class="search-result-channel">${channel}</div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    searchResults.innerHTML = html;
}

function selectVideo(videoUrl) {
    const urlInput = document.getElementById('urlInput');
    const searchResults = document.getElementById('searchResults');
    
    urlInput.value = videoUrl;
    searchResults.innerHTML = '';
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
