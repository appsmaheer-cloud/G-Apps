# Frontend Web App (GitHub Pages) — PNS Asset Management Enterprise
### PT Pratama Nusantara Sakti &bull; Google Apps Script Frontend

Folder ini berisi seluruh source code **Frontend Web Statis (Production Ready)** yang dirancang untuk di-hosting di **GitHub Pages** (misalnya `https://appsmaheer-cloud.github.io/asset/` atau `https://appsmaheer-cloud.github.io/pns_asset/`), Vercel, Netlify, maupun web server statis lainnya.

Aplikasi ini bertindak sebagai **Frontend untuk Google Apps Script (GAS)**, terhubung langsung ke:
- **Google Apps Script Web App**: `https://script.google.com/macros/s/AKfycbzEbuWMfoV1rnSMObEyZm252npxHNfumMul6iVTZMcs2o9Tfo2ldqsih8x4V9W8jRTgZA/exec`
- **Google Spreadsheet Database**: [Buka Spreadsheet Resmi](https://docs.google.com/spreadsheets/d/1Nc7tl6vtqv-LA2RT8QKW-VjpaKuvm91KCjA1Tg-Bjg0/edit) (ID: `1Nc7tl6vtqv-LA2RT8QKW-VjpaKuvm91KCjA1Tg-Bjg0`)

---

## 📁 Struktur File `kode_git/`

| Nama File | Ukuran | Fungsi |
| :--- | :--- | :--- |
| `index.html` | ~52 KB | Halaman antarmuka utama (Dashboard, Inspeksi 5-Langkah, Master Gedung, Ruangan, Aset, Work Order, Penghuni) |
| `style.css` | ~4.2 KB | Stylesheet tema token 3-layer (Light/Dark Mode, Tailwind utility classes) |
| `config.js` | ~0.7 KB | Konfigurasi URL Google Apps Script Web App & Spreadsheet ID |
| `app.js` | ~67 KB | Engine aplikasi frontend dengan Dual-Engine Bridge (auto-fetch data Google Sheets & auto-submit transaksi) |
| `img/logo-mark.png` | ~6 KB | Logo resmi PT Pratama Nusantara Sakti |

---

## 🚀 Cara Deployment ke GitHub Pages

1. **Commit & Push**:
   Upload seluruh isi folder `kode_git/` ini ke branch `main` atau `gh-pages` pada repositori GitHub Anda (misal `appsmaheer-cloud/asset`).
2. **Aktifkan GitHub Pages**:
   - Di repositori GitHub, buka tab **Settings** -> **Pages**.
   - Pada bagian **Build and deployment**, pilih **Source: Deploy from a branch**.
   - Pilih branch: `main` dan folder: `/ (root)`.
   - Klik **Save**.
3. **Buka Aplikasi**:
   Setelah beberapa detik, aplikasi aktif di:
   `https://appsmaheer-cloud.github.io/<nama-repo>/` (contoh: `https://appsmaheer-cloud.github.io/asset/`).
