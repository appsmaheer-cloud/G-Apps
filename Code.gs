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
 * 3. data_mtc (24 kolom) - Historical Maintenance, Spare Part & Servis (70.487 Transaksi / Rp 29,12 M)
 * 3b. MTC_SUMMARY_UNIT (14 kolom) - Ringkasan Biaya & Kategori MTC per KODE UNIT (1.506 Unit)
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

const DATA_MTC_24_HEADERS = [
  'MEMORIAL', 'TANGGAL', 'ACC. CODE DEBIT', 'ACC. NAME DEBIT', 'NOMINAL',
  'NO REFERENCE', 'DESCRIPTION', 'NAMA SPARE PART & JASA', 'QTY', 'SATUAN',
  'LOCATION', 'KODE UNIT', 'KATEGORI ASSET', 'DETAIL NAMA ASSET', 'KODE SISTEM GS',
  'DIV', 'DEPT', 'KODE_SECTION', 'COA', 'NAMA_COA',
  'NOMINAL_EDIT', 'KATEGORI', 'KATEGORI_MAINTENANCE', 'SUB_KATEGORI_MAINTENANCE'
];

const MTC_SUMMARY_14_HEADERS = [
  'KODE_UNIT', 'DETAIL_NAMA_ASSET', 'KATEGORI_ASSET', 'LOCATION',
  'DIV', 'DEPT', 'KODE_SECTION', 'TOTAL_TX', 'TOTAL_QTY',
  'TOTAL_NOMINAL', 'KATEGORI_MTC_UTAMA', 'SUB_KATEGORI_MTC_UTAMA',
  'LAST_MTC_DATE', 'KATEGORI_ASET_MTC'
];


function doGet(e) {
  if (e && e.parameter && e.parameter.api) {
    return handleApiGet(e.parameter);
  }

  var reportParam = (e && e.parameter && (e.parameter.report || e.parameter.view || e.parameter.page)) || '';
  var isReportValidasi = (reportParam === 'validasi' || reportParam === 'view-validasi');

  var pageTitle = isReportValidasi
    ? 'Laporan Hasil Validasi Aset - PT Pratama Nusantara Sakti'
    : 'PNS Asset Enterprise - PT Pratama Nusantara Sakti';

  // Routing Khusus: Sajikan Index_validasi saat requested report=validasi
  var htmlOutput;
  if (isReportValidasi) {
    try {
      htmlOutput = HtmlService.createHtmlOutputFromFile('Index_validasi');
    } catch (errV) {
      console.warn('Index_validasi file not found, falling back to default Index:', errV);
    }
  }

  // Prioritaskan createHtmlOutputFromFile Index_standalone agar 100% mandiri, instan, bebas error eval doGet
  if (!htmlOutput) {
    try {
      htmlOutput = HtmlService.createHtmlOutputFromFile('Index_standalone');
    } catch (err1) {
      try {
        htmlOutput = HtmlService.createHtmlOutputFromFile('Index');
      } catch (err2) {
        htmlOutput = HtmlService.createTemplateFromFile('Index').evaluate();
      }
    }
  }

  return htmlOutput
    .setTitle(pageTitle)
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


function apiGetLiveAssets(params) {
  params = params || {};
  var limit = parseInt(params.limit || 0, 10);
  var ss = getDb();
  var sheetLive = ss.getSheetByName('API_ASSET_LIVE');
  var useLiveApiSheet = sheetLive && sheetLive.getLastRow() > 1;
  var sheet = useLiveApiSheet ? sheetLive : getMasterAssetSheet(ss);
  if (!sheet || sheet.getLastRow() <= 1) return { success: true, live_timestamp: new Date().toISOString(), total_in_sheet: 0, returned_count: 0, items: [] };

  var numRows = sheet.getLastRow() - 1;
  var numCols = Math.min(useLiveApiSheet ? 36 : 42, sheet.getLastColumn());
  var rows = sheet.getRange(2, 1, numRows, numCols).getValues();

  var items = [];
  var search = (params.search || '').toLowerCase();
  var locFilter = (params.location || '').toUpperCase();
  var condFilter = (params.kondisi || '').toUpperCase();

  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var noAsset, kodeUnit, namaAsset, namaDetail, kondisi, loc, kelompok, kategori, hpp, umur, kodeSec, statusVerif, statusVerif3, userVerif, catVerif, tglVerif, tipeAsset, checkout, tglCheckout;
    if (useLiveApiSheet) {
      noAsset = String(r[3] || r[4] || r[0] || '').trim();
      kodeUnit = String(r[4] || r[3] || r[0] || '').trim();
      namaAsset = String(r[5] || '-').trim();
      namaDetail = namaAsset;
      kondisi = String(r[25] || r[26] || 'GOOD CONDITION').trim();
      loc = String(r[6] || 'CO').trim();
      kelompok = String(r[22] || 'INVENTARIS DAN PERALATAN').trim();
      kategori = String(r[21] || 'UMUM').trim();
      hpp = Number(r[18]) || 0;
      umur = Number(r[19]) || 0;
      kodeSec = String(r[8] || 'HRGA').trim();
      statusVerif = String(r[23] || 'BELUM VERIFIKASI').trim();
      statusVerif3 = kondisi;
      userVerif = String(r[27] || '-').trim();
      catVerif = String(r[28] || '-').trim();
      tglVerif = r[29] ? String(r[29]).slice(0, 19) : '-';
      tipeAsset = String(r[30] || 'UMUM').trim();
      checkout = String(r[12] || 'BELUM CHECKOUT').trim();
      tglCheckout = r[13] ? String(r[13]).slice(0, 19) : '-';
    } else {
      noAsset = String(r[7] || r[0] || '').trim();
      kodeUnit = String(r[9] || '').trim();
      namaAsset = String(r[11] || '').trim();
      namaDetail = String(r[12] || '').trim();
      kondisi = String(r[13] || 'GOOD CONDITION').trim();
      loc = String(r[1] || 'CO').trim();
      kelompok = String(r[36] || r[4] || '').trim();
      kategori = String(r[30] || r[5] || 'UMUM').trim();
      hpp = Number(r[18]) || 0;
      umur = Number(r[22]) || 0;
      kodeSec = String(r[2] || 'HRGA').trim();
      statusVerif = String(r[35] || 'BELUM VERIFIKASI').trim();
      statusVerif3 = kondisi;
      userVerif = '-';
      catVerif = '-';
      tglVerif = '-';
      tipeAsset = String(r[3] || 'UMUM').trim();
      checkout = String(r[15] || 'BELUM CHECKOUT').trim();
      tglCheckout = '-';
    }

    if (locFilter && loc.toUpperCase() !== locFilter) continue;
    if (condFilter && kondisi.toUpperCase().indexOf(condFilter) === -1) continue;
    if (search) {
      var comb = (noAsset + ' ' + kodeUnit + ' ' + namaAsset + ' ' + namaDetail).toLowerCase();
      if (comb.indexOf(search) === -1) continue;
    }

    items.push({
      asset_id: r[0],
      location: loc,
      lokasi_code: loc,
      no_asset: noAsset,
      kode_unit: kodeUnit,
      nama_asset: namaAsset,
      nama_asset_detail: namaDetail,
      kondisi: kondisi,
      kelompok_asset: kelompok,
      kategori_asset: kategori,
      total_harga_perolehan: hpp,
      harga_perolehan: hpp,
      umur_asset: umur,
      standar_umur: useLiveApiSheet ? 5 : (r[16] || 5),
      kode_section: kodeSec,
      status_verifikasi: statusVerif,
      status_verifikasi_3: statusVerif3,
      user_verifikasi: userVerif,
      catatan_verifikasi: catVerif,
      tanggal_verifikasi: tglVerif,
      tipe_asset: tipeAsset,
      checkout: checkout,
      tanggal_checkout: tglCheckout
    });

    if (limit > 0 && items.length >= limit) break;
  }

  return {
    success: true,
    source_sheet: useLiveApiSheet ? 'API_ASSET_LIVE' : 'asset',
    live_timestamp: new Date().toISOString(),
    total_in_sheet: numRows,
    returned_count: items.length,
    items: items
  };
}

function handleApiGet(params) {
  var api = params.api;
  var res = { success: true, data: null };

  try {
    if (api === 'live_assets' || api === 'assets_live') {
      res.data = apiGetLiveAssets(params);
    } else if (api === 'bootstrap') {
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
      res.data = syncAssetVerReportFromApi(true);
    } else if (api === 'rebuild_mtc_summary') {
      res.data = rebuildMtcUnitSummary(true);
    } else if (api === 'full_system_refresh') {
      res.data = apiFullSystemRefresh({ rebuildMtc: params.rebuild_mtc !== '0' });
    } else if (api === 'cron_status') {
      res.data = getCronStatus();
    } else if (api === 'hunian_photos') {
      res.data = apiGetHunianPhotos(params.kode_gedung || '');
    } else if (api === 'pmak') {
      res.data = apiGetPmakList(parseInt(params.limit || 200, 10));
    } else if (api === 'data_mtc') {
      res.data = apiGetMtcHistory(params.kode_unit || '', parseInt(params.limit || 200, 10), params.kat_mtc || '', params.sub_kat_mtc || '');
    } else if (api === 'mtc_summary') {
      res.data = apiGetMtcSummary(params.fresh === '1' || params.fresh === 'true');
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
  } else if (action === 'save_hunian_photo' || action === 'upload_photo' || action === 'upload_asset_photo') {
    return apiUploadPhotoToDrive(payload);
  } else if (action === 'sync_api_report') {
    return syncAssetVerReportFromApi(true);
  } else if (action === 'pull_raw_api') {
    return pullRawApiToSheet();
  } else if (action === 'compare_api_asset') {
    return compareApiWithMasterAsset();
  } else if (action === 'clean_master_asset') {
    return cleanExtraApiRowsFromMasterAsset();
  } else if (action === 'save_pmak') {
    return apiSavePmak(payload);
  } else if (action === 'import_data_mtc') {
    return importDataMtcFromDrive(payload.fileName || '');
  } else if (action === 'rebuild_mtc_summary') {
    return rebuildMtcUnitSummary(true);
  } else if (action === 'full_system_refresh') {
    return apiFullSystemRefresh({ rebuildMtc: payload.rebuild_mtc !== false });
  } else if (action === 'install_hourly_cron') {
    return installHourlyCronTrigger();
  } else if (action === 'remove_hourly_cron') {
    return removeHourlyCronTrigger();
  }
  return { success: false, message: 'Aksi POST tidak dikenal: ' + action };
}

/**
 * Menu Admin Otomatis di Google Sheets (Backend Control Panel)
 */
function onOpen() {
  try {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('🏢 PNS Asset System')
      .addItem('📋 1. Cek Status & Jumlah Data Database', 'checkDatabaseHealthStatus')
      .addSeparator()
      .addItem('⚡ 2. Tarik Sinkronisasi API Pusat PNS (Opsional)', 'syncAssetVerReportFromApi')
      .addSeparator()
      .addItem('📥 3. Import data_mtc dari Google Drive (Auto Kategori)', 'importDataMtcFromDrive')
      .addItem('🔄 4. Rebuild Ringkasan MTC per KODE UNIT', 'rebuildMtcUnitSummary')
      .addSeparator()
      .addItem('🚀 5. Refresh Full System (API → Sheet → MTC)', 'menuFullSystemRefresh')
      .addItem('⏰ 6. Aktifkan Cron Otomatis Per Jam', 'installHourlyCronTrigger')
      .addItem('🛑 7. Matikan Cron Otomatis Per Jam', 'removeHourlyCronTrigger')
      .addItem('📊 8. Cek Status Cron & Sync Terakhir', 'showCronStatusAlert')
      .addToUi();
  } catch (e) {
    Logger.log('onOpen info: ' + e);
  }
}

function checkDatabaseHealthStatus() {
  try {
    var ss = getDb();
    var assetSheet = getMasterAssetSheet(ss);
    var bldgSheet = ss.getSheetByName('M_GEDUNG');
    var roomSheet = ss.getSheetByName('M_RUANGAN');
    var penghuniSheet = ss.getSheetByName('M_PENGHUNI');
    var mtcSheet = ss.getSheetByName('data_mtc') || ss.getSheetByName('WORK_ORDERS');
    var inspSheet = ss.getSheetByName('ROOM_INSPECTIONS');

    var assetCount = assetSheet && assetSheet.getLastRow() > 1 ? (assetSheet.getLastRow() - 1) : 0;
    var bldgCount = bldgSheet && bldgSheet.getLastRow() > 1 ? (bldgSheet.getLastRow() - 1) : 0;
    var roomCount = roomSheet && roomSheet.getLastRow() > 1 ? (roomSheet.getLastRow() - 1) : 0;
    var penghuniCount = penghuniSheet && penghuniSheet.getLastRow() > 1 ? (penghuniSheet.getLastRow() - 1) : 0;
    var mtcCount = mtcSheet && mtcSheet.getLastRow() > 1 ? (mtcSheet.getLastRow() - 1) : 0;
    var inspCount = inspSheet && inspSheet.getLastRow() > 1 ? (inspSheet.getLastRow() - 1) : 0;

    var msg = '=== STATUS DATABASE PNS ASSET ===\n\n' +
      '• Tab asset: ' + assetCount.toLocaleString('id-ID') + ' unit aset terdaftar\n' +
      '• Tab M_GEDUNG: ' + bldgCount.toLocaleString('id-ID') + ' gedung fisik\n' +
      '• Tab M_RUANGAN: ' + roomCount.toLocaleString('id-ID') + ' ruangan fisik\n' +
      '• Tab M_PENGHUNI: ' + penghuniCount.toLocaleString('id-ID') + ' slot hunian sensus\n' +
      '• Tab data_mtc: ' + mtcCount.toLocaleString('id-ID') + ' riwayat pemeliharaan\n' +
      '• Tab ROOM_INSPECTIONS: ' + inspCount.toLocaleString('id-ID') + ' transaksi inspeksi\n\n' +
      'Seluruh tab utama aktif dan siap melayani Web App.\n' +
      'Operasional harian (Inspeksi, Sensus, Part, Foto Drive) berjalan otomatis dari Web App.';

    SpreadsheetApp.getUi().alert('PNS Asset System Health', msg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (err) {
    SpreadsheetApp.getUi().alert('Status Database', 'Error cek database: ' + err.toString(), SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

function apiGetDashboardStats() {
  var ss = getDb();
  var sheetGedung = ss.getSheetByName('M_GEDUNG') || ss.getSheetByName('DIM_BANGUNAN');
  var sheetRuangan = ss.getSheetByName('M_RUANGAN') || ss.getSheetByName('DIM_RUANGAN');
  var sheetInsp = ss.getSheetByName('ROOM_INSPECTIONS') || ss.getSheetByName('LOG_TRANSAKSI_LAPANGAN');
  var sheetMtc = ss.getSheetByName('data_mtc') || ss.getSheetByName('Data MTC') || ss.getSheetByName('WORK_ORDERS');
  var sheetLiveApi = ss.getSheetByName('API_ASSET_LIVE');
  var sheetAsset = ss.getSheetByName('asset') || ss.getSheetByName('ASSETS') || ss.getSheetByName('FACT_ASET');

  var totalGedung = sheetGedung && sheetGedung.getLastRow() > 1 ? (sheetGedung.getLastRow() - 1) : 416;
  var totalRuangan = sheetRuangan && sheetRuangan.getLastRow() > 1 ? (sheetRuangan.getLastRow() - 1) : 1559;
  var totalInsp = sheetInsp && sheetInsp.getLastRow() > 1 ? (sheetInsp.getLastRow() - 1) : 12;
  var sheetMtcSum = ss.getSheetByName('MTC_SUMMARY_UNIT');
  var totalMtc = sheetMtc && sheetMtc.getLastRow() > 1 ? (sheetMtc.getLastRow() - 1) : 70487;
  var totalBiayaMtc = 29117201746;
  if (sheetMtcSum && sheetMtcSum.getLastRow() > 1) {
    try {
      var sumRows = sheetMtcSum.getRange(2, 8, sheetMtcSum.getLastRow() - 1, 3).getValues();
      var sTx = 0, sNom = 0;
      for (var si = 0; si < sumRows.length; si++) {
        sTx += Number(sumRows[si][0]) || 0;
        sNom += Number(sumRows[si][2]) || 0;
      }
      if (sNom > 0) totalBiayaMtc = Math.round(sNom);
      if (sTx > 0) totalMtc = Math.round(sTx);
    } catch (eSum) {}
  }
  var liveApiCount = sheetLiveApi && sheetLiveApi.getLastRow() > 1 ? (sheetLiveApi.getLastRow() - 1) : 0;
  var masterAssetCount = sheetAsset && sheetAsset.getLastRow() > 1 ? (sheetAsset.getLastRow() - 1) : 0;
  var totalAssetsLive = Math.max(liveApiCount, masterAssetCount, 35160);
  var meta = getSyncMeta_();

  return {
    total_gedung: totalGedung,
    total_ruangan: totalRuangan,
    total_assets: totalAssetsLive,
    live_api_count: liveApiCount,
    master_asset_count: masterAssetCount,
    total_inspeksi: totalInsp,
    total_wo: totalMtc,
    total_belum_checkout: meta.belum_checkout_count || 279,
    valuasi_hpp: 1120265723612,
    akumulasi_penyusutan: 438484408626,
    nilai_buku_nbv: 681781314986,
    biaya_perawatan: totalBiayaMtc,
    last_api_sync_at: meta.last_api_sync_at || null,
    last_mtc_rebuild_at: meta.last_mtc_rebuild_at || null,
    last_cron_run_at: meta.last_cron_run_at || null
  };
}

function apiGetLiveApiAssetDelta(limit) {
  var ss = getDb();
  var maxRows = limit || 600;
  var res = [];
  var seenCode = {};

  // 1. Prioritaskan temuan perubahan & aset baru dari COMPARE_API_ASSET
  var compSheet = ss.getSheetByName('COMPARE_API_ASSET');
  if (compSheet && compSheet.getLastRow() > 1) {
    var cLastRow = compSheet.getLastRow();
    var cLastCol = Math.min(21, compSheet.getLastColumn());
    var cCount = Math.min(cLastRow - 1, Math.min(400, maxRows));
    var cRows = compSheet.getRange(2, 1, cCount, cLastCol).getValues();
    for (var ci = 0; ci < cRows.length; ci++) {
      var cr = cRows[ci];
      var katTemuan = String(cr[1] || '').toUpperCase();
      if (katTemuan.indexOf('HANYA DI MASTER') !== -1) continue;
      var cCode = String((cr[3] && cr[3] !== '-') ? cr[3] : (cr[4] || '')).trim();
      if (!cCode || cCode === '-' || seenCode[cCode]) continue;
      seenCode[cCode] = true;
      var cHpp = parseFloat(cr[16] || cr[17] || 0) || 0;
      res.push({
        asset_id: cr[2],
        lokasi_code: String((cr[7] && cr[7] !== '-') ? cr[7] : (cr[8] || 'CO')).trim(),
        kode_section: String((cr[9] && cr[9] !== '-') ? cr[9] : (cr[10] || 'HRGA')).trim(),
        jenis_asset: cHpp > 0 ? 'Asset' : 'Non-Valueable Asset',
        kelompok_asset: String(cr[6] || 'INVENTARIS DAN PERALATAN').trim(),
        kategori_asset: String(cr[6] || 'INVENTARIS PERUMAHAN').trim(),
        no_asset: cCode,
        kode_unit: cCode,
        nama_asset: String(cr[5] || '-').trim(),
        nama_asset_detail: String(cr[5] || '-').trim(),
        kondisi: String((cr[14] && cr[14] !== '-') ? cr[14] : (cr[15] || 'Good Condition')).trim(),
        umur_ekonomis: 5,
        umur_asset: 0,
        tanggal_perolehan: cr[18] ? String(cr[18]).slice(0, 10) : '',
        harga_perolehan: cHpp,
        nilai_buku: cHpp,
        akumulasi_penyusutan: 0,
        status_verifikasi: String(cr[13] || 'BELUM VERIFIKASI').trim(),
        status_verifikasi_3: String((cr[14] && cr[14] !== '-') ? cr[14] : 'Good Condition').trim(),
        user_verifikasi: '-',
        catatan_verifikasi: String(cr[19] || '-').trim(),
        tanggal_verifikasi: cr[20] ? String(cr[20]).slice(0, 19) : '-',
        tipe_asset: 'UMUM',
        checkout: String(cr[11] || 'BELUM CHECKOUT').trim(),
        tanggal_checkout: '-'
      });
    }
  }

  // 2. Lengkapi dari baris terbaru API_ASSET_LIVE (hingga maxRows)
  var sheet = ss.getSheetByName('API_ASSET_LIVE');
  if (sheet && sheet.getLastRow() > 1 && res.length < maxRows) {
    var lastRow = sheet.getLastRow();
    var lastCol = Math.min(36, sheet.getLastColumn());
    var remaining = maxRows - res.length;
    var count = Math.min(lastRow - 1, remaining);
    var startRow = Math.max(2, lastRow - count + 1);
    var rows = sheet.getRange(startRow, 1, count, lastCol).getValues();
    for (var i = rows.length - 1; i >= 0; i--) {
      var r = rows[i];
      var kodeUnit = String(r[4] || r[3] || r[2] || r[0] || '').trim();
      if (!kodeUnit || seenCode[kodeUnit]) continue;
      seenCode[kodeUnit] = true;
      var hpp = parseFloat(r[18] || 0);
      var umur = Number(r[19]) || 0;
      res.push({
        asset_id: r[0],
        lokasi_code: String(r[6] || 'CO').trim(),
        kode_section: String(r[8] || 'HRGA').trim(),
        jenis_asset: hpp > 0 ? 'Asset' : 'Non-Valueable Asset',
        kelompok_asset: String(r[22] || 'INVENTARIS DAN PERALATAN').trim(),
        kategori_asset: String(r[21] || 'INVENTARIS PERUMAHAN').trim(),
        no_asset: String(r[3] || kodeUnit).trim(),
        kode_unit: kodeUnit,
        nama_asset: String(r[5] || '-').trim(),
        nama_asset_detail: String(r[5] || '-').trim(),
        kondisi: String(r[25] || r[26] || 'Good Condition').trim(),
        umur_ekonomis: 5,
        umur_asset: umur,
        tanggal_perolehan: r[17] ? String(r[17]).slice(0, 10) : '',
        harga_perolehan: hpp,
        nilai_buku: hpp,
        akumulasi_penyusutan: 0,
        status_verifikasi: String(r[23] || 'BELUM VERIFIKASI').trim(),
        status_verifikasi_3: String(r[25] || r[26] || 'Good Condition').trim(),
        user_verifikasi: String(r[27] || '-').trim(),
        catatan_verifikasi: String(r[28] || '-').trim(),
        tanggal_verifikasi: r[29] ? String(r[29]).slice(0, 19) : '-',
        tipe_asset: String(r[30] || 'UMUM').trim(),
        checkout: String(r[12] || 'BELUM CHECKOUT').trim(),
        tanggal_checkout: r[13] ? String(r[13]).slice(0, 19) : '-'
      });
    }
  }
  return res;
}

function apiGetBootstrapData() {
  return {
    stats: apiGetDashboardStats(),
    inspections: apiGetInspectionHistory(50),
    workOrders: apiGetWorkOrders(),
    penghuni: apiGetPenghuniList(''),
    registeredAssets: apiGetRegisteredAssets(300),
    liveApiAssets: apiGetLiveApiAssetDelta(600),
    mutations: apiGetAssetMutations(200),
    sync_meta: getCronStatus(),
    fetched_at: new Date().toISOString()
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

  var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, Math.min(12, sheet.getLastColumn())).getValues();
  var res = [];
  var filterKode = (kodeGedung || '').trim();

  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    // Fleksibel & Tangguh: Deteksi otomatis pergeseran kolom (bila Col A berisi nomor ID atau RNG-)
    var rId, bCode, rName, rType, rPj, rCap, rTotalAsset, rStatus;

    if (String(r[1] || '').indexOf('RNG-') === 0 || (String(r[2] || '').indexOf('PNS-') === 0 && !isNaN(Number(r[0])))) {
      // Struktur Bergeser: Col A=Numeric(1437), Col B=ruangan_id(RNG-1437), Col C=kode_gedung(PNS-MGR-01-06), Col D=nama_ruangan, Col E=tipe_ruangan, Col F=lokasi/PJ, Col G=kapasitas, Col H=total_asset, Col I=status
      rId = String(r[1] || r[0] || '').trim();
      bCode = String(r[2] || '').trim();
      rName = String(r[3] || '').trim();
      rType = String(r[4] || 'Kamar').trim();
      rPj = String(r[5] || '').trim();
      rCap = Number(r[6]) || 2;
      rTotalAsset = Number(r[7]) || 0;
      rStatus = String(r[8] || 'Tersedia').trim();
    } else {
      // Struktur Standar: Col A=ruangan_id(RNG-1437), Col B=kode_gedung(PNS-MGR-01-06), Col C=nama_ruangan, Col D=tipe_ruangan, Col E=lokasi/PJ, Col F=kapasitas, Col G=total_asset, Col H=status
      rId = String(r[0] || '').trim();
      bCode = String(r[1] || '').trim();
      rName = String(r[2] || '').trim();
      rType = String(r[3] || 'Kamar').trim();
      rPj = String(r[4] || '').trim();
      rCap = Number(r[5]) || 2;
      rTotalAsset = Number(r[6]) || 0;
      rStatus = String(r[7] || 'Tersedia').trim();
    }

    if (filterKode && bCode !== filterKode && (!filterKode.includes(bCode) && !bCode.includes(filterKode))) continue;

    res.push({
      ruangan_id: rId,
      kode_gedung: bCode,
      nama_ruangan: rName || ('Kamar ' + (i + 1)),
      tipe_ruangan: rType || 'Kamar',
      kapasitas: rCap,
      penanggungjawab: rPj || 'HRGA PNS',
      total_asset: rTotalAsset,
      kondisi_terakhir: 'Baik',
      status_hunian: rStatus,
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
        (function() {
          var f = payload.foto_inspeksi || '';
          if (typeof f === 'string' && f.indexOf('data:image') === 0) {
            var resDrive = saveBase64ImageToDrive(f, 'INSP_' + noInspeksi + '.jpg', 'PNS ASSET & FACILITY PHOTOS');
            if (resDrive.success && resDrive.fileUrl) {
              return '=HYPERLINK("' + resDrive.fileUrl + '", "📸 Buka Foto Temuan Drive")';
            }
          }
          return f;
        })(),
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

function getSyncMeta_() {
  try {
    var raw = PropertiesService.getScriptProperties().getProperty('PNS_SYNC_META_V1');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveSyncMeta_(patch) {
  try {
    var props = PropertiesService.getScriptProperties();
    var cur = getSyncMeta_();
    for (var k in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, k)) {
        cur[k] = patch[k];
      }
    }
    props.setProperty('PNS_SYNC_META_V1', JSON.stringify(cur));
    return cur;
  } catch (e) {
    Logger.log('saveSyncMeta_ error: ' + e);
    return {};
  }
}

/**
 * 3. Full Sync Backend: Tarik Data Asli API ke `API_ASSET_LIVE` + Compare ke `COMPARE_API_ASSET`
 *    (Tanpa mengubah/merusak struktur 42 kolom di sheet `asset`)
 */
function syncAssetVerReportFromApi(silent) {
  try {
    var url = 'https://api.pns.co.id/main/asset_ver_report';
    var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    var json = JSON.parse(response.getContentText());
    var data = json.data || [];

    var totalHppApi = 0;
    for (var idx = 0; idx < data.length; idx++) {
      totalHppApi += parseFloat(data[idx].TOTAL_HARGA_PEROLEHAN || 0) || 0;
    }

    var pullRes = pullRawApiToSheet(data);
    var compRes = compareApiWithMasterAsset(data);
    var syncedAt = new Date().toISOString();

    saveSyncMeta_({
      last_api_sync_at: syncedAt,
      total_api_rows: data.length,
      belum_checkout_count: compRes.belumCheckout || 0,
      new_in_api: compRes.newInApi || 0,
      diff_loc_checkout: compRes.diffLocOrCheckout || 0,
      total_hpp_api: Math.round(totalHppApi)
    });

    var summaryMsg = 'Tarik API & Compare Berhasil!\n' +
      '• Tab API_ASSET_LIVE: ' + (pullRes.totalApiRows || data.length) + ' baris asli API (36 kolom)\n' +
      '• Tab COMPARE_API_ASSET: ' + (compRes.totalFindings || 0) + ' baris selisih/rekonsiliasi\n' +
      '  - Baru di API (Belum di sheet asset): ' + (compRes.newInApi || 0) + '\n' +
      '  - Reminder Belum Checkout: ' + (compRes.belumCheckout || 0) + '\n' +
      '  - Beda Lokasi / Checkout: ' + (compRes.diffLocOrCheckout || 0) + '\n' +
      '• Sheet Master `asset` (42 kolom) tetap terjaga murni.';

    if (!silent) {
      try {
        SpreadsheetApp.getUi().alert('Sinkronisasi & Compare API Selesai', summaryMsg, SpreadsheetApp.getUi().ButtonSet.OK);
      } catch (uiErr) {}
    }

    return {
      success: true,
      message: summaryMsg,
      totalApi: data.length,
      updated: compRes.diffLocOrCheckout || 0,
      inserted: compRes.newInApi || 0,
      belumCheckout: compRes.belumCheckout || 0,
      synced_at: syncedAt,
      compareResult: compRes
    };
  } catch (err) {
    Logger.log('syncAssetVerReportFromApi error: ' + err);
    return { success: false, error: String(err) };
  }
}

function getCronStatus() {
  var count = 0;
  try {
    var triggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() === 'runHourlySystemSyncCron') {
        count++;
      }
    }
  } catch (e) {
    Logger.log('getCronStatus error: ' + e);
  }
  return {
    cron_active: count > 0,
    trigger_count: count,
    interval_hours: 1,
    meta: getSyncMeta_()
  };
}

function installHourlyCronTrigger() {
  try {
    var triggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() === 'runHourlySystemSyncCron') {
        ScriptApp.deleteTrigger(triggers[i]);
      }
    }
    ScriptApp.newTrigger('runHourlySystemSyncCron')
      .timeBased()
      .everyHours(1)
      .create();

    saveSyncMeta_({ cron_installed_at: new Date().toISOString() });
    var msg = 'Cron otomatis per jam AKTIF!\n\nHandler: runHourlySystemSyncCron\nInterval: Setiap 1 jam otomatis menarik API Pusat ke Google Sheet, me-rebuild MTC_SUMMARY_UNIT, dan membersihkan cache Web App.';
    try { SpreadsheetApp.getUi().alert('Cron Per Jam Diaktifkan', msg, SpreadsheetApp.getUi().ButtonSet.OK); } catch (uiErr) {}
    return { success: true, cron_active: true, trigger_count: 1, message: 'Cron otomatis setiap 1 jam aktif (runHourlySystemSyncCron).' };
  } catch (err) {
    return { success: false, message: String(err) };
  }
}

function removeHourlyCronTrigger() {
  try {
    var triggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() === 'runHourlySystemSyncCron') {
        ScriptApp.deleteTrigger(triggers[i]);
      }
    }
    var msg = 'Cron otomatis per jam telah dimatikan.';
    try { SpreadsheetApp.getUi().alert('Cron Per Jam Dimatikan', msg, SpreadsheetApp.getUi().ButtonSet.OK); } catch (uiErr) {}
    return { success: true, cron_active: false, trigger_count: 0, message: msg };
  } catch (err) {
    return { success: false, message: String(err) };
  }
}

function showCronStatusAlert() {
  var st = getCronStatus();
  var m = st.meta || {};
  var msg = 'Status Cron Per Jam: ' + (st.cron_active ? 'AKTIF (' + st.trigger_count + ' trigger setiap 1 jam)' : 'BELUM AKTIF') + '\n\n' +
    '• Cron Terakhir Jalan: ' + (m.last_cron_run_at || '-') + ' (' + (m.last_cron_status || '-') + ')\n' +
    '• Sync API Pusat Terakhir: ' + (m.last_api_sync_at || '-') + ' (' + (m.total_api_rows || 0) + ' baris)\n' +
    '• Rebuild MTC Terakhir: ' + (m.last_mtc_rebuild_at || '-') + ' (' + (m.mtc_total_units || 0) + ' unit / ' + (m.mtc_total_tx || 0) + ' tx)';
  try { SpreadsheetApp.getUi().alert('Status Cron & Sinkronisasi Sistem', msg, SpreadsheetApp.getUi().ButtonSet.OK); } catch (uiErr) {}
  return st;
}

function runHourlySystemSyncCron() {
  var apiRes = syncAssetVerReportFromApi(true);
  var mtcRes = rebuildMtcUnitSummary(true);
  try { CacheService.getScriptCache().remove('MTC_SUMMARY_V1'); } catch (eCache) {}
  var ranAt = new Date().toISOString();
  var ok = !!(apiRes && apiRes.success && mtcRes && mtcRes.success);
  saveSyncMeta_({
    last_cron_run_at: ranAt,
    last_cron_status: ok ? 'OK' : 'PARTIAL'
  });
  Logger.log('runHourlySystemSyncCron [' + ranAt + '] status=' + (ok ? 'OK' : 'PARTIAL') + ' api=' + (apiRes && apiRes.totalApi) + ' mtc_units=' + (mtcRes && mtcRes.total_units));
  return {
    success: ok,
    api_sync: apiRes,
    mtc_rebuild: mtcRes,
    ran_at: ranAt
  };
}

function apiFullSystemRefresh(options) {
  var opt = options || {};
  var apiRes = syncAssetVerReportFromApi(true);
  var mtcRes = null;
  if (opt.rebuildMtc !== false) {
    mtcRes = rebuildMtcUnitSummary(true);
  } else {
    try { CacheService.getScriptCache().remove('MTC_SUMMARY_V1'); } catch (eCache) {}
  }
  return {
    success: true,
    refreshed_at: new Date().toISOString(),
    api_sync: apiRes,
    mtc_rebuild: mtcRes,
    sync_meta: getCronStatus(),
    bootstrap: apiGetBootstrapData(),
    mtc_summary: apiGetMtcSummary(true)
  };
}

function menuFullSystemRefresh() {
  var res = apiFullSystemRefresh({ rebuildMtc: true });
  var msg = 'Refresh Full System Selesai!\n\n' +
    '• API Pusat -> API_ASSET_LIVE: ' + ((res.api_sync && res.api_sync.totalApi) || 0) + ' baris\n' +
    '• Temuan Baru/Beda -> COMPARE_API_ASSET: ' + ((res.api_sync && (res.api_sync.updated + res.api_sync.inserted)) || 0) + ' baris\n' +
    '• MTC Summary Unit: ' + ((res.mtc_rebuild && res.mtc_rebuild.total_units) || 0) + ' KODE UNIT (' + ((res.mtc_rebuild && res.mtc_rebuild.total_tx) || 0) + ' transaksi)\n' +
    '• Waktu Refresh: ' + res.refreshed_at;
  try { SpreadsheetApp.getUi().alert('Refresh Full System Selesai', msg, SpreadsheetApp.getUi().ButtonSet.OK); } catch (uiErr) {}
  return res;
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

/**
 * Helper untuk Menyimpan Base64 Image langsung ke Folder Google Drive
 * Mengembalikan Object: { success: true, fileId: '...', fileUrl: '...', directUrl: '...' }
 */
function saveBase64ImageToDrive(base64Data, customFileName, customFolderName) {
  try {
    if (!base64Data || typeof base64Data !== 'string') {
      return { success: false, message: 'Data base64 kosong' };
    }

    var folderName = customFolderName || 'PNS ASSET & FACILITY PHOTOS';
    var folders = DriveApp.getFoldersByName(folderName);
    var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

    // Ekstrak mimeType dan payload base64 murni
    var matches = base64Data.match(/^data:(image\/[a-zA-Z0-9\+\-\.]+);base64,(.+)$/);
    var mimeType = (matches && matches[1]) ? matches[1] : MimeType.JPEG;
    var rawClean = (matches && matches[2]) ? matches[2] : base64Data.replace(/^data:[^;]+;base64,/, '');

    var ext = mimeType.indexOf('png') !== -1 ? '.png' : '.jpg';
    var nowTag = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd_HHmmss');
    var fileName = customFileName ? (customFileName + (customFileName.indexOf('.') !== -1 ? '' : ext)) : ('PNS_FOTO_' + nowTag + ext);

    var blob = Utilities.newBlob(Utilities.base64Decode(rawClean), mimeType, fileName);
    var driveFile = folder.createFile(blob);

    try {
      driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (eShare) {
      Logger.log('Set sharing notice: ' + eShare.toString());
    }

    var fileId = driveFile.getId();
    var fileUrl = driveFile.getUrl();
    var directUrl = 'https://drive.google.com/uc?export=view&id=' + fileId;

    return {
      success: true,
      fileId: fileId,
      fileUrl: fileUrl,
      directUrl: directUrl,
      fileName: fileName
    };
  } catch (err) {
    Logger.log('saveBase64ImageToDrive error: ' + err.toString());
    return { success: false, message: err.toString() };
  }
}


/**
 * ============================================================================
 * UPLOAD FOTO KE GOOGLE DRIVE & SIMPAN TAUTAN KLIK DI SPREADSHEET
 * ============================================================================
 * Menyimpan foto dokumentasi fisik aset/hunian ke folder Google Drive resmi
 * dan mencatatkan baris log dengan rumus =HYPERLINK() agar bisa diklik langsung di sheet.
 */
function apiUploadPhotoToDrive(payload) {
  return SheetDB.withLock(function() {
    try {
      if (!payload) return { success: false, message: 'Payload foto kosong.' };
      var rawPhoto = payload.foto_base64 || payload.foto_url || payload.url || '';
      if (!rawPhoto) return { success: false, message: 'Tidak ada data foto yang dikirim.' };

      var fileUrl = '';
      var fileId = '';
      var directUrl = '';

      if (rawPhoto.indexOf('data:image') === 0) {
        var bCode = (payload.kode_gedung || payload.no_asset || 'UMUM').replace(/[^a-zA-Z0-9_\-]/g, '_');
        var nowTag = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd_HHmmss');
        var fileName = payload.file_name || ('PNS_' + bCode + '_' + nowTag + '.jpg');
        var driveRes = saveBase64ImageToDrive(rawPhoto, fileName, 'PNS ASSET & FACILITY PHOTOS');
        if (driveRes.success) {
          fileId = driveRes.fileId;
          fileUrl = driveRes.fileUrl;
          directUrl = driveRes.directUrl;
        } else {
          return { success: false, message: 'Gagal simpan ke Drive: ' + driveRes.message };
        }
      } else {
        fileUrl = rawPhoto;
      }

      var nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');
      
      // 1. Simpan ke tab LOG_FOTO_ASET dengan formula =HYPERLINK
      var logSheet = SheetDB.ensureSheet('LOG_FOTO_ASET', [
        'ID', 'TANGGAL', 'KODE_GEDUNG', 'NAMA_GEDUNG', 'NAMA_RUANGAN', 'NO_ASSET',
        'KATEGORI_FOTO', 'CAPTION', 'DRIVE_FILE_ID', 'DRIVE_URL', 'KLIK_BUKA_FOTO', 'UPLOADER'
      ]);
      var nextId = SheetDB.getNextId(logSheet);
      var hyperlinkFormula = fileUrl ? ('=HYPERLINK("' + fileUrl + '", "📸 Buka Foto di Google Drive")') : '-';

      logSheet.appendRow([
        nextId,
        nowStr,
        payload.kode_gedung || '',
        payload.nama_gedung || '',
        payload.nama_ruangan || '',
        payload.no_asset || '',
        payload.kategori || 'Dokumentasi Lapangan',
        payload.caption || '',
        fileId,
        fileUrl,
        hyperlinkFormula,
        payload.uploader || 'Petugas Lapangan'
      ]);

      // 2. Simpan juga ke tab M_FOTO_HUNIAN untuk kompatibilitas data hunian
      try {
        var hunianSheet = SheetDB.ensureSheet('M_FOTO_HUNIAN', [
          'id', 'kode_gedung', 'kategori_foto', 'caption', 'foto_url', 'link_spreadsheet', 'uploader', 'created_at'
        ]);
        hunianSheet.appendRow([
          SheetDB.getNextId(hunianSheet),
          payload.kode_gedung || '',
          payload.kategori || 'Tampak Depan / Eksterior',
          payload.caption || '',
          fileUrl,
          hyperlinkFormula,
          payload.uploader || 'Petugas Hunian',
          nowStr
        ]);
      } catch (eH) {
        Logger.log('Notice M_FOTO_HUNIAN: ' + eH.toString());
      }

      return {
        success: true,
        id: nextId,
        fileId: fileId,
        fileUrl: fileUrl,
        directUrl: directUrl,
        hyperlink: hyperlinkFormula,
        message: 'Foto berhasil diunggah ke Google Drive dan link klik tersimpan di Spreadsheet.'
      };
    } catch (err) {
      Logger.log('apiUploadPhotoToDrive error: ' + err.toString());
      return { success: false, message: 'Error server: ' + err.toString() };
    }
  }, 30000);
}

// Alias untuk kompatibilitas fungsi lama
function apiSaveHunianPhoto(payload) {
  return apiUploadPhotoToDrive(payload);
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
 * ============================================================================
 * ENGINE MAINTENANCE BARU (24 KOLOM data_mtc + KODE UNIT + MTC_SUMMARY_UNIT)
 * ============================================================================
 */
function classifyMaintenancePart_(partName, desc, namaCoa, katAset) {
  var p = String(partName || '').toUpperCase();
  var d = String(desc || '').toUpperCase();
  var coa = String(namaCoa || '').toUpperCase();
  var kat = String(katAset || '').toUpperCase();
  var text = p + ' ' + d;

  if (/\bTAMBAL BAN\b|\bGANTI BAN\b|\bVULKANISIR\b|\bPRESS BAN\b/.test(text) && (coa.indexOf('JASA') !== -1 || p.indexOf('JASA') !== -1 || p.indexOf('TAMBAL') !== -1)) return ['Jasa & Servis Bengkel (Labor & Services)', 'Jasa Ganti / Tambal Ban'];
  if (/\bBAN DALAM\b|\bTUBE\b|\bFLAP\b|\bMARSET\b/.test(p)) return ['Ban, Roda & Penggerak (Tire & Chassis)', 'Ban Dalam & Flap (Tube)'];
  if (/\bBAN LUAR\b|\bTIRE\b|\bTYRE\b|\bSWALLOW\b|\bIRC\b|\bDUNLOP\b|\bBRIDGESTONE\b|\bGAJAH TUNGGAL\b|\b7\.50-16\b|\b80\/90\b|\b70\/90\b|\b2\.75-17\b|\b2\.50-17\b/.test(p)) return ['Ban, Roda & Penggerak (Tire & Chassis)', 'Ban Luar (Tire)'];
  if (/\bBEARING\b|\bLAHER\b|\bBUSHING\b|\bCOMSTIR\b|\bCONE\b|\bBALL RACE\b/.test(p)) return ['Ban, Roda & Penggerak (Tire & Chassis)', 'Bearing & Bushing Roda'];
  if (/\bRANTAI\b|\bGEAR SET\b|\bSPROCKET\b|\bGIR\b|\bCHAIN\b/.test(p)) return ['Ban, Roda & Penggerak (Tire & Chassis)', 'Rantai & Gear Set (Drive Chain)'];

  if (/\bSHOE\b|\bKAMPAS REM BELAKANG\b|\bBRAKE SHOE\b|\bSHOE SET\b/.test(p)) return ['Sistem Pengereman (Brake System)', 'Kampas Rem Belakang (Shoe Set RR)'];
  if (/\bPAD SET\b|\bKAMPAS REM DEPAN\b|\bBRAKE PAD\b|\bDISKPAD\b|\bDISC PAD\b|\bKAMPAS REM\b/.test(p)) return ['Sistem Pengereman (Brake System)', 'Kampas Rem Depan (Pad Set FR)'];
  if (/\bMASTER REM\b|\bCALIPER\b|\bBRAKE CYLINDER\b|\bCAKRAM\b|\bTROMOL\b|\bBOOSTER REM\b/.test(p)) return ['Sistem Pengereman (Brake System)', 'Master Rem, Caliper & Piston'];

  if (coa.indexOf('JASA') !== -1 || /^JASA\b|\bUPAH\b|\bSERVICE\b|\bSERVIS\b|\bPERBAIKAN\b|\bKALIBRASI\b|\bOVERHOUL\b|\bOVERHAUL\b|\bBUBUT\b|\bLAS\b|\bFABRIKASI\b|\bCUCI AC\b|\bBONGKAR PASANG\b/.test(p)) {
    if (/OVERHOUL|OVERHAUL|BUBUT|FABRIKASI|\bLAS\b|REKONDISI|REBUILD/.test(p)) return ['Jasa & Servis Bengkel (Labor & Services)', 'Jasa Overhaul, Las & Fabrikasi'];
    if (/BAN|TUBE/.test(p)) return ['Jasa & Servis Bengkel (Labor & Services)', 'Jasa Ganti / Tambal Ban'];
    return ['Jasa & Servis Bengkel (Labor & Services)', 'Jasa Servis Lengkap & Tune Up'];
  }

  if (/\bGREASE\b|\bGEMUK\b|\bSTEMPET\b/.test(p)) return ['Pelumas & Fluida (Lubricants)', 'Gemuk / Grease Pelumas'];
  if (/\bCOOLANT\b|\bMINYAK REM\b|\bBRAKE FLUID\b|\bAIR ACCU\b|\bAIR RADIATOR\b|\bATF\b|\bHYDRAULIC OIL\b|\bOLI HIDROLIK\b|\bTELLUS\b/.test(p)) return ['Pelumas & Fluida (Lubricants)', 'Radiator Coolant & Minyak Rem'];
  if (/\bGARDAN\b|\bTRANSMISI\b|\bSAE 90\b|\bSAE 140\b|\bGL-4\b|\bGL-5\b|\bROREX\b|\bSPIRAX\b/.test(p)) return ['Pelumas & Fluida (Lubricants)', 'Oli Transmisi & Gardan'];
  if (/\bOLI\b|\bOIL\b|\bMEDITRAN\b|\bMESRAN\b|\bYAMALUBE\b|\bMPX\b|\bSPX\b|\bSHELL\b|\bRIMULA\b|\bPRIMA XP\b|\bFASTRON\b|\bCASTROL\b|\bLUBRICANT\b/.test(p)) return ['Pelumas & Fluida (Lubricants)', 'Oli Mesin (Diesel & Bensin)'];

  if (/\bAKI\b|\bACCU\b|\bBATTERY\b|\bBATERAI\b|\bYUASA\b|\bGS ASTRA\b|\bINCOE\b|\bUPS\b/.test(p)) return ['Kelistrikan & Penerangan (Electrical)', 'Aki / Baterai Unit'];
  if (/\bLAMPU\b|\bBOHLAM\b|\bLED\b|\bBULB\b|\bHEADLAMP\b|\bSTOP LAMP\b|\bSEIN\b|\bFLOOD LIGHT\b|\bSOROT\b|\bTL\b/.test(p)) return ['Kelistrikan & Penerangan (Electrical)', 'Lampu LED & Bohlam Penerangan'];
  if (/\bDINAMO\b|\bSTARTER\b|\bALTERNATOR\b|\bSTATOR\b|\bROTOR\b|\bANGKER\b|\bARMATURE\b|\bSOLENOID\b|\bAVR\b/.test(p)) return ['Kelistrikan & Penerangan (Electrical)', 'Dinamo Starter & Alternator'];
  if (/\bBUSI\b|\bSPARK PLUG\b|\bCOIL\b|\bKOIL\b|\bCDI\b|\bKIPROK\b|\bREGULATOR\b|\bIGNITION\b/.test(p)) return ['Kelistrikan & Penerangan (Electrical)', 'Busi & Pengapian (Spark Plug)'];
  if (/\bKABEL\b|\bRELAY\b|\bSEKRING\b|\bFUSE\b|\bSAKLAR\b|\bSWITCH\b|\bMCB\b|\bKONTAKTOR\b|\bSTOP KONTAK\b|\bKAPASITOR\b|\bFREON\b|\bCOMPRESSOR\b|\bKOMPRESOR\b|\bAC SPLIT\b|\bMODUL\b|\bSENSOR\b/.test(p)) return ['Kelistrikan & Penerangan (Electrical)', 'Kabel Bodi, Relay & Sekring'];

  if (/\bFILTER\b|\bSARINGAN\b|\bSEPARATOR\b|\bSPARATOR\b|\bCLEANER\b|\bRACOR\b|\bSAKURA\b|\bDONALDSON\b|\bFLEETGUARD\b/.test(p)) return ['Mesin & Powertrain (Engine Parts)', 'Filter (Oli, Solar, Udara)'];
  if (/\bBELT\b|\bVANBELT\b|\bFANBELT\b|\bV-BELT\b|\bTIMING\b|\bFAN DRIVE\b/.test(p)) return ['Mesin & Powertrain (Engine Parts)', 'V-Belt / Fan Belt / Timing Belt'];
  if (/\bSEAL\b|\bO-RING\b|\bORING\b|\bKARET\b|\bHOSE\b|\bSELANG\b|\bGROMMET\b|\bSIL\b/.test(p)) return ['Mesin & Powertrain (Engine Parts)', 'Seal, O-Ring & Karet'];
  if (/\bPISTON\b|\bRING\b|\bPACKING\b|\bGASKET\b|\bKLEP\b|\bVALVE\b|\bNOZZLE\b|\bINJECTOR\b|\bFUEL PUMP\b|\bWATER PUMP\b|\bRADIATOR\b|\bCRANK\b|\bCAMSHAFT\b|\bCARBURETOR\b|\bKARBURATOR\b|\bKOPLING\b|\bCLUTCH\b|\bKAMPAS GANDA\b|\bCYLINDER\b|\bHEAD\b|\bENGINE\b|\bTURBO\b|\bKNALPOT\b/.test(p)) return ['Mesin & Powertrain (Engine Parts)', 'Piston, Ring, Packing & Gasket Mesin'];

  if (/\bCAT\b|\bPAINT\b|\bPLATONE\b|\bDULUX\b|\bNIPPON\b|\bTHINNER\b|\bDEMPUL\b|\bMENI\b|\bKUAS\b|\bROLLER CAT\b|\bNO DROP\b|\bAQUAPROOF\b/.test(p)) return ['Material Bangunan & Infrastruktur', 'Cat, Thinner & Pelapis Anti Karat'];
  if (/\bPIPA\b|\bPVC\b|\bWAVIN\b|\bRUCIKA\b|\bKERAN\b|\bKRAN\b|\bELBOW\b|\bTEE\b|\bSOCK\b|\bVALVE\b|\bBALL VALVE\b|\bCLOSET\b|\bKLOSET\b|\bTANDON\b|\bTEDMOND\b|\bPOMPA AIR\b|\bJET PUMP\b|\bSHOWER\b|\bWASTAFEL\b/.test(p)) return ['Material Bangunan & Infrastruktur', 'Pipa, Keran & Perlengkapan Plumbing'];
  if (/\bSEMEN\b|\bPASIR\b|\bBATU\b|\bSPLIT\b|\bKERIKIL\b|\bBATA\b|\bHEBEL\b|\bSIKAGROUT\b|\bKERAMIK\b|\bKORAL\b|\bSIRTU\b/.test(p)) return ['Material Bangunan & Infrastruktur', 'Semen, Pasir & Agregat'];
  if (/\bBESI\b|\bUNP\b|\bCNP\b|\bHOLLOW\b|\bSIKU\b|\bPLATE\b|\bPLAT\b|\bWIRE MESH\b|\bKAYU\b|\bTRIPLEK\b|\bMULTIPLEX\b|\bSENG\b|\bSPANDEK\b|\bGYPSUM\b|\bPAPAN\b|\bBALOK\b|\bRENG\b|\bKASAU\b|\bPAKU\b|\bENGSEL\b|\bKUNCI\b|\bHANDLE\b|\bGEMBOK\b|\bATAP\b|\bPLAFON\b|\bPINTU\b|\bJENDELA\b/.test(p)) return ['Material Bangunan & Infrastruktur', 'Besi, Baja & Kayu Konstruksi'];

  if (/\bBAUT\b|\bMUR\b|\bRING\b|\bBOLT\b|\bNUT\b|\bWASHER\b|\bSKRUP\b|\bSEKRUP\b|\bRIVET\b|\bANCHOR\b|\bDINABOLT\b|\bKLIP\b|\bKLEM\b|\bCLAMP\b/.test(p)) return ['Consumable & Fast Moving Umum', 'Baut, Mur & Ring (Fasteners)'];
  if (/\bLEM\b|\bMAJUN\b|\bAMPLAS\b|\bWD-40\b|\bKAWAT LAS\b|\bOKSIGEN\b|\bCO2\b|\bACETYLENE\b|\bCUTTING\b|\bGRINDA\b|\bGERINDA\b|\bSILICONE\b|\bSEALANT\b|\bSOLASI\b|\bISOLASI\b|\bMASKER\b|\bSARUNG TANGAN\b|\bMATA BOR\b|\bKUAS\b|\bBENSIN\b|\bSOLAR\b|\bPERTALITE\b/.test(p)) return ['Consumable & Fast Moving Umum', 'Lem, Majun, Amplas & WD-40'];

  if (coa.indexOf('BANGUNAN') !== -1 || coa.indexOf('JALAN') !== -1 || coa.indexOf('PERALATAN RUMAH') !== -1 || kat.indexOf('BANGUNAN') !== -1) return ['Material Bangunan & Infrastruktur', 'Besi, Baja & Kayu Konstruksi'];
  if (coa.indexOf('PERALATAN KANTOR') !== -1 || kat.indexOf('PERALATAN') !== -1) return ['Kelistrikan & Penerangan (Electrical)', 'Kabel Bodi, Relay & Sekring'];
  if (coa.indexOf('MESIN') !== -1 || coa.indexOf('POWER PLANT') !== -1 || coa.indexOf('BOILER') !== -1 || coa.indexOf('PRODUCTION') !== -1 || kat.indexOf('MESIN') !== -1) return ['Mesin & Powertrain (Engine Parts)', 'Piston, Ring, Packing & Gasket Mesin'];
  if (coa.indexOf('MOTOR') !== -1 || coa.indexOf('MOBIL') !== -1 || coa.indexOf('ANGKUTAN') !== -1 || coa.indexOf('WATER TRANSPORT') !== -1 || coa.indexOf('ALAT BERAT') !== -1 || kat.indexOf('KENDARAAN') !== -1 || kat.indexOf('ALAT BERAT') !== -1) return ['Mesin & Powertrain (Engine Parts)', 'Piston, Ring, Packing & Gasket Mesin'];
  return ['Consumable & Fast Moving Umum', 'Lem, Majun, Amplas & WD-40'];
}

/**
 * Logic Import Mudah untuk data_mtc (mendukung 22 kolom mentah Excel maupun 24 kolom sudah diperkaya)
 * Ambil file CSV terbaru di Google Drive (default: DATA_MTC_MASTER_NEW.csv), tulis ke tab data_mtc,
 * otomatis isi KATEGORI_MAINTENANCE & SUB_KATEGORI_MAINTENANCE, lalu rebuild MTC_SUMMARY_UNIT.
 */
function importDataMtcFromDrive(optionalFileName) {
  var ss = getDb();
  var fileName = String(optionalFileName || 'DATA_MTC_MASTER_NEW.csv').trim();
  try {
    if (!optionalFileName && typeof SpreadsheetApp !== 'undefined' && SpreadsheetApp.getUi) {
      var ui = SpreadsheetApp.getUi();
      var promptRes = ui.prompt(
        'Import data_mtc dari Google Drive',
        'Masukkan nama file CSV di Google Drive Anda (default: DATA_MTC_MASTER_NEW.csv):',
        ui.ButtonSet.OK_CANCEL
      );
      if (promptRes.getSelectedButton() !== ui.Button.OK) return { success: false, cancelled: true };
      var txt = String(promptRes.getResponseText() || '').trim();
      if (txt) fileName = txt;
    }
  } catch (eUi) {}

  var files = DriveApp.getFilesByName(fileName);
  var targetFile = null;
  var latestTime = 0;
  while (files.hasNext()) {
    var f = files.next();
    var t = f.getLastUpdated().getTime();
    if (t >= latestTime) {
      latestTime = t;
      targetFile = f;
    }
  }
  if (!targetFile) {
    var msgMissing = 'File "' + fileName + '" tidak ditemukan di Google Drive Anda. Silakan upload CSV terlebih dahulu ke Google Drive.';
    try { SpreadsheetApp.getUi().alert('Import data_mtc', msgMissing, SpreadsheetApp.getUi().ButtonSet.OK); } catch (e) {}
    return { success: false, message: msgMissing };
  }

  var csvText = targetFile.getBlob().getDataAsString('UTF-8');
  if (csvText.charCodeAt(0) === 0xFEFF) csvText = csvText.slice(1);
  var parsed = Utilities.parseCsv(csvText);
  if (!parsed || parsed.length < 2) {
    return { success: false, message: 'File CSV kosong atau tidak memiliki baris data.' };
  }

  // Deteksi otomatis baris header ('MEMORIAL') agar aman meski ada baris judul di atasnya
  var headerRowIdx = 0;
  for (var h = 0; h < Math.min(10, parsed.length); h++) {
    if (String(parsed[h][0] || '').trim().toUpperCase() === 'MEMORIAL') {
      headerRowIdx = h;
      break;
    }
  }

  var sheet = ss.getSheetByName('data_mtc') || ss.getSheetByName('Data MTC');
  if (!sheet) {
    sheet = ss.insertSheet('data_mtc');
  } else {
    sheet.clearContents();
  }

  sheet.getRange(1, 1, 1, 24).setValues([DATA_MTC_24_HEADERS]);
  sheet.setFrozenRows(1);

  var batch = [];
  var writeRow = 2;
  var importedCount = 0;

  for (var i = headerRowIdx + 1; i < parsed.length; i++) {
    var r = parsed[i];
    if (!r || r.length < 12) continue;
    var memorial = String(r[0] || '').trim();
    var kodeUnit = String(r[11] || '').trim();
    if (!memorial && !kodeUnit) continue;

    var partName = String(r[7] || '').trim();
    var desc = String(r[6] || '').trim();
    var namaCoa = String(r[19] || '').trim();
    var katOrig = String(r[21] || '').trim();
    var kmVal = String(r[22] || '').trim();
    var skmVal = String(r[23] || '').trim();

    if (!kmVal || !skmVal) {
      var cls = classifyMaintenancePart_(partName, desc, namaCoa, katOrig);
      if (!kmVal) kmVal = cls[0];
      if (!skmVal) skmVal = cls[1];
    }

    batch.push([
      memorial,
      r[1] || '',
      r[2] || '',
      r[3] || '',
      Number(r[4]) || 0,
      r[5] || '',
      desc,
      partName,
      Number(r[8]) || 0,
      r[9] || '',
      r[10] || '',
      kodeUnit,
      r[12] || '',
      r[13] || '',
      r[14] || '',
      r[15] || '',
      r[16] || '',
      r[17] || '',
      r[18] || '',
      namaCoa,
      Number(r[20]) || 0,
      katOrig,
      kmVal,
      skmVal
    ]);
    importedCount++;

    if (batch.length >= 10000) {
      sheet.getRange(writeRow, 1, batch.length, 24).setValues(batch);
      writeRow += batch.length;
      batch = [];
    }
  }
  if (batch.length > 0) {
    sheet.getRange(writeRow, 1, batch.length, 24).setValues(batch);
  }

  var summaryRes = rebuildMtcUnitSummary();
  var okMsg = 'Berhasil mengimpor ' + importedCount.toLocaleString('id-ID') + ' baris transaksi data_mtc (24 kolom) dari "' + fileName + '" dan merebuild ' + (summaryRes.total_units || 0).toLocaleString('id-ID') + ' KODE UNIT di MTC_SUMMARY_UNIT.';
  try { SpreadsheetApp.getUi().alert('Import data_mtc Selesai', okMsg, SpreadsheetApp.getUi().ButtonSet.OK); } catch (e2) {}
  return { success: true, imported_rows: importedCount, summary: summaryRes };
}

/**
 * Agregasi data_mtc (24 kolom) berdasarkan KODE UNIT -> sheet MTC_SUMMARY_UNIT (14 kolom).
 * Juga melengkapi kolom 23-24 di data_mtc jika ada baris manual baru yang belum terisi kategorinya.
 */
function rebuildMtcUnitSummary(silent) {
  var ss = getDb();
  var sheet = ss.getSheetByName('data_mtc') || ss.getSheetByName('Data MTC');
  if (!sheet || sheet.getLastRow() <= 1) {
    return { success: false, message: 'Sheet data_mtc kosong.' };
  }

  var lastRow = sheet.getLastRow();
  var lastCol = Math.min(24, sheet.getLastColumn());
  if (lastCol < 24) {
    sheet.getRange(1, 23, 1, 2).setValues([['KATEGORI_MAINTENANCE', 'SUB_KATEGORI_MAINTENANCE']]);
  }

  var unitMap = {};
  var chunkSize = 15000;
  var totalTxAll = 0;
  var totalNominalAll = 0;

  for (var start = 2; start <= lastRow; start += chunkSize) {
    var count = Math.min(chunkSize, lastRow - start + 1);
    var rows = sheet.getRange(start, 1, count, Math.max(22, lastCol)).getValues();
    var missingCatUpdates = [];
    var hasMissingCat = false;

    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      var kodeUnit = String(r[11] || '').trim();
      if (!kodeUnit) {
        missingCatUpdates.push([r[22] || '', r[23] || '']);
        continue;
      }

      var km = String(r[22] || '').trim();
      var skm = String(r[23] || '').trim();
      if (!km || !skm) {
        var cls = classifyMaintenancePart_(r[7], r[6], r[19], r[21]);
        if (!km) km = cls[0];
        if (!skm) skm = cls[1];
        hasMissingCat = true;
      }
      missingCatUpdates.push([km, skm]);

      var nom = parseFloat(r[20] !== '' && r[20] !== null ? r[20] : r[4]) || 0;
      var qty = parseFloat(r[8]) || 0;
      var tgl = r[1] ? (r[1] instanceof Date ? Utilities.formatDate(r[1], 'Asia/Jakarta', 'yyyy-MM-dd') : String(r[1]).slice(0, 10)) : '';

      totalTxAll++;
      totalNominalAll += nom;

      var uKey = kodeUnit.toUpperCase();
      var u = unitMap[uKey];
      if (!u) {
        u = {
          kode_unit: kodeUnit,
          detail_nama: String(r[13] || kodeUnit).trim(),
          kat_asset: String(r[12] || '').trim(),
          location: String(r[10] || 'CO').trim(),
          div: String(r[15] || '').trim(),
          dept: String(r[16] || '').trim(),
          section: String(r[17] || 'HGS').trim(),
          tx: 0,
          qty: 0,
          nom: 0,
          last_date: tgl,
          kat_aset_mtc: String(r[21] || '').trim(),
          kmNom: {},
          skmNom: {}
        };
        unitMap[uKey] = u;
      }
      u.tx++;
      u.qty += qty;
      u.nom += nom;
      if (tgl && tgl > u.last_date) u.last_date = tgl;
      u.kmNom[km] = (u.kmNom[km] || 0) + nom;
      u.skmNom[skm] = (u.skmNom[skm] || 0) + nom;
    }

    if (hasMissingCat) {
      sheet.getRange(start, 23, missingCatUpdates.length, 2).setValues(missingCatUpdates);
    }
  }

  var keys = Object.keys(unitMap);
  var outRows = [];
  for (var k = 0; k < keys.length; k++) {
    var obj = unitMap[keys[k]];
    var bestKm = '-', bestKmN = -1;
    for (var kmKey in obj.kmNom) {
      if (obj.kmNom[kmKey] > bestKmN) { bestKmN = obj.kmNom[kmKey]; bestKm = kmKey; }
    }
    var bestSkm = '-', bestSkmN = -1;
    for (var skmKey in obj.skmNom) {
      if (obj.skmNom[skmKey] > bestSkmN) { bestSkmN = obj.skmNom[skmKey]; bestSkm = skmKey; }
    }
    outRows.push([
      obj.kode_unit,
      obj.detail_nama,
      obj.kat_asset,
      obj.location,
      obj.div,
      obj.dept,
      obj.section,
      obj.tx,
      Math.round(obj.qty * 100) / 100,
      Math.round(obj.nom),
      bestKm,
      bestSkm,
      obj.last_date || '-',
      obj.kat_aset_mtc
    ]);
  }
  outRows.sort(function(a, b) { return b[9] - a[9]; });

  var sumSheet = ss.getSheetByName('MTC_SUMMARY_UNIT');
  if (!sumSheet) {
    sumSheet = ss.insertSheet('MTC_SUMMARY_UNIT');
  } else {
    sumSheet.clearContents();
  }
  sumSheet.getRange(1, 1, 1, 14).setValues([MTC_SUMMARY_14_HEADERS]);
  sumSheet.setFrozenRows(1);
  if (outRows.length > 0) {
    sumSheet.getRange(2, 1, outRows.length, 14).setValues(outRows);
  }

  try {
    CacheService.getScriptCache().remove('MTC_SUMMARY_V1');
  } catch (eCache) {}

  var updatedAt = new Date().toISOString();
  saveSyncMeta_({
    last_mtc_rebuild_at: updatedAt,
    mtc_total_units: outRows.length,
    mtc_total_tx: totalTxAll,
    mtc_total_nominal: Math.round(totalNominalAll)
  });

  return {
    success: true,
    total_units: outRows.length,
    total_tx: totalTxAll,
    total_nominal: Math.round(totalNominalAll),
    updated_at: updatedAt
  };
}

/**
 * Endpoint ringan ?api=mtc_summary (membaca MTC_SUMMARY_UNIT ~1.506 baris + Cache 10 menit, atau bypass cache jika forceFresh=true)
 */
function apiGetMtcSummary(forceFresh) {
  if (!forceFresh) {
    try {
      var cache = CacheService.getScriptCache();
      var cached = cache.get('MTC_SUMMARY_V1');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (eC) {}
  }

  var ss = getDb();
  var sumSheet = ss.getSheetByName('MTC_SUMMARY_UNIT');
  if (!sumSheet || sumSheet.getLastRow() <= 1) {
    // Auto-build summary once if data_mtc already exists
    var dataSheet = ss.getSheetByName('data_mtc') || ss.getSheetByName('Data MTC');
    if (dataSheet && dataSheet.getLastRow() > 1) {
      rebuildMtcUnitSummary();
      sumSheet = ss.getSheetByName('MTC_SUMMARY_UNIT');
    }
  }
  if (!sumSheet || sumSheet.getLastRow() <= 1) {
    return { total_nominal: 0, total_tx: 0, total_units: 0, by_unit: {}, by_kat_mtc: {}, by_sub_kat_mtc: {}, items: [] };
  }

  var rows = sumSheet.getRange(2, 1, sumSheet.getLastRow() - 1, 14).getValues();
  var byUnit = {};
  var byKatMtc = {};
  var bySubKatMtc = {};
  var totalNominal = 0;
  var totalTx = 0;

  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var ku = String(r[0] || '').trim();
    if (!ku) continue;
    var tx = Number(r[7]) || 0;
    var nom = Number(r[9]) || 0;
    var km = String(r[10] || 'Consumable & Fast Moving Umum').trim();
    var skm = String(r[11] || 'Lem, Majun, Amplas & WD-40').trim();

    totalTx += tx;
    totalNominal += nom;
    byUnit[ku] = {
      kode_unit: ku,
      detail_nama_asset: String(r[1] || ku),
      kategori_asset: String(r[2] || ''),
      location: String(r[3] || 'CO'),
      dept: String(r[5] || ''),
      kode_section: String(r[6] || 'HGS'),
      tx_count: tx,
      total_qty: Number(r[8]) || 0,
      total_nominal: Math.round(nom),
      kat_mtc: km,
      sub_kat_mtc: skm,
      last_date: r[12] ? (r[12] instanceof Date ? Utilities.formatDate(r[12], 'Asia/Jakarta', 'yyyy-MM-dd') : String(r[12]).slice(0, 10)) : '-'
    };
    byKatMtc[km] = (byKatMtc[km] || 0) + Math.round(nom);
    bySubKatMtc[skm] = (bySubKatMtc[skm] || 0) + Math.round(nom);
  }

  var payload = {
    total_nominal: Math.round(totalNominal),
    total_tx: totalTx,
    total_units: rows.length,
    by_unit: byUnit,
    by_kat_mtc: byKatMtc,
    by_sub_kat_mtc: bySubKatMtc,
    updated_at: new Date().toISOString()
  };

  try {
    var jsonStr = JSON.stringify(payload);
    if (jsonStr.length < 95000) {
      CacheService.getScriptCache().put('MTC_SUMMARY_V1', jsonStr, 600);
    }
  } catch (ePut) {}

  return payload;
}

/**
 * Mengambil histori data_mtc (24 kolom) dihubungkan via KODE UNIT (kolom L / r[11])
 */
function apiGetMtcHistory(kodeUnit, limit, katMtc, subKatMtc) {
  var ss = getDb();
  var sheet = ss.getSheetByName('data_mtc') || ss.getSheetByName('Data MTC');
  if (!sheet || sheet.getLastRow() <= 1) return [];

  var lastRow = sheet.getLastRow();
  var lastCol = Math.min(24, sheet.getLastColumn());
  var filterUnit = (kodeUnit || '').trim().toUpperCase();
  var filterKm = (katMtc || '').trim().toUpperCase();
  var filterSkm = (subKatMtc || '').trim().toUpperCase();
  var maxRes = limit || 300;
  var res = [];

  if (filterUnit || filterKm || filterSkm) {
    // Scan seluruh chunk data_mtc dari baris terbaru agar seluruh periode 2019-2026 per KODE UNIT ketemu 100%
    var chunkSize = 15000;
    for (var end = lastRow; end >= 2; end -= chunkSize) {
      var start = Math.max(2, end - chunkSize + 1);
      var count = end - start + 1;
      var rows = sheet.getRange(start, 1, count, lastCol).getValues();
      for (var i = rows.length - 1; i >= 0; i--) {
        var r = rows[i];
        var unit = String(r[11] || '').trim();
        if (filterUnit && unit.toUpperCase() !== filterUnit && unit.toUpperCase().indexOf(filterUnit) === -1) continue;
        var km = String(r[22] || '').trim();
        var skm = String(r[23] || '').trim();
        if (!km || !skm) {
          var cls = classifyMaintenancePart_(r[7], r[6], r[19], r[21]);
          if (!km) km = cls[0];
          if (!skm) skm = cls[1];
        }
        if (filterKm && km.toUpperCase() !== filterKm) continue;
        if (filterSkm && skm.toUpperCase() !== filterSkm) continue;

        res.push({
          memorial: String(r[0] || ''),
          tanggal: r[1] ? (r[1] instanceof Date ? Utilities.formatDate(r[1], 'Asia/Jakarta', 'yyyy-MM-dd') : String(r[1]).slice(0, 10)) : '',
          acc_name: String(r[3] || ''),
          nominal: parseFloat(r[20] !== '' && r[20] !== null ? r[20] : r[4]) || 0,
          nominal_edit: parseFloat(r[20] !== '' && r[20] !== null ? r[20] : r[4]) || 0,
          no_reference: String(r[5] || ''),
          deskripsi: String(r[6] || ''),
          nama_sparepart: String(r[7] || ''),
          qty: parseFloat(r[8] || 0),
          satuan: String(r[9] || ''),
          lokasi: String(r[10] || ''),
          kode_unit: unit,
          kategori_asset: String(r[12] || ''),
          nama_asset: String(r[13] || ''),
          kode_gs: String(r[14] || ''),
          divisi: String(r[15] || ''),
          departemen: String(r[16] || ''),
          section: String(r[17] || ''),
          kategori: String(r[21] || ''),
          kategori_maintenance: km,
          sub_kategori_maintenance: skm
        });
        if (res.length >= maxRes) return res;
      }
    }
    return res;
  }

  // Tanpa filter: ambil transaksi terbaru
  var take = Math.min(lastRow - 1, maxRes);
  var startRow = Math.max(2, lastRow - take + 1);
  var tailRows = sheet.getRange(startRow, 1, take, lastCol).getValues();
  for (var j = tailRows.length - 1; j >= 0; j--) {
    var tr = tailRows[j];
    var tUnit = String(tr[11] || '').trim();
    var tKm = String(tr[22] || '').trim();
    var tSkm = String(tr[23] || '').trim();
    if (!tKm || !tSkm) {
      var tCls = classifyMaintenancePart_(tr[7], tr[6], tr[19], tr[21]);
      if (!tKm) tKm = tCls[0];
      if (!tSkm) tSkm = tCls[1];
    }
    res.push({
      memorial: String(tr[0] || ''),
      tanggal: tr[1] ? (tr[1] instanceof Date ? Utilities.formatDate(tr[1], 'Asia/Jakarta', 'yyyy-MM-dd') : String(tr[1]).slice(0, 10)) : '',
      acc_name: String(tr[3] || ''),
      nominal: parseFloat(tr[20] !== '' && tr[20] !== null ? tr[20] : tr[4]) || 0,
      nominal_edit: parseFloat(tr[20] !== '' && tr[20] !== null ? tr[20] : tr[4]) || 0,
      no_reference: String(tr[5] || ''),
      deskripsi: String(tr[6] || ''),
      nama_sparepart: String(tr[7] || ''),
      qty: parseFloat(tr[8] || 0),
      satuan: String(tr[9] || ''),
      lokasi: String(tr[10] || ''),
      kode_unit: tUnit,
      kategori_asset: String(tr[12] || ''),
      nama_asset: String(tr[13] || ''),
      kode_gs: String(tr[14] || ''),
      divisi: String(tr[15] || ''),
      departemen: String(tr[16] || ''),
      section: String(tr[17] || ''),
      kategori: String(tr[21] || ''),
      kategori_maintenance: tKm,
      sub_kategori_maintenance: tSkm
    });
  }
  return res;
}
