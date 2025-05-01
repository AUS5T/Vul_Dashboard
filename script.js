// === Load vulnerability data and render table ===
fetch('kev_enriched.json')
  .then(response => response.json())
  .then(data => {
    populateTable(data);
    initSearchAndSort();
  });

// === Create and populate the table ===
function populateTable(data) {
  const tableBody = document.querySelector("#vulnTable tbody");
  tableBody.innerHTML = "";

  data.forEach(item => {
    const row = document.createElement("tr");

    // CVSS score with version in parentheses
    const cvssScoreDisplay = item.cvssScore !== "N/A" && item.cvssVersion !== "N/A"
      ? `${item.cvssScore} (${item.cvssVersion})`
      : "N/A";

    // Add each cell in the correct order
    const fields = [
      item.cveID,
      item.vendor,
      item.product,
      item.description || item.vulnerabilityName || "N/A", // Vulnerability column = description
      cvssScoreDisplay,
      item.cvssSeverity,
      item.epssScore,
      item.epssPercentile,
      item.dueDate,
      item.requiredAction
    ];

    fields.forEach((field, index) => {
      const cell = document.createElement("td");

      // Tooltip with CVSS vector on hover for Vulnerability column
      if (index === 3 && item.cvssVector !== "N/A") {
        cell.title = `Attack Vector: ${item.cvssVector}`;
      }

      cell.textContent = field;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}

// === Search and sort functionality ===
function initSearchAndSort() {
  const searchInput = document.getElementById("searchInput");
  const table = document.getElementById("vulnTable");
  const headers = table.querySelectorAll("thead th");
  let sortDirection = Array(headers.length).fill(true); // true = ascending

  // Search filter
  searchInput.addEventListener("keyup", function () {
    const filter = this.value.toLowerCase();
    const rows = table.querySelectorAll("tbody tr");

    rows.forEach(row => {
      const visible = Array.from(row.cells).some(cell =>
        cell.textContent.toLowerCase().includes(filter)
      );
      row.style.display = visible ? "" : "none";
    });
  });

  // Click-to-sort for each header
  headers.forEach((header, columnIndex) => {
    header.addEventListener("click", () => {
      const tbody = table.querySelector("tbody");
      const rows = Array.from(tbody.querySelectorAll("tr"));
      const ascending = sortDirection[columnIndex];

      rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent;
        const bText = b.cells[columnIndex].textContent;

        const aNum = parseFloat(aText);
        const bNum = parseFloat(bText);

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return ascending ? aNum - bNum : bNum - aNum;
        }

        return ascending
          ? aText.localeCompare(bText)
          : bText.localeCompare(aText);
      });

      rows.forEach(row => tbody.appendChild(row));
      sortDirection[columnIndex] = !ascending;
    });
  });
}

// === Toggle dark mode theme ===
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
