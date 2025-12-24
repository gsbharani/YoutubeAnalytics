const API_BASE = "https://youtubeanalytics-2saa.onrender.com";

async function fetchChannels() {
  const res = await fetch(`${API_BASE}/channels`);
  return res.json();
}
