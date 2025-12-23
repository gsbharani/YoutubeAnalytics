// frontend/js/dashboard.js

/**
 * Render channel stats in HTML
 * @param {Object} stats - channel stats object
 */
function renderChannelStats(stats) {
    const container = document.getElementById("result");
    if (!stats) {
        container.innerHTML = "<p>No data available.</p>";
        return;
    }

    container.innerHTML = `
        <div class="card">
            <h3>${stats.channel_name}</h3>
            <p><strong>Subscribers:</strong> ${stats.subscribers}</p>
            <p><strong>Views:</strong> ${stats.views}</p>
            <p><strong>Videos:</strong> ${stats.videos}</p>
        </div>
    `;
}

/**
 * Compare two channels and display table
 * @param {Object} data
 */
function renderComparison(data) {
    const container = document.getElementById("result");
    if (!data) {
        container.innerHTML = "<p>No comparison data available.</p>";
        return;
    }

    let html = `<table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Channel</th>
                <th>Subscribers</th>
                <th>Views</th>
            </tr>
        </thead>
        <tbody>`;

    for (const [channelName, metrics] of Object.entries(data)) {
        metrics.forEach(m => {
            html += `
                <tr>
                    <td>${m.date}</td>
                    <td>${channelName}</td>
                    <td>${m.subscribers}</td>
                    <td>${m.views}</td>
                </tr>
            `;
        });
    }

    html += "</tbody></table>";
    container.innerHTML = html;
}

/**
 * Helper: Fetch + Render
 */
async function analyzeChannel() {
    const urlInput = document.getElementById("url").value;
    const stats = await fetchChannelStats(urlInput);
    renderChannelStats(stats);
}

/**
 * Helper: Compare + Render
 */
async function compare() {
    const ch1 = document.getElementById("channel1").value;
    const ch2 = document.getElementById("channel2").value;
    const data = await compareChannels(ch1, ch2);
    renderComparison(data);
}
