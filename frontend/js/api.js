// frontend/js/api.js

const API_BASE = "http://localhost:8000"; // Replace with your deployed API URL

/**
 * Fetch channel stats from backend
 * @param {string} url - YouTube channel URL
 */
async function fetchChannelStats(url) {
    try {
        const response = await fetch(`${API_BASE}/channel/analyze?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching channel stats:", error);
        return null;
    }
}

/**
 * Fetch comparison between two channels
 * @param {string} channel1
 * @param {string} channel2
 */
async function compareChannels(channel1, channel2) {
    try {
        const response = await fetch(`${API_BASE}/channel/compare?channel1=${encodeURIComponent(channel1)}&channel2=${encodeURIComponent(channel2)}`);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error comparing channels:", error);
        return null;
    }
}
