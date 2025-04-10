let tableData = [];
let fullData = [];
let currentPage = 1;
const pageSize = 25;

fetch('kev_enriched.json')
  .then(res => res.json())
  .then(data => {
    fullData = data;
    tableData = data;
    renderTable();
  });

function renderTable() {
  const tbody = document.querySelector("#kevTable tbody");
  tbody.innerHTML = "";

  const totalPages = Math.ceil(tableData.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageData = tableData.slice(start, end);

  pageData.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><a href="https://nvd.nist.gov/vuln/detail/${item.cveID}" target="_blank">${item.cveID}</a></td>
      <td>${item.product || ''}</td>
      <td>${item.cvssSeverity || ''}</td>
      <td>${item.cvssScore || ''}</td>
      <td>${item.epssScore !== "N/A" && item.epssScore != null ? item.epssScore.toFixed(4) : 'N/A'}</td>
      <td>${item.epssPercentile !== "N/A" && item.epssPercentile != null ? (item.epssPercentile * 100).toFixed(2) + '%' : 'N/A'}</td>
      <td>${item.dueDate || ''}</td>
      <td>${item.requiredAction || ''}</td>
    `;

    tbody.appendChild(row);
  });

    // ✅ Update pagination display
  document.getElementById("pageIndicator").textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;

}

document.getElementById("searchBox").addEventListener("input", e => {
  const search = e.target.value.toLowerCase();
  const filtered = fullData.filter(item =>
    item.cveID.toLowerCase().includes(search) ||
    (item.product && item.product.toLowerCase().includes(search))
  );
  tableData = filtered;
  currentPage = 1;
  renderTable();
});

document.getElementById("severityFilter").addEventListener("change", e => {
  const value = e.target.value;
  const filtered = value
    ? fullData.filter(item => item.cvssSeverity === value)
    : fullData; // We'll define this in a moment
  tableData = filtered;
  currentPage = 1;
  renderTable();
});

let sortDirections = {}; // Tracks ascending/descending state per column

function sortTable(columnIndex) {
  const keyMap = {
    0: "cveID",
    1: "product",
    2: "cvssSeverity",
    3: "cvssScore",
    4: "epssScore",
    5: "epssPercentile",
    6: "dueDate",
    // 7 is Required Action, not sortable
  };

  const key = keyMap[columnIndex];
  sortDirections[key] = !sortDirections[key]; // Toggle direction
  const direction = sortDirections[key] ? 1 : -1;

  // Clear all indicators
  document.querySelectorAll(".sort-indicator").forEach(el => el.textContent = "");
  const numericOrDate = ["cvssScore", "epssScore", "epssPercentile", "dueDate"];
  const arrow = numericOrDate.includes(key)
    ? (direction === 1 ? "▼" : "▲")  // Reverse for numeric/date
    : (direction === 1 ? "▲" : "▼");
  
  document.getElementById(`sort-${columnIndex}`).textContent = arrow;

  const sorted = [...tableData].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    // Numeric fields
    if (["cvssScore", "epssScore", "epssPercentile"].includes(key)) {
      const numA = parseFloat(valA) || 0;
      const numB = parseFloat(valB) || 0;
      return (numA - numB) * direction;
    }

    // Date field
    if (key === "dueDate") {
      const dateA = new Date(valA);
      const dateB = new Date(valB);
      return (dateA - dateB) * direction;
    }

    // Text/Other fields
    const strA = valA ? valA.toString().toLowerCase() : "";
    const strB = valB ? valB.toString().toLowerCase() : "";
    return strA.localeCompare(strB) * direction;
  });

  tableData = sorted;
  currentPage = 1;
  renderTable();

}

function exportToCSV() {
  const headers = ["CVE ID", "Product", "Severity", "CVSS", "Required Action", "Due Date"];
  const rows = tableData.map(item => [
    item.cveID, item.product, item.cvssSeverity,
    item.cvssScore, item.requiredAction, item.dueDate
  ]);
  const csv = [headers, ...rows].map(row => row.join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "kev_enriched.csv";
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById("darkModeToggle").addEventListener("change", e => {
  document.body.classList.toggle("dark", e.target.checked);
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
    document.getElementById("pagination").scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  const totalPages = Math.ceil(tableData.length / pageSize);
  if (currentPage < totalPages) {
    currentPage++;
    renderTable();
    document.getElementById("pagination").scrollIntoView({ behavior: "smooth", block: "center" });
  }
});
