let tableData = [];
let sortDirection = true;

fetch("data/youtube_data.csv")
  .then(res => res.text())
  .then(csv => {
    const rows = csv.trim().split("\n");
    const headers = rows[0].split(",");

    tableData = rows.slice(1).map(row => {
      const values = row.split(",");
      let obj = {};
      headers.forEach((h, i) => obj[h] = values[i]);
      return obj;
    });

    renderTable(headers, tableData);
    renderCharts(tableData);
  });

function renderTable(headers, data) {
  const thead = document.querySelector("#channelTable thead");
  const tbody = document.querySelector("#channelTable tbody");

  thead.innerHTML = "<tr>" +
    headers.map(h => `<th onclick="sortTable('${h}')">${h}</th>`).join("") +
    "</tr>";

  tbody.innerHTML = "";
  data.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = headers.map(h => `<td>${row[h]}</td>`).join("");
    tbody.appendChild(tr);
  });
}

// 🔍 Search
document.getElementById("searchInput").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = tableData.filter(r =>
    r["Channel Name"].toLowerCase().includes(value)
  );
  renderTable(Object.keys(tableData[0]), filtered);
});

// ↕ Sorting
function sortTable(column) {
  sortDirection = !sortDirection;
  tableData.sort((a, b) => {
    const valA = isNaN(a[column]) ? a[column] : Number(a[column]);
    const valB = isNaN(b[column]) ? b[column] : Number(b[column]);
    return sortDirection ? valA > valB ? 1 : -1 : valA < valB ? 1 : -1;
  });
  renderTable(Object.keys(tableData[0]), tableData);
}

// 📊 Charts
function renderCharts(data) {
  const labels = data.map(d => d["Channel Name"]);
  const subs = data.map(d => Number(d["Subscribers"]));
  const views = data.map(d => Number(d["Total Views"]));

  new Chart(document.getElementById("subscribersChart"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Subscribers",
        data: subs
      }]
    }
  });

  new Chart(document.getElementById("viewsChart"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Total Views",
        data: views
      }]
    }
  });
}
