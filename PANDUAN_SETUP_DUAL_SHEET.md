# 📋 PANDUAN LENGKAP: 1 WEB APP DENGAN 2 GOOGLE SHEET TERPISAH
### Portal Layanan GS & Sistem Inventaris ATK / Gudang Persediaan
**PT Pratama Nusantara Sakti (PNS)**

---

## 🌟 1. Ikhtisar Arsitektur Sistem

Sesuai kebutuhan, arsitektur sistem dirancang menjadi **1 Portal Web Terpadu** yang ditenagai oleh **2 Google Spreadsheet Terpisah**:

```
                              ┌────────────────────────────────────────┐
                              │     WEB APPLICATION (1 Portal)         │
                              │   (Google Apps Script / GitHub Pages)  │
                              └───────────────────┬────────────────────┘
                                                  │
                                   Routing Otomatis (SheetDB.js)
                                                  │
                 ┌────────────────────────────────┴────────────────────────────────┐
                 ▼                                                                 ▼
┌─────────────────────────────────┐                             ┌─────────────────────────────────┐
│     GOOGLE SPREADSHEET 1        │                             │     GOOGLE SPREADSHEET 2        │
│    "PORTAL LAYANAN GS"          │                             │  "INVENTARIS ATK & PERSEDIAAN"  │
├─────────────────────────────────┤                             ├─────────────────────────────────┤
│ • users                         │                             │ • Master & Saldo Stok           │
│ • rooms                         │                             │   (218 SKU + Live SUMIF Rumus)  │
│ • bookings (771 data)           │                             │ • Barang Masuk                  │
│ • car_requests                  │                             │   (12 Kolom PO / TPB Logistik)  │
│ • virtual_meetings (Zoom)       │                             │ • Barang Keluar                 │
│ • edoc_documents                │                             │   (16 Kolom BKB & Cost Object)  │
│ • edoc_logs & settings          │                             │ • data_karyawan                 │
│ • system_settings               │                             │   (34 Karyawan & Cost Object)   │
└─────────────────────────────────┘                             └─────────────────────────────────┘
```

### Keunggulan Utama:
1. **User Experience Praktis:** Karyawan dan Admin cukup membuka **1 Link Web App**. Tidak perlu bolak-balik ganti tautan.
2. **Kemandirian Database:** Data operasional kantor (Meeting/Mobil/Surat Jalan) tidak tercampur dengan data mutasi barang gudang persediaan.
3. **Pengolahan 2 Arah (Two-Way Sync):**
   - **Bisa diolah via Google Sheet langsung:** Admin persediaan dapat menginput penerimaan barang di sheet `Barang Masuk` atau pengeluaran di `Barang Keluar`. Rumus `SUMIF` di sheet `Master & Saldo Stok` langsung menghitung mutasi dan saldo akhir seketika.
   - **Bisa diolah via Web Apps:** Pengguna dapat mengajukan pengeluaran ATK (BKB), melihat sisa stok, status reorder, grafik pembebanan departemen, hingga tanda tangan serah terima digital melalui Web App.
4. **100% Sesuai `alat-tulis-kantor.xlsx`:** Struktur sheet, nama kolom, 218 SKU item, formula kalkulasi stok, dan 34 data karyawan diambil langsung dari file Excel resmi Anda.

---

## 🗂 2. Struktur Google Sheet 2: Inventaris ATK & Persediaan

Spreadsheet 2 memiliki 4 sheet utama yang identik dengan file `alat-tulis-kantor.xlsx`:

### A. Sheet `Master & Saldo Stok`
- **Baris 1 - 4 (KPI Banner Ringkasan):**
  - **Total SKU:** `=COUNTA(A7:A)`
  - **Total Valuasi Persediaan (Rp):** `=SUM(K7:K)`
  - **Item Menipis / Perlu Reorder:** `=COUNTIF(L7:L,"*Habis*")+COUNTIF(L7:L,"*Reorder*")`
- **Baris 6 (Headers Kolom):**
  `KODE BARANG` | `NAMA BARANG` | `GUDANG` | `SATUAN` | `SALDO AWAL (INPUT)` | `JUMLAH IN (AUTO)` | `JUMLAH OUT (AUTO)` | `JUMLAH RETUR` | `SALDO AKHIR (AUTO)` | `Harga Satuan (Rp)` | `Nilai Persediaan (Rp)` | `Status Stok`
- **Baris 7+ (218 Item Barang dengan Formula Live):**
  - Kolom F (`JUMLAH IN`): `=IF(A7="","",SUMIF('Barang Masuk'!F:F, A7, 'Barang Masuk'!I:I))`
  - Kolom G (`JUMLAH OUT`): `=IF(A7="","",SUMIF('Barang Keluar'!I:I, A7, 'Barang Keluar'!L:L))`
  - Kolom I (`SALDO AKHIR`): `=IF(A7="","",E7+F7-G7+H7)`
  - Kolom K (`NILAI PERSEDIAAN`): `=IF(A7="","",I7*J7)`
  - Kolom L (`STATUS STOK`): `=IF(A7="","",IF(I7<=0,"Stok Habis",IF(I7<=2,"Perlu Reorder","Aman")))`

### B. Sheet `Barang Masuk` (12 Kolom)
Mencatat penerimaan PO / TPB logistik HO:
`NO` | `NO DOKUMEN / PO` | `TANGGAL` | `TAHUN` | `BULAN` | `KODE BARANG` | `NAMA BARANG` | `SATUAN` | `JUMLAH MASUK` | `HARGA BELI (RP)` | `TOTAL NILAI (RP)` | `KETERANGAN / PENERIMA`

### C. Sheet `Barang Keluar` (16 Kolom)
Mencatat bukti pengeluaran barang (BKB) berbasis Cost Object:
`NO` | `KODE KEGIATAN` | `TANGGAL` | `TAHUN` | `BULAN` | `TIPE COST OBJECT` | `NAMA COST OBJECT` | `PEMBEBANAN (DEPT)` | `KODE BARANG` | `NAMA BARANG` | `SATUAN` | `JUMLAH KELUAR` | `HARGA SATUAN (RP)` | `TOTAL BIAYA (RP)` | `KETERANGAN PEMAKAIAN` | `NO DOKUMEN / SPB`

### D. Sheet `data_karyawan` (11 Kolom)
Data referensi 34 karyawan dan daftar Cost Object pembebanan:
`No` | `NIK` | `Nama Lengkap` | `Jenis Kelamin` | `Jabatan` | `POSISI` | `DIVISI` | `Office Location` | `Departemen` | `Bagian` | `DAFTAR COST OBJECT`

---

## 🚀 3. Panduan Setup & Konfigurasi (5 Menit)

### Langkah 1: Tautan 2 Google Spreadsheet Resmi Anda
1. **Spreadsheet 1 (Portal Layanan GS - Meeting, Mobil, E-Doc):**
   - URL: `https://docs.google.com/spreadsheets/d/1OJsu_m4lHcpkesOdAB5Io3870kYfioFAm8RTH8MzWC4/edit`
   - **ID Spreadsheet GS:** `1OJsu_m4lHcpkesOdAB5Io3870kYfioFAm8RTH8MzWC4`
2. **Spreadsheet 2 (Inventaris ATK & Persediaan Gudang):**
   - URL: `https://docs.google.com/spreadsheets/d/1GqVZH2o2S0vf9xiVsbOIBf4K0-2GxnSdRZz6S1Jtj1M/edit`
   - **ID Spreadsheet ATK:** `1GqVZH2o2S0vf9xiVsbOIBf4K0-2GxnSdRZz6S1Jtj1M`

---

### Langkah 2: Konfigurasi di `SheetDB.gs` (Sudah Terpasang Otomatis)
ID kedua spreadsheet telah dikonfigurasi langsung di dalam `SheetDB.gs`:

```javascript
// 1. Spreadsheet Layanan GS (Meeting, Mobil, E-Doc, Users, Bookings)
var SPREADSHEET_ID_GS = '1OJsu_m4lHcpkesOdAB5Io3870kYfioFAm8RTH8MzWC4'; 

// 2. Spreadsheet Inventaris ATK & Persediaan (Master, Masuk, Keluar, data_karyawan)
var SPREADSHEET_ID_ATK = '1GqVZH2o2S0vf9xiVsbOIBf4K0-2GxnSdRZz6S1Jtj1M'; 
```

> **Catatan Fleksibilitas:**
> Jika `SPREADSHEET_ID_ATK` dibiarkan kosong (`''`), sistem akan secara cerdas beralih ke **Single-Sheet Mode** (seluruh tabel GS dan ATK disatukan di Spreadsheet 1).

---

### Langkah 3: Eksekusi Setup Otomatis (1-Click Database Generator)
Di toolbar atas Google Apps Script:
1. Pilih fungsi **`setupAllSheets`**, lalu klik tombol **▶ Run**.
2. Berikan izin otorisasi Google jika muncul popup.
3. Sistem secara otomatis akan:
   - Menyiapkan 9 sheet Layanan GS di Spreadsheet 1 (lengkap dengan 771 riwayat booking).
   - Menyiapkan 4 sheet Inventaris ATK di Spreadsheet 2 (lengkap dengan 218 SKU item, formula SUMIF live, sampel transaksi, dan 34 data karyawan).

---

### Langkah 4: Menu Tambahan di UI Google Sheet (`🚀 Portal PNS`)
Saat Anda membuka Google Sheet, menu praktis **`🚀 Portal PNS`** akan muncul otomatis di bar navigasi atas Google Sheet:
- **`🛠 Setup Database Layanan GS`**: Menyiapkan tabel Layanan GS.
- **`✏️ Setup Database ATK & Persediaan`**: Menyiapkan sheet ATK sesuai Excel.
- **`🌐 Setup Semua Database (Dual / Single Sheet)`**: Verifikasi & setup kedua spreadsheet.
- **`🔄 Hitung Ulang & Sinkronisasi Stok ATK`**: Refresh kalkulasi & membersihkan cache.
- **`🔑 Reset Semua PIN User ke 1234`**: Reset PIN darurat untuk seluruh akun pengguna.
- **`⚡ 1-Click Migrasi Form Lama ke Bookings`**: Standarisasi sheet form responses lama ke bookings.

---

## 💻 4. Sinkronisasi Kode ke GitHub Pages (`kode_git`)

Jika Anda juga meng-host Web App melalui GitHub Pages (`kode_git`):
1. Buka file `kode_git/index.html` dan `kode_git/admin.html`.
2. Pastikan variabel `API_BASE` atau deployment URL Google Apps Script Anda mengarah ke Web App yang telah di-deploy:
   ```javascript
   window.ENV = {
     API_URL: 'https://script.google.com/macros/s/AKfycby.../exec'
   };
   ```
3. Commit dan Push ke repository GitHub Anda:
   ```bash
   git add .
   git commit -m "Deploy 1 Web App dengan Dual Spreadsheet (GS + ATK Excel)"
   git push origin main
   ```

---

## 📊 5. Ringkasan File Proyek

| Folder / File | Fungsi & Deskripsi |
| :--- | :--- |
| `kode_google/` | Source code Google Apps Script lengkap (`Code.gs`, `SheetDB.gs`, `SetupSheet.gs`, `Index.html`, `CSS.html`, `JS.html`). |
| `gas_deployment/` | Bundle siap upload clasp / Apps Script. |
| `kode_git/` | Web App frontend untuk hosting statis (GitHub Pages / Laragon). |
| `github_pages_dist/` | Hasil kompilasi bundle HTML mandiri siap publikasi. |
| `alat-tulis-kantor.xlsx` | File master Excel asli yang dijadikan basis schema & data seed. |
| `PANDUAN_SETUP_DUAL_SHEET.md` | Dokumen panduan ini. |

---
*Dibuat untuk General Services & IT PT Pratama Nusantara Sakti (PNS).*
