/**
 * ==========================================================================
 * KONFIGURASI FRONTEND GOOGLE APPS SCRIPT (PNS ASSET ENTERPRISE)
 * PT Pratama Nusantara Sakti
 * ==========================================================================
 * Frontend Statis untuk GitHub Pages (https://appsmaheer-cloud.github.io/asset/)
 * Terhubung langsung ke Web App Google Apps Script & Google Spreadsheet.
 */
const CONFIG = {
  COMPANY_NAME: 'PT Pratama Nusantara Sakti',
  SYSTEM_NAME: 'PNS Asset Management Enterprise',
  SPREADSHEET_ID: '1Nc7tl6vtqv-LA2RT8QKW-VjpaKuvm91KCjA1Tg-Bjg0',
  SPREADSHEET_URL: 'https://docs.google.com/spreadsheets/d/1Nc7tl6vtqv-LA2RT8QKW-VjpaKuvm91KCjA1Tg-Bjg0/edit',
  GAS_WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbzEbuWMfoV1rnSMObEyZm252npxHNfumMul6iVTZMcs2o9Tfo2ldqsih8x4V9W8jRTgZA/exec'
};

if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}
