# 🛡️ Vul_Dashboard  
**KEV Vulnerability Dashboard** — Enriched CISA Feed

This dashboard displays the latest [Known Exploited Vulnerabilities (KEV)](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) curated by CISA, enriched with:

- ⚠️ **CVSS severity scores & vectors** (from the NVD)  
- 📈 **EPSS exploitation likelihood** (from FIRST.org)  
- 📝 **Detailed vulnerability descriptions** (from NVD)  
- 🏷️ **Vendor and product name formatting**

---

## 🔍 Features

- ✅ Auto-updated every **hour** via GitHub Actions (`kev_enriched.json`)
- 📊 **Sortable & filterable** table (by severity, vendor/product, due date, etc.)
- 🔎 **Search** by CVE ID, vendor, or product
- 🧠 **CVSS vector string column** to show exploitability detail
- 📁 **CSV export** for reporting or triage workflows
- 🌙 **Dark mode toggle**
- ⏱️ **Time frame filter** (e.g. last 7 days, 30 days, 1 year)
- 🚨 **Overdue dates highlighted in red**
- 🧩 **N/A scores link directly to NVD for fallback info**
- 🔽 Descriptions are collapsible if too long

---

## ⚙️ How It Works

- 🔄 `kev_enriched.json` is rebuilt hourly by GitHub Actions
- 📚 NVD data is parsed from a pre-fetched local `nvd_data.json`
- 💡 Data sources:
  - [CISA KEV Feed (JSON)](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json)
  - [NVD Modified JSON Feed](https://nvd.nist.gov/vuln/data-feeds)
  - [FIRST.org EPSS API](https://www.first.org/epss)
- 🛠️ Missing or outdated CVSS/descriptions are optionally enriched via NVD API fallback

---

## 🌐 Viewing the Dashboard

- 📂 If this repo is private, **clone and open `index.html` locally**  
- 🔗 If GitHub Pages is enabled, view the live dashboard at:  
  [https://AUS5T.github.io/Vul_Dashboard/](https://AUS5T.github.io/Vul_Dashboard/)

---

## 🗂️ Project Structure

```
📦 Vul_Dashboard
┣ 📄 index.html # Dashboard UI (sortable table, filters, legend)
┣ 📄 script.js # Data loading, filtering, sorting, pagination
┣ 📄 style.css # Visual styling (light/dark mode, table design)
┣ 📄 kev_enriched.json # Auto-updated enriched KEV + NVD + EPSS data
┣ 📄 last_updated.txt # Timestamp of last data sync
┣ 📄 kev_enriched.xml # Optional RSS version of the feed
```


---

## 🤝 Credits

- 📊 CVE, CVSS, and descriptions from [NVD](https://nvd.nist.gov/)
- 🔐 Exploited vulnerability listings from [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
- 📈 Exploit likelihood predictions from [FIRST.org EPSS](https://www.first.org/epss/)
- 🤖 Automation powered by **GitHub Actions**

---

## 🚧 Status

This dashboard is under **active development**.  
Feel free to open issues or pull requests with suggestions!
