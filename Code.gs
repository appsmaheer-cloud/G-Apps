/**
 * ============================================================================
 * PNS ASSET MANAGEMENT ENTERPRISE (googlegit) - GOOGLE APPS SCRIPT BACKEND
 * ============================================================================
 * Terhubung langsung ke Google Sheets Resmi:
 * SPREADSHEET_ID: 1Nc7tl6vtqv-LA2RT8QKW-VjpaKuvm91KCjA1Tg-Bjg0
 * URL: https://docs.google.com/spreadsheets/d/1Nc7tl6vtqv-LA2RT8QKW-VjpaKuvm91KCjA1Tg-Bjg0/edit
 *
 * Mendukung Sinkronisasi Data dari API Terbaru:
 * https://api.pns.co.id/main/asset_ver_report (A_ID = asset_id)
 * dengan tetap mempertahankan 100% Struktur Tabel Lama (Legacy Schema) & Integrasi Maintenance:
 * 1. PMAK (22 kolom) - Permohonan & Kelayakan Perbaikan Aset / BPP Terintegrasi
 * 2. asset (42 kolom) - Master Katalog 34.266 Aset Fisik
 * 3. data_mtc (21 kolom) - Historical Maintenance, Spare Part & Servis (34.232 Transaksi / Rp 27,65 M)
 * 4. WORK_ORDERS (15 kolom) - Data Tiket Servis, Pemeliharaan & Status Lapangan
 * 5. M_GEDUNG (12 kolom) - Master Gedung Fisik
 * 6. M_RUANGAN (10 kolom) - Master Ruangan
 * 7. M_RUANGAN_ASSETS (12 kolom) - Inventaris Per Ruangan
 * 8. ROOM_INSPECTIONS (17 kolom) - Form & Riwayat Inspeksi Ruangan
 * 9. M_PENGHUNI (17 kolom) - Data Penghuni & Kasur
 * 10. TRANSAKSI_ASET (12 kolom) - Log Mutasi & Perpindahan Aset
 * 11. M_FOTO_HUNIAN (7 kolom) - Dokumentasi Visual Hunian
 * 12. API_ASSET_LIVE (36 kolom) - Snapshot Live Data API
 * 13. COMPARE_API_ASSET (21 kolom) - Audit Selisih Data Master vs API
 * ============================================================================
 */

const SPREADSHEET_ID = '1Nc7tl6vtqv-LA2RT8QKW-VjpaKuvm91KCjA1Tg-Bjg0';

const LEGACY_ASSET_42_HEADERS = [
  'asset_id', 'location', 'kode_section', 'jenis_asset', 'kode_kelompok',
  'kode_kategori', 'kode_subkategori', 'no_asset', 'no_asset_alokasi', 'kode_unit',
  'klasifikasi_asset', 'nama_asset', 'nama_asset_detail', 'kondisi', 'checkout_tipe',
  'checkout', 'standar_umur', 'tanggal_perolehan', 'total_harga_perolehan', 'custom_fields',
  'Status_Vra', 'create_by', 'umur_asset', 'varian_umur', 'tarif',
  'tanggal_akhir_susut', '% UE', 'lifetime', 'Total_penyusutan', 'Nilai_buku',
  'KATEGORI ASSET', 'SUB KATEGORI ASSETS', 'Search Filter', 'status_checkout', 'Penysutan 2025',
  'Status Verifikasi', 'KELOMPOK ASSET', 'nilai Buku Rekon', 'Nilai Buku ACC', 'Status Disposal',
  'nilai penyusutan rekon', 'location_id'
];

const LEGACY_TRANSAKSI_HEADERS = [
  'trx_id', 'no_trx', 'tanggal_trx', 'tipe_transaksi', 'no_asset',
  'nama_asset', 'dari_lokasi', 'ke_lokasi', 'dari_penanggungjawab', 'ke_penanggungjawab',
  'keterangan', 'operator'
];

function doGet(e) {
  if (e && e.parameter && e.parameter.api) {
    return handleApiGet(e.parameter);
  }

  var template = HtmlService.createTemplateFromFile('Index');
  return template.evaluate()
    .setTitle('PNS Asset Enterprise - PT Pratama Nusantara Sakti')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  try {
    var contents = e.postData ? e.postData.contents : '';
    var payload = contents ? JSON.parse(contents) : {};
    var action = payload.action || (e.parameter ? e.parameter.action : '');
    var res = handleApiPost(action, payload);
    return ContentService.createTextOutput(JSON.stringify(res))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getDb() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== '') {
    try {
      return SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (err) {
      Logger.log('openById error: ' + err.toString());
    }
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getMasterAssetSheet(ss) {
  ss = ss || getDb();
  var sheet = ss.getSheetByName('asset') || ss.getSheetByName('ASSETS') || ss.getSheetByName('FACT_ASET');
  if (!sheet) {
    sheet = SheetDB.ensureSheet('asset', LEGACY_ASSET_42_HEADERS);
  }
  return sheet;
}

function handleApiGet(params) {
  var api = params.api;
  var res = { success: true, data: null };

  try {
    if (api === 'bootstrap') {
      res.data = apiGetBootstrapData();
    } else if (api === 'dashboard_stats') {
      res.data = apiGetDashboardStats();
    } else if (api === 'gedung_list') {
      res.data = apiGetGedungList(params.search || '', params.site || '');
    } else if (api === 'ruangan_list') {
      res.data = apiGetRuanganList(params.kode_gedung || '');
    } else if (api === 'ruangan_assets') {
      res.data = apiGetRuanganAssets(params.kode_gedung || '', params.nama_ruangan || '');
    } else if (api === 'inspections') {
      res.data = apiGetInspectionHistory(parseInt(params.limit || 50, 10));
    } else if (api === 'work_orders') {
      res.data = apiGetWorkOrders();
    } else if (api === 'penghuni') {
      res.data = apiGetPenghuniList(params.kode_gedung || '');
    } else if (api === 'registered_assets') {
      res.data = apiGetRegisteredAssets(parseInt(params.limit || 200, 10));
    } else if (api === 'mutations') {
      res.data = apiGetAssetMutations(parseInt(params.limit || 200, 10));
    } else if (api === 'sync_api_report') {
      res.data = syncAssetVerReportFromApi();
    } else if (api === 'hunian_photos') {
      res.data = apiGetHunianPhotos(params.kode_gedung || '');
    } else if (api === 'pmak') {
      res.data = apiGetPmakList(parseInt(params.limit || 200, 10));
    } else if (api === 'data_mtc') {
      res.data = apiGetMtcHistory(params.kode_unit || '', parseInt(params.limit || 200, 10));
    } else {
      res.success = false;
      res.message = 'Unknown API endpoint: ' + api;
    }
  } catch (err) {
    res.success = false;
    res.message = err.toString();
  }

  return ContentService.createTextOutput(JSON.stringify(res))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleApiPost(action, payload) {
  if (action === 'save_inspection') {
    return apiSaveInspection(payload);
  } else if (action === 'save_asset_register') {
    return apiSaveAssetRegister(payload);
  } else if (action === 'save_asset_mutation') {
    return apiSaveAssetMutation(payload);
  } else if (action === 'save_work_order') {
    return apiSaveWorkOrder(payload);
  } else if (action === 'save_penghuni') {
    return apiSavePenghuni(payload);
  } else if (action === 'save_hunian_photo') {
    return apiSaveHunianPhoto(payload);
  } else if (action === 'sync_api_report') {
    return syncAssetVerReportFromApi();
  } else if (action === 'pull_raw_api') {
    return pullRawApiToSheet();
  } else if (action === 'compare_api_asset') {
    return compareApiWithMasterAsset();
  } else if (action === 'clean_master_asset') {
    return cleanExtraApiRowsFromMasterAsset();
  } else if (action === 'save_pmak') {
    return apiSavePmak(payload);
  }
  return { success: false, message: 'Aksi POST tidak dikenal: ' + action };
}

/**
 * Menu Admin Otomatis di Google Sheets (Backend Control Panel)
 */
function onOpen() {
  try {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('🏢 PNS Asset Backend')
      .addItem('⚡ 1. Tarik Data API Asli + Compare ke Sheet asset (Recommended)', 'syncAssetVerReportFromApi')
      .addSeparator()
      .addItem('📥 2. Tarik Data API Asli Saja (ke Tab API_ASSET_LIVE)', 'pullRawApiToSheet')
      .addItem('🔍 3. Compare API vs Sheet asset (ke Tab COMPARE_API_ASSET)', 'compareApiWithMasterAsset')
      .addSeparator()
      .addItem('🧹 4. Bersihkan Baris Tambahan API di Sheet asset (Kembalikan 34.266 Master)', 'cleanExtraApiRowsFromMasterAsset')
      .addItem('🛠️ 5. Setup / Format Ulang Header & Conditional Formatting Sheet', 'setupPnsAssetSpreadsheet')
      .addToUi();
  } catch (e) {
    Logger.log('onOpen info: ' + e);
  }
}

function apiGetDashboardStats() {
  var ss = getDb();
  var sheetGedung = ss.getSheetByName('M_GEDUNG') || ss.getSheetByName('DIM_BANGUNAN');
  var sheetRuangan = ss.getSheetByName('M_RUANGAN') || ss.getSheetByName('DIM_RUANGAN');
  var sheetInsp = ss.getSheetByName('ROOM_INSPECTIONS') || ss.getSheetByName('LOG_TRANSAKSI_LAPANGAN');
  var sheetMtc = ss.getSheetByName('data_mtc') || ss.getSheetByName('Data MTC') || ss.getSheetByName('WORK_ORDERS');

  var totalGedung = sheetGedung && sheetGedung.getLastRow() > 1 ? (sheetGedung.getLastRow() - 1) : 416;
  var totalRuangan = sheetRuangan && sheetRuangan.getLastRow() > 1 ? (sheetRuangan.getLastRow() - 1) : 1559;
  var totalInsp = sheetInsp && sheetInsp.getLastRow() > 1 ? (sheetInsp.getLastRow() - 1) : 12;
  var totalMtc = sheetMtc && sheetMtc.getLastRow() > 1 ? (sheetMtc.getLastRow() - 1) : 34232;

  return {
    total_gedung: totalGedung,
    total_ruangan: totalRuangan,
    total_assets: 34266,
    total_inspeksi: totalInsp,
    total_wo: totalMtc,
    total_belum_checkout: 279,
    valuasi_hpp: 1120265723612,
    akumulasi_penyusutan: 438484408626,
    nilai_buku_nbv: 681781314986,
    biaya_perawatan: 23232987484
  };
}

function apiGetBootstrapData() {
  return {
    stats: apiGetDashboardStats(),
    inspections: apiGetInspectionHistory(50),
    workOrders: apiGetWorkOrders(),
    penghuni: apiGetPenghuniList(''),
    registeredAssets: apiGetRegisteredAssets(100),
    mutations: apiGetAssetMutations(200)
  };
}

function apiGetGedungList(search, site) {
  var ss = getDb();
  var sheet = ss.getSheetByName('M_GEDUNG') || ss.getSheetByName('DIM_BANGUNAN');
  if (!sheet || sheet.getLastRow() <= 1) return [];

  var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, Math.min(12, sheet.getLastColumn())).getValues();
  var res = [];
  var sLower = (search || '').toLowerCase();
  var siteFilter = (site || '').trim();

  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var kode = String(r[1] || r[0] || '').trim();
    var nama = String(r[2] || r[1] || '').trim();
    var s = String(r[3] || 'CO').trim();
    if (siteFilter && s !== siteFilter) continue;
    if (sLower && kode.toLowerCase().indexOf(sLower) === -1 && nama.toLowerCase().indexOf(sLower) === -1) continue;

    res.push({
      gedung_id: r[0],
      kode_gedung: kode,
      nama_gedung: nama,
      lokasi_site: s,
      kategori: String(r[4] || 'BANGUNAN'),
      sub_kategori: String(r[5] || 'OPERASIONAL'),
      penanggungjawab: String(r[6] || ('PIC Site ' + s)),
      total_ruangan: Number(r[7]) || 0,
      total_asset: Number(r[8]) || 0,
      status: String(r[9] || 'Aktif'),
      created_at: r[10] ? String(r[10]) : '',
      is_building: r[11] !== undefined ? r[11] : 1
    });
  }
  return res;
}

function apiGetRuanganList(kodeGedung) {
  var ss = getDb();
  var sheet = ss.getSheetByName('M_RUANGAN') || ss.getSheetByName('DIM_RUANGAN');
  if (!sheet || sheet.getLastRow() <= 1) return [];

  var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, Math.min(10, sheet.getLastColumn())).getValues();
  var res = [];
  var filterKode = (kodeGedung || '').trim();

  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var bCode = String(r[1] || '').trim();
    if (filterKode && bCode !== filterKode) continue;

    res.push({
      ruangan_id: r[0],
      kode_gedung: bCode,
      nama_ruangan: String(r[2] || r[1] || ''),
      tipe_ruangan: String(r[3] || 'Ruangan Kerja / Kamar'),
      kapasitas: Number(r[4]) || 2,
      penanggungjawab: String(r[5] || 'Staff Penanggungjawab'),
      total_asset: Number(r[6]) || 0,
      kondisi_terakhir: String(r[7] || 'Baik'),
      status_hunian: String(r[8] || 'Tersedia'),
      created_at: r[9] ? String(r[9]) : ''
    });
  }
  return res;
}

function apiGetRuanganAssets(kodeGedung, namaRuangan) {
  var ss = getDb();
  var sheet = ss.getSheetByName('M_RUANGAN_ASSETS');
  if (!sheet || sheet.getLastRow() <= 1) return [];

  // Struktur lama M_RUANGAN_ASSETS (12 kolom):
  // 0:id | 1:kode_gedung | 2:nama_ruangan | 3:no_asset | 4:nama_asset | 5:kondisi | 6:foto_asset | 7:catatan | 8:kategori_asset | 9:total_harga_perolehan | 10:tanggal_perolehan | 11:created_at
  var rows = sheet.getRange(2, 1, Math.min(sheet.getLastRow() - 1, 3000), Math.min(12, sheet.getLastColumn())).getValues();
  var res = [];
  var filterGedung = (kodeGedung || '').trim();
  var filterRoom = (namaRuangan || '').trim();

  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var gCode = String(r[1] || '').trim();
    var rName = String(r[2] || '').trim();
    if (filterGedung && gCode && gCode !== filterGedung) continue;
    if (filterRoom && rName && rName !== filterRoom) continue;

    res.push({
      id: r[0],
      asset_id: r[0],
      kode_gedung: gCode || filterGedung || 'BGN-0001',
      nama_ruangan: rName || filterRoom || 'Ruangan Utama',
      no_asset: String(r[3] || ''),
      nama_asset: String(r[4] || ''),
      kondisi: String(r[5] || 'Baik'),
      foto_asset: String(r[6] || ''),
      catatan: String(r[7] || ''),
      kategori_asset: String(r[8] || r[6] || 'ASET FASILITAS'),
      total_harga_perolehan: Number(r[9] || r[7] || 0),
      tanggal_perolehan: r[10] ? String(r[10]) : ''
    });
    if (res.length >= 200) break;
  }
  return res;
}

function apiSaveInspection(payload) {
  return SheetDB.withLock(function() {
    var ss = getDb();
    // Struktur lama ROOM_INSPECTIONS (17 kolom):
    // 0:inspection_id | 1:no_inspeksi | 2:tanggal_inspeksi | 3:kode_gedung | 4:nama_gedung | 5:ruangan_id | 6:nama_ruangan | 7:penanggungjawab | 8:inspector_nama | 9:kondisi_ruangan | 10:skor_kelaikan | 11:catatan_temuan | 12:status_tindak_lanjut | 13:foto_inspeksi | 14:total_asset_diperiksa | 15:asset_items_json | 16:created_at
    var sheet = SheetDB.ensureSheet('ROOM_INSPECTIONS', [
      'inspection_id', 'no_inspeksi', 'tanggal_inspeksi', 'kode_gedung', 'nama_gedung',
      'ruangan_id', 'nama_ruangan', 'penanggungjawab', 'inspector_nama', 'kondisi_ruangan',
      'skor_kelaikan', 'catatan_temuan', 'status_tindak_lanjut', 'foto_inspeksi',
      'total_asset_diperiksa', 'asset_items_json', 'created_at'
    ]);

    var newId = SheetDB.getNextId(sheet);
    var noInspeksi = 'INSP-' + Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMM') + '-' + ('000' + newId).slice(-3);
    var assetItems = Array.isArray(payload.asset_items) ? payload.asset_items : [];
    var nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

    if (sheet) {
      sheet.appendRow([
        newId,
        noInspeksi,
        payload.tanggal_inspeksi || Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd'),
        payload.kode_gedung || '',
        payload.nama_gedung || '',
        payload.ruangan_id || '',
        payload.nama_ruangan || '',
        payload.penanggungjawab || '',
        payload.inspector_nama || 'Petugas Inspeksi',
        payload.kondisi_ruangan || 'Aman',
        parseInt(payload.skor_kelaikan, 10) || 100,
        payload.catatan_temuan || '',
        payload.status_tindak_lanjut || 'Aman',
        payload.foto_inspeksi || '',
        assetItems.length,
        JSON.stringify(assetItems),
        nowStr
      ]);
    }

    // Sinkronkan kondisi aset per-unit ke M_RUANGAN_ASSETS & tab master asset (42 kolom)
    if (assetItems.length > 0) {
      for (var i = 0; i < assetItems.length; i++) {
        var item = assetItems[i];
        var code = item.no_asset || item.kode_unit || '';
        if (code && item.kondisi) {
          SheetDB.updateRowByKey('M_RUANGAN_ASSETS', 'no_asset', code, {
            kondisi: item.kondisi,
            catatan: item.catatan || ''
          });
          SheetDB.updateRowByKey('asset', 'kode_unit', code, {
            kondisi: item.kondisi,
            'Status Verifikasi': 'Terverifikasi Inspeksi (' + nowStr.slice(0, 10) + ')'
          });
        }
      }
    }

    return {
      success: true,
      message: 'Hasil inspeksi berhasil disimpan ke Google Sheets.',
      no_inspeksi: noInspeksi,
      inspection_id: newId
    };
  });
}

function apiGetInspectionHistory(limit) {
  var ss = getDb();
  var sheet = ss.getSheetByName('ROOM_INSPECTIONS') || ss.getSheetByName('LOG_TRANSAKSI_LAPANGAN');
  if (!sheet || sheet.getLastRow() <= 1) return [];

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var count = Math.min(lastRow - 1, limit || 50);
  var startRow = Math.max(2, lastRow - count + 1);
  var rows = sheet.getRange(startRow, 1, count, Math.min(17, lastCol)).getValues();
  var is17Cols = lastCol >= 16;

  var res = [];
  for (var i = rows.length - 1; i >= 0; i--) {
    var r = rows[i];
    if (is17Cols) {
      res.push({
        inspection_id: r[0],
        no_inspeksi: r[1],
        tanggal_inspeksi: r[2] ? Utilities.formatDate(new Date(r[2]), 'Asia/Jakarta', 'yyyy-MM-dd') : '',
        kode_gedung: r[3],
        nama_gedung: r[4],
        ruangan_id: r[5],
        nama_ruangan: r[6],
        penanggungjawab: r[7],
        inspector_nama: r[8],
        kondisi_ruangan: r[9],
        skor_kelaikan: r[10],
        catatan_temuan: r[11],
        status_tindak_lanjut: r[12],
        foto_inspeksi: r[13],
        total_asset_diperiksa: r[14],
        asset_items_json: r[15] || '[]'
      });
    } else {
      res.push({
        inspection_id: r[0],
        no_inspeksi: r[1],
        tanggal_inspeksi: r[2] ? Utilities.formatDate(new Date(r[2]), 'Asia/Jakarta', 'yyyy-MM-dd') : '',
        kode_gedung: r[3],
        nama_gedung: r[4],
        nama_ruangan: r[5],
        penanggungjawab: r[6],
        inspector_nama: r[7],
        kondisi_ruangan: r[8],
        skor_kelaikan: r[9],
        catatan_temuan: r[10],
        status_tindak_lanjut: r[11],
        total_asset_diperiksa: r[12],
        asset_items_json: r[13] || '[]'
      });
    }
  }
  return res;
}

function apiGetWorkOrders() {
  var ss = getDb();
  var sheet = ss.getSheetByName('WORK_ORDERS') || ss.getSheetByName('data_mtc') || ss.getSheetByName('Data MTC');
  if (!sheet || sheet.getLastRow() <= 1) return [];

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var count = Math.min(lastRow - 1, 100);
  var startRow = Math.max(2, lastRow - count + 1);
  var rows = sheet.getRange(startRow, 1, count, Math.min(15, lastCol)).getValues();
  var res = [];
  var isStandardWo = sheet.getName() === 'WORK_ORDERS';
  var is15Cols = lastCol >= 14;

  for (var i = rows.length - 1; i >= 0; i--) {
    var r = rows[i];
    if (isStandardWo && is15Cols) {
      // Struktur lama WORK_ORDERS (15 kolom):
      // 0:wo_id | 1:no_wo | 2:tipe_wo | 3:prioritas | 4:judul_pekerjaan | 5:deskripsi | 6:kode_gedung | 7:lokasi_detail | 8:teknisi_nama | 9:teknisi_inisial | 10:sla_target | 11:status | 12:is_overdue | 13:biaya_estimasi | 14:created_at
      res.push({
        wo_id: r[0],
        no_wo: String(r[1] || ('WO-' + (i + 1))),
        tipe_wo: String(r[2] || 'Korektif'),
        prioritas: String(r[3] || 'Sedang'),
        judul_pekerjaan: String(r[4] || 'Perbaikan Unit'),
        deskripsi: String(r[5] || ''),
        kode_gedung: String(r[6] || 'CO'),
        lokasi_detail: String(r[7] || ''),
        teknisi_nama: String(r[8] || 'Tim Workshop'),
        teknisi_inisial: String(r[9] || 'TW'),
        sla_target: String(r[10] || 'SLA 3 Hari'),
        status: String(r[11] || 'Baru'),
        is_overdue: r[12] || 0,
        biaya_estimasi: parseFloat(r[13] || 0)
      });
    } else if (isStandardWo) {
      res.push({
        wo_id: r[0],
        no_wo: String(r[1] || ('WO-' + (i + 1))),
        tipe_wo: String(r[2] || 'Korektif'),
        prioritas: String(r[3] || 'Sedang'),
        judul_pekerjaan: String(r[4] || 'Perbaikan Unit'),
        deskripsi: String(r[5] || ''),
        kode_gedung: String(r[6] || 'CO'),
        lokasi_detail: String(r[7] || ''),
        teknisi_nama: String(r[8] || 'Tim Workshop'),
        sla_target: String(r[9] || 'SLA 3 Hari'),
        status: String(r[10] || 'Baru'),
        biaya_estimasi: parseFloat(r[11] || 0)
      });
    } else {
      res.push({
        wo_id: i + 1,
        no_wo: String(r[0] || ('WO-' + (i + 1))),
        tipe_wo: 'Perbaikan / Pemeliharaan',
        prioritas: 'Sedang',
        judul_pekerjaan: String(r[5] || r[3] || 'Perbaikan Unit'),
        deskripsi: String(r[6] || r[4] || ''),
        kode_gedung: String(r[8] || r[1] || 'FR'),
        lokasi_detail: String(r[10] || r[7] || ''),
        teknisi_nama: 'Tim Workshop',
        sla_target: '3 Hari',
        status: 'Selesai',
        biaya_estimasi: parseFloat(r[18] || r[4] || 0)
      });
    }
  }
  return res;
}

function apiSaveWorkOrder(payload) {
  return SheetDB.withLock(function() {
    // Struktur lama WORK_ORDERS (15 kolom)
    var sheet = SheetDB.ensureSheet('WORK_ORDERS', [
      'wo_id', 'no_wo', 'tipe_wo', 'prioritas', 'judul_pekerjaan',
      'deskripsi', 'kode_gedung', 'lokasi_detail', 'teknisi_nama', 'teknisi_inisial',
      'sla_target', 'status', 'is_overdue', 'biaya_estimasi', 'created_at'
    ]);
    var newId = SheetDB.getNextId(sheet);
    var noWo = 'WO-' + ('0000' + newId).slice(-4);
    var tekNama = payload.teknisi_nama || 'Belum Ditugaskan';
    var tekInisial = payload.teknisi_inisial || tekNama.split(' ').map(function(w) { return w.charAt(0); }).join('').slice(0, 3).toUpperCase();
    var nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

    if (sheet) {
      sheet.appendRow([
        newId,
        noWo,
        payload.tipe_wo || 'Korektif',
        payload.prioritas || 'Sedang',
        payload.judul_pekerjaan || '',
        payload.deskripsi || '',
        payload.kode_gedung || '',
        payload.lokasi_detail || '',
        tekNama,
        tekInisial,
        payload.sla_target || 'SLA 3 Hari',
        payload.status || 'Baru',
        0,
        parseFloat(payload.biaya_estimasi) || 0,
        nowStr
      ]);
    }
    return { success: true, message: 'Tiket work order berhasil diterbitkan.', no_wo: noWo, wo_id: newId };
  });
}

function apiGetPenghuniList(kodeGedung) {
  var ss = getDb();
  var sheet = ss.getSheetByName('M_PENGHUNI');
  if (!sheet || sheet.getLastRow() <= 1) return [];

  var lastCol = sheet.getLastColumn();
  var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, Math.min(17, lastCol)).getValues();
  var is17Cols = lastCol >= 15;
  var res = [];
  var filterGedung = (kodeGedung || '').trim();

  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var bCode = String(r[7] || '').trim();
    if (filterGedung && bCode !== filterGedung) continue;

    // Struktur lama M_PENGHUNI (17 kolom):
    // 0:id | 1:nik | 2:nama_penghuni | 3:jenis_kelamin | 4:jabatan | 5:departemen | 6:perusahaan | 7:kode_gedung | 8:nama_ruangan | 9:nomor_kasur | 10:tgl_masuk | 11:tgl_keluar | 12:status_hunian | 13:no_kontak | 14:catatan | 15:created_at | 16:updated_at
    var rawTglMasuk = r[10];
    var cleanTglMasuk = '-';
    if (rawTglMasuk && String(rawTglMasuk).trim() !== '' && String(rawTglMasuk).trim() !== '-' && String(rawTglMasuk).trim() !== '0') {
      var dMasuk = new Date(rawTglMasuk);
      if (!isNaN(dMasuk.getTime()) && dMasuk.getFullYear() > 1971) {
        cleanTglMasuk = Utilities.formatDate(dMasuk, 'Asia/Jakarta', 'yyyy-MM-dd');
      } else if (String(rawTglMasuk).indexOf('1970') === -1) {
        cleanTglMasuk = String(rawTglMasuk).trim();
      }
    }
    res.push({
      id: r[0],
      nik: r[1],
      nama_penghuni: r[2],
      jenis_kelamin: r[3],
      jabatan: r[4],
      departemen: r[5],
      perusahaan: r[6],
      kode_gedung: bCode,
      nama_ruangan: r[8],
      nomor_kasur: r[9],
      tgl_masuk: cleanTglMasuk,
      tgl_keluar: is17Cols && r[11] ? String(r[11]) : '',
      status_hunian: is17Cols ? (r[12] || 'Aktif') : (r[11] || 'Aktif'),
      no_kontak: is17Cols ? (r[13] || '') : (r[12] || ''),
      catatan: is17Cols ? (r[14] || '') : ''
    });
  }
  return res;
}

function apiGetRegisteredAssets(limit) {
  var ss = getDb();
  var sheet = getMasterAssetSheet(ss);
  if (!sheet || sheet.getLastRow() <= 1) return [];

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var count = Math.min(lastRow - 1, limit || 100);
  var startRow = Math.max(2, lastRow - count + 1);
  var rows = sheet.getRange(startRow, 1, count, Math.min(42, lastCol)).getValues();
  var isLegacy42 = lastCol >= 30;
  var res = [];

  for (var i = rows.length - 1; i >= 0; i--) {
    var r = rows[i];
    if (isLegacy42) {
      res.push({
        asset_id: r[0],
        lokasi_code: String(r[1] || 'CO'),
        kode_section: String(r[2] || 'HRGA'),
        jenis_asset: String(r[3] || 'UMUM'),
        no_asset: String(r[9] || r[7] || ''),
        kode_unit: String(r[9] || r[7] || ''),
        nama_asset: String(r[11] || r[12] || ''),
        nama_asset_detail: String(r[12] || r[11] || ''),
        kondisi: String(r[13] || 'Good Condition'),
        umur_ekonomis: Number(r[16]) || 5,
        umur_asset: Number(r[22]) || 0,
        lifetime: String(r[27] || ''),
        tanggal_perolehan: r[17] ? String(r[17]) : '',
        harga_perolehan: parseFloat(r[18] || 0),
        nilai_buku: parseFloat(r[37] !== undefined && r[37] !== '' ? r[37] : (r[29] || 0)),
        akumulasi_penyusutan: parseFloat(r[40] !== undefined && r[40] !== '' ? r[40] : (r[28] || 0)),
        kategori_asset: String(r[30] || r[5] || 'INVENTARIS PERUMAHAN'),
        sub_kategori: String(r[31] || r[6] || ''),
        status_verifikasi: String(r[35] || 'Aktif'),
        kelompok_asset: String(r[36] || r[4] || 'INVENTARIS DAN PERALATAN'),
        status_disposal: String(r[39] || 'Aktif / Digunakan'),
        pic: String(r[21] || '')
      });
    } else {
      res.push({
        asset_id: r[0],
        no_asset: String(r[1] || ''),
        nama_asset: String(r[2] || ''),
        kelompok_asset: String(r[3] || 'INVENTARIS DAN PERALATAN'),
        kategori_asset: String(r[4] || 'INVENTARIS PERUMAHAN'),
        lokasi_code: String(r[5] || 'CO'),
        kondisi: String(r[6] || 'Good Condition'),
        umur_ekonomis: Number(r[7]) || 5,
        harga_perolehan: parseFloat(r[8] || 0),
        status_verifikasi: String(r[9] || 'Aktif'),
        kode_section: String(r[10] || 'HRGA'),
        pic: String(r[11] || ''),
        tanggal_verifikasi: r[12] ? String(r[12]) : ''
      });
    }
  }
  return res;
}

function apiGetAssetMutations(limit) {
  var ss = getDb();
  // Utamakan struktur lama TRANSAKSI_ASET (12 kolom)
  var sheet = ss.getSheetByName('TRANSAKSI_ASET') || ss.getSheetByName('ASSET_MUTATIONS');
  if (!sheet || sheet.getLastRow() <= 1) return [];

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var count = Math.min(lastRow - 1, limit || 200);
  var startRow = Math.max(2, lastRow - count + 1);
  var rows = sheet.getRange(startRow, 1, count, Math.min(12, lastCol)).getValues();
  var isTransaksi12 = sheet.getName() === 'TRANSAKSI_ASET' || lastCol >= 12;
  var res = [];

  for (var i = rows.length - 1; i >= 0; i--) {
    var r = rows[i];
    if (isTransaksi12) {
      // 0:trx_id | 1:no_trx | 2:tanggal_trx | 3:tipe_transaksi | 4:no_asset | 5:nama_asset | 6:dari_lokasi | 7:ke_lokasi | 8:dari_penanggungjawab | 9:ke_penanggungjawab | 10:keterangan | 11:operator
      res.push({
        id: r[0],
        no_trx: String(r[1] || ''),
        tanggal: r[2] ? String(r[2]) : '',
        tipe_transaksi: String(r[3] || 'MUTASI'),
        no_asset: String(r[4] || ''),
        nama_asset: String(r[5] || ''),
        lokasi_asal: String(r[6] || ''),
        lokasi_tujuan: String(r[7] || ''),
        section_asal: String(r[8] || ''),
        section_tujuan: String(r[9] || ''),
        alasan: String(r[10] || ''),
        petugas: String(r[11] || '')
      });
    } else {
      res.push({
        id: r[0],
        no_trx: String(r[1] || ''),
        tanggal: r[2] ? String(r[2]) : '',
        no_asset: String(r[3] || ''),
        nama_asset: String(r[4] || ''),
        lokasi_asal: String(r[5] || ''),
        lokasi_tujuan: String(r[6] || ''),
        section_asal: String(r[7] || ''),
        section_tujuan: String(r[8] || ''),
        alasan: String(r[9] || ''),
        petugas: String(r[10] || '')
      });
    }
  }
  return res;
}

/**
 * Membangun 1 baris penuh sesuai Struktur Tabel Lama `asset` (42 Kolom)
 */
function buildLegacy42AssetRow(dataObj) {
  var hpp = parseFloat(dataObj.total_harga_perolehan || dataObj.harga_perolehan || 0);
  var nbv = parseFloat(dataObj.nilai_buku !== undefined ? dataObj.nilai_buku : hpp);
  var susut = parseFloat(dataObj.total_penyusutan !== undefined ? dataObj.total_penyusutan : Math.max(0, hpp - nbv));
  var stdUmur = Number(dataObj.standar_umur || dataObj.umur || 5);
  var umurPakai = Number(dataObj.umur_asset || 0);

  return [
    dataObj.asset_id || '',                                           // 0: asset_id
    dataObj.location || 'CO',                                         // 1: location
    dataObj.kode_section || 'HRGA',                                   // 2: kode_section
    dataObj.jenis_asset || 'UMUM',                                    // 3: jenis_asset
    dataObj.kode_kelompok || dataObj.kelompok_asset || '',            // 4: kode_kelompok
    dataObj.kode_kategori || dataObj.kategori_asset || '',            // 5: kode_kategori
    dataObj.kode_subkategori || dataObj.sub_kategori || '',           // 6: kode_subkategori
    dataObj.no_asset || dataObj.kode_unit || '',                      // 7: no_asset
    dataObj.no_asset_alokasi || 'BELUM CHECKOUT',                     // 8: no_asset_alokasi
    dataObj.kode_unit || dataObj.no_asset || '',                      // 9: kode_unit
    dataObj.klasifikasi_asset || dataObj.sub_kategori || '',          // 10: klasifikasi_asset
    dataObj.nama_asset || '-',                                        // 11: nama_asset
    dataObj.nama_asset_detail || dataObj.nama_asset || '-',           // 12: nama_asset_detail
    dataObj.kondisi || 'Good Condition',                              // 13: kondisi
    dataObj.checkout_tipe || 'BELUM CHECKOUT',                        // 14: checkout_tipe
    dataObj.checkout || 'BELUM CHECKOUT',                             // 15: checkout
    stdUmur,                                                          // 16: standar_umur
    dataObj.tanggal_perolehan || Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd'), // 17: tanggal_perolehan
    hpp,                                                              // 18: total_harga_perolehan
    dataObj.custom_fields || '[]',                                    // 19: custom_fields
    dataObj.status_vra || '',                                         // 20: Status_Vra
    dataObj.create_by || dataObj.pic_nama || 'System',                // 21: create_by
    umurPakai,                                                        // 22: umur_asset
    Math.max(0, stdUmur - umurPakai),                                 // 23: varian_umur
    stdUmur > 0 ? (1 / stdUmur) : 0,                                  // 24: tarif
    '',                                                               // 25: tanggal_akhir_susut
    '',                                                               // 26: % UE
    stdUmur,                                                          // 27: lifetime
    susut,                                                            // 28: Total_penyusutan
    nbv,                                                              // 29: Nilai_buku
    dataObj.kategori_asset || dataObj.kode_kategori || 'INVENTARIS PERUMAHAN', // 30: KATEGORI ASSET
    dataObj.sub_kategori || dataObj.kode_subkategori || '',           // 31: SUB KATEGORI ASSETS
    dataObj.nama_asset || '',                                         // 32: Search Filter
    dataObj.status_checkout || 'Aktif',                               // 33: status_checkout
    0,                                                                // 34: Penysutan 2025
    dataObj.status_verifikasi || 'TERVERIFIKASI',                     // 35: Status Verifikasi
    dataObj.kelompok_asset || dataObj.kode_kelompok || 'INVENTARIS DAN PERALATAN', // 36: KELOMPOK ASSET
    nbv,                                                              // 37: nilai Buku Rekon
    nbv,                                                              // 38: Nilai Buku ACC
    dataObj.status_disposal || 'Aktif',                               // 39: Status Disposal
    susut,                                                            // 40: nilai penyusutan rekon
    dataObj.location_id || ''                                         // 41: location_id
  ];
}

function apiSaveAssetRegister(payload) {
  return SheetDB.withLock(function() {
    var ss = getDb();
    var sheet = getMasterAssetSheet(ss);
    var newId = SheetDB.getNextId(sheet);
    var noAsset = payload.no_asset || ('AST-' + Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMM') + '-' + ('000' + newId).slice(-4));

    if (sheet) {
      var row42 = buildLegacy42AssetRow({
        asset_id: newId,
        no_asset: noAsset,
        kode_unit: noAsset,
        nama_asset: payload.nama_asset || '-',
        kelompok_asset: payload.kelompok || payload.kelompok_asset || 'INVENTARIS DAN PERALATAN',
        kategori_asset: payload.kategori || payload.kategori_asset || 'INVENTARIS PERUMAHAN',
        sub_kategori: payload.sub_kategori || '',
        location: payload.lokasi || payload.location || 'CO',
        kondisi: payload.kondisi || 'Good Condition',
        standar_umur: Number(payload.standar_umur) || 5,
        total_harga_perolehan: parseFloat(payload.harga_perolehan || payload.total_harga_perolehan || 0),
        status_verifikasi: 'TERVERIFIKASI',
        kode_section: payload.section || payload.kode_section || 'HRGA',
        pic_nama: payload.pic_nama || payload.petugas || 'Admin'
      });
      sheet.appendRow(row42);
    }

    return {
      success: true,
      message: 'Aset baru berhasil diregistrasikan ke tabel asset (42 kolom).',
      no_asset: noAsset,
      asset_id: newId
    };
  });
}

function apiSaveAssetMutation(payload) {
  return SheetDB.withLock(function() {
    // Gunakan tabel lama TRANSAKSI_ASET (12 kolom)
    var sheet = SheetDB.ensureSheet('TRANSAKSI_ASET', LEGACY_TRANSAKSI_HEADERS);
    var newId = SheetDB.getNextId(sheet);
    var noTrx = 'MUT-' + Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMM') + '-' + ('000' + newId).slice(-3);

    if (sheet) {
      sheet.appendRow([
        newId,
        noTrx,
        payload.tanggal || Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd'),
        payload.tipe_transaksi || 'MUTASI LOKASI',
        payload.no_asset || '',
        payload.nama_asset || '',
        payload.lokasi_asal || '',
        payload.lokasi_tujuan || '',
        payload.section_asal || '',
        payload.section_tujuan || '',
        payload.alasan || '',
        payload.petugas || 'Administrator'
      ]);
    }

    // Sinkronkan lokasi & kode_section pada tab master `asset` (42 kolom)
    if (payload.no_asset) {
      var updates = {};
      if (payload.lokasi_tujuan) updates.location = payload.lokasi_tujuan;
      if (payload.section_tujuan) updates.kode_section = payload.section_tujuan;
      if (payload.kondisi_baru) updates.kondisi = payload.kondisi_baru;
      if (payload.status_disposal) updates['Status Disposal'] = payload.status_disposal;
      SheetDB.updateRowByKey('asset', 'kode_unit', payload.no_asset, updates);
    }

    return {
      success: true,
      message: 'Mutasi aset berhasil dicatat ke TRANSAKSI_ASET & diperbarui pada master asset.',
      no_trx: noTrx,
      id: newId
    };
  });
}

function apiSavePenghuni(payload) {
  return SheetDB.withLock(function() {
    // Struktur lama M_PENGHUNI (17 kolom):
    // 0:id | 1:nik | 2:nama_penghuni | 3:jenis_kelamin | 4:jabatan | 5:departemen | 6:perusahaan | 7:kode_gedung | 8:nama_ruangan | 9:nomor_kasur | 10:tgl_masuk | 11:tgl_keluar | 12:status_hunian | 13:no_kontak | 14:catatan | 15:created_at | 16:updated_at
    var sheet = SheetDB.ensureSheet('M_PENGHUNI', [
      'id', 'nik', 'nama_penghuni', 'jenis_kelamin', 'jabatan',
      'departemen', 'perusahaan', 'kode_gedung', 'nama_ruangan', 'nomor_kasur',
      'tgl_masuk', 'tgl_keluar', 'status_hunian', 'no_kontak', 'catatan',
      'created_at', 'updated_at'
    ]);
    var newId = SheetDB.getNextId(sheet);
    var nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

    if (sheet) {
      sheet.appendRow([
        newId,
        payload.nik || '',
        payload.nama_penghuni || '',
        payload.jenis_kelamin || 'L',
        payload.jabatan || '',
        payload.departemen || '',
        payload.perusahaan || 'PT PNS',
        payload.kode_gedung || '',
        payload.nama_ruangan || '',
        payload.nomor_kasur || '1',
        payload.tgl_masuk || Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd'),
        payload.tgl_keluar || '',
        payload.status_hunian || 'Aktif',
        payload.no_kontak || '',
        payload.catatan || '',
        nowStr,
        nowStr
      ]);
    }

    return {
      success: true,
      message: 'Data penghuni kamar berhasil disimpan ke M_PENGHUNI (struktur 17 kolom).',
      id: newId
    };
  });
}

/**
 * ============================================================================
 * BACKEND ARCHITECTURE: RAW API SHEET (`API_ASSET_LIVE`) & COMPARISON (`COMPARE_API_ASSET`)
 * ============================================================================
 * - Sheet `asset` (42 kolom) TIDAK ditimpa/di-append otomatis agar data akuntansi/depresiasi
 *   (34.266 baris master) tetap murni dan hanya di-update secara manual/terkontrol.
 * - Data asli dari Web API (https://api.pns.co.id/main/asset_ver_report) disimpan 100% utuh
 *   (36 kolom asli API) ke tab `API_ASSET_LIVE`.
 * - Perbandingan antara `API_ASSET_LIVE` vs `asset` ditulis otomatis ke tab `COMPARE_API_ASSET`.
 */

var RAW_API_36_HEADERS = [
  'A_ID', 'AC_ID', 'NO_ASSET_ALOKASI_SISTEM', 'NO_ASSET_SISTEM', 'NO_ASSET_MANUAL',
  'NAMA_ASSET', 'LOCATION', 'S_ID', 'KODE_SECTION', 'NAMA_SECTION',
  'TIPE_CHECKOUT', 'AVD_ID', 'CHECKOUT', 'TANGGAL_CHECKOUT', 'ASSIGNED',
  'TANGGAL_CHECKIN', 'CHECKIN_NOTES', 'TANGGAL_PEROLEHAN', 'TOTAL_HARGA_PEROLEHAN', 'UMUR',
  'SUBKATEGORI', 'KATEGORI', 'KELOMPOK', 'STATUS_VERIFIKASI_TERAKHIR', 'STATUS VERIFIKASI_2',
  'STATUS VERIFIKASI_3', 'STATUS_KONDISI_AWAL', 'USER_VERIFIKASI', 'CATATAN_VERIFIKASI', 'TANGGAL_VERIFIKASI',
  'TIPE_ASSET', 'REFF_BKB_SPB', 'REFF_KODE_BARANG', 'custom_fields', 'PERIODE_TAHUN', 'PERIODE'
];

var COMPARE_SHEET_HEADERS = [
  'NO', 'KATEGORI_TEMUAN', 'A_ID (asset_id)', 'KODE_UNIT_API', 'KODE_UNIT_MASTER',
  'NAMA_ASSET', 'KELOMPOK_ASSET', 'LOKASI_API', 'LOKASI_MASTER', 'SECTION_API',
  'SECTION_MASTER', 'CHECKOUT_API', 'CHECKOUT_MASTER', 'STATUS_VERIFIKASI_API',
  'KONDISI_API', 'KONDISI_MASTER', 'HARGA_PEROLEHAN_API', 'HARGA_PEROLEHAN_MASTER',
  'TANGGAL_PEROLEHAN', 'REKOMENDASI_TINDAK_LANJUT', 'WAKTU_COMPARE'
];

/**
 * 1. Tarik Data Asli dari Web API (36 Kolom) ke Sheet `API_ASSET_LIVE`
 */
function pullRawApiToSheet(cachedApiData) {
  return SheetDB.withLock(function() {
    try {
      var data = cachedApiData;
      if (!data) {
        var url = 'https://api.pns.co.id/main/asset_ver_report';
        var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
        var json = JSON.parse(response.getContentText());
        data = json.data || [];
      }
      Logger.log('pullRawApiToSheet: Fetched ' + data.length + ' raw API rows');

      var ss = getDb();
      var rawSheet = SheetDB.ensureSheet('API_ASSET_LIVE', RAW_API_36_HEADERS);
      rawSheet.clearContents();
      rawSheet.getRange(1, 1, 1, RAW_API_36_HEADERS.length)
        .setValues([RAW_API_36_HEADERS])
        .setBackground('#0F172A')
        .setFontColor('#FFFFFF')
        .setFontWeight('bold');
      rawSheet.setFrozenRows(1);

      var rowsOut = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var r = new Array(RAW_API_36_HEADERS.length);
        for (var c = 0; c < RAW_API_36_HEADERS.length; c++) {
          var key = RAW_API_36_HEADERS[c];
          var val = item[key];
          r[c] = (val !== undefined && val !== null) ? val : '';
        }
        rowsOut[i] = r;
      }

      // Tulis secara batch per 10.000 baris agar cepat & aman dari batas memori Google Sheets
      var chunkSize = 10000;
      for (var start = 0; start < rowsOut.length; start += chunkSize) {
        var chunk = rowsOut.slice(start, start + chunkSize);
        rawSheet.getRange(start + 2, 1, chunk.length, RAW_API_36_HEADERS.length).setValues(chunk);
      }

      return {
        success: true,
        sheet: 'API_ASSET_LIVE',
        totalApiRows: rowsOut.length,
        message: 'Berhasil menyimpan ' + rowsOut.length + ' baris data API asli (36 kolom) ke sheet API_ASSET_LIVE.'
      };
    } catch (err) {
      Logger.log('pullRawApiToSheet error: ' + err);
      return { success: false, error: String(err) };
    }
  }, 30000);
}

/**
 * 2. Compare Data API (`API_ASSET_LIVE` / Live Fetch) terhadap Sheet Master `asset`
 *    tanpa mengubah/menimpa isi sheet `asset`. Hasil ditulis ke `COMPARE_API_ASSET`.
 */
function compareApiWithMasterAsset(cachedApiData) {
  return SheetDB.withLock(function() {
    try {
      var data = cachedApiData;
      if (!data) {
        var url = 'https://api.pns.co.id/main/asset_ver_report';
        var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
        var json = JSON.parse(response.getContentText());
        data = json.data || [];
      }

      var ss = getDb();
      var masterSheet = getMasterAssetSheet(ss);
      var mLastRow = masterSheet ? masterSheet.getLastRow() : 0;
      var mLastCol = masterSheet ? Math.max(42, masterSheet.getLastColumn()) : 42;
      var mValues = mLastRow > 1 ? masterSheet.getRange(2, 1, mLastRow - 1, mLastCol).getValues() : [];

      // Map Master sheet `asset` berdasarkan asset_id (kolom 0)
      var masterById = {};
      for (var i = 0; i < mValues.length; i++) {
        var r = mValues[i];
        var mId = String(r[0] || '').trim();
        if (mId) {
          masterById[mId] = r;
        }
      }

      var nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');
      var compareRows = [];
      var seenApiId = {};

      var countNewInApi = 0;
      var countBelumCheckout = 0;
      var countDiffLocOrCheckout = 0;
      var countOnlyInMaster = 0;

      for (var k = 0; k < data.length; k++) {
        var item = data[k];
        var aId = String(item.A_ID || '').trim();
        if (!aId) continue;

        // Hindari duplikasi baris compare jika A_ID muncul >1 kali di log checkout API
        var isFirstSeen = !seenApiId[aId];
        seenApiId[aId] = true;

        var apiCode = (item.NO_ASSET_MANUAL && item.NO_ASSET_MANUAL !== '-') ? String(item.NO_ASSET_MANUAL).trim() : String(item.NO_ASSET_SISTEM || '').trim();
        var apiLoc = String(item.LOCATION || '').trim();
        var apiSec = String(item.KODE_SECTION || item.NAMA_SECTION || '').trim();
        var apiChk = String(item.CHECKOUT || item.TIPE_CHECKOUT || '').trim();
        var apiVer = String(item.STATUS_VERIFIKASI_TERAKHIR || '').trim();
        var apiCond = String(item.STATUS_KONDISI_AWAL || '').trim();
        var apiHpp = parseFloat(item.TOTAL_HARGA_PEROLEHAN || 0) || 0;
        var apiTgl = String(item.TANGGAL_PEROLEHAN || '').trim();

        var isApiBelumCheckout = (
          apiChk.toUpperCase().indexOf('BELUM') !== -1 ||
          String(item.TIPE_CHECKOUT || '').toUpperCase().indexOf('BELUM') !== -1 ||
          String(item.NO_ASSET_ALOKASI_SISTEM || '').toUpperCase().indexOf('BELUM') !== -1
        );

        var mRow = masterById[aId];
        if (!mRow) {
          if (!isFirstSeen) continue;
          countNewInApi++;
          if (isApiBelumCheckout) countBelumCheckout++;
          compareRows.push([
            compareRows.length + 1,
            isApiBelumCheckout ? '1A. BARU DI API & BELUM CHECKOUT' : '1. BARU DI API (BELUM DI SHEET ASSET)',
            aId,
            apiCode,
            '- (Belum Ada)',
            item.NAMA_ASSET || '-',
            item.KELOMPOK || '-',
            apiLoc,
            '-',
            apiSec,
            '-',
            apiChk,
            '-',
            apiVer,
            apiCond,
            '-',
            apiHpp,
            0,
            apiTgl,
            'Review oleh Accounting/Asset untuk ditambahkan manual ke sheet asset (beserta tarif depresiasi)',
            nowStr
          ]);
        } else if (isFirstSeen) {
          var mCode = String(mRow[9] || mRow[7] || '').trim();
          var mLoc  = String(mRow[1] || '').trim();
          var mSec  = String(mRow[2] || '').trim();
          var mCond = String(mRow[13] || '').trim();
          var mChk  = String(mRow[15] || '').trim();
          var mStatusChk = String(mRow[33] || '').trim();
          var mHpp  = parseFloat(mRow[18] || 0) || 0;

          var isMasterBelumCheckout = (
            mChk === 'NY Checkout' ||
            mStatusChk.indexOf('NY Alocation') !== -1 ||
            String(mRow[14] || '').trim() === '0'
          );

          if (isApiBelumCheckout || isMasterBelumCheckout) {
            countBelumCheckout++;
            compareRows.push([
              compareRows.length + 1,
              '2. REMINDER: BELUM CHECKOUT / ALOKASI',
              aId,
              apiCode,
              mCode,
              item.NAMA_ASSET || mRow[11] || '-',
              item.KELOMPOK || mRow[36] || '-',
              apiLoc,
              mLoc,
              apiSec,
              mSec,
              apiChk,
              mChk + (mStatusChk ? ' (' + mStatusChk + ')' : ''),
              apiVer,
              apiCond,
              mCond,
              apiHpp,
              mHpp,
              apiTgl || String(mRow[17] || ''),
              isApiBelumCheckout && !isMasterBelumCheckout
                ? 'Sudah teralokasi di Master, namun di Web API masih BELUM CHECKOUT'
                : (!isApiBelumCheckout && isMasterBelumCheckout
                    ? 'Sudah Checkout di Web API (' + apiChk + '), silakan update manual kolom checkout di sheet asset'
                    : 'Belum Checkout di API maupun Master Sheet — perlu tindak lanjut alokasi PIC/Ruangan'),
              nowStr
            ]);
          } else {
            var locDiff = (apiLoc && apiLoc !== 'BELUM CHECKOUT' && mLoc && apiLoc !== mLoc);
            var chkDiff = (apiChk && mChk && apiChk !== mChk);
            if (locDiff || chkDiff) {
              countDiffLocOrCheckout++;
              var ketDiff = [];
              if (locDiff) ketDiff.push('Lokasi berubah (' + mLoc + ' -> ' + apiLoc + ')');
              if (chkDiff) ketDiff.push('Checkout berubah (' + mChk + ' -> ' + apiChk + ')');
              compareRows.push([
                compareRows.length + 1,
                '3. BEDA LOKASI / PEMEGANG CHECKOUT',
                aId,
                apiCode,
                mCode,
                item.NAMA_ASSET || mRow[11] || '-',
                item.KELOMPOK || mRow[36] || '-',
                apiLoc,
                mLoc,
                apiSec,
                mSec,
                apiChk,
                mChk,
                apiVer,
                apiCond,
                mCond,
                apiHpp,
                mHpp,
                apiTgl || String(mRow[17] || ''),
                ketDiff.join(' | ') + ' — Review untuk update manual di sheet asset',
                nowStr
              ]);
            }
          }
        }
      }

      // Cek aset yang ada di Master `asset` tetapi tidak ada di API
      for (var mIdx = 0; mIdx < mValues.length; mIdx++) {
        var mr = mValues[mIdx];
        var mid = String(mr[0] || '').trim();
        if (mid && !seenApiId[mid]) {
          countOnlyInMaster++;
          compareRows.push([
            compareRows.length + 1,
            '4. HANYA DI SHEET ASSET (TIDAK ADA DI API)',
            mid,
            '- (Tidak Ada di API)',
            String(mr[9] || mr[7] || ''),
            mr[11] || '-',
            mr[36] || mr[4] || '-',
            '-',
            mr[1] || '-',
            '-',
            mr[2] || '-',
            '-',
            mr[15] || '-',
            '-',
            '-',
            mr[13] || '-',
            0,
            parseFloat(mr[18] || 0) || 0,
            String(mr[17] || ''),
            'Aset tercatat di sheet asset tetapi A_ID tidak ditemukan pada response Web API',
            nowStr
          ]);
        }
      }

      var compSheet = SheetDB.ensureSheet('COMPARE_API_ASSET', COMPARE_SHEET_HEADERS);
      compSheet.clearContents();
      compSheet.getRange(1, 1, 1, COMPARE_SHEET_HEADERS.length)
        .setValues([COMPARE_SHEET_HEADERS])
        .setBackground('#0F172A')
        .setFontColor('#FFFFFF')
        .setFontWeight('bold');
      compSheet.setFrozenRows(1);

      if (compareRows.length > 0) {
        compSheet.getRange(2, 1, compareRows.length, COMPARE_SHEET_HEADERS.length).setValues(compareRows);
        compSheet.getRange(2, 17, compareRows.length, 2).setNumberFormat('#,##0');

        // Conditional Formatting untuk Kategori Temuan (Kolom B)
        var statusRange = compSheet.getRange(2, 2, Math.max(compareRows.length, 10), 1);
        var ruleNew = SpreadsheetApp.newConditionalFormatRule()
          .whenTextContains('BARU DI API')
          .setBackground('#DBEAFE')
          .setFontColor('#1E40AF')
          .setBold(true)
          .setRanges([statusRange])
          .build();
        var ruleBelum = SpreadsheetApp.newConditionalFormatRule()
          .whenTextContains('BELUM CHECKOUT')
          .setBackground('#FFE4E6')
          .setFontColor('#9F1239')
          .setBold(true)
          .setRanges([statusRange])
          .build();
        var ruleDiff = SpreadsheetApp.newConditionalFormatRule()
          .whenTextContains('BEDA LOKASI')
          .setBackground('#FEF3C7')
          .setFontColor('#92400E')
          .setBold(true)
          .setRanges([statusRange])
          .build();
        compSheet.setConditionalFormatRules([ruleNew, ruleBelum, ruleDiff]);
      }

      return {
        success: true,
        sheet: 'COMPARE_API_ASSET',
        totalApiRows: data.length,
        totalMasterRows: mValues.length,
        totalFindings: compareRows.length,
        newInApi: countNewInApi,
        belumCheckout: countBelumCheckout,
        diffLocOrCheckout: countDiffLocOrCheckout,
        onlyInMaster: countOnlyInMaster,
        message: 'Compare selesai! Ditemukan ' + compareRows.length + ' baris rekonsiliasi di tab COMPARE_API_ASSET (Baru di API: ' + countNewInApi + ', Belum Checkout: ' + countBelumCheckout + ', Beda Lokasi/Checkout: ' + countDiffLocOrCheckout + '). Sheet master `asset` tetap aman dan tidak ditimpa.'
      };
    } catch (err) {
      Logger.log('compareApiWithMasterAsset error: ' + err);
      return { success: false, error: String(err) };
    }
  }, 30000);
}

/**
 * 3. Full Sync Backend: Tarik Data Asli API ke `API_ASSET_LIVE` + Compare ke `COMPARE_API_ASSET`
 *    (Tanpa mengubah/merusak struktur 42 kolom di sheet `asset`)
 */
function syncAssetVerReportFromApi() {
  try {
    var url = 'https://api.pns.co.id/main/asset_ver_report';
    var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    var json = JSON.parse(response.getContentText());
    var data = json.data || [];

    var pullRes = pullRawApiToSheet(data);
    var compRes = compareApiWithMasterAsset(data);

    var summaryMsg = 'Tarik API & Compare Berhasil!\n' +
      '• Tab API_ASSET_LIVE: ' + (pullRes.totalApiRows || data.length) + ' baris asli API (36 kolom)\n' +
      '• Tab COMPARE_API_ASSET: ' + (compRes.totalFindings || 0) + ' baris selisih/rekonsiliasi\n' +
      '  - Baru di API (Belum di sheet asset): ' + (compRes.newInApi || 0) + '\n' +
      '  - Reminder Belum Checkout: ' + (compRes.belumCheckout || 0) + '\n' +
      '  - Beda Lokasi / Checkout: ' + (compRes.diffLocOrCheckout || 0) + '\n' +
      '• Sheet Master `asset` (42 kolom) tetap terjaga murni.';

    try {
      SpreadsheetApp.getUi().alert('Sinkronisasi & Compare API Selesai', summaryMsg, SpreadsheetApp.getUi().ButtonSet.OK);
    } catch (uiErr) {}

    return {
      success: true,
      message: summaryMsg,
      totalApi: data.length,
      updated: compRes.diffLocOrCheckout || 0,
      inserted: compRes.newInApi || 0,
      belumCheckout: compRes.belumCheckout || 0,
      compareResult: compRes
    };
  } catch (err) {
    Logger.log('syncAssetVerReportFromApi error: ' + err);
    return { success: false, error: String(err) };
  }
}

/**
 * 4. Bersihkan Baris Tambahan API pada Sheet `asset` (Kembalikan ke 34.266 Baris Master Rekon Asli)
 *    Menghapus baris yang ter-append dari sync API sebelumnya (yang tidak memiliki nilai buku rekon / tarif asli)
 */
function cleanExtraApiRowsFromMasterAsset() {
  return SheetDB.withLock(function() {
    var ss = getDb();
    var sheet = getMasterAssetSheet(ss);
    if (!sheet || sheet.getLastRow() <= 34267) {
      var msgOk = 'Sheet `asset` sudah bersih (' + (sheet ? sheet.getLastRow() - 1 : 0) + ' baris data). Tidak ada baris tambahan yang perlu dihapus.';
      try { SpreadsheetApp.getUi().alert('Info Sheet asset', msgOk, SpreadsheetApp.getUi().ButtonSet.OK); } catch (e) {}
      return { success: true, message: msgOk };
    }
    var lastRow = sheet.getLastRow();
    var extraRows = lastRow - 34267; // Baris 1 = header, Baris 2..34267 = 34.266 data master asli
    sheet.deleteRows(34268, extraRows);
    var msgDone = 'Berhasil menghapus ' + extraRows + ' baris tambahan API dari sheet `asset`. Kini sheet `asset` kembali tepat 34.266 baris Master Rekon.';
    try { SpreadsheetApp.getUi().alert('Pembersihan Selesai', msgDone, SpreadsheetApp.getUi().ButtonSet.OK); } catch (e) {}
    return { success: true, deletedRows: extraRows, remainingDataRows: 34266, message: msgDone };
  }, 30000);
}

/**
 * Simpan Foto Dokumentasi Fasilitas Hunian / Mess ke tab M_FOTO_HUNIAN
 */
function apiSaveHunianPhoto(payload) {
  return SheetDB.withLock(function() {
    var sheet = SheetDB.ensureSheet('M_FOTO_HUNIAN', [
      'id', 'kode_gedung', 'kategori_foto', 'caption', 'foto_url', 'uploader', 'created_at'
    ]);
    var newId = SheetDB.getNextId(sheet);
    var nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');
    sheet.appendRow([
      newId,
      payload.kode_gedung || '',
      payload.kategori || 'Tampak Depan / Eksterior',
      payload.caption || '',
      payload.foto_url || '',
      payload.uploader || 'Petugas Hunian',
      nowStr
    ]);
    return {
      success: true,
      id: newId,
      message: 'Foto fasilitas hunian berhasil disimpan ke Google Sheets (tab M_FOTO_HUNIAN).'
    };
  });
}

/**
 * Ambil daftar foto fasilitas hunian berdasarkan kode gedung
 */
function apiGetHunianPhotos(kodeGedung) {
  var ss = getDb();
  var sheet = ss.getSheetByName('M_FOTO_HUNIAN');
  if (!sheet || sheet.getLastRow() <= 1) return [];
  var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 7).getValues();
  var res = [];
  var filterCode = (kodeGedung || '').trim().toLowerCase();

  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var bCode = String(r[1] || '').trim();
    if (filterCode && bCode.toLowerCase() !== filterCode) continue;
    res.push({
      id: r[0],
      kode_gedung: bCode,
      kategori: r[2] || 'Tampak Depan / Eksterior',
      caption: r[3] || '',
      foto_url: r[4] || '',
      uploader: r[5] || 'Petugas',
      created_at: r[6] ? String(r[6]) : ''
    });
  }
  return res;
}

/**
 * ============================================================================
 * MODUL PMAK (PERMOHONAN & KELAYAKAN PERBAIKAN ASET / BPP) TERINTEGRASI
 * ============================================================================
 * Menyimpan dan mengambil riwayat perbaikan aset, estimasi biaya, alert kelayakan,
 * dan akumulasi biaya maintenance lalu (Rp).
 */
function apiGetPmakList(limit) {
  var ss = getDb();
  var sheet = ss.getSheetByName('PMAK');
  if (!sheet || sheet.getLastRow() <= 1) return [];

  var lastRow = sheet.getLastRow();
  var count = Math.min(lastRow - 1, limit || 200);
  var startRow = Math.max(2, lastRow - count + 1);
  var rows = sheet.getRange(startRow, 1, count, 22).getValues();
  var res = [];

  for (var i = rows.length - 1; i >= 0; i--) {
    var r = rows[i];
    res.push({
      no: r[0],
      tanggal_pmak: r[1] ? (r[1] instanceof Date ? Utilities.formatDate(r[1], 'Asia/Jakarta', 'yyyy-MM-dd') : String(r[1])) : '',
      no_pmak: String(r[2] || ''),
      lokasi_dept: String(r[3] || ''),
      pemohon: String(r[4] || ''),
      nama_barang: String(r[5] || ''),
      kode_asset: String(r[6] || ''),
      kondisi: String(r[7] || ''),
      detail_kerusakan: String(r[8] || ''),
      estimasi_biaya: parseFloat(r[9] || 0),
      vendor_pic: String(r[10] || ''),
      status_perbaikan: String(r[11] || 'Dalam Proses'),
      posisi_barang: String(r[12] || ''),
      surat_jalan: String(r[13] || ''),
      status_approval: String(r[14] || 'Pending'),
      approver: String(r[15] || ''),
      nilai_buku: parseFloat(r[16] || 0),
      biaya_mtc_lalu: parseFloat(r[17] || 0),
      alert_kelayakan: String(r[18] || ''),
      rekomendasi: String(r[19] || ''),
      nilai_perolehan: parseFloat(r[20] || 0),
      umur_asset: parseFloat(r[21] || 0)
    });
  }
  return res;
}

function apiSavePmak(payload) {
  return SheetDB.withLock(function() {
    var ss = getDb();
    var sheet = ss.getSheetByName('PMAK');
    if (!sheet) {
      if (typeof setupPnsAssetSpreadsheet === 'function') {
        setupPnsAssetSpreadsheet();
      }
      sheet = ss.getSheetByName('PMAK');
    }
    if (!sheet) {
      throw new Error('Tab PMAK tidak ditemukan di Google Sheets.');
    }

    var newNo = Math.max(1, sheet.getLastRow());
    var now = new Date();
    var nowStr = Utilities.formatDate(now, 'Asia/Jakarta', 'yyyy-MM-dd');
    var ymStr = Utilities.formatDate(now, 'Asia/Jakarta', 'yyyyMM');
    var noPmak = payload.no_pmak || ('PMAK/PNS/' + ymStr + '/' + ('000' + newNo).slice(-3));

    sheet.appendRow([
      newNo,
      payload.tanggal_pmak || nowStr,
      noPmak,
      payload.lokasi_dept || '',
      payload.pemohon || '',
      payload.nama_barang || '',
      payload.kode_asset || '',
      payload.kondisi || 'Rusak Ringan',
      payload.detail_kerusakan || '',
      parseFloat(payload.estimasi_biaya) || 0,
      payload.vendor_pic || 'Internal Workshop',
      payload.status_perbaikan || 'Dalam Proses',
      payload.posisi_barang || 'Workshop / Bengkel',
      payload.surat_jalan || '-',
      payload.status_approval || 'Diajukan',
      payload.approver || 'Manager HRGA',
      parseFloat(payload.nilai_buku) || 0,
      parseFloat(payload.biaya_mtc_lalu) || 0,
      payload.alert_kelayakan || 'LAYAK PERBAIKAN',
      payload.rekomendasi || 'REPAIR',
      parseFloat(payload.nilai_perolehan) || 0,
      parseFloat(payload.umur_asset) || 0
    ]);

    return {
      success: true,
      message: 'Data PMAK berhasil dicatat ke Google Sheets! No: ' + noPmak,
      data: { no_pmak: noPmak, no: newNo }
    };
  });
}

/**
 * Mengambil histori data_mtc (21 kolom) untuk analisis pemeliharaan per unit aset
 */
function apiGetMtcHistory(kodeUnit, limit) {
  var ss = getDb();
  var sheet = ss.getSheetByName('data_mtc') || ss.getSheetByName('Data MTC');
  if (!sheet || sheet.getLastRow() <= 1) return [];

  var lastRow = sheet.getLastRow();
  var count = Math.min(lastRow - 1, limit || 200);
  var startRow = Math.max(2, lastRow - count + 1);
  var rows = sheet.getRange(startRow, 1, count, 21).getValues();
  var res = [];
  var filterUnit = (kodeUnit || '').trim().toLowerCase();

  for (var i = rows.length - 1; i >= 0; i--) {
    var r = rows[i];
    var unit = String(r[10] || r[13] || '').trim();
    if (filterUnit && !unit.toLowerCase().includes(filterUnit)) continue;
    res.push({
      memorial: String(r[0] || ''),
      tanggal: r[1] ? (r[1] instanceof Date ? Utilities.formatDate(r[1], 'Asia/Jakarta', 'yyyy-MM-dd') : String(r[1]).slice(0, 10)) : '',
      acc_name: String(r[3] || ''),
      nominal: parseFloat(r[4] || 0),
      deskripsi: String(r[5] || ''),
      nama_sparepart: String(r[6] || ''),
      qty: parseFloat(r[7] || 0),
      satuan: String(r[8] || ''),
      lokasi: String(r[9] || ''),
      kode_unit: unit,
      nama_asset: String(r[11] || ''),
      divisi: String(r[14] || ''),
      departemen: String(r[15] || ''),
      section: String(r[16] || ''),
      kategori: String(r[20] || '')
    });
  }
  return res;
}
