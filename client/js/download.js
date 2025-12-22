// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Get URL from query parameter
const urlParams = new URLSearchParams(window.location.search);
const videoUrl = urlParams.get('url');

// DOM elements
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const noUrlState = document.getElementById('noUrlState');
const resultsState = document.getElementById('resultsState');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');
const downloadAnotherBtn = document.getElementById('downloadAnotherBtn');

// Show appropriate state based on URL
if (!videoUrl) {
    showNoUrlState();
} else {
    fetchVideoData(videoUrl);
}

async function fetchVideoData(url) {
    try {
        loadingState.style.display = 'flex';
        errorState.style.display = 'none';
        noUrlState.style.display = 'none';
        resultsState.style.display = 'none';

        const apiKey = "key-elfs";
        
        // Detect if it's a YouTube Short or regular video
        const isShort = url.includes('/shorts/');
        const endpoint = isShort ? 'ytshorts' : 'ytmp4';
        const apiUrl = `https://api.ferdev.my.id/downloader/${endpoint}?link=${encodeURIComponent(url)}&apikey=${apiKey}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Failed to fetch YouTube video. Please check the URL and try again.");
        }

        const data = await response.json();
        
        if (!data.success || !data.data) {
            throw new Error("Invalid YouTube URL or video not found.");
        }

        displayResults(data.data, isShort);
    } catch (error) {
        showError(error.message);
    }
}

function displayResults(data, isShort = false) {
    loadingState.style.display = 'none';
    errorState.style.display = 'none';
    resultsState.style.display = 'block';
    downloadAnotherBtn.style.display = 'flex';
    document.getElementById('adSpaceBottom').style.display = 'block';

    let downloadUrl = '';
    let videoTitle = '';

    if (isShort) {
        // Handle YouTube Shorts format: { title, download }
        videoTitle = data.title;
        downloadUrl = data.download;
    } else {
        // Handle regular YouTube format: { metadata, dlink }
        const { metadata, dlink } = data;
        downloadUrl = dlink;
        
        // Display video card if we have metadata
        if (metadata) {
            const videoCard = document.getElementById('videoCard');
            videoCard.style.display = 'block';

            if (metadata.thumbnail) {
                const thumbnailSection = document.getElementById('thumbnailSection');
                thumbnailSection.style.display = 'block';
                document.getElementById('thumbnail').src = metadata.thumbnail;
            }

            if (metadata.title) {
                videoTitle = metadata.title;
                document.getElementById('videoTitle').textContent = metadata.title;
            }

            // Display metadata
            const videoMeta = document.getElementById('videoMeta');
            videoMeta.innerHTML = '';

            if (metadata.author) {
                videoMeta.innerHTML += `
                    <div class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>${escapeHtml(metadata.author)}</span>
                    </div>
                `;
            }

            if (metadata.duration && metadata.duration.timestamp) {
                videoMeta.innerHTML += `
                    <div class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>${escapeHtml(metadata.duration.timestamp)}</span>
                    </div>
                `;
            }

            if (metadata.viewers) {
                const viewerCount = formatViewerCount(metadata.viewers);
                videoMeta.innerHTML += `
                    <div class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        <span>${viewerCount} views</span>
                    </div>
                `;
            }

            if (metadata.upload) {
                videoMeta.innerHTML += `
                    <div class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>${escapeHtml(metadata.upload)}</span>
                    </div>
                `;
            }
        }
    }

    // For Shorts: Display title without the video card
    if (isShort && videoTitle) {
        const videoCard = document.getElementById('videoCard');
        videoCard.style.display = 'block';
        
        const thumbnailSection = document.getElementById('thumbnailSection');
        thumbnailSection.style.display = 'none';
        
        document.getElementById('videoTitle').textContent = videoTitle;
        
        const videoMeta = document.getElementById('videoMeta');
        videoMeta.innerHTML = `
            <div class="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
                <span>YouTube Short</span>
            </div>
        `;
    }

    // Process download link
    let downloadLinks = [];

    if (downloadUrl) {
        const label = isShort ? 'Download Short (MP4)' : 'Download MP4 (Best Quality)';
        downloadLinks = [{
            url: downloadUrl,
            label: label,
            extension: 'mp4',
            id: 0
        }];
    }

    // Display download links
    const downloadLinksContainer = document.getElementById('downloadLinks');
    downloadLinksContainer.innerHTML = '';

    downloadLinks.forEach((link, index) => {
        const icon = getMediaIcon(link.extension);
        const html = `
            <div class="download-link-item">
                <div class="link-info">
                    <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${icon}
                    </svg>
                    <div class="link-details">
                        <div class="link-label">${escapeHtml(link.label)}</div>
                        ${link.size ? `<div class="link-size">${escapeHtml(link.size)}</div>` : ''}
                    </div>
                </div>
                <div class="link-actions">
                    <button class="copy-btn" onclick="copyLink('${escapeAttr(link.url)}', this)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        </svg>
                        Copy
                    </button>
                    <a href="${escapeAttr(link.url)}" class="download-link-btn" download>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download
                    </a>
                </div>
            </div>
        `;
        downloadLinksContainer.innerHTML += html;
    });

    // Display dynamic details from metadata (only for regular videos)
    if (!isShort && data.metadata) {
        const dynamicDetails = Object.entries(data.metadata).filter(([key, value]) => {
            if (['title', 'thumbnail', 'author', 'duration', 'viewers', 'upload', 'description', 'channel'].includes(key)) return false;
            if (typeof value === 'object' && value !== null) return false;
            if (!value || (Array.isArray(value) && value.length === 0)) return false;
            return true;
        });

        if (dynamicDetails.length > 0) {
            document.getElementById('detailsSection').style.display = 'block';
            const detailsGrid = document.getElementById('dynamicDetails');
            detailsGrid.innerHTML = '';

            dynamicDetails.forEach(([key, value]) => {
                const label = formatLabel(key);
                const isUrl = typeof value === 'string' && value.startsWith('http');

                const html = `
                    <div class="detail-item">
                        <div class="detail-label">${escapeHtml(label)}</div>
                        <div class="detail-value">
                            ${isUrl ? `<a href="${escapeAttr(value)}" target="_blank" rel="noreferrer">View Link</a>` : escapeHtml(String(value))}
                        </div>
                    </div>
                `;
                detailsGrid.innerHTML += html;
            });
        }
    }
}

function showError(message) {
    loadingState.style.display = 'none';
    noUrlState.style.display = 'none';
    resultsState.style.display = 'none';
    errorState.style.display = 'flex';
    errorMessage.textContent = message;
    downloadAnotherBtn.style.display = 'flex';

    retryBtn.onclick = () => {
        fetchVideoData(videoUrl);
    };
}

function showNoUrlState() {
    loadingState.style.display = 'none';
    errorState.style.display = 'none';
    resultsState.style.display = 'none';
    noUrlState.style.display = 'flex';
}

// Helper functions
function copyLink(url, button) {
    navigator.clipboard.writeText(url).then(() => {
        const originalHtml = button.innerHTML;
        button.textContent = 'Copied!';
        button.classList.add('copied');

        setTimeout(() => {
            button.innerHTML = originalHtml;
            button.classList.remove('copied');
        }, 2000);
    });
}

function formatFileSize(bytes) {
    if (!bytes) return '';
    const mb = bytes / 1024 / 1024;
    return mb.toFixed(2) + ' MB';
}

function getExtensionFromUrl(url) {
    const match = url.split('.').pop()?.split('?')[0]?.toLowerCase();
    return match || '';
}

function getMediaIcon(extension) {
    const ext = extension.toLowerCase();

    if (['mp3', 'm4a', 'wav', 'aac', 'ogg'].includes(ext)) {
        return '<path d="M9 18V5l12-2v13A4 4 0 1 1 15 15M9 9h12M9 13h12"></path>';
    }

    if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic'].includes(ext)) {
        return '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>';
    }

    return '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>';
}

function formatLabel(key) {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .replace(/^\w/, c => c.toUpperCase())
        .trim();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeAttr(text) {
    return text.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function formatViewerCount(count) {
    if (count >= 1000000000) {
        return (count / 1000000000).toFixed(1) + 'B';
    } else if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
}
