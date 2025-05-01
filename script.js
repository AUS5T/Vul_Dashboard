// === Fetch the enriched KEV data ===
fetch('kev_enriched.json')
  .then(response => response.json())
  .then(data => populateTable(data));

// === Populate the HTML table with KEV data ===
function populateTable(data) {
  const tableBody = document.getElementById('kev-table-body');
  tableBody.innerHTML = '';

  data.forEach(entry => {
    const row = document.createElement('tr');

    // Format each column cell
    row.innerHTML = `
      <td>${entry.cveID}</td>
      <td>${entry.vendor || ''}</td>
      <td>${entry.product || ''}</td>
      <td>${entry.vulnerabilityName || ''}</td>
      <td>${entry.dateAdded || ''}</td>
      <td>${entry.dueDate || ''}</td>
      <td>${entry.description || 'N/A'}</td>  <!-- NEW: CVE description -->
      <td>${entry.requiredAction || ''}</td>
      <td>${entry.cvssScore}</td>
      <td>${entry.cvssSeverity}</td>
      <td>${entry.cvssVersion}</td>
      <td>${entry.epssScore}</td>
      <td>${entry.epssPercentile}</td>
    `;

    tableBody.appendChild(row);
  });
}

// === Filter table by search input ===
function searchTable() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toUpperCase();
  const rows = document.querySelectorAll('#kev-table-body tr');

  rows.forEach(row => {
    const cells = row.getElementsByTagName('td');
    let match = false;

    // Search in all columns
    for (let i = 0; i < cells.length; i++) {
      const textValue = cells[i].textContent || cells[i].innerText;
      if (textValue.toUpperCase().indexOf(filter) > -1) {
        match = true;
        break;
      }
    }

    row.style.display = match ? '' : 'none';
  });
}

// === Listen for search bar input ===
document.getElementById('searchInput').addEventListener('input', searchTable);
