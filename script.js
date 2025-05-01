document.addEventListener('DOMContentLoaded', () => {
  fetch('kev_enriched.json')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#vuln-table tbody');
      tableBody.innerHTML = '';

      data.forEach(vuln => {
        const row = document.createElement('tr');

        const scoreWithVersion = vuln.cvssScore !== "N/A"
          ? `${vuln.cvssScore} (${vuln.cvssVersion})`
          : '';

        row.innerHTML = `
          <td><a href="https://nvd.nist.gov/vuln/detail/${vuln.cveID}" target="_blank">${vuln.cveID}</a></td>
          <td>${vuln.vendor || ''}</td>
          <td>${vuln.product || ''}</td>
          <td title="Attack Vector: ${vuln.cvssVector || 'N/A'}">${vuln.description || vuln.vulnerabilityName || ''}</td>
          <td>${scoreWithVersion}</td>
          <td>${vuln.cvssSeverity !== "N/A" ? vuln.cvssSeverity : ''}</td>
          <td>${vuln.epssScore !== "N/A" ? vuln.epssScore : ''}</td>
          <td>${vuln.epssPercentile !== "N/A" ? vuln.epssPercentile : ''}</td>
          <td>${vuln.dueDate || ''}</td>
          <td>${vuln.requiredAction || ''}</td>
        `;
        tableBody.appendChild(row);
      });

      // Init DataTable with sorting and searching
      $('#vuln-table').DataTable({
        order: [[0, 'asc']],
        pageLength: 25
      });
    });
});
