# Frontend Web App (GitHub Pages) — PNS Asset Management Enterprise
### PT Pratama Nusantara Sakti &bull; Google Apps Script Frontend (Dual-Engine)

Folder ini berisi seluruh source code **Frontend Web Statis (Production Ready)** yang dirancang untuk di-hosting di **GitHub Pages** (`https://appsmaheer-cloud.github.io/asset/`), Vercel, Netlify, maupun web server statis lainnya.

Aplikasi ini bertindak sebagai **Frontend untuk Google Apps Script (GAS)**, terhubung langsung ke:
- **Google Apps Script Web App**: `https://script.google.com/macros/s/AKfycbzEbuWMfoV1rnSMObEyZm252npxHNfumMul6iVTZMcs2o9Tfo2ldqsih8x4V9W8jRTgZA/exec`
- **Google Spreadsheet Database**: [Buka Spreadsheet Resmi](https://docs.google.com/spreadsheets/d/1Nc7tl6vtqv-LA2RT8QKW-VjpaKuvm91KCjA1Tg-Bjg0/edit) (ID: `1Nc7tl6vtqv-LA2RT8QKW-VjpaKuvm91KCjA1Tg-Bjg0`)

---

## 📌 Penting: Format URL GitHub Pages
> [!IMPORTANT]
> Pastikan URL yang dibuka di browser adalah:
> **`https://appsmaheer-cloud.github.io/asset/`**
> *(Menggunakan garis miring `/`, **bukan** garis bawah `_` seperti `appsmaheer-cloud.github.io_asset/` yang menyebabkan error DNS!)*

---

## 🏗️ Pembagian Modul & Cakupan Data (Sesuai Versi PHP)

1. **Pilar 1: Seluruh Asset (Enterprise Asset Portfolio)**
   - Menampilkan seluruh portofolio 34.266 aset PT Pratama Nusantara Sakti lintas kategori (Heavy Equipment/Alat Berat, Kendaraan, Mesin Pabrik, Peralatan Pertanian, IT & Kelistrikan, Properti/Bangunan).
   - Metrik Valuasi Finansial: HPP (CAPEX) Rp 124,5 M, Akumulasi Depresiasi Rp 42,8 M, Nilai Buku NBV Rp 81,7 M.
2. **Pilar 2: Facility & Building Management**
   - **Master Gedung Fisik**: **Hanya menampilkan bangunan fisik nyata** (Mess, Longhouse, Kantor, Gudang, Kantin, Klinik, Guest House, Workshop, Pabrik). Data error numeric (`18142`, dsb.) dan non-bangunan (`Dermaga`, `Kanal`, `Parit`, `Jalan`) telah disaring bersih.
   - **Inventaris Ruangan**: Kamar/ruangan dalam bangunan tersebut.
   - **Aset Fasilitas Ruangan**: **HANYA menampilkan aset fasilitas fisik ruangan** (`M_RUANGAN_ASSETS`), seperti Kasur, Ranjang Susun, Lemari, Meja, Kursi, AC Split, TV, Dispenser, Kipas Angin. Tidak bercampur dengan alat berat.
   - **Penghuni Mess & Kamar**: Pencatatan hunian kamar dan nomor kasur karyawan.
3. **Pilar 3: Inspeksi, Audit & Validasi Aset**
   - **Formulir Sensus & Audit 5-Langkah**: Alur inspeksi fisik ruangan, checklist kondisi ruangan, audit checklist aset fasilitas ruangan, foto bukti, dan resume ke Google Sheets.
   - **Riwayat Inspeksi & Audit**: Log audit kelaikan ruangan fasilitas dengan skor persentase.
   - **Report Asset [Validasi Asset]**: Modul Stock Opname aset fisik di lapangan (`asset-validation.php` style), pencatatan status fisik sesuai vs selisih, dan sinkronisasi ke Google Sheets.
   - **Registrasi Aset Baru & Mutasi Antar Lokasi**: Pencatatan mutasi fisik antar gedung/ruangan.
   - **Tiket Work Order**: Penerbitan perbaikan fasilitas (keran bocor, AC mati, dsb.).

---

## 📁 Struktur File `kode_git/`

| Nama File | Ukuran | Fungsi |
| :--- | :--- | :--- |
| `index.html` | ~58 KB | Halaman antarmuka utama (Dashboard, Seluruh Asset, Gedung, Ruangan, Aset Fasilitas, Validasi Opname, Inspeksi 5-Step) |
| `style.css` | ~4.2 KB | Stylesheet tema token 3-layer (Light/Dark Mode, Tailwind utility classes) |
| `config.js` | ~0.7 KB | Konfigurasi URL Google Apps Script Web App & Spreadsheet ID |
| `app.js` | ~75 KB | Engine aplikasi frontend dengan Dual-Engine Bridge (auto-fetch data Google Sheets & auto-submit transaksi) |
| `img/logo-mark.png` | ~6 KB | Logo resmi PT Pratama Nusantara Sakti |
| `img/logo-full.png` | ~12 KB | Logo full PT Pratama Nusantara Sakti |

---

## 🚀 Cara Update / Deploy ke GitHub Pages

1. **Commit & Push File**:
   Copy seluruh file dari `FINAL/kode_git/` ini ke repositori git lokal Anda, lalu push ke GitHub:
   ```bash
   git add .
   git commit -m "Update Frontend GAS: Clean building filter, Enterprise Assets, Validasi Opname"
   git push origin main
   ```
2. **Akses Aplikasi**:
   Buka browser di: **`https://appsmaheer-cloud.github.io/asset/`**
