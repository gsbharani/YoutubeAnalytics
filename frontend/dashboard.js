fetchChannels().then(data => {
  const table = document.getElementById("channelTable");
  table.innerHTML = `
    <tr>
      <th>Channel</th>
      <th>Subscribers</th>
      <th>Views</th>
      <th>Videos</th>
    </tr>
  `;

  data.forEach(c => {
    table.innerHTML += `
      <tr>
        <td>${c.channel_name}</td>
        <td>${c.subscribers.toLocaleString()}</td>
        <td>${c.views.toLocaleString()}</td>
        <td>${c.videos}</td>
      </tr>
    `;
  });
});
