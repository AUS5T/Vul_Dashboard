# 🛡️ Vul_Dashboard  
**KEV Vulnerability Dashboard** — Enriched CISA Feed

This dashboard displays the latest [Known Exploited Vulnerabilities (KEV)](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) curated by CISA, enriched with:

- ⚠️ **CVSS severity scores** (from the NVD)  
- 📈 **EPSS exploitation likelihood** (from FIRST.org)

---

## 🔍 Features

- ✅ Updated every **10 minutes** via GitHub Actions (`kev_enriched.json`)
- 📊 **Sortable & filterable** table (by severity, product, due date, etc.)
- 🔎 **Search** by CVE ID or product name
- 📁 **CSV export** for reporting or triage workflows
- 🌙 **Dark mode toggle**
- ⏱️ **Time frame filter** (e.g. last 7 days, 30 days, 1 year)
- 🚨 **Overdue dates highlighted in red**

---

## ⚙️ How It Works

- 🔄 `kev_enriched.json` is automatically updated by GitHub Actions
- 💡 Data sources:
  - [CISA KEV Feed (JSON)](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json)
  - [NVD Modified JSON Feed](https://nvd.nist.gov/vuln/data-feeds)
  - [FIRST.org EPSS API](https://www.first.org/epss)

---

## 🌐 Viewing the Dashboard

- 📂 If this repo is private, **clone and open `index.html` locally**  
- 🔗 If GitHub Pages is enabled, view the live dashboard at:  
  [https://AUS5T.github.io/Vul_Dashboard/](https://AUS5T.github.io/Vul_Dashboard/)

---

## 🗂️ Project Structure

```
📦 Vul_Dashboard
┣ 📄 index.html         # Dashboard UI
┣ 📄 script.js          # Data loader, filtering, pagination
┣ 📄 style.css          # Visual styling & dark mode
┣ 📄 kev_enriched.json  # Auto-updated enriched KEV data
┣ 📄 last_updated.txt   # Timestamp for last sync
```

---

## 🤝 Credits

- 📊 CVE + CVSS data from [NVD](https://nvd.nist.gov/)
- 🔐 Exploited vulnerability data from [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
- 📈 EPSS prediction from [FIRST.org](https://www.first.org/epss/)
- 🔧 Automation powered by **GitHub Actions**

---

## 🚧 Status

This dashboard is under **active development**.  
Suggestions and contributions welcome!
