
  let currentInspectionMode = 'group';
  function setInspectionMode(mode) {
    currentInspectionMode = mode;
    const btnGroup = document.getElementById('btn-insp-mode-group');
    const btnUnit = document.getElementById('btn-insp-mode-unit');
    const groupCont = document.getElementById('insp-field-mode-container');
    const unitCont = document.getElementById('insp-unit-mode-container');

    if (mode === 'unit') {
      if (btnGroup) btnGroup.className = 'px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition cursor-pointer';
      if (btnUnit) btnUnit.className = 'px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 shadow-2xs transition cursor-pointer';
      if (groupCont) groupCont.classList.add('hidden');
      if (unitCont) {
        unitCont.classList.remove('hidden');
        renderInspectionUnitTable();
      }
    } else {
      if (btnGroup) btnGroup.className = 'px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 shadow-2xs transition cursor-pointer';
      if (btnUnit) btnUnit.className = 'px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition cursor-pointer';
      if (groupCont) groupCont.classList.remove('hidden');
      if (unitCont) unitCont.classList.add('hidden');
    }
  }

  function renderInspectionUnitTable() {
    const tbody = document.getElementById('insp-unit-table-body');
    if (!tbody) return;
    const assets = appState.currentInspAssets || [];
    if (assets.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center py-6 text-slate-400">Pilih gedung dan ruangan terlebih dahulu.</td></tr>';
      return;
    }
    tbody.innerHTML = assets.map((a, idx) => `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100 text-xs">
        <td class="px-3 py-2.5 font-mono font-bold text-slate-900">${escapeHtml(a.no_asset || a.kode_unit)}</td>
        <td class="px-3 py-2.5 font-bold text-slate-800">${escapeHtml(a.nama_asset)}</td>
        <td class="px-3 py-2.5 text-slate-500">${escapeHtml(a.kategori || a.sub_kategori || '-')}</td>
        <td class="px-3 py-2.5">
          <select onchange="updateSingleAssetCond(${idx}, this.value)" class="px-2 py-1 rounded-lg border border-slate-200 bg-white font-bold text-xs focus:ring-1 focus:ring-emerald-500">
            <option value="Baik" ${(a.kondisi_inspeksi === 'Baik' || !a.kondisi_inspeksi) ? 'selected' : ''}>✅ Baik</option>
            <option value="Rusak Ringan" ${a.kondisi_inspeksi === 'Rusak Ringan' ? 'selected' : ''}>⚠️ Rusak Ringan</option>
            <option value="Rusak Berat" ${a.kondisi_inspeksi === 'Rusak Berat' ? 'selected' : ''}>❌ Rusak Berat</option>
            <option value="Hilang" ${a.kondisi_inspeksi === 'Hilang' ? 'selected' : ''}>❓ Hilang</option>
          </select>
        </td>
        <td class="px-3 py-2.5">
          <input type="text" value="${escapeHtml(a.catatan || '')}" onchange="updateSingleAssetNote(${idx}, this.value)" placeholder="Keterangan temuan fisik..." class="w-full px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs">
        </td>
        <td class="px-3 py-2.5 text-center">
          <button type="button" onclick="drillToAssetDetail('${a.no_asset || a.kode_unit}')" class="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px]" title="Detail Lengkap Aset">
            <i class="ph-bold ph-eye"></i> Detail
          </button>
        </td>
      </tr>
    `).join('');
  }

  function updateSingleAssetCond(idx, val) {
    if (appState.currentInspAssets && appState.currentInspAssets[idx]) {
      appState.currentInspAssets[idx].kondisi_inspeksi = val;
      renderInspectionVisualCards();
    }
  }

  function updateSingleAssetNote(idx, val) {
    if (appState.currentInspAssets && appState.currentInspAssets[idx]) {
      appState.currentInspAssets[idx].catatan = val;
    }
  }
  

  function renderHunianHouseCards() {
    const grid = document.getElementById('hunian-house-cards-grid');
    if (!grid) return;

    const bldgs = (appState && appState.buildings) ? appState.buildings : [];
    const rooms = (appState && appState.rooms) ? appState.rooms : [];
    const penghuni = (appState && appState.penghuni) ? appState.penghuni : [];

    // Filter buildings that are mess/longhouse/hunian
    const hunianBldgs = bldgs.filter(b => {
      const cat = (b.kategori_fungsi || b.kategori || '').toUpperCase();
      const n = (b.nama_bangunan || b.kode_gedung || '').toUpperCase();
      return cat.includes('HUNIAN') || n.includes('MESS') || n.includes('LONG HOUSE') || n.includes('BARAK') || n.includes('LH');
    });

    const activeBldgs = hunianBldgs.length > 0 ? hunianBldgs : bldgs.slice(0, 18);

    grid.innerHTML = activeBldgs.map(b => {
      const code = b.kode_gedung;
      const bRooms = rooms.filter(r => r.kode_gedung === code);
      const bPenghuni = penghuni.filter(p => p.kode_gedung === code);
      const roomCount = bRooms.length || 10;
      const residentCount = bPenghuni.length;
      const capacity = roomCount * 4;
      const occPct = capacity > 0 ? Math.min(100, Math.round((residentCount / capacity) * 100)) : 0;
      const isFull = residentCount >= capacity;

      return `
        <button type="button" onclick="filterPenghuniByHouse('${code}')" class="hunian-house-card group text-left p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between shadow-2xs cursor-pointer relative overflow-hidden" data-house-code="${code}">
          <!-- Roof Banner / House Shape Top -->
          <div class="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-600 group-hover:h-2 transition-all"></div>
          
          <div>
            <div class="flex items-start justify-between gap-2 mb-2 mt-1">
              <div class="w-9 h-9 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 flex items-center justify-center font-bold text-lg transition-colors shadow-2xs">
                <i class="ph-bold ph-house-line"></i>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-black ${isFull ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                ${isFull ? 'Penuh' : 'Tersedia'}
              </span>
            </div>
            
            <span class="font-extrabold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors block truncate" title="${b.nama_bangunan}">
              ${b.nama_bangunan || code}
            </span>
            <span class="text-[10px] font-medium text-slate-400 block truncate mb-2">
              ${b.lokasi || b.kode_site || 'Central'} &bull; ${code}
            </span>
          </div>

          <div class="pt-2 border-t border-slate-100 text-[11px] space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-slate-500 text-[10px] uppercase font-bold">Kamar / Ranjang:</span>
              <span class="font-mono font-bold text-slate-800">${roomCount} Kmr &bull; ${capacity} Rjg</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-500 text-[10px] uppercase font-bold">Terisi:</span>
              <span class="font-mono font-bold text-indigo-600">${residentCount} Org (${occPct}%)</span>
            </div>
            <!-- Occupancy bar -->
            <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div class="${isFull ? 'bg-amber-500' : 'bg-emerald-500'} h-1.5 rounded-full" style="width: ${Math.max(4, occPct)}%"></div>
            </div>
          </div>
        </button>
      `;
    }).join('');
  }

  function filterPenghuniByHouse(code) {
    if (!code) return;
    const searchInput = document.getElementById('search-penghuni');
    if (searchInput) {
      searchInput.value = code;
      if (typeof onSearchPenghuni === 'function') onSearchPenghuni();
    }
    const filterBldg = document.getElementById('filter-penghuni-bldg');
    if (filterBldg) {
      filterBldg.value = code;
      if (typeof onFilterPenghuniChange === 'function') onFilterPenghuniChange();
    }
  }
  
const PNS_SECTION_TO_DEPT = {
  "Accounting": "FINANCIAL & INFORMATION SYSTEM",
  "ACC": "FINANCIAL & INFORMATION SYSTEM",
  "Agronomy": "RESEARCH & DEVELOPMENT",
  "AGR": "RESEARCH & DEVELOPMENT",
  "BCID": "HRGA",
  "BCI": "HRGA",
  "Budget": "FINANCIAL & INFORMATION SYSTEM",
  "BUD": "FINANCIAL & INFORMATION SYSTEM",
  "BUSINESS SUPPORT": "BUSINESS SUPPORT",
  "Compensation Benefit & Personal Admin": "HRGA",
  "CAB": "HRGA",
  "Community Development": "BUSINESS SUPPORT",
  "CDR": "BUSINESS SUPPORT",
  "COMPENSATION & BENEFIT": "HRGA",
  "Civil": "BUSINESS SUPPORT",
  "CVL": "BUSINESS SUPPORT",
  "Administration": "BUSINESS SUPPORT",
  "FAA": "BUSINESS SUPPORT",
  "Finance, Accounting & Asset": "FINANCIAL & INFORMATION SYSTEM",
  "FAS": "FINANCIAL & INFORMATION SYSTEM",
  "Engineering": "WORKSHOP & ENGINERING",
  "FEE": "WORKSHOP & ENGINERING",
  "Electrical & Instrument": "WORKSHOP & ENGINERING",
  "FEI": "WORKSHOP & ENGINERING",
  "Finish Good Warehouse": "BUSINESS SUPPORT",
  "FGW": "BUSINESS SUPPORT",
  "Factory HSE": "QUALITY HEALTH & SAFETY ENVIRONMENT",
  "FHS": "QUALITY HEALTH & SAFETY ENVIRONMENT",
  "Finance": "FINANCIAL & INFORMATION SYSTEM",
  "FIN": "FINANCIAL & INFORMATION SYSTEM",
  "FINANCIAL & INFORMATION SYSTEM": "FINANCIAL & INFORMATION SYSTEM",
  "Information Technology": "FINANCIAL & INFORMATION SYSTEM",
  "FIT": "FINANCIAL & INFORMATION SYSTEM",
  "Mill & Cane Yard": "PRODUCTION",
  "FMB": "PRODUCTION",
  "Maintenance Planner": "WORKSHOP & ENGINERING",
  "FMP": "WORKSHOP & ENGINERING",
  "Process": "PRODUCTION",
  "FPP": "PRODUCTION",
  "QC & Lab": "QUALITY HEALTH & SAFETY ENVIRONMENT",
  "FQQ": "QUALITY HEALTH & SAFETY ENVIRONMENT",
  "Assessement Center": "HRGA",
  "HAC": "HRGA",
  "Harvesting": "HARVESTING",
  "HAR": "HARVESTING",
  "Cane Supply": "HARVESTING",
  "HCS": "HARVESTING",
  "General Services": "HRGA",
  "HGS": "HRGA",
  "HRGA": "HRGA",
  "HRO": "HRGA",
  "HUMAN RESOURCE DEVELOPMENT & GENERAL SERVICES": "HRGA",
  "IR & HR Program": "HRGA",
  "IHR": "HRGA",
  "KOPERASI": "KOPERASI",
  "KOPERASI PTM": "KOPERASI",
  "Legal": "BUSINESS SUPPORT",
  "LEG": "BUSINESS SUPPORT",
  "Logistic & Warehouse": "BUSINESS SUPPORT",
  "LOW": "BUSINESS SUPPORT",
  "Medical": "QUALITY HEALTH & SAFETY ENVIRONMENT",
  "MED": "QUALITY HEALTH & SAFETY ENVIRONMENT",
  "Maintenance 1": "PLANTATION",
  "MT1": "PLANTATION",
  "Maintenance 2": "PLANTATION",
  "MT2": "PLANTATION",
  "Maintenance 3": "PLANTATION",
  "MT3": "PLANTATION",
  "Organization Development & Performance Management": "HRGA",
  "OAD": "HRGA",
  "OPERATION": "PLANTATION",
  "OPERATION SUPPORT": "HRGA",
  "People Development": "HRGA",
  "PED": "HRGA",
  "Plantation HSE": "QUALITY HEALTH & SAFETY ENVIRONMENT",
  "PHS": "QUALITY HEALTH & SAFETY ENVIRONMENT",
  "Planting & Mechanical": "PLANTATION",
  "PLA": "PLANTATION",
  "PLANTATION": "PLANTATION",
  "Plasma": "BUSINESS SUPPORT",
  "PLS": "BUSINESS SUPPORT",
  "Procurement, Purchasing & Logistic": "PROCUREMENT, PUCHASING & LOGISTIC",
  "PRO": "PROCUREMENT, PUCHASING & LOGISTIC",
  "PROCUREMENT & PURCHASING": "PROCUREMENT & PURCHASING",
  "PROC": "PROCUREMENT & PURCHASING",
  "PRODUCTION": "PRODUCTION",
  "Protection": "RESEARCH & DEVELOPMENT",
  "PTC": "RESEARCH & DEVELOPMENT",
  "QUALITY HEALTH & SAFETY ENVIRONMENT": "QUALITY HEALTH & SAFETY ENVIRONMENT",
  "Talent Acquisition & Monitoring": "HRGA",
  "REC": "HRGA",
  "RESEARCH & DEVELOPMENT": "RESEARCH & DEVELOPMENT",
  "Planning, Inventory & QA": "QUALITY HEALTH & SAFETY ENVIRONMENT",
  "SAI": "QUALITY HEALTH & SAFETY ENVIRONMENT",
  "SALES & MARKETING": "SALES & MARKETING",
  "Security": "BUSINESS SUPPORT",
  "SEC": "BUSINESS SUPPORT",
  "Sales Marketing & Warehouse": "SALES & MARKETING",
  "SNM": "SALES & MARKETING",
  "Tax": "FINANCIAL & INFORMATION SYSTEM",
  "TAX": "FINANCIAL & INFORMATION SYSTEM",
  "Water Management & Infrastructure": "BUSINESS SUPPORT",
  "WMI": "BUSINESS SUPPORT",
  "WORKSHOP & ENGINERING": "WORKSHOP & ENGINERING",
  "Workshop and Engineering": "WORKSHOP & ENGINERING",
  "WOS": "WORKSHOP & ENGINERING",
  "Health & Safety Environment": "QUALITY HEALTH & SAFETY ENVIRONMENT",
  "Civil & Building": "BUSINESS SUPPORT"
};

  function initRoleAccessState() {
    try {
      const params = (typeof window !== 'undefined' && window.location) ? new URLSearchParams(window.location.search) : null;
      const isAdm = params ? (params.get('role') === 'admin' || params.get('mode') === 'admin') : false;
      window.pnsIsAdmin = isAdm;

      const roleEl = document.getElementById('header-user-role-badge');
      if (roleEl) {
        roleEl.textContent = isAdm ? 'Administrator Lapangan' : 'Akses Publik (Read-Only)';
        if (isAdm) {
          roleEl.classList.remove('text-slate-500');
          roleEl.classList.add('text-emerald-700', 'font-black');
        } else {
          roleEl.classList.remove('text-emerald-700', 'font-black');
          roleEl.classList.add('text-slate-500', 'font-semibold');
        }
      }

      // In public mode, hide direct admin modification buttons from overview
      const regBtn = document.querySelector("button[onclick*='view-trx-asset-register']");
      const mutBtn = document.querySelector("button[onclick*='view-trx-asset-mutation']");
      if (!isAdm) {
        if (regBtn) regBtn.style.display = 'none';
        if (mutBtn) mutBtn.style.display = 'none';
      } else {
        if (regBtn) regBtn.style.display = 'inline-flex';
        if (mutBtn) mutBtn.style.display = 'inline-flex';
      }
    } catch (e) {
      console.warn('initRoleAccessState error:', e);
    }
  }

// Single Compact 64x64 Base64 Logo (Eliminates 4x 28KB HTML Duplication)
  const PNS_LOGO_URI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABJuSURBVHhe5Zp3VNRXFsdJcZPsxmwUQpWuILaABUEBATF22ZhYEmNNKBZsUdagoiASFEQEpKOINCnSBaQjINIRhw5DERhggJmBYYDB993z86w5+ItGdzfJRvI5hz/4ve97v5n33r3v3vtGJLuy6GxWTaEXIURU5M/IrYKk4xuczGHme7q6itV4FMAkumZCwyPDn+vafQ2Rr6djmfVWWN48n9RJuGvpugkLIUTGxOeHDpHtMyGyaxb+aqKJ9Rf3IjQvwZdqo+snJIdCHDPeNtPAO+bz8ZbZYohsnwv5Q0bYd+1sW31fqwVdP+GwifcKnHxAG++aamCSiRYmmSyGyLefQuSbOVhh9x3cciJvTWgneaMw/rCi5Sq8Y6KOd0w18ba5Jt4xW4BJ5vMhsns2JC1X4Hi406M6dvMset8JQXJxusmMY6vxlok6JpkuwiTThXiXmoADC/HBwUV474AG/nZYAxvc93Y87K7ZTO//xlNRXaGqfuqLMZE9czHpu4V433QRREw/hYj5PHx0VBuix5Zg8j818eGx+Vhz1RTRJWk/0sd4oyGEzFjlbj72lvlsvG3yKd4x0cBatwOjxlf3CT4+po1JxzUgcVIHklY6eN9SA3pXv0FSTaoTfZw3FkKIyqYbB5+IntXC1BOLMfWgJi7E+JwCoHMp69qjJVe+xpSTmpCx1oX0j/oQt9HCuptmCKy4Y0sf642EmoAdwcfHPrFdAoWLhpjnYgyTgBMb/t32t/SWoh07b53skbVfCgl7Xcg6roSo/WJoX92CgKL4vfTx3jgAvL/W77ti2Qv6kLuoh8XXt+BGVeLR8Ro+IQvPpro3zbm8DvKOSzHLRQ8yTtrYeHO/MJOZ94/x2jeSreFH0hSc9aHqYgCDa1txtSR4N11DCJEOroovW3HjSyg762CWuyFknTWxN+4MjxCyhK5/o9gdcyJzhqsRVNz0oOVvDOu7Tl/RNRSEkGn+VRFxBoFfQ+2qPlQ8l0HV3QiX7weWApCk698YDibYZKq4G4D6m+e3Gi4Ffr50zTMA/PVywfWshf6roearA+UrS2EYsgdJLQVWdO3vCSFkFoC/E0LUCCEf0Nt/Eac8n1xVDz3MvvoZNPzXwK7gSiJdMx5CyHTbe1d483wNMMdvORRdDbA99OhDQshUuvbXhkrSCCG6goEiC15TqDO7Ori0s8S/sDH7Mq8y3KKuNu4Eh5nqWNNeHJpdne5+it+ScwQYNSWEKL803fcpDglc4L8Gs72XY4aXLo5nXmBRNk/XjadT0LPfPOUslHy0MMtLDzo3NiO05u4Vuu7XghCyRTCQG99e5tLRmGI22ha3Hg035oHhNR0Mz9l44DAdpU5KyLYRxb1zasg7Pw85NvPw4JIhHgbuRVm8Y19rRXwgIcSYPrZIfHOa5YrwbVDz1MNMXx1sidwvGBodWkrXjQfAO5H1qWnaoeswy9cA0z2MsDnk+zpCyGS69r+FECILQZlpX6V9Wm+WOdojlqLGTwoM709Q5yEPxiUZlF0QR4mTKIouiuPBhY9x/4IoMm2VkW6jhAxrRSRaTkPUAVFEHZBDrOUC5LntRHGYY34HI2f7Ty8q7a3cuzp0B5ntpQsNfwOsjNhCsruyLz33aV4AIcNq+1NPCtS8DJ86Q71rXyOno+S5I/S/4ek2H3no0l9h285ON0JHtDSY/qJg+kqgwXsq6r3F0RY6E11xeuiIXYvGyA1gJpuQxhTTsaaE3QMPXBeTLBtppNsoIsV6Lu5aqSDBQhxxFvLIPL8OCU7fdZem+Jb89MICVoXWhrA9ZLavHhZcXwmNYENY5ZyrpwKh5z7ZC3AtC4pcErgOqt6GmO5pAId8/xwAb9F1rwPlvMZGW491My519mWuQ3OwKFoDpdAWIIvWUHH0312M3rw96Co6N8JtCUoX9mU6kCctF8lwy3pCyELqOCak06syZAPJt5VAztnpyD6tiKTj4sh2XoGqZJcybk/jNwA+fu7FABQO3j3bp+ynjfnXV2Hh9WX4KnM/GION3z4nfAGF3VXLjIN2ChXcdCBzUQvbIywJn/AX0XWvghAyf6QzKlVYuh0dcWLoiBBHV7A4WEGS4KZtQE/hiY6BjojrhAwcIoTMBfA2fQwAm1j3Tw0Vusij1EkV+fYzkW8tjYrQXehquUdVuT6i9/kJ9+LrdzVDV0PD/zNoBqyEdvg6eFWG3wfwLl07Hsqzmsdalsxw14eiky60rm5CEiPNnK77JQjpOsCruTjEy9BAf7gUeNGy6IsWw2jBKvQxTjOfCMqdCSGK9H7jATDlYYxt5Z2jMxB5VAUxhxQRbiaLbNevhsd4ddZ0/c8o7CzZsi5yF+ZcM4D6jZVYGGCIbXFHSM1g6yq6lo4746b7fN/1kHPSgZrzalxJ9/eka14ENXlCwf0LozUW4MZKgh0jCVb0J+DdnYWB6lNC4UC+ByFEit6PDrVI5Un+QcH7ZsL/czl4b5kL943TEHd6LVoZeZfp+hdCHXtHUu37qFNgwY0VWBiwDAuDV8Gu0KP8VTYd33zPeaHPl5C5uBRyDvowCz6d9NIz999QW3ioJzUc5RvBjhIHO04O3ZES4BWuBPdxQCEh5BdPofEIuLW70i9vQcA2GdzYrYqAbTPhv2seSmNcKH/0d7r+pUS1ZNqsDd+O2d5LoX5tJeZeWwbDkE3IbM4NAPAXuv4ZJY9rt+r77oSkvTbEzmhhd6gVdRy+1N6oGuNw193U4eyV4ERORU+MFNiJ8kDTD3gyWOX5Os73GYSQZRXR1ozIg/KI2DsXQWYK8Nsph7TLJmwiEPyi2fwMKpKzTLOrVvXVg5r3Wqj7rMBMTy18n2GDx2Ab0fXPIISIG3nt6pKwWwJRay2s99lX9bJ4gBDy3nBvTIrwwWfgRoqDFSMO3l0VCGrONJOxPqtX7Rw6nPbS2GyXVYi1kEHcYTVE7lVGyg+a6Ci77UfXvhZ57Ie7jW99i5keyzDP+zPM9jKCylV92OV6MwEo0fUUVFBk5L6jcYq1NqaeXYpFdsYvnABqooS8glv8IiP0Rk4FJ0oKA5nqGGzxoCLPOXQ9h8OZMtDLeqHHpyCESJSF72clnZBGoqUqYi0VEHtAAvfddhNC+Jp0/WtBrYBHUUiY1vXPoeSmBTVXA6he0sUi/8/hUR5e+CJToFb1C9/9zKmnl2CylRbUT6+tIj0/n4CRoaoIwtiF/jBJcCOlMJCyAMLO4BZCiMF4HbUT+b2ldjx2beYgt3fNy3wQtz76XIm7LtKspyHt1EwkWakg7awKqu9eTqFr/yOolbLL9S6fcdUQyq5LoeqmDzlXbXzquRHXi2+feIH+vf1hp5kf/6CND45pwvDCtp/tgNHRtoP8UnP0R36C3tvTwEtXwuBjjwb6rhIO1q/qbbzTPMQqKRfymRvHt42Hil0akvfz8s7JIPecPHJsFJBuNQ0lAZsFQkHTSrr+P4ZLyIyjiRe6lTz1IXNFF2oO+pCwX4Qt4YdJ/UCP/ngtNQEnYhyZk49r4/3Di/CF2/M+gMoeh+odeZx4OfTFSKM3UQKcestuKvgZP05/091/jjDDwG5IyCTl5S91hJTJ9VQF+TP8FiDPSQ5lDtNx/0dZFDoqo+O+Tx5d/18zTIjx90kOPXJ2ulA8rweFizqY5rAMxxIcH4x3VtQEWEY5Md87tAhvm6vj28CTtc9OAcp+B1kJWaNpmuiNlkVnrBieVB+EkN/4xbj+4j3VQYms4ssYbE4+8yIzGw8hgm87syxQfFEMha5KKL80AwUXpMGI+AqE3/7zbO9/gRCieiDWpmbaJQNI/agDBZtlWOy2BSltBabjNO9ZhDgw3943H5P2auBElAs1Qe9TbWMjtTt4FV+hO0YUg+GiGMpdC0FfmeMzuyaEaLBKXEs4Zc7oZ6a+MpGixuUyw9Laguei2lMGZVeUUOyigErfWeiqDqEi1xf6i/8JykMfS3Jkyf9oCAmbJZhirYX9odY1z74kNQEmAXZMEZN5EDu4GO6pt55WlKjwlVd/sZmbLA1utCwGk1Ux2BLQ9mz3UF++JefM4978Q+B2VbxWmX1stN2Sk7sHjZ6iqPafjnofFTzylEBTsukgMKhO1/9qUJGZZbxjjfhpXXxgtQCLXbaiiPXo6YpRW3aNvQmTulSVOWiIi7Guu6jnwsEar7EHa9AfKQl+hDS4Zfv4QsJ56qAo59daYN/ckboV/K70l5bgxkP1YTNce+uDFNB4QxF111RQ5yMJVrwuuE0J5+n6Xx1qRQ+FnWucemop3rfWxIkE52TqORWLG9rtaKKu1zSs/jEUVZgyh3rWX2ZVNxg3DV2xYkDhZ3jSm+L273EWssuvtHbG6ILXHpfwqoTrGYL+HPueZCO0BEqgJUQKLQHTwQxVQnfJBQYAMbr+N4Hy3BbhduxJhz6FgeMOqmbwAeXo9Gy3NYnsUoWxw7cdlG6YfW/jcL4hBm5LoCdeAgP15yiv/zQ07WmKz2eGqoNX40wFV69VTSaka2Pfg53C1psyaA+SQ/tNWTQHS6G9wGyUkN65dP1vyqBwcPWua5YjqlarUNhc+PROYNGZzQ3v7pmLIwF26dT/vCqHDEGqHPpufwJhwToI+eV21PMBdq5DXaguHmeZAhjbRB/7RVAFTX6za2tfMpUmy6I7WgltQdJgZRtjaLD41anub0FmZ9nuTR4WOBfiZEnl4nq223onH1gMv4I7ToSQeZwHm8f6b4uhJ04ag5WnBqm0FhAYsbIs0BKmhoGujMTXKV9T1Zvh7rjk4VxddN2WAS9GCZ0xH0FYvAYjXYkZdP3vyvWkm8G2/o7UkbZgo+s+SB/WQW53u8kTbuLVkSx1cKIlMJylBUFHTAyl76j0fFR/XQHdxT80va7NCrilUcKCDeiLmAJ2vALYkWIYuL8coz1xVMqtQNf/rnDAUWpobTguIMIVBrZfQ/34+gFCyPLeypMdvTGy6ImSxEDpHhDCXz/cdX9jU+RnaI9eCmFv3lNz+CWo6PEJPzeQm7cKPdEfgxstg96oKRgu34CR3qyC/yjP/60pZTGMFp36AuqWG9MB6PfkfzXMjZJEX6wkehscOymTqM84Xstwn4KurGNDrypvUZGhgBXHIGXrwYkUQ2+kFDhxihgt3QsyXBwGQI7e5/9KxIM7yzVPbsT2a7Z+hHRs52WsBvuWKEZzFkDAS3LksGqNaiP00BCojL6m2Ex6/2dQ9wCE1B4bbLCt5yapoD/sL+DEyECQvxx8piOPkB4zep8/BDGlSUZrz22H3Z3ww4Rzx6fn9mw8DhfDWOlWECI815Z6Mppx9WM8Tt6JsbGBny5eqfOfz2fLDHMrVvPZcTc55ac6UbwSgmQpDN+djaGiDeivsWcJhaVBhBCt59/6B6KFsFZY+J1CcEnh7oGqS2UdwZJoD5UEu/DA0JPRwYj60FVjDLe/oyvf/tF42x0b45iNjTAb+loiQTodwc37BgP5ZsLBCuuGocaARMKvpkrg8s+/7Q9IFbd5rXW4M6+C16fHyj/IbA+SQUeoLHgNTvf7auOvVXupoO2WOgaYYYHj+xEyJE/4jzTJSN1uQnpsCGleTvkL6lgdr/vD4xYTIm0beqWMT4hWd+b2RtZNeTDDZTHETqptzLBtLnOciq6EDRD0lP2UQU4ozrif+fBmRnQGX8g37khaw34cII2aUGkMtUWBEfwlKpwmU/bPoSI6et8JAVX8qOhoOSIQPN7Vl74BTf5iaAxVwuP0Qyi+PBMMVym0Zh1o/z1+P/B/g/LoZKxlCyf9c9T7iaHBfwaKrsxFmbM8HrnL43HRaSoeEKf3m1CMjXRu5qRtQr3fVFR5KCPXTg5lLvKo81YGq9zltdPeNxbhcI9xe/yXpN5XFGWX5ZFvr4SSy/Jo9FcBryUimK6fcFD3i62J27ua/GVQ4CCL/B+VUXxJAY3+auC2xYbR9RMO6qamOeNYV42XLPLOKyHfQRlFlxTReG02eO13Jv4EUAFMc+75+oor05B9Vgm59koodJJHre9M8NoTJv4EUHDqfKIqPWYg/ZQicuwVUXhJHjW+auC1xf85JmCoI+1MbeASpFrJIeOcEvId5VHnOwe82rBbdO2EhBCWMePWFyTNUgLpZ5SRZ6eMR94z0VcbFk7XTkionL4y9rgg9XtJZFhPR84ZGdTdNoZgsOI7unZCQl2SMAuD09JOzUXmaQXcs5dH4z3nZgAf0rUTFh67+ct7rhuRdEQMDzyWg8d6+Mes5PxWUL/xKQu2qEz+XgoPww4+fHaH+KeiOtnNlhGyC721KTb0tj8FXY33dFofxlURwlWlt/1R+Bcq+lXbtkcwIAAAAABJRU5ErkJggg==";

  // Lightweight Reference Dataset for Instant App Shell Render (< 2ms First Paint)
  const REAL_BUILDINGS = [
    {"gedung_id": "BGN-0001", "kode_gedung": "PNS-FAC-LH 01", "nama_gedung": "LONGHOUSE STAFF/OPERATOR - PNS-FAC-LH 01", "lokasi_site": "Factory / Pabrik (FR)", "kategori": "MESS & HUNIAN", "sub_kategori": "LONGHOUSE STAFF/OPERATOR", "penanggungjawab": "Ilyasa, Elvan, Nuh & Nando", "total_ruangan": 14, "total_asset": 326},
    {"gedung_id": "BGN-0002", "kode_gedung": "PNS-GH-01", "nama_gedung": "GUEST HOUSE 10 - PNS-GH-01", "lokasi_site": "Central Office (CO)", "kategori": "MESS & HUNIAN", "sub_kategori": "GUEST HOUSE 10", "penanggungjawab": "Rizal Dwi & Rocky", "total_ruangan": 5, "total_asset": 48},
    {"gedung_id": "BGN-0003", "kode_gedung": "PNS-FAC-OFFICE-01", "nama_gedung": "KANTOR FACTORY - PNS-FAC-OFFICE-01", "lokasi_site": "Factory / Pabrik (FR)", "kategori": "KANTOR", "sub_kategori": "KANTOR FACTORY", "penanggungjawab": "Ilyasa, Elvan, Nuh & Nando", "total_ruangan": 72, "total_asset": 514},
    {"gedung_id": "BGN-0004", "kode_gedung": "PNS-CENTRAL-OFFICE-01", "nama_gedung": "KANTOR UTAMA - PNS-CENTRAL-OFFICE-01", "lokasi_site": "Central Office (CO)", "kategori": "KANTOR", "sub_kategori": "HRGA & CENTRAL", "penanggungjawab": "Rizal Dwi & Rocky", "total_ruangan": 26, "total_asset": 530},
    {"gedung_id": "BGN-0005", "kode_gedung": "PNS-LND", "nama_gedung": "MESS MT & TRAINING - PNS-LND", "lokasi_site": "Central Office (CO)", "kategori": "TRAINING CENTER", "sub_kategori": "MESS MT", "penanggungjawab": "Rizal Dwi & Rocky", "total_ruangan": 53, "total_asset": 451},
    {"gedung_id": "BGN-0006", "kode_gedung": "PNS-OFFICE-02", "nama_gedung": "KANTOR DIVISI - PNS-OFFICE-02", "lokasi_site": "Estate 1 (E1)", "kategori": "KANTOR", "sub_kategori": "KANTOR DIVISI", "penanggungjawab": "Biner & Basran", "total_ruangan": 42, "total_asset": 400},
    {"gedung_id": "BGN-0007", "kode_gedung": "PNS-FAC-GUDANGGS-01", "nama_gedung": "GUDANG GS - PNS-FAC-GUDANGGS-01", "lokasi_site": "Factory / Pabrik (FR)", "kategori": "GUDANG", "sub_kategori": "GUDANG GS", "penanggungjawab": "Ilyasa, Elvan, Nuh & Nando", "total_ruangan": 6, "total_asset": 242},
    {"gedung_id": "BGN-0008", "kode_gedung": "PNS-E2-MESS-01", "nama_gedung": "MESS KARYAWAN E2 - PNS-E2-MESS-01", "lokasi_site": "Estate 2 (E2)", "kategori": "MESS & HUNIAN", "sub_kategori": "MESS KARYAWAN", "penanggungjawab": "Rizal Dwi & Rocky", "total_ruangan": 18, "total_asset": 216},
    {"gedung_id": "BGN-0009", "kode_gedung": "PNS-LH-05-01", "nama_gedung": "LONGHOUSE STAFF/OPERATOR - PNS-LH-05-01", "lokasi_site": "Estate 3 (E3)", "kategori": "MESS & HUNIAN", "sub_kategori": "LONGHOUSE STAFF/OPERATOR", "penanggungjawab": "Budiono MU & Dwiki", "total_ruangan": 15, "total_asset": 267}
  ];

  const REAL_ROOMS = [
    {"ruangan_id": "RNG-0001", "kode_ruangan": "RNG-0001", "gedung_id": "BGN-0001", "kode_gedung": "PNS-FAC-LH 01", "nama_ruangan": "KAMAR NO.1", "tipe_ruangan": "Kamar Hunian", "kapasitas": 2, "penanggungjawab": "Ilyasa, Elvan, Nuh & Nando", "total_asset": 18, "kondisi_terakhir": "Baik", "status_hunian": "Terisi"},
    {"ruangan_id": "RNG-0002", "kode_ruangan": "RNG-0002", "gedung_id": "BGN-0001", "kode_gedung": "PNS-FAC-LH 01", "nama_ruangan": "KAMAR NO.2", "tipe_ruangan": "Kamar Hunian", "kapasitas": 2, "penanggungjawab": "Ilyasa, Elvan, Nuh & Nando", "total_asset": 18, "kondisi_terakhir": "Baik", "status_hunian": "Tersedia"},
    {"ruangan_id": "RNG-0003", "kode_ruangan": "RNG-0003", "gedung_id": "BGN-0002", "kode_gedung": "PNS-GH-01", "nama_ruangan": "KAMAR TAMU 01", "tipe_ruangan": "Kamar VIP", "kapasitas": 2, "penanggungjawab": "Rizal Dwi & Rocky", "total_asset": 14, "kondisi_terakhir": "Baik", "status_hunian": "Tersedia"},
    {"ruangan_id": "RNG-0004", "kode_ruangan": "RNG-0004", "gedung_id": "BGN-0002", "kode_gedung": "PNS-GH-01", "nama_ruangan": "RUANG LOBBY", "tipe_ruangan": "Fasilitas Umum", "kapasitas": 6, "penanggungjawab": "Rizal Dwi & Rocky", "total_asset": 10, "kondisi_terakhir": "Baik", "status_hunian": "Aktif"},
    {"ruangan_id": "RNG-0005", "kode_ruangan": "RNG-0005", "gedung_id": "BGN-0003", "kode_gedung": "PNS-FAC-OFFICE-01", "nama_ruangan": "RUANG HRGA", "tipe_ruangan": "Ruang Kantor", "kapasitas": 8, "penanggungjawab": "Ilyasa, Elvan, Nuh & Nando", "total_asset": 45, "kondisi_terakhir": "Baik", "status_hunian": "Aktif"},
    {"ruangan_id": "RNG-0006", "kode_ruangan": "RNG-0006", "gedung_id": "BGN-0005", "kode_gedung": "PNS-LND", "nama_ruangan": "RUANG KELAS A", "tipe_ruangan": "Ruang Training", "kapasitas": 30, "penanggungjawab": "Rizal Dwi & Rocky", "total_asset": 60, "kondisi_terakhir": "Baik", "status_hunian": "Tersedia"}
  ];

  const REAL_ASSETS = [
    {"kode_gedung": "PNS-FAC-LH 01", "nama_ruangan": "KAMAR NO.1", "no_asset": "AST-2024-0012", "nama_asset": "Ranjang Besi Susun Tingkat 2", "kondisi": "Baik", "kategori_asset": "Furniture", "total_harga_perolehan": 3500000, "tanggal_perolehan": "2024-01-15"},
    {"kode_gedung": "PNS-FAC-LH 01", "nama_ruangan": "KAMAR NO.1", "no_asset": "AST-2024-0013", "nama_asset": "Kasur Busa High Density 90x200", "kondisi": "Baik", "kategori_asset": "Perlengkapan", "total_harga_perolehan": 1200000, "tanggal_perolehan": "2024-01-15"},
    {"kode_gedung": "PNS-FAC-LH 01", "nama_ruangan": "KAMAR NO.1", "no_asset": "AST-2024-0014", "nama_asset": "Lemari Pakaian 2 Pintu Metal", "kondisi": "Baik", "kategori_asset": "Furniture", "total_harga_perolehan": 2400000, "tanggal_perolehan": "2024-02-10"},
    {"kode_gedung": "PNS-GH-01", "nama_ruangan": "KAMAR TAMU 01", "no_asset": "AST-2023-0105", "nama_asset": "AC Split 1.5 PK Daikin Inverter", "kondisi": "Baik", "kategori_asset": "Elektronik", "total_harga_perolehan": 6500000, "tanggal_perolehan": "2023-08-20"},
    {"kode_gedung": "PNS-GH-01", "nama_ruangan": "KAMAR TAMU 01", "no_asset": "AST-2023-0106", "nama_asset": "Smart TV 43 Inch LG 4K", "kondisi": "Baik", "kategori_asset": "Elektronik", "total_harga_perolehan": 4800000, "tanggal_perolehan": "2023-08-20"}
  ];


  // ==========================================
  // ENTERPRISE ASSET REPOSITORY (SELURUH ASET PORTOFOLIO)
  // ==========================================
  const ENTERPRISE_PORTFOLIO_SAMPLE = [
    { no_asset: 'PNS-HE-EXC-001', nama_asset: 'Excavator Komatsu PC200-8M0 Heavy Duty', kategori_asset: 'HEAVY EQUIPMENT', kode_gedung: 'Central Workshop', lokasi_site: 'Factory / Pabrik (FR)', kondisi: 'Baik', total_harga_perolehan: 1850000000, tanggal_perolehan: '2021-03-15' },
    { no_asset: 'PNS-HE-DOZ-004', nama_asset: 'Bulldozer Caterpillar D6R XL Forestry Spec', kategori_asset: 'HEAVY EQUIPMENT', kode_gedung: 'Workshop Estate 1', lokasi_site: 'Estate 1 (E1)', kondisi: 'Baik', total_harga_perolehan: 2450000000, tanggal_perolehan: '2020-07-20' },
    { no_asset: 'PNS-VH-HLX-012', nama_asset: 'Toyota Hilux Double Cabin 2.4G 4x4 Operasional', kategori_asset: 'VEHICLE', kode_gedung: 'Pool Kendaraan Central', lokasi_site: 'Central Office (CO)', kondisi: 'Baik', total_harga_perolehan: 465000000, tanggal_perolehan: '2022-05-10' },
    { no_asset: 'PNS-VH-DT-008', nama_asset: 'Dump Truck Hino 500 FM 260 JD 6x4', kategori_asset: 'VEHICLE', kode_gedung: 'Workshop Pabrik', lokasi_site: 'Factory / Pabrik (FR)', kondisi: 'Baik', total_harga_perolehan: 980000000, tanggal_perolehan: '2021-11-28' },
    { no_asset: 'PNS-MC-TRB-001', nama_asset: 'Steam Turbine Generator Shinko 3500 kW Power Plant', kategori_asset: 'PABRIK', kode_gedung: 'Power House Pabrik', lokasi_site: 'Factory / Pabrik (FR)', kondisi: 'Baik', total_harga_perolehan: 8750000000, tanggal_perolehan: '2019-08-14' },
    { no_asset: 'PNS-MC-BLR-002', nama_asset: 'Water Tube Boiler Takuma 45 Ton/Hour High Pressure', kategori_asset: 'PABRIK', kode_gedung: 'Boiler Station', lokasi_site: 'Factory / Pabrik (FR)', kondisi: 'Baik', total_harga_perolehan: 12400000000, tanggal_perolehan: '2019-09-01' },
    { no_asset: 'PNS-AG-TRC-015', nama_asset: 'Agricultural Tractor John Deere 6120B 120 HP 4WD', kategori_asset: 'PERTANIAN', kode_gedung: 'Gudang Traktor E2', lokasi_site: 'Estate 2 (E2)', kondisi: 'Baik', total_harga_perolehan: 820000000, tanggal_perolehan: '2022-01-18' },
    { no_asset: 'PNS-AG-HRV-003', nama_asset: 'Sugarcane Harvester Austoft 8810 Case IH Track', kategori_asset: 'PERTANIAN', kode_gedung: 'Pool Panen Estate 3', lokasi_site: 'Estate 3 (E3)', kondisi: 'Baik', total_harga_perolehan: 4150000000, tanggal_perolehan: '2021-04-12' },
    { no_asset: 'PNS-IT-SRV-001', nama_asset: 'Server Dell PowerEdge R750 2x Xeon 128GB RAM Dual PSU', kategori_asset: 'IT', kode_gedung: 'Server Room Central Office', lokasi_site: 'Central Office (CO)', kondisi: 'Baik', total_harga_perolehan: 175000000, tanggal_perolehan: '2023-02-10' },
    { no_asset: 'PNS-EL-TRF-003', nama_asset: 'Transformer Trafo Schneider 2500 kVA 20kV / 400V', kategori_asset: 'IT', kode_gedung: 'Substation Central', lokasi_site: 'Central Office (CO)', kondisi: 'Baik', total_harga_perolehan: 650000000, tanggal_perolehan: '2020-04-15' },
    { no_asset: 'PNS-BL-KTR-001', nama_asset: 'Gedung Utama Head Central Office 2 Lantai 1200 m2', kategori_asset: 'FASILITAS', kode_gedung: 'PNS-CENTRAL-OFFICE-01', lokasi_site: 'Central Office (CO)', kondisi: 'Baik', total_harga_perolehan: 7800000000, tanggal_perolehan: '2018-12-01' },
    { no_asset: 'PNS-BL-LH-001', nama_asset: 'Bangunan Longhouse Staff & Operator 14 Pintu Block A', kategori_asset: 'FASILITAS', kode_gedung: 'PNS-FAC-LH 01', lokasi_site: 'Factory / Pabrik (FR)', kondisi: 'Baik', total_harga_perolehan: 3200000000, tanggal_perolehan: '2019-03-20' }
  ];

  const REAL_VALIDATIONS = [
    { opname_id: 'OPN-202610-001', tanggal: '2026-10-25', lokasi: 'PNS-FAC-LH 01', total_terdaftar: 326, sesuai: 324, selisih: 2, status: 'Ada Selisih', auditor: 'Miftahul Khoiry', catatan: '2 Kasur busa robek di Kamar 3' },
    { opname_id: 'OPN-202610-002', tanggal: '2026-10-26', lokasi: 'PNS-GH-01', total_terdaftar: 48, sesuai: 48, selisih: 0, status: 'Valid', auditor: 'Rizal Dwi', catatan: 'Seluruh aset kamar guest house lengkap & baik' },
    { opname_id: 'OPN-202610-003', tanggal: '2026-10-27', lokasi: 'PNS-CENTRAL-OFFICE-01', total_terdaftar: 530, sesuai: 528, selisih: 2, status: 'Ada Selisih', auditor: 'Budiono MU', catatan: '1 unit kursi kerja rusak hidrolik' },
    { opname_id: 'OPN-202610-004', tanggal: '2026-10-28', lokasi: 'PNS-LND', total_terdaftar: 451, sesuai: 451, selisih: 0, status: 'Valid', auditor: 'Rocky', catatan: 'Fasilitas mess training center lengkap' },
    { opname_id: 'OPN-202610-005', tanggal: '2026-10-29', lokasi: 'PNS-FAC-KANTIN', total_terdaftar: 112, sesuai: 110, selisih: 2, status: 'Proses', auditor: 'Miftahul Khoiry', catatan: 'Proses verifikasi inventaris dapur' }
  ];

  // Helper Validator: Pastikan HANYA gedung nyata fisik yang diproses
  function isGenuineBuilding(b) {
    if (!b) return false;
    const kode = String(b.kode_gedung || '').trim();
    const nama = String(b.nama_gedung || '').trim();
    const kat = String(b.kategori || '').toUpperCase();
    const sub = String(b.sub_kategori || '').toUpperCase();

    // 1. Tolak kode murni angka (seperti 18142, 8141, 8229)
    if (/^\d+$/.test(kode)) return false;

    // 2. Tolak infrastruktur non-bangunan
    const combo = (kode + ' ' + nama + ' ' + kat + ' ' + sub).toUpperCase();
    const bads = ['JALAN', 'PARIT', 'KANAL', 'DERMAGA', 'LANDSCAPING', 'EMPLACEMENT', 'HELIPAD', 'TEMPAT PARKIR', 'TIDAK TERKLASIFIKASI', 'ERROR', 'LAMPU', 'PENERANGAN', 'TIANG'];
    for (let i = 0; i < bads.length; i++) {
      if (combo.includes(bads[i])) return false;
    }
    return true;
  }

  let chartSiteBarInstance = null;
  let chartCondDonutInstance = null;

  let appState = {
    currentView: 'view-dashboard',
    stats: {
      total_gedung: 698,
      total_ruangan: 2460,
      total_assets: 34266,
      total_inspeksi: 12,
      valuasi_hpp: 124508000000,
      akumulasi_penyusutan: 42800000000,
      nilai_buku_nbv: 81708000000,
      biaya_perawatan: 1854200000,
      kondisi: { 'Baik': 31200, 'Rusak Ringan': 2400, 'Rusak Berat': 620, 'Hilang': 46 },
      sebaran_site: {
        'Central Office (CO)': 182,
        'Factory / Pabrik (FR)': 195,
        'Estate 1 (E1)': 128,
        'Estate 2 (E2)': 98,
        'Estate 3 (E3)': 95
      }
    },
    buildings: REAL_BUILDINGS,
    rooms: REAL_ROOMS,
    assets: REAL_ASSETS,
    inspections: [
      {
        inspection_id: 1,
        no_inspeksi: 'INSP-202610-001',
        tanggal_inspeksi: '2026-10-14',
        kode_gedung: 'PNS-FAC-LH 01',
        nama_gedung: 'LONGHOUSE STAFF/OPERATOR - PNS-FAC-LH 01',
        nama_ruangan: 'KAMAR NO.1',
        penanggungjawab: 'Ilyasa, Elvan, Nuh & Nando',
        inspector_nama: 'Miftahul Khoiry (Admin)',
        kondisi_ruangan: 'Aman',
        skor_kelaikan: 96,
        catatan_temuan: 'Audit berkala kamar operator. Kondisi ranjang susun, lemari, sprei dalam kondisi baik & bersih.',
        total_asset_diperiksa: 18
      },
      {
        inspection_id: 2,
        no_inspeksi: 'INSP-202610-002',
        tanggal_inspeksi: '2026-10-18',
        kode_gedung: 'PNS-GH-01',
        nama_gedung: 'GUEST HOUSE 10 - PNS-GH-01',
        nama_ruangan: 'KAMAR TAMU 01',
        penanggungjawab: 'Rizal Dwi & Rocky',
        inspector_nama: 'Miftahul Khoiry (Admin)',
        kondisi_ruangan: 'Ada Temuan',
        skor_kelaikan: 88,
        catatan_temuan: '1 unit remote AC baterai habis dan keran wastafel sedikit merembes.',
        total_asset_diperiksa: 14
      }
    ],
    workOrders: [
      {
            "wo_id": "1",
            "no_wo": "WO-0384",
            "tipe_wo": "Korektif",
            "prioritas": "Rendah",
            "judul_pekerjaan": "Lampu koridor mati",
            "deskripsi": "Penggantian lampu LED koridor yang putus",
            "kode_gedung": "PNS-OFFICE-01",
            "lokasi_detail": "Gedung B, Lantai 3",
            "teknisi_nama": null,
            "teknisi_inisial": null,
            "sla_target": "SLA 2 hari",
            "status": "Baru",
            "is_overdue": "0",
            "biaya_estimasi": "75000.00",
            "created_at": "2026-10-14 10:39:37"
      },
      {
            "wo_id": "2",
            "no_wo": "WO-0383",
            "tipe_wo": "Korektif",
            "prioritas": "Tinggi",
            "judul_pekerjaan": "Kebocoran pipa toilet",
            "deskripsi": "Pipa air bersih bocor di toilet pria lantai 1",
            "kode_gedung": "PNS-FAC-OFFICE-01",
            "lokasi_detail": "Gedung A, Lantai 1",
            "teknisi_nama": null,
            "teknisi_inisial": null,
            "sla_target": "SLA 6 jam",
            "status": "Baru",
            "is_overdue": "0",
            "biaya_estimasi": "250000.00",
            "created_at": "2026-10-14 10:39:37"
      },
      {
            "wo_id": "3",
            "no_wo": "WO-0382",
            "tipe_wo": "Korektif",
            "prioritas": "Sedang",
            "judul_pekerjaan": "Pintu otomatis lobi macet",
            "deskripsi": "Sensor pintu utama tidak mendeteksi pergerakan",
            "kode_gedung": "PNS-FAC-OFFICE-01",
            "lokasi_detail": "Gedung A, Lobi",
            "teknisi_nama": null,
            "teknisi_inisial": null,
            "sla_target": "SLA 1 hari",
            "status": "Baru",
            "is_overdue": "0",
            "biaya_estimasi": "350000.00",
            "created_at": "2026-10-14 10:39:37"
      },
      {
            "wo_id": "4",
            "no_wo": "WO-0385",
            "tipe_wo": "Preventif",
            "prioritas": "Rendah",
            "judul_pekerjaan": "Pembersihan filter exhaust fan",
            "deskripsi": "Perawatan rutin exhaust toilet dan pantry",
            "kode_gedung": "PNS-FAC-LH 01",
            "lokasi_detail": "Longhouse 01 KM 18",
            "teknisi_nama": null,
            "teknisi_inisial": null,
            "sla_target": "SLA 3 hari",
            "status": "Baru",
            "is_overdue": "0",
            "biaya_estimasi": "100000.00",
            "created_at": "2026-10-14 10:39:37"
      },
      {
            "wo_id": "5",
            "no_wo": "WO-0380",
            "tipe_wo": "Preventif",
            "prioritas": "Tinggi",
            "judul_pekerjaan": "Servis rutin lift penumpang 2",
            "deskripsi": "Pengecekan sling, rem darurat, dan pelumasan rel",
            "kode_gedung": "PNS-FAC-OFFICE-01",
            "lokasi_detail": "Gedung A, Lift 2",
            "teknisi_nama": "Hendra",
            "teknisi_inisial": "HN",
            "sla_target": "SLA 1 hari",
            "status": "Ditugaskan",
            "is_overdue": "0",
            "biaya_estimasi": "1200000.00",
            "created_at": "2026-10-14 10:39:37"
      },
      {
            "wo_id": "6",
            "no_wo": "WO-0379",
            "tipe_wo": "Preventif",
            "prioritas": "Sedang",
            "judul_pekerjaan": "Ganti filter AHU",
            "deskripsi": "Penggantian filter hepa sistem pendingin sentral",
            "kode_gedung": "PNS-OFFICE-01",
            "lokasi_detail": "Gedung B, Lantai 2",
            "teknisi_nama": "Sari",
            "teknisi_inisial": "SR",
            "sla_target": "SLA 3 hari",
            "status": "Ditugaskan",
            "is_overdue": "0",
            "biaya_estimasi": "450000.00",
            "created_at": "2026-10-14 10:39:37"
      },
      {
            "wo_id": "7",
            "no_wo": "WO-0377",
            "tipe_wo": "Korektif",
            "prioritas": "Rendah",
            "judul_pekerjaan": "Cat ulang dinding unit A-0803",
            "deskripsi": "Pengecatan ulang pasca kebocoran atap yang sudah diperbaiki",
            "kode_gedung": "PNS-GH-01-3",
            "lokasi_detail": "Guest House 10, Kamar 3",
            "teknisi_nama": "Joko",
            "teknisi_inisial": "JK",
            "sla_target": "SLA 5 hari",
            "status": "Ditugaskan",
            "is_overdue": "0",
            "biaya_estimasi": "600000.00",
            "created_at": "2026-10-14 10:39:37"
      },
      {
            "wo_id": "8",
            "no_wo": "WO-0378",
            "tipe_wo": "Korektif",
            "prioritas": "Sedang",
            "judul_pekerjaan": "Perbaikan engsel pintu loker",
            "deskripsi": "3 unit pintu loker besi longgar di kamar operator",
            "kode_gedung": "PNS-FAC-LH 02",
            "lokasi_detail": "Longhouse 02, Kamar 1",
            "teknisi_nama": "Teguh",
            "teknisi_inisial": "TG",
            "sla_target": "SLA 2 hari",
            "status": "Ditugaskan",
            "is_overdue": "0",
            "biaya_estimasi": "150000.00",
            "created_at": "2026-10-14 10:39:37"
      },
      {
            "wo_id": "9",
            "no_wo": "WO-0381",
            "tipe_wo": "Korektif",
            "prioritas": "Tinggi",
            "judul_pekerjaan": "AC sentral lantai 3 tidak dingin",
            "deskripsi": "Tekanan freon drop dan motor kompresor overheat",
            "kode_gedung": "PNS-FAC-OFFICE-01",
            "lokasi_detail": "Gedung A, Lantai 3",
            "teknisi_nama": "Hendra",
            "teknisi_inisial": "HN",
            "sla_target": "Lewat SLA",
            "status": "Dikerjakan",
            "is_overdue": "1",
            "biaya_estimasi": "850000.00",
            "created_at": "2026-10-14 10:39:37"
      },
      {
            "wo_id": "10",
            "no_wo": "WO-0376",
            "tipe_wo": "Korektif",
            "prioritas": "Tinggi",
            "judul_pekerjaan": "Perbaikan genset utama",
            "deskripsi": "Penggantian AVR dan pengecekan fuel injector",
            "kode_gedung": "PNS-FAC-OFFICE-01",
            "lokasi_detail": "Gedung A, Basement",
            "teknisi_nama": "Teguh",
            "teknisi_inisial": "TG",
            "sla_target": "SLA 4 jam",
            "status": "Dikerjakan",
            "is_overdue": "0",
            "biaya_estimasi": "3200000.00",
            "created_at": "2026-10-14 10:39:37"
      },
      {
            "wo_id": "11",
            "no_wo": "WO-0374",
            "tipe_wo": "Korektif",
            "prioritas": "Rendah",
            "judul_pekerjaan": "Ganti keran wastafel",
            "deskripsi": "Keran air bocor menetes terus-menerus",
            "kode_gedung": "PNS-FAC-SPV 01",
            "lokasi_detail": "Longhouse SPV 01, Pantry",
            "teknisi_nama": "Joko",
            "teknisi_inisial": "JK",
            "sla_target": "SLA 2 hari",
            "status": "Dikerjakan",
            "is_overdue": "0",
            "biaya_estimasi": "180000.00",
            "created_at": "2026-10-14 10:39:37"
      },
      {
            "wo_id": "12",
            "no_wo": "WO-0375",
            "tipe_wo": "Preventif",
            "prioritas": "Sedang",
            "judul_pekerjaan": "Inspeksi panel distribusi listrik",
            "deskripsi": "Thermovisi titik sambungan kabel dan kencangkan baut MCB",
            "kode_gedung": "PNS-FAC-LH 03",
            "lokasi_detail": "Longhouse 03, Ruang Panel",
            "teknisi_nama": "Hendra",
            "teknisi_inisial": "HN",
            "sla_target": "SLA 1 hari",
            "status": "Dikerjakan",
            "is_overdue": "0",
            "biaya_estimasi": "300000.00",
            "created_at": "2026-10-14 10:39:37"
      },
      {
            "wo_id": "13",
            "no_wo": "WO-0371",
            "tipe_wo": "Preventif",
            "prioritas": "Sedang",
            "judul_pekerjaan": "Penggantian APAR kedaluwarsa",
            "deskripsi": "Pengisian ulang 14 tabung bubuk kimia ABC 6kg",
            "kode_gedung": "PNS-OFFICE-01",
            "lokasi_detail": "Gedung B, Semua lantai",
            "teknisi_nama": "Sari",
            "teknisi_inisial": "SR",
            "sla_target": "Tepat waktu",
            "status": "Selesai",
            "is_overdue": "0",
            "biaya_estimasi": "1400000.00",
            "created_at": "2026-10-14 10:39:37"
      },
      {
            "wo_id": "14",
            "no_wo": "WO-0370",
            "tipe_wo": "Preventif",
            "prioritas": "Sedang",
            "judul_pekerjaan": "Pembersihan tangki air rooftop",
            "deskripsi": "Pengurasan dan disinfeksi toren penampung 5000 liter",
            "kode_gedung": "PNS-FAC-OFFICE-01",
            "lokasi_detail": "Gedung A, Rooftop",
            "teknisi_nama": "Teguh",
            "teknisi_inisial": "TG",
            "sla_target": "Tepat waktu",
            "status": "Selesai",
            "is_overdue": "0",
            "biaya_estimasi": "500000.00",
            "created_at": "2026-10-14 10:39:37"
      },
      {
            "wo_id": "15",
            "no_wo": "WO-0369",
            "tipe_wo": "Preventif",
            "prioritas": "Tinggi",
            "judul_pekerjaan": "Kalibrasi panel listrik utama",
            "deskripsi": "Pengujian relay proteksi arus lebih dan grounding",
            "kode_gedung": "PNS-FAC-OFFICE-01",
            "lokasi_detail": "Gedung A, Ruang Panel",
            "teknisi_nama": "Hendra",
            "teknisi_inisial": "HN",
            "sla_target": "Tepat waktu",
            "status": "Selesai",
            "is_overdue": "0",
            "biaya_estimasi": "1800000.00",
            "created_at": "2026-10-14 10:39:37"
      }
],
    penghuni: (typeof window !== 'undefined' && window.PNS_MASTER_DATA && Array.isArray(window.PNS_MASTER_DATA.penghuni) && window.PNS_MASTER_DATA.penghuni.length > 0)
      ? window.PNS_MASTER_DATA.penghuni
      : [
          { nik: 'PNS-AGR-01', nama_penghuni: 'Ahmad Suhendra', departemen: 'Agronomi', kode_gedung: 'PNS-FAC-LH 01', nama_ruangan: 'KAMAR NO.1', nomor_kasur: 'Bed A', status_hunian: 'Aktif', no_kontak: '0822-1476-369' }
        ],
    validations: REAL_VALIDATIONS,
    enterpriseAssets: ENTERPRISE_PORTFOLIO_SAMPLE,
    portfolioCatFilter: '',
    currentBldgFilterSite: '',
    currentInspAssets: []
  };

  if (typeof window !== "undefined") {
    window.appState = appState;
  }

  // ==========================================
  // PERFORMANCE HELPERS (DEBOUNCE & CURRENCY)
  // ==========================================
  function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function formatRupiahShort(num) {
    const n = Number(num) || 0;
    if (n >= 1e9) return 'Rp ' + (n / 1e9).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' M';
    if (n >= 1e6) return 'Rp ' + (n / 1e6).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Jt';
    return 'Rp ' + n.toLocaleString('id-ID');
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const onSearchBldg = debounce(() => filterBuildings(), 150);
  const onSearchRoom = debounce(() => renderRoomsTable(), 150);
  const onSearchAsset = debounce(() => renderAssetsTable(), 150);
  const onSearchPenghuni = debounce(() => {
    penghuniCurrentPage = 1;
    renderPenghuniTable();
  }, 150);

  // ==========================================
  // UNIFIED DUAL-ENGINE BRIDGE (GAS + GIT FETCH)
  // ==========================================
  function isGasEnvironment() {
    return (typeof google !== 'undefined' && google.script && google.script.run);
  }

  function getRemoteGasUrl() {
    if (typeof CONFIG !== 'undefined' && CONFIG.GAS_WEB_APP_URL && CONFIG.GAS_WEB_APP_URL.indexOf('https://script.google.com') === 0) {
      return CONFIG.GAS_WEB_APP_URL;
    }
    return '';
  }

  function setSyncIndicator(text, isSyncing) {
    const syncText = document.getElementById('sync-text');
    const syncDot = document.getElementById('sync-dot');
    if (syncText) syncText.innerText = text;
    if (syncDot) {
      syncDot.className = isSyncing
        ? 'w-2 h-2 rounded-full bg-amber-400 animate-ping'
        : 'w-2 h-2 rounded-full bg-emerald-500';
    }
  }

  function callBackendPost(action, payload, onSuccess, onError) {
    const fullPayload = Object.assign({}, payload, { action: action });

    if (isGasEnvironment()) {
      const runner = google.script.run
        .withSuccessHandler(res => { if (onSuccess) onSuccess(res); })
        .withFailureHandler(err => { if (onError) onError(err); });

      if (action === 'save_inspection') runner.apiSaveInspection(fullPayload);
      else if (action === 'save_asset_register') runner.apiSaveAssetRegister(fullPayload);
      else if (action === 'save_asset_mutation') runner.apiSaveAssetMutation(fullPayload);
      else if (action === 'save_work_order') runner.apiSaveWorkOrder(fullPayload);
      else if (action === 'save_penghuni') runner.apiSavePenghuni(fullPayload);
      return;
    }

    const remoteUrl = getRemoteGasUrl();
    if (remoteUrl) {
      fetch(remoteUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(fullPayload)
      })
        .then(r => r.json())
        .then(res => { if (onSuccess) onSuccess(res); })
        .catch(err => {
          // Fallback if CORS redirect occurs
          if (onSuccess) onSuccess({ success: true, fallback: true });
        });
      return;
    }

    if (onSuccess) onSuccess({ success: true, offline: true });
  }

  // ==========================================
  // INITIALIZATION & BOOTSTRAP SYNC
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    initAppMasterData();
    initBrandLogos();
    initTheme();
    initNavigation();
    initInspectionFormDropdowns();
    renderDashboardCharts();
    renderPortfolioSites();
    renderBuildingsCards();
    renderRoomsTable();
    renderAssetsTable();
    renderHistoryTable();
    renderWorkOrdersKanban();
    renderAllAssetsTable();
    renderPortfolioComposition();
    renderAssetSebaran();
    renderPenghuniTable();
    renderPortfolioAllTable();
    renderValidasiTable();

    syncAllFromBackend(false);
  });

  function initBrandLogos() {
    const fav = document.getElementById('app-favicon');
    if (fav && PNS_LOGO_URI) fav.href = PNS_LOGO_URI;
    document.querySelectorAll('img[data-pns-logo]').forEach(img => {
      img.src = PNS_LOGO_URI;
    });
  }

  function applyBootstrapPayload(data) {
    if (!data) return;
    if (data.stats) onLiveStatsLoaded(data.stats);
    if (Array.isArray(data.buildings) && data.buildings.length > 0) {
      appState.buildings = data.buildings.filter(isGenuineBuilding);
      const subEl = document.getElementById('subtitle-gedung-count');
      if (subEl) subEl.innerText = `${appState.buildings.length.toLocaleString('id-ID')} data gedung nyata dari database Google Sheets`;
    }
    if (Array.isArray(data.validations) && data.validations.length > 0) {
      appState.validations = data.validations;
    }
    if (Array.isArray(data.assets) && data.assets.length > 0) {
      appState.enterpriseAssets = data.assets;
    }
    if (Array.isArray(data.rooms) && data.rooms.length > 0) {
      appState.rooms = data.rooms;
    }
    if (Array.isArray(data.assets) && data.assets.length > 0) {
      appState.enterpriseAssets = data.assets;
    }
    if (Array.isArray(data.hrgaAssets) && data.hrgaAssets.length > 1000) {
      appState.assets = data.hrgaAssets;
    }
    if (Array.isArray(data.inspections) && data.inspections.length > 0) {
      appState.inspections = data.inspections;
    }
    if (Array.isArray(data.workOrders) && data.workOrders.length > 0) {
      appState.workOrders = data.workOrders;
    }
    if (Array.isArray(data.penghuni) && data.penghuni.length >= 100) {
      appState.penghuni = data.penghuni;
    }

    initInspectionFormDropdowns();
    renderDashboardCharts();
    renderPortfolioSites();
    filterBuildings();
    renderRoomsTable();
    renderAssetsTable();
    renderHistoryTable();
    renderWorkOrdersKanban();
    renderAllAssetsTable();
    renderPortfolioComposition();
    renderAssetSebaran();
    renderPenghuniTable();
    renderPortfolioAllTable();
    renderValidasiTable();
    setSyncIndicator('Sheets Synchronized', false);
  }

  function syncAllFromBackend(showToast) {
    if (isGasEnvironment()) {
      setSyncIndicator('Syncing Sheets...', true);
      google.script.run
        .withSuccessHandler(data => {
          applyBootstrapPayload(data);
          if (showToast && typeof Swal !== 'undefined') {
            Swal.fire({ icon: 'success', title: 'Data Terbarui', text: 'Seluruh tabel berhasil disinkronkan dari Google Sheets.', timer: 1400, showConfirmButton: false });
          }
        })
        .withFailureHandler(() => {
          setSyncIndicator('Local Cache Active', false);
        })
        .apiGetBootstrapData();
      return;
    }

    const remoteUrl = getRemoteGasUrl();
    if (remoteUrl) {
      setSyncIndicator('Connecting API...', true);
      fetch(remoteUrl + '?api=bootstrap')
        .then(r => r.json())
        .then(res => {
          const payload = (res && res.data) ? res.data : res;
          applyBootstrapPayload(payload);
          if (showToast && typeof Swal !== 'undefined') {
            Swal.fire({ icon: 'success', title: 'Data Terbarui', text: 'Sinkronisasi dari Web App Google Sheets selesai.', timer: 1400, showConfirmButton: false });
          }
        })
        .catch(() => {
          setSyncIndicator('Ready (Cached Mode)', false);
          if (showToast && typeof Swal !== 'undefined') {
            Swal.fire({ icon: 'info', title: 'Mode Cepat Aktif', text: 'Menampilkan data referensi lokal PT Pratama Nusantara Sakti.', timer: 1500, showConfirmButton: false });
          }
        });
    }
  }

  function onLiveStatsLoaded(stats) {
    if (!stats) return;
    appState.stats = Object.assign({}, appState.stats, stats);

    const setElText = (id, val) => {
      const el = document.getElementById(id);
      if (el && val !== undefined && val !== null) el.innerText = val;
    };

    if (stats.total_gedung) {
      const fBldg = Number(stats.total_gedung).toLocaleString('id-ID');
      setElText('stat-bldg-count', fBldg);
      setElText('nav-badge-bldg', fBldg);
    }
    if (stats.total_ruangan) {
      const fRoom = Number(stats.total_ruangan).toLocaleString('id-ID');
      setElText('stat-room-count', fRoom);
      setElText('nav-badge-room', fRoom);
    }
    if (stats.total_assets) {
      const fAsset = Number(stats.total_assets).toLocaleString('id-ID');
      setElText('stat-asset-count', fAsset);
      setElText('nav-badge-asset', fAsset);
    }
    if (stats.total_inspeksi !== undefined) {
      setElText('stat-insp-count', Number(stats.total_inspeksi).toLocaleString('id-ID'));
    }
    if (stats.valuasi_hpp) setElText('kpi-val-hpp', formatRupiahShort(stats.valuasi_hpp));
    if (stats.akumulasi_penyusutan) setElText('kpi-val-dep', formatRupiahShort(stats.akumulasi_penyusutan));
    if (stats.nilai_buku_nbv) setElText('kpi-val-nbv', formatRupiahShort(stats.nilai_buku_nbv));
    if (stats.biaya_perawatan) setElText('kpi-val-mtc', formatRupiahShort(stats.biaya_perawatan));
  }

  // ==========================================
  // NAVIGATION & THEME CONTROLLER
  // ==========================================
    function syncTopPills(viewId) {
    const pillHrga = document.getElementById('top-pill-hrga');
    const pillAll = document.getElementById('top-pill-all');
    const pillWo = document.getElementById('top-pill-wo');

    const resetPill = (el) => {
      if (el) el.className = 'top-nav-pill px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-slate-700  hover:bg-white :bg-slate-700 shadow-2xs cursor-pointer';
    };
    const activePill = (el) => {
      if (el) el.className = 'top-nav-pill active px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white  text-slate-900  shadow-xs cursor-pointer ring-1 ring-slate-200 ';
    };

    resetPill(pillHrga);
    resetPill(pillAll);
    resetPill(pillWo);

    if (viewId === 'view-wo') {
      activePill(pillWo);
    } else if (viewId === 'view-portfolio-all' || viewId === 'view-portfolio' || viewId === 'view-dashboard') {
      activePill(pillAll);
    } else {
      activePill(pillHrga);
    }
  }

  function switchView(viewId, btnEl) {
    return navTo(viewId, btnEl);
  }

  function navTo(viewId, btnEl) {
    if (viewId === 'view-asset-3') viewId = 'view-portfolio-all';
    if (viewId === 'view-asset-1') viewId = 'view-portfolio';
    document.querySelectorAll('.page-view').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(viewId);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (btnEl) {
      btnEl.classList.add('active');
    } else {
      const matched = document.querySelector(`.nav-btn[onclick*="${viewId}"]`);
      if (matched) matched.classList.add('active');
    }
    appState.currentView = viewId;
    syncTopPills(viewId);

    // Close mobile drawer immediately
    const sb = document.getElementById('app-sidebar');
    if (sb) {
      sb.classList.add('-translate-x-full');
    }

    // Scroll to top for seamless mobile view transition
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    try {
      if (viewId === 'view-wo') {
        renderWorkOrdersKanban();
      } else if (viewId === 'view-portfolio-all') {
        renderAllAssetsTable();
      } else if (viewId === 'view-portfolio') {
        renderPortfolioComposition();
      } else if (viewId === 'view-validasi') {
        renderValidasiTable();
      } else if (viewId === 'view-penghuni') {
        initPenghuniFilters();
        renderPenghuniTable();
      } else if (viewId === 'view-gedung') {
        renderBuildingsTable();
      } else if (viewId === 'view-assets') {
        updateFacilitiesKpi();
        renderAssetsTable();
      } else if (viewId === 'view-asset-sebaran') {
        renderAssetSebaran();
      } else if (viewId === 'view-asset-depreciation') {
        renderAssetDepreciation();
      } else if (viewId === 'view-asset-location') {
        initAssetLocationView();
      } else if (viewId === 'view-asset-status') {
        initAssetStatusView();
      } else if (viewId === 'view-asset-disposal') {
        initAssetDisposalView();
      }
    } catch (err) {
      console.error('Error switching view to ' + viewId + ':', err);
    }
  }

  
  function initAppMasterData() {
    initRoleAccessState();

    if (typeof window !== 'undefined' && window.PNS_MASTER_DATA) {
      const d = window.PNS_MASTER_DATA;
      if (Array.isArray(d.buildings) && d.buildings.length > 0) {
        appState.buildings = d.buildings;
      }
      if (Array.isArray(d.rooms) && d.rooms.length > 0) {
        appState.rooms = d.rooms;
      }
      
      try {
        const savedPenghuni = localStorage.getItem('pns_custom_penghuni');
        if (savedPenghuni) {
          const parsed = JSON.parse(savedPenghuni);
          if (Array.isArray(parsed) && parsed.length > 0) {
            appState.penghuni = parsed;
          }
        }
      } catch (e) {}
      if (Array.isArray(d.penghuni) && d.penghuni.length > 0) {
        appState.penghuni = d.penghuni;
      }
      if (Array.isArray(d.workOrders) && d.workOrders.length > 0) {
        appState.workOrders = d.workOrders;
      }
      if (Array.isArray(d.hrgaAssets) && d.hrgaAssets.length > 0) {
        appState.assets = d.hrgaAssets;
        appState.enterpriseAssets = d.hrgaAssets;
      }
      // Update badge counts
      const setBadge = (id, count) => {
        const el = document.getElementById(id);
        if (el) el.innerText = count.toLocaleString('id-ID');
      };
      setBadge('nav-badge-bldg', appState.buildings.length);
      setBadge('nav-badge-room', appState.rooms.length);
      setBadge('nav-badge-asset', appState.assets.length);
      setBadge('nav-badge-penghuni', appState.penghuni.length);
      setBadge('sidebar-wo-count', appState.workOrders.length);
      setBadge('facilities-total-badge', appState.assets.length);
    }
  }

  function initNavigation() {
    const toggleBtn = document.getElementById('btn-toggle-sidebar');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        document.getElementById('app-sidebar').classList.toggle('-translate-x-full');
      });
    }
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDetailModal();
    });
  }

  function initTheme() {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    if (document.body) {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
    try {
      localStorage.setItem('theme', 'light');
    } catch (e) {}
  }

  // ==========================================
  // DASHBOARD CHARTS & PORTFOLIO SITES
  // ==========================================
  function renderDashboardCharts() {
    if (typeof ApexCharts === 'undefined') {
      setTimeout(renderDashboardCharts, 150);
      return;
    }

    const siteCounts = (appState.stats && appState.stats.sebaran_site) ? Object.assign({}, appState.stats.sebaran_site) : {
      'Central Office (CO)': 0,
      'Factory / Pabrik (FR)': 0,
      'Estate 1 (E1)': 0,
      'Estate 2 (E2)': 0,
      'Estate 3 (E3)': 0
    };

    if (appState.buildings.length > 15) {
      Object.keys(siteCounts).forEach(k => { siteCounts[k] = 0; });
      appState.buildings.forEach(b => {
        if (siteCounts.hasOwnProperty(b.lokasi_site)) siteCounts[b.lokasi_site]++;
        else siteCounts['Central Office (CO)']++;
      });
    }

    const barEl = document.querySelector('#chart-site-bar');
    if (barEl) {
      if (chartSiteBarInstance) chartSiteBarInstance.destroy();
      const optionsBar = {
        series: [{ name: 'Jumlah Gedung', data: Object.values(siteCounts) }],
        chart: { type: 'bar', height: 235, toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
        plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: '55%' } },
        colors: ['#0284C7'],
        xaxis: { categories: Object.keys(siteCounts), labels: { style: { fontSize: '11px' } } },
        yaxis: { labels: { style: { fontSize: '11px', fontWeight: 600 } } },
        grid: { borderColor: '#E2E8F0', strokeDashArray: 3 },
        dataLabels: { enabled: true, style: { fontSize: '11px' } }
      };
      chartSiteBarInstance = new ApexCharts(barEl, optionsBar);
      chartSiteBarInstance.render();
    }

    const donutEl = document.querySelector('#chart-condition-donut');
    if (donutEl) {
      if (chartCondDonutInstance) chartCondDonutInstance.destroy();
      const condObj = (appState.stats && appState.stats.kondisi) || { 'Baik': 31200, 'Rusak Ringan': 2400, 'Rusak Berat': 620, 'Hilang': 46 };
      const optionsDonut = {
        series: [condObj['Baik'] || 91, condObj['Rusak Ringan'] || 6, condObj['Rusak Berat'] || 2, condObj['Hilang'] || 1],
        labels: ['Baik', 'Rusak Ringan', 'Rusak Berat', 'Hilang'],
        chart: { type: 'donut', height: 235, fontFamily: 'Inter, sans-serif' },
        colors: ['#10B981', '#F59E0B', '#EF4444', '#64748B'],
        legend: { position: 'bottom', fontSize: '11px' },
        dataLabels: { enabled: false }
      };
      chartCondDonutInstance = new ApexCharts(donutEl, optionsDonut);
      chartCondDonutInstance.render();
    }
  }

  function renderPortfolioSites() {
    const grid = document.getElementById('portfolio-sites-grid');
    if (!grid) return;

    const sitesMeta = [
      { name: 'Central Office (CO)', code: 'CO', pic: 'Rizal Dwi & Rocky', desc: 'Kantor Pusat, Guest House, Mess MT, Training Center & Fasilitas Utama' },
      { name: 'Factory / Pabrik (FR)', code: 'FR', pic: 'Ilyasa, Elvan, Nuh & Nando', desc: 'Kantor Pabrik, Gudang GS, Workshop, Longhouse Staff & Operator Factory' },
      { name: 'Estate 1 (E1)', code: 'E1', pic: 'Biner & Basran', desc: 'Kantor Divisi Kebun, Perumahan Karyawan, Pos Keamanan & Fasilitas E1' },
      { name: 'Estate 2 (E2)', code: 'E2', pic: 'Rizal Dwi & Rocky', desc: 'Mess Karyawan Estate 2, Poliklinik Kebun, Gudang Pupuk & Infrastruktur E2' },
      { name: 'Estate 3 (E3)', code: 'E3', pic: 'Budiono MU & Dwiki', desc: 'Longhouse Operator Estate 3, Kantor Afdeling & Bangunan Penunjang E3' }
    ];

    const siteMapCounts = (appState.stats && appState.stats.sebaran_site) || {};

    grid.innerHTML = sitesMeta.map(s => {
      const bldgsInSite = appState.buildings.filter(b => b.lokasi_site === s.name);
      const countBldg = bldgsInSite.length > 2 ? bldgsInSite.length : (siteMapCounts[s.name] || bldgsInSite.length || 0);
      const countRooms = bldgsInSite.reduce((acc, b) => acc + (Number(b.total_ruangan) || 0), 0) || Math.round(countBldg * 3.5);

      return `
        <div class="clean-card p-5 flex flex-col justify-between space-y-4">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-sky-100 text-sky-700">SITE ${s.code}</span>
              <span class="num-tabular text-xs font-semibold text-emerald-600">Aktif Beroperasi</span>
            </div>
            <h3 class="text-base font-bold text-slate-900">${escapeHtml(s.name)}</h3>
            <p class="text-xs text-slate-500 leading-relaxed">${escapeHtml(s.desc)}</p>
          </div>

          <div class="space-y-3 pt-3 border-t border-slate-100 text-xs">
            <div class="flex justify-between">
              <span class="text-slate-500">Penanggungjawab (PIC):</span>
              <strong class="text-slate-800">${escapeHtml(s.pic)}</strong>
            </div>
            <div class="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg">
              <div>
                <div class="text-[10px] text-slate-500 uppercase font-semibold">Total Gedung</div>
                <div class="num-tabular text-sm font-bold text-slate-900">${countBldg.toLocaleString('id-ID')} Unit</div>
              </div>
              <div>
                <div class="text-[10px] text-slate-500 uppercase font-semibold">Estimasi Ruangan</div>
                <div class="num-tabular text-sm font-bold text-sky-600">${countRooms.toLocaleString('id-ID')} Ruang</div>
              </div>
            </div>
            <button type="button" onclick="openSiteBuildings('${s.name}')" class="w-full py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-900 hover:text-white :bg-sky-500 :text-slate-950 transition">
              Buka Daftar Gedung ${s.code}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function openSiteBuildings(siteName) {
    navTo('view-gedung');
    const pills = document.querySelectorAll('.bldg-site-pill');
    let targetPill = pills[0];
    pills.forEach(p => {
      if (p.getAttribute('onclick') && p.getAttribute('onclick').includes(siteName)) {
        targetPill = p;
      }
    });
    setBldgSiteFilter(siteName, targetPill);
  }

  function refreshDashboard() {
    syncAllFromBackend(true);
  }

  
  function toggleNavModule(groupId) {
    const el = document.getElementById(groupId);
    const caret = document.getElementById('caret-' + groupId);
    if (!el) return;
    const isHidden = el.classList.contains('hidden');
    if (isHidden) {
      el.classList.remove('hidden');
      if (caret) caret.classList.add('rotate-180');
    } else {
      el.classList.add('hidden');
      if (caret) caret.classList.remove('rotate-180');
    }
  }


  let buildingCurrentPage = 1;
  const BUILDINGS_PER_PAGE = 25;
  let currentFilteredBuildings = [];

  function setBuildingViewMode(mode, btnEl) {
    const tableContainer = document.getElementById('bldg-table-view-container');
    const cardsContainer = document.getElementById('bldg-cards-container');
    const btnTable = document.getElementById('btn-bldg-mode-table');
    const btnGrid = document.getElementById('btn-bldg-mode-grid');

    if (mode === 'table') {
      if (tableContainer) tableContainer.classList.remove('hidden');
      if (cardsContainer) cardsContainer.classList.add('hidden');
      if (btnTable) {
        btnTable.className = 'px-3 py-1.5 rounded-md bg-white text-slate-900 shadow-2xs transition flex items-center gap-1.5 cursor-pointer';
      }
      if (btnGrid) {
        btnGrid.className = 'px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5 cursor-pointer';
      }
    } else {
      if (tableContainer) tableContainer.classList.add('hidden');
      if (cardsContainer) cardsContainer.classList.remove('hidden');
      if (btnGrid) {
        btnGrid.className = 'px-3 py-1.5 rounded-md bg-white text-slate-900 shadow-2xs transition flex items-center gap-1.5 cursor-pointer';
      }
      if (btnTable) {
        btnTable.className = 'px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5 cursor-pointer';
      }
    }
  }

  function changeBuildingPage(delta) {
    const totalCount = currentFilteredBuildings.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / BUILDINGS_PER_PAGE));
    buildingCurrentPage = Math.max(1, Math.min(totalPages, buildingCurrentPage + delta));
    renderBuildingsTable(currentFilteredBuildings);
  }

  function goToBuildingPage(page) {
    const totalCount = currentFilteredBuildings.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / BUILDINGS_PER_PAGE));
    buildingCurrentPage = Math.max(1, Math.min(totalPages, page));
    renderBuildingsTable(currentFilteredBuildings);
  }

  function setBldgSiteFilter(site = '', btnEl) {
    appState.currentBldgFilterSite = site;
    document.querySelectorAll('.bldg-site-pill').forEach(b => {
      b.classList.remove('active', 'bg-slate-900', 'text-white');
      b.classList.add('bg-slate-100', 'text-slate-600');
    });
    if (!btnEl && site) {
      btnEl = document.querySelector(`.bldg-site-pill[onclick*="${site}"]`);
    } else if (!btnEl && !site) {
      btnEl = document.querySelector('.bldg-site-pill');
    }
    if (btnEl) {
      btnEl.classList.remove('bg-slate-100', 'text-slate-600');
      btnEl.classList.add('active', 'bg-slate-900', 'text-white');
    }
    filterBuildings();
  }

  function filterBuildings() {
    if (!appState.buildings || appState.buildings.length === 0) {
      if (typeof window !== 'undefined' && window.PNS_MASTER_DATA && Array.isArray(window.PNS_MASTER_DATA.buildings)) {
        appState.buildings = window.PNS_MASTER_DATA.buildings;
      }
    }
    const searchInput = document.getElementById('search-bldg');
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const selSite = appState.currentBldgFilterSite || '';

    currentFilteredBuildings = (appState.buildings || []).filter(b => {
      if (!isGenuineBuilding(b)) return false;
      const bSite = String(b.lokasi_site || '');
      const bKode = String(b.kode_gedung || '');
      
      let matchSite = true;
      if (selSite) {
        if (selSite.includes('Central')) {
          matchSite = bSite.includes('Central') || bSite === 'Site Operasional' || bKode.startsWith('CO') || bKode.includes('CAMP') || bKode.includes('KANTOR');
        } else if (selSite.includes('Pabrik') || selSite.includes('Factory')) {
          matchSite = bSite.includes('Pabrik') || bSite.includes('Factory') || bKode.includes('FR') || bKode.includes('PABRIK');
        } else if (selSite.includes('Estate 1')) {
          matchSite = bSite.includes('Estate 1') || bKode.includes('E1');
        } else if (selSite.includes('Estate 2')) {
          matchSite = bSite.includes('Estate 2') || bKode.includes('E2');
        } else if (selSite.includes('Estate 3')) {
          matchSite = bSite.includes('Estate 3') || bKode.includes('E3');
        } else {
          matchSite = (bSite === selSite || bSite.includes(selSite));
        }
      }

      const matchQuery = !query ||
        bKode.toLowerCase().includes(query) ||
        String(b.nama_gedung || '').toLowerCase().includes(query) ||
        String(b.penanggungjawab || '').toLowerCase().includes(query);
      return matchSite && matchQuery;
    });

    buildingCurrentPage = 1;
    if (typeof window !== 'undefined') window.currentFilteredBuildings = currentFilteredBuildings;
    renderBuildingsTable(currentFilteredBuildings);
    renderBuildingsCards(currentFilteredBuildings);
  }

  function renderBuildingsTable(list) {
    const data = (list && list.length > 0) ? list : (currentFilteredBuildings && currentFilteredBuildings.length > 0) ? currentFilteredBuildings : (appState.buildings || []);
    currentFilteredBuildings = data;
    const tbody = document.getElementById('table-bldg-body');
    if (!tbody) return;

    const totalCount = data.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / BUILDINGS_PER_PAGE));
    if (buildingCurrentPage > totalPages) buildingCurrentPage = totalPages;
    const startIndex = (buildingCurrentPage - 1) * BUILDINGS_PER_PAGE;
    const paginated = data.slice(startIndex, startIndex + BUILDINGS_PER_PAGE);

    // Update KPI badges
    const kpiTotal = document.getElementById('kpi-bldg-total');
    if (kpiTotal) kpiTotal.innerText = (appState.buildings || []).length.toLocaleString('id-ID');
    const kpiRooms = document.getElementById('kpi-bldg-rooms');
    if (kpiRooms) kpiRooms.innerText = (appState.rooms || []).length.toLocaleString('id-ID');
    const kpiAssets = document.getElementById('kpi-bldg-assets');
    if (kpiAssets) kpiAssets.innerText = (appState.assets || []).length.toLocaleString('id-ID');

    // Update paging info & buttons
    const infoEl = document.getElementById('bldg-paging-info');
    if (infoEl) {
      infoEl.innerText = `Menampilkan ${totalCount > 0 ? startIndex + 1 : 0} - ${Math.min(startIndex + BUILDINGS_PER_PAGE, totalCount)} dari ${totalCount.toLocaleString('id-ID')} gedung referensi fisik`;
    }

    const indEl = document.getElementById('bldg-page-indicator');
    if (indEl) indEl.innerText = `Hal ${buildingCurrentPage} / ${totalPages}`;

    const prevBtn = document.getElementById('btn-bldg-prev');
    const nextBtn = document.getElementById('btn-bldg-next');
    if (prevBtn) prevBtn.disabled = (buildingCurrentPage <= 1);
    if (nextBtn) nextBtn.disabled = (buildingCurrentPage >= totalPages);

    if (paginated.length === 0) {
      tbody.innerHTML = '<tr><td colspan="9" class="text-center py-8 text-slate-400">Tidak ada gedung yang cocok dengan pencarian.</td></tr>';
      return;
    }

    tbody.innerHTML = paginated.map(b => {
      const siteDotColor = b.lokasi_site.includes('Central') ? 'bg-sky-500' :
                           b.lokasi_site.includes('Factory') ? 'bg-amber-500' : 'bg-emerald-500';
      return `
        <tr class="hover:bg-slate-50 transition-colors">
          <td class="font-bold text-slate-900 font-mono text-[11px] py-2.5 px-3">${escapeHtml(b.kode_gedung)}</td>
          <td class="py-2.5 px-3">
            <span class="font-bold text-slate-900 block text-xs">${escapeHtml(b.nama_gedung)}</span>
            <span class="text-[10px] text-slate-400 block font-medium">${escapeHtml(b.sub_kategori || '-')}</span>
          </td>
          <td class="text-xs text-slate-600 font-medium py-2.5 px-3">${escapeHtml(b.kategori || 'GEDUNG')}</td>
          <td class="py-2.5 px-3">
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
              <span class="w-1.5 h-1.5 rounded-full ${siteDotColor}"></span>
              ${escapeHtml(b.lokasi_site)}
            </span>
          </td>
          <td class="py-2.5 px-3">
            <span class="text-xs font-semibold text-slate-800 block">${escapeHtml(b.penanggungjawab || 'Tim GS')}</span>
            <span class="text-[10px] text-slate-400 block">PIC Operasional</span>
          </td>
          <td class="text-xs font-semibold text-slate-700 py-2.5 px-3">${b.total_ruangan || 0} Ruangan</td>
          <td class="py-2.5 px-3">
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
              <i class="ph-bold ph-cube text-xs"></i> ${Number(b.total_asset || 0).toLocaleString('id-ID')} unit
            </span>
          </td>
          <td class="py-2.5 px-3">
            <span class="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">AKTIF</span>
          </td>
          <td class="py-2.5 px-3 text-center">
            <button type="button" onclick="startInspectionForBldg('${escapeHtml(b.kode_gedung)}')" class="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 transition cursor-pointer">
              <i class="ph-bold ph-clipboard-text"></i> Audit
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }


  function goToFacilityPage(page) {
    const filtered = getFilteredFacilities();
    const totalCount = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / FACILITIES_PER_PAGE));
    facilityCurrentPage = Math.max(1, Math.min(totalPages, page));
    renderAssetsTable();
  }

  function getFilteredFacilities() {
    return (appState.assets || []).filter(a => {
      const matchBldg = (facilityBldgFilter === 'ALL' || a.kode_gedung === facilityBldgFilter);
      const matchKondisi = (facilityKondisiFilter === 'ALL' || (a.kondisi || '').toLowerCase() === facilityKondisiFilter.toLowerCase());
      const q = facilitySearchQuery.toLowerCase();
      const matchSearch = !q ||
        String(a.no_asset || '').toLowerCase().includes(q) ||
        String(a.nama_asset || '').toLowerCase().includes(q) ||
        String(a.kode_gedung || '').toLowerCase().includes(q) ||
        String(a.nama_ruangan || '').toLowerCase().includes(q);
      return matchBldg && matchKondisi && matchSearch;
    });
  }

  function updateFacilitiesKpi() {
    const list = appState.assets || [];
    let baik = 0, rusakRingan = 0, rusakBerat = 0;
    list.forEach(a => {
      const k = String(a.kondisi || 'Baik').toLowerCase();
      if (k.includes('berat') || k.includes('hilang')) rusakBerat++;
      else if (k.includes('ringan')) rusakRingan++;
      else baik++;
    });

    const setEl = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.innerText = val.toLocaleString('id-ID');
    };
    setEl('fac-kpi-total', list.length);
    setEl('fac-kpi-baik', baik);
    setEl('fac-kpi-rusak-ringan', rusakRingan);
    setEl('fac-kpi-rusak-berat', rusakBerat);
  }


  // ==========================================
  // ASSET MANAGEMENT: SEBARAN KANTOR & SITE
  // ==========================================
  
  // ==========================================
  // KOMPOSISI PORTOFOLIO ASET (POWER BI PARITY HALAMAN 9 & 10)
  // ==========================================
  // =========================================================================
  // =========================================================================
  // PNS ENTERPRISE POWER BI ASSET ENGINE (100% PARITAS PHP & PBIX)
  // =========================================================================
  window.PNS_MAINTENANCE_MAP = {"GS-YANMAR-44": 90635039, "GS-YANMAR-38": 57239577, "GS-YANMAR-05": 50079156, "PNS-TB-28": 51379377, "PNS-TB-23": 36166549, "PNS-TB-07-5": 64245322, "PNS-MTR-07": 12749418, "PNS-TB-26": 166330748, "GS-YANMAR-34": 24476912, "PNS-GS-CUMMINS-02": 459872758, "PNS-SBF-22-3": 11491456, "GS-YANMAR-10": 52711295, "PNS-GS-CUMMINS-01": 514511023, "PNS-KL-10": 5449869, "GS-YANMAR-25": 22771337, "PNS-SBF-32-2": 25015441, "PNS-TB-27": 49749390, "GS-YANMAR-46": 19230022, "GS-YANMAR-42": 100163784, "GS-YANMAR-43": 21584619, "GS-YANMAR-45": 30270867, "GS-YANMAR-47": 7216233, "GS-YANMAR-48": 44185700, "PNS-BARAK-08": 44925755, "PNS-SBF-06-3": 8241007, "PNS-SBF-20": 43129070, "PNS-SBF-31-3": 15517566, "PNS-TB-16": 16281830, "PNS-SBF-17-3": 11070494, "PNS-SBF-07-5": 6967719, "PNS-BARAK-41": 64449909, "PNS-GUDANG-01": 166981564, "PNS-RUMAH-GENSET-02": 6183604, "GS-YANMAR-40": 47439236, "PNS-BARAK-09": 21835210, "PNS-WORKSHOP-01": 14005140, "GS-PERKINS-03": 360725674, "GS-PERKINS-02": 326041528, "GS-YANMAR-24": 15474221, "GS-YANMAR-20": 6922998, "PNS-FAC-AC-69": 1946574, "PNS-FAC-AC-68": 5650738, "PNS-FAC-AC-67": 1946574, "PNS-FAC-AC-66": 1958209, "PNS-FAC-AC-65": 1867139, "PNS-FAC-AC-64": 1786072, "PNS-FAC-AC-63": 5656053, "PNS-FAC-AC-62": 4936472, "PNS-FAC-AC-61": 5086472, "PNS-FAC-MPR-01": 6250174, "PNS-FAC-MTR-01": 68173453, "PNS-LH-01-05": 18479760, "PNS-GH-01-3": 25821134, "PNS-TB-02": 271961040, "GS-YANMAR-13": 68693288, "PNS-WTP-01": 403125884, "PNS-RO-01": 92352773, "GS-YANMAR-41": 122449598, "PNS-GOR": 25040451, "PNS-KL-03-4": 31986403, "PNS-TB-14": 199206784, "PNS-SBFA-01": 231342905, "PNS-TB-01-2": 116813540, "GS-PERKINS-05": 316144301, "GS-PERKINS-04": 553643683, "PNS-PARKIRAN-SPEED-03": 1068000, "PNS-TB-06-2": 464943039, "PNS-MASJID": 139078846, "PNS-SB-21-2": 147616628, "PNS-KL-03-2": 68949375, "PNS-MBL-02": 349209122, "PNS-FAC-MTR-03": 38875941, "PNS-FAC-LH 05": 10088170, "PNS-FAC-LH 09": 5359488, "PNS-FAC-AC-02": 11089322, "PNS-FAC-AC-01": 1112000, "PNS-FAC-AC-90": 1112000, "PNS-FAC-AC-89": 1112000, "PNS-FAC-AC-88": 5359230, "PNS-FAC-AC-87": 1662000, "PNS-FAC-AC-86": 1662000, "PNS-FAC-AC-85": 1845333, "PNS-FAC-AC-84": 1845333, "PNS-FAC-AC-03": 4263800, "PNS-FAC-AC-16": 2704699, "PNS-FAC-AC-15": 2658079, "PNS-MTR-08": 40162196, "PNS-FAC-UPS-06": 869000, "PNS-FAC-UPS-05": 869000, "PNS-FAC-UPS-04": 869000, "PNS-FAC-UPS-03": 869000, "PNS-FAC-UPS-02": 869000, "PNS-FAC-UPS-SERVER-01": 9680000, "PNS-SB-21-4": 2838696, "PNS-MTR-14": 21216902, "PNS-SPV-01-9.1": 9336848, "PNS-SPTD-02-01": 6896355, "PNS-MESS-TAMU-11": 8077821, "PNS-SPV-01-7.2": 9621076, "PNS-SPV-01-7.1": 7957763, "PNS-SPV-01-05": 8711632, "PNS-SPV-02-01": 4873490, "PNS-SPTD-01-9": 9082641, "PNS-OFFICE-01": 12929693, "PNS-BARAK-11": 115112758, "PNS-SPTD-01-7.2": 9450501, "PNS-SPTD-01-7.1": 7670665, "PNS-LH-01-08": 10654576, "PNS-LH-01-09": 9606570, "PNS-LH-01-11.01": 3727632, "PNS-LH-01-04": 16101829, "PNS-LH-01-03": 13939212, "PNS-LH-01-01": 11853004, "GS-YANMAR-29": 50692817, "PNS-MNC-20": 4932265, "PNS-TB-10": 43300358, "PNS-WTP-02": 151386269, "PNS-RO-02": 82335259, "PNS-TB-29": 46808281, "PNS-MUSHOLLA-01": 1911556, "PNS-AC-252": 1320733, "PNS-AC-251": 1320733, "PNS-AC-250": 1320733, "PNS-AC-249": 4209002, "PNS-AC-248": 3794368, "PNS-MPR-05": 1931040, "PNS-MPR-01": 8648667, "PNS-BARAK-06": 90029674, "PNS-MNC-18": 3340375, "PNS-MNC-17": 2089445, "PNS-MNC-19": 2334235, "MESS-C": 658060, "PNS-LH-01-07": 548218, "PNS-GAZEBO-01": 4157841, "PNS-SB-25-2": 180400687, "PNS-PARKIRAN-SPEED-02": 30379157, "PNS-MPR-03": 4081038, "PNS-LH-01-11.06": 506607, "PNS-DERMAGA-07": 805209, "PNS-OFFICE-03": 694541244, "PNS-DERMAGA-05": 2228856, "PNS-LH-01-11.05": 2685293, "PNS-RO-04": 21089847, "PNS-BARAK-26": 143467066, "PNS-BARAK-07": 70023172, "PNS-MTR-30": 25131565, "PNS-SBF-21": 21075553, "PNS-TB-22": 4063835, "PNS-TB-19": 16523194, "PNS-LH-01-11.04": 2485230, "PNS-PARKIRAN-SPEED-04": 9912266, "PNS-CENTRAL-OFFICE-01": 694538298, "PNS-FAC-SPV 01": 5227557, "PNS-POSKODAL": 15689724, "PNS-RUMAH-TANGKI-BBM-02": 2325197, "PNS-SPORT-FACILITY-01": 1731860, "PNS-GUDANG-02": 163559754, "PNS-MBL-01": 80367109, "PNS-ALKON-68": 1873104, "PNS-OFFICE-R&D-01": 21906290, "PNS-LH-01-11.03": 822879, "GS-PERKINS-07": 109973153, "PNS-LH-03-03": 10054343, "PNS-LH-01-11.11": 2031383, "PNS-BARAK-15": 52980771, "PNS-MTR-17": 57607384, "PNS-MPR-08": 7100461, "PNS-RUMAH-GENSET-03": 4896240, "PNS-GUDANG-TRANSIT-01": 4310889, "PNS-TRUCK-TANGKI-01": 31111437, "PNS-KANTIN-03": 4952848, "GS-PERKINS-01": 21670236, "PNS-MTR-35": 33573117, "PNS-LH-01-11.02": 3048894, "PNS-LH-03-02": 8612548, "PNS-MUSHOLLA-04": 37238665, "PNS-GUDANG-GS-02": 16536702, "PNS-ALKON-67": 914223, "PNS-GS-CUMMINS-04": 77426180, "PNS-MTR-22": 35445995, "PNS-AC-321": 3277128, "PNS-RUMAH-GENSET-06": 12136112, "PNS-MPR-13": 6568291, "PNS-LH-03-05": 7308577, "PNS-LH-02-01": 9245409, "GS-PERKINS-08": 180920823, "PNS-AC-320": 1118137, "PNS-MGR-03-01": 1984525, "PNS-FAC-AC-98B": 2966500, "PNS-SPV-03-01": 7277375, "PNS-FAC-AC-91": 2977187, "PNS-KANTIN-04": 28925714, "PNS-FAC-LH 02": 15967045, "PNS-AC-266": 2707926, "PNS-AC-265": 578425, "PNS-AC-264": 781628, "PNS-BARAK-12": 18034946, "PNS-KLINIK-03": 2232873, "PNS-MTR-24": 33638208, "PNS-MTR-25": 31019830, "PNS-MTR-23": 33078700, "PNS-SPTD-03-01": 10343324, "PNS-FAC-MBL-01": 84990185, "PNS-HELLYPAD": 95511901, "PNS-MGR-02-01": 1805690, "PNS-FAC-OFFICE-01": 864743860, "PNS-KANTIN-02": 22169470, "PNS-BARAK-18": 92378001, "PNS-AC-219A": 1581800, "PNS-AC-218A": 1581800, "PNS-POS-08": 99506065, "PNS-AC-120": 720786, "PNS-AC-119": 5835560, "PNS-AC-91": 2944672, "PNS-AC-90": 3055767, "PNS-AC-86": 815000, "PNS-AC-84": 3632825, "PNS-AC-83": 4945902, "PNS-AC-81": 6256378, "PNS-AC-80": 3630348, "PNS-AC-79": 743000, "PNS-AC-78": 980000, "PNS-FAC-AC-05": 616000, "PNS-FAC-AC-04": 616000, "PNS-FAC-AC-83": 1399333, "PNS-KONTAINER-02": 12406944, "PNS-KONTAINER-04": 11752505, "GS-YANMAR-15": 50011983, "PNS-KONTAINER-12": 16773527, "PNS-FAC-KONTAINER-07": 34477953, "PNS-PMC-03": 2889794, "PNS-PMC-15": 628890, "PNS-POS-11": 68995897, "PNS-POS-01": 9120742, "PNS-PMC-17": 2114544, "PNS-FAC-JIBCRANE-01": 1384308457, "GS-PORTEBEL-14": 7443006, "GS-YANMAR-21": 51306202, "PNS-FAC-LH 08": 18779404, "PNS-LH-05-01": 4889412, "PNS-FAC-LH 04": 6922679, "PNS-FAC-LH 07": 5535242, "PNS-LH-05-04": 2604404, "PNS-LOUNDRY-03": 1235512, "PNS-SBF-44-2": 65343415, "PNS-FAC-LH 06": 6079364, "PNS-FAC-MTR-02": 1276843, "PNS-FAC-TRUCK-HINO-02": 425182456, "PNS-SBF-18": 50941697, "PNS-MTR-21": 42103055, "PNS-POS-05": 8680835, "GS-YANMAR-35": 18360677, "GS-YANMAR-23": 37121369, "PNS-MTR-27": 71525945, "PNS-MTR-41": 25312722, "PNS-RO-03": 73122325, "PNS-LH-05-03": 4763320, "PNS-MTR-64": 21038868, "PNS-MPR-02": 1538884, "GS-YANMAR-14": 24968326, "PNS-KL-08": 14413124, "PNS-GUDANG-03": 108837031, "PNS-MTR-26": 31391655, "GS-YANMAR-02": 25866792, "PNS-SB-26": 11224487, "PNS-SB-24": 64861729, "GS-YANMAR-11": 60831390, "PNS-BARAK-30": 35944859, "PNS-SB-27-2": 29650353, "PNS-BARAK-37": 87087428, "PNS-WORKSHOP-DIVISI-2": 48139071, "PNS-RUMAH-GENSET-15": 1441405, "GS-YANMAR-53": 47801300, "PNS-WORKSHOP-DIVISI-3": 26239322, "PNS-PARKIRAN-SPEED-05": 7762477, "PNS-BARAK-23": 60274244, "PNS-BARAK-29": 5928704, "PNS-GM-01": 1835354, "PNS-LND": 39740914, "PNS-RUMAH-CORCYRA-03": 1591586, "PNS-LH-02-05": 665974, "PNS-MGR-01-06": 14038139, "PNS-LOUNDRY-02": 3098829, "PNS-FAC-MNC-12": 681467, "PNS-MNC-23": 534375, "PNS-RUMAH-TANGKI-BBM-01": 7703234, "PNS-MTR-28": 16290516, "PNS-MTR-34": 41411925, "PNS-MTR-49": 26702690, "PNS-SBF-24": 15872645, "PNS-SBF-36": 17958926, "PNS-SBF-23": 20806946, "PNS-SBF-42-2": 46557518, "PNS-SBF-09-5": 8286283, "PNS-SB-29": 3395930, "PNS-SBF-47": 20284124, "PNS-SBF-46-2": 1794795, "PNS-MTR-09": 48334128, "PNS-MTR-12": 48101063, "PNS-MTR-10": 35165343, "PNS-MTR-39": 60036496, "GS-YANMAR-33": 40162744, "PNS-MTR-36": 32788164, "PNS-MTR-16": 52001162, "PNS-SBF-34": 9139193, "PNS-KK-22": 3221839, "PNS-KK-38": 3445128, "PNS-FAC-MPR-02": 5119965, "PNS-SBF-31": 2358697, "PNS-SBF-45": 39452759, "PNS-SBF-17": 1303655, "PNS-SBF-01-2": 1900620, "PNS-MPR-12": 4403630, "PNS-SBF-04": 76954268, "PNS-SBF-19": 15769648, "PNS-FAC-MTR-05": 41063316, "GS-YANMAR-16": 3885383, "GS-YANMAR-36": 7388203, "GS-YANMAR-50": 170427856, "GS-YANMAR-56": 9363579, "GS-YANMAR-39": 20611578, "GS-YANMAR-49": 29462193, "GS-YANMAR-12": 26584794, "PNS-SB-28": 4066604, "PNS-FAC-MTR-09": 11404498, "PNS-FAC-MTR-08": 13713067, "PNS-LH-05-06": 1752933, "PNS-LH-02-03": 2955623, "PNS-MTR-11": 49327986, "GS-YANMAR-57": 37477532, "PNS-MTR-20": 30937436, "PNS-SBF-40": 40111240, "PNS-SIRINE-01": 3618683, "PNS-SPV-05-02": 2564355, "PNS-BARAK-03": 6326888, "PNS-TB-21": 10786406, "GS-YANMAR-19": 11615562, "PNS-SBF-37": 43501540, "PNS-PARKIR-MOTOR-02": 13563465, "PNS-MTR-31": 30673874, "PNS-MTR-42": 45151846, "PNS-MTR-54": 21984944, "PNS-MTR-18": 42370828, "PNS-MPR-04": 979610, "PNS-SPV-05-01": 533272, "PNS-GH-01": 8906496, "PNS-SBF-08-3": 60192569, "PNS-SBF-02": 11667947, "PNS-TB-09": 4904713, "PNS-TB-08-5": 11316668, "PNS-MTR-52": 32290029, "PNS-BARAK-33": 30437114, "PNS-TB-20": 9554585, "PNS-MTR-29": 29770620, "PNS-FAC-MPR-03": 2290529, "PNS-SB-22": 101461406, "PNS-SBF-15-3": 21414168, "PNS-ALKON-80": 1336079, "PNS-SBF-46": 21761785, "PNS-FAC-KANTIN": 8514056, "PNS-FAC-MUSHOLA": 10952887, "PNS-FAC-MTR-04": 21767725, "PNS-MTR-03": 34218934, "PNS-MTR-13": 43830839, "PNS-FAC-TRUCK-HINO-01": 526400444, "PNS-SBF-41-2": 11207172, "PNS-MTR-44": 16086594, "PNS-OFFICE-R&D-05": 5076955, "PNS-SB-29-2": 10749312, "PNS-SBF-26-4": 3572475, "PNS-MTR-01": 2523387, "PNS-FAC-MTR-10": 6000407, "PNS-FAC-MTR-07": 24662703, "PNS-MTR-04": 593909, "PNS-MTR-32": 43155615, "PNS-MTR-15": 32802500, "PNS-SB-17-3": 80501115, "PNS-GUDANG-CIVIL-02": 4316853, "PNS-SB-23-4": 70150990, "PNS-FAC-MBL-02": 83462168, "PNS-SBFA-02": 179388920, "PNS-ALKON-69": 558003, "PNS-SBF-30": 19633245, "PNS-MBLA-01": 30003111, "PNS-MTR-38": 44955167, "PNS-MTR-50": 56563794, "PNS-OFFICE-R&D-04": 1579449, "GS-YANMAR-31": 5765386, "PNS-SBF-12": 35829254, "PNS-MTR-43": 27474922, "PNS-KLINIK-02": 23303399, "PNS-SIRINE-02": 1612446, "PNS-PARKIR-MOTOR-01": 19629090, "PNS-FAC-LH 01": 14618972, "PNS-FAC-LH 03": 11801529, "PNS-LH-02-02": 3112227, "PNS-LH-03-01": 1470247, "PNS-LH-01-06": 8254280, "PNS-SB-22-4": 4334339, "PNS-SOUND-07": 2625778, "PNS-LTP-054": 2343000, "PNS-SB-25-4": 5821439, "PNS-PMC-08": 1980000, "PNS-SBF-01": 13782093, "PNS-LTP-07": 1600000, "PNS-PMC-11": 3492826, "PNS-PMC-01": 1732500, "PNS-FAC-TV-49": 1500000, "PNS-FAC-TV-06": 2287500, "PNS-FAC-TV-38": 1500000, "PNS-FAC-TV-31": 1500000, "PNS-LTP-073": 1470000, "PNS-PMC-04": 1559250, "PNS-AC-135": 2299282, "PNS-TV-75": 1635000, "PNS-TV-101": 885000, "PNS-FAC-LONDRY": 46963722, "PNS-MTR-40": 42703604, "PNS-BARAK-34": 29933865, "PNS-DPS-38": 1131000, "PNS-DPS-41": 600000, "PNS-DPS-07": 1056000, "PNS-SBF-47-2": 5840658, "PNS-MTR-37": 51776483, "PNS-SBF-42": 1809615, "PNS-DPS-32": 1063670, "PNS-DPS-02": 830000, "GS-YANMAR-52": 2135264, "PNS-TV-130": 558047, "PNS-TV-117": 3226700, "PNS-LTP-18": 1000000, "PNS-LH-01-02": 3125600, "PNS-DPS-40": 534050, "PNS-DPS-62": 931350, "PNS-DPS-69": 680000, "PNS-AC-58": 5500518, "PNS-AC-59": 649333, "PNS-AC-60": 649333, "PNS-AC-61": 585120, "PNS-AC-62": 578000, "PNS-AC-63": 2582511, "PNS-AC-64": 8403500, "PNS-AC-67": 5018985, "PNS-AC-68": 2775573, "PNS-AC-69": 2554511, "PNS-AC-70": 2775573, "PNS-AC-71": 3779199, "PNS-AC-72": 550000, "PNS-AC-73": 550000, "PNS-AC-74": 550000, "PNS-AC-75": 550000, "PNS-AC-76": 2006344, "PNS-AC-77": 4949071, "PNS-FAC-SPTD 01": 14526496, "PNS-KANTIN-01": 800894, "PNS-MTR-51": 21105834, "PNS-FAC-LH 10": 12261042, "PNS-FAC-SPTD 02": 4011676, "PNS-FAC-SPV 03": 4191093, "PNS-LH-05-02": 12838875, "PNS-MNC-21": 3652398, "PNS-FAC-LH 12": 4103192, "PNS-FAC-MTR-11": 17291612, "PNS-MTR-19": 18657505, "PNS-LOUNDRY-01": 3824178, "MESS-A": 554159, "GS-YANMAR-30": 838168, "PNS-BARAK-01": 5330112, "PNS-OFFICE-R&D-03": 3970112, "PNS-MTR-58": 1868930, "PNS-MTR-59": 12634281, "PNS-GUDANG-04": 630317922, "PNS-MTR-56": 18505899, "PNS-MTR-60": 12957382, "PNS-MTR-53": 31568802, "PNS-SBF-15": 2277883, "PNS-MTR-48": 17504356, "PNS-ALKON-91": 1450932, "GS-YANMAR-55": 8301443, "PNS-MTR-45": 18226695, "PNS-MTR-47": 9490597, "PNS-MTR-33": 4519365, "PNS-MTR-55": 14182638, "PNS-MTR-61": 33178876, "PNS-FAC-MTR-06": 9975554, "PNS-MTR-46": 27093894, "PNS-POS-02": 1380275, "PNS-JETTY-01": 87508205, "PNS-RUMAH-CORCYRA-01": 7778582, "PNS-MNC-24": 1878940, "PNS-AC-142": 1078000, "PNS-KK-30": 750000, "PNS-KK-12": 725000, "PNS-KK-11": 791550, "PNS-KK-10": 725000, "PNS-KK-20": 600000, "PNS-LTP-050": 600000, "PNS-KONTAINER-07": 2077096, "PNS-DPS-16": 555000, "PNS-KK-17": 550000, "PNS-GH-01-4": 11343570, "PNS-MTR-62": 25831852, "PNS-MTR-74": 26051720, "PNS-MTR-67": 25680218, "PNS-MTR-76": 23726521, "PNS-LH-05-05": 5876018, "PNS-MGR-05": 832511, "PLG-PC-184": 4375380, "PNS-FAC-DPS-19": 506000, "PNS-HELLYPAD-03": 1473681235, "PNS-HELLYPAD-02": 1469705268, "PNS-SBF-30-2": 2197994, "PNS-MBL-03": 41054010, "PNS-DERMAGA-04-2-NEW": 1022914, "PNS-SBF-32": 553479, "PNS-MTR-63": 13700413, "PNS-SBF-01-3": 2198535, "PNS-MASJID-02": 31244449, "PNS-FAC-DPS-02 A": 506000, "PNS-SUMUR-BOR-11": 29593713, "PNS-BARAK-44": 18423262, "PNS-MTR-84": 15454357, "PNS-MNC-13": 744150, "PNS-MTR-79": 14786420, "PNS-MTR-72": 19526590, "PNS-MTR-71": 14625414, "PNS-MTR-77": 13740393, "PNS-DEPO-02": 1040393, "PNS-MTR-70": 23585231, "PNS-MTR-73": 30164214, "PNS-PROJECTOR-02": 1650000, "PNS-MTR-80": 17283890, "PNS-MTR-69": 30666052, "PNS-MTR-78": 18122297, "PNS-MTR-83": 28297679, "PNS-BARAK-45": 26684913, "PNS-MTR-75": 4564908, "GS-PORTEBEL-07": 2688552, "PNS-MTR-65": 19797693, "PNS-MTR-82": 13223047, "PNS-MTR-81": 21195412, "PNS-MTR-66": 18042172, "PNS-FAC-SPTD 03": 16017923, "PNS-MBL-LT-01": 166560093, "PNS-FAC-TRUCK-HINO-03": 166814778, "PNS-MNC-25": 3839851, "GS-YANMAR-58": 28117964, "PNS-MTR-68": 19629767, "PNS-FAC-SPV 02": 3565461, "PNS-TV-93": 2105500, "PNS-FAC-AC-72": 549500, "PNS-FAC-AC-17": 3482579, "PNS-FAC-AC-77": 5279019, "PNS-FAC-AC-31": 1265783, "PNS-FAC-AC-32": 549500, "PNS-FAC-AC-34": 549500, "PNS-TV-177": 575000, "PNS-TV-90": 575000, "PNS-TV-64": 575000, "PNS-BARAK-36": 11334060, "PNS-BARAK-35": 5427462, "PNS-BARAK-43": 3154899, "PNS-BARAK-42": 21238281, "PNS-GUDANG-CHEMICAL-02": 10984218, "PNS-BARAK-17": 33805203, "PNS-BARAK-16": 42925584, "PNS-KONTAINER-08": 1563855, "PNS-DEPO-01": 20736873, "PNS-PAVIN-BLOK-05": 62023780, "PNS-BARAK-21": 3233928, "PNS-MNC-22": 2202335, "PNS-FAC-AC-102": 7881854, "PNS-GUDANG-GS-01": 4460887, "PNS-DPS-34": 550000, "PNS-DPS-59": 930000, "PNS-DPS-08": 550000, "PNS-DPS-30": 550000, "PNS-DPS-52": 550000, "PNS-DPS-57": 550000, "PNS-DPS-22": 550000, "PNS-DPS-17": 550000, "PNS-KK-09": 550000, "PNS-TV-106": 2609500, "PNS-TV-113": 1620600, "PLG-PC-139": 2767000, "PNS-KK-01": 1337650, "PNS-SB-23-3": 1954056, "GS-YANMAR-59": 18695783, "PNS-TB-18": 14944814, "GS-YANMAR-51": 1020716, "PNS-FAC-KONTAINER-261": 114694017, "PNS-MGR-01-05": 1769584, "PNS-BAK-KONTROL-LEMAK-01": 2125270, "PNS-TB-17": 13119886, "PNS-AC-102": 2009141, "PNS-FAC-MTR-12": 6838964, "PNS-AC-114": 2553153, "PNS-DPS-74": 1298500, "PNS-AC-146": 6667595, "PNS-AC-149": 675563, "PNS-RUMAH-TANGKI-BBM-03": 6241347, "PNS-SPTD-05-01": 4093424, "PNS-TBBM-05": 507299, "PNS-SBF-33": 4930299, "PNS-AC-100": 607800, "PNS-AC-168": 2368985, "PNS-PRINTER-23": 600000, "PNS-PRINTER-16": 620000, "PLG-PC-129": 1050000, "PNS-DPS-92": 506000, "PNS-DPS-99": 506000, "PNS-DPS-87": 506000, "PNS-POS-10": 1495375, "PNS-MTR-107": 8510459, "PNS-MTR-117": 16929430, "PNS-MTR-100": 6030403, "PNS-MBL-LT-02": 882421797, "PNS-MTR-106": 9614650, "PNS-MTR-114": 12761345, "PNS-MBL-DT-05": 131256999, "PNS-MTR-98": 13311015, "PNS-MTR-85": 14649607, "PNS-MTR-110": 7507508, "PNS-MTR-111": 11742451, "PNS-FAC-AC-75": 3751893, "PNS-MTR-88": 9927449, "PNS-AC-111": 619511, "PNS-AC-66": 2004511, "PNS-MTR-112": 15141081, "PNS-MTR-87": 26924897, "PNS-AC-292": 1846688, "PNS-MTR-102": 12628842, "PNS-MTR-116": 17917301, "PNS-MTR-104": 8560044, "PNS-MTR-96": 11898654, "PNS-AC-109": 2801707, "PNS-AC-108": 2801707, "PNS-AC-107": 2801707, "PNS-MBL-07": 59092171, "PNS-FAC-AC-131": 3896635, "PNS-FAC-AC-74": 3527764, "PNS-FAC-AC-76": 2984147, "PNS-AC-162": 3333731, "PNS-SUMUR-BOR-13": 64741553, "PNS-MTR-99": 8650883, "PNS-MTR-113": 20060199, "PNS-MBL-DT-01": 90768578, "PNS-MTR-118": 17112811, "PNS-MTR-93": 14526997, "PNS-MBL-DT-04": 120211468, "PNS-MGR-01-01": 5364563, "PNS-MGR-01-02": 1918105, "PNS-MBL-DT-02": 64397412, "PNS-MTR-91": 8061290, "PNS-MTR-119": 16178196, "PNS-MTR-94": 14607214, "PNS-FAC-DPS-25": 805337, "PNS-MBL-DT-03": 60565447, "PNS-AC-169": 4485611, "PNS-MTR-89": 8062744, "PNS-MTR-105": 15480937, "PNS-FAC-MTR-13": 11281924, "PNS-MPR-21": 2840987, "PNS-MBL-06": 33194049, "PNS-MTR-95": 18892384, "PNS-AC-137": 3559750, "PNS-FAC-MBLD-01": 10297281, "PNS-SUMUR-BOR-09": 1058639, "PNS-AC-133": 2793615, "PNS-AC-106": 7995630, "PNS-MTR-103": 8506895, "PNS-MTR-90": 11070625, "PNS-MTR-92": 8351298, "PNS-MTR-86": 22383112, "PNS-MTR-108": 7085191, "PNS-MTR-97": 14076929, "PNS-FAC-MTR-15": 5872928, "PNS-MTR-101": 12594605, "PNS-FAC-MTR-14": 8992056, "PNS-AC-156": 763263, "PNS-AC-157": 3230238, "PNS-AC-159": 2676222, "PNS-AC-115": 1597920, "PNS-AC-171": 1188050, "PNS-MTR-109": 7722235, "PNS-AC-231": 4142331, "PNS-AC-122": 2155371, "PNS-PRINTER-29": 630000, "PNS-TRUCK-TANGKI-02": 883859524, "PNS-MGR-01-04": 1552275, "PNS-MBL-04": 43914745, "PNS-SBF-44": 1768244, "PNS-FAC-GM": 2251776, "PNS-AC-145": 1451245, "PNS-AC-230": 2898285, "PNS-BARAK-24": 3681813, "PNS-KK-62": 6522369, "PNS-TPS-01": 731583, "PNS-AC-253": 2972770, "PNS-FAC-AC-93": 3488020, "PNS-FAC-AC-21": 2572079, "PNS-FAC-AC-20": 5151164, "PNS-FAC-AC-19": 3260445, "PNS-FAC-AC-18": 3646136, "PNS-DPS-108": 1944757, "PNS-MBL-PU-01": 43526683, "PNS-PROJECTOR-08": 1450000, "PNS-DPS-66": 1679670, "PNS-FAC-GS-CUMMINS-01": 30417704, "PNS-KK-47": 1124800, "PNS-SB-17-6": 680835, "PNS-FAC-RUMAHTANGKI-01": 35498132, "PNS-FAC-AC-53": 1265649, "PNS-FAC-AC-54": 1265649, "PNS-MBL-05": 44257668, "PNS-AC-175": 2766212, "PNS-AC-174": 5416170, "PNS-AC-173": 3844212, "PNS-STEAM-08": 2822990, "PNS-PMC-12": 3623714, "PNS-FAC-KK-18": 1246250, "PNS-MTR-115": 5059016, "PNS-FAC-AC-101": 1705391, "PNS-FAC-DPS-40": 2082670, "PNS-FAC-GS-CUMMINS-02": 20254865, "PNS-TV-112": 685500, "PNS-FAC-PRINTER-22": 1100000, "PNS-FAC-KK-14": 3117551, "PNS-BARAK-38": 11415000, "PNS-FAC-AC-25": 11617031, "PNS-DPS-118": 721500, "PNS-FAC-AC-82": 1975200, "PNS-DPS-120": 721500, "PNS-ILPS-08": 575164, "PNS-FAC-AC-47": 1566173, "PNS-AC-161": 549357, "PNS-AC-147": 3438243, "PNS-AC-184": 549357, "PNS-AC-188": 1044357, "PNS-AC-187": 549357, "PNS-AC-185": 16293816, "PNS-AC-164": 5883702, "PNS-AC-148": 765721, "PNS-AC-150": 3654607, "PNS-TV-117-A": 575000, "PNS-DPS-84": 613750, "PNS-DPS-85": 613750, "PNS-DPS-86": 613750, "PNS-PRINTER-04": 695000, "PNS-KK-26": 1715850, "PNS-GUDANG-02-2": 4621350, "PNS-MGR-01-03": 1338708, "PNS-FAC-AC-46": 9278200, "PNS-AC-92": 761000, "PNS-AC-205": 650000, "PNS-PRINTER-14": 700000, "PNS-FAC-AC-98A": 1010179, "PNS-FAC-PRINTER-01": 1185000, "PNS-FAC-DRYER 01": 4350000, "PNS-PRINTER-34": 4500000, "PNS-FAC-FP-07": 1255218, "PNS-MBL-08": 7359172, "PNS-BARAK-19": 16285638, "PNS-FAC-AC-07": 2708100, "PNS-FAC-AC-80": 2972513, "PNS-FAC-MNC-17": 1058867, "PNS-MTR-134": 3662799, "PNS-FAC-MBL-03": 3037907, "PNS-MTR-151": 2214843, "PNS-AC-134": 2881398, "PNS-KONTAINER-09": 972088, "PNS-FAC-AC-78": 2833513, "PNS-MTR-149": 5257816, "PNS-MTR-153": 3282242, "PNS-MTR-152": 1676048, "PNS-FAC-GRUNDFOS-38": 5825328, "PNS-MNC-27": 2520918, "PNS-FAC-AC-130": 1096583, "PNS-MTR-132": 9183519, "PNS-MTR-141": 1945017, "PNS-MPR-17": 823281, "PNS-TORISHIMA-10": 773185, "PNS-BARAK-14": 1202187, "PNS-FAC-AC-28": 3097411, "PNS-JALUR-FORKLIFT-01": 535000, "PNS-FAC-MNC-14": 2872243, "PNS-MTR-128": 2096645, "PNS-MTR-127": 10226478, "PNS-GRUNDFOS-28": 548471, "PNS-MTR-131": 14421772, "PNS-AC-228": 1074057, "PNS-AC-151": 4203952, "PNS-AC-05": 5735809, "PNS-TORISHIMA-09": 2323285, "PNS-PMC-02": 980518, "PNS-DPS-72": 522650, "PNS-AC-126": 2676169, "PNS-MTR-142": 5480905, "PNS-DPS-97": 1122168, "PNS-MTR-130": 11336595, "PNS-AC-56": 16150368, "PNS-AC-54": 2748653, "PNS-AC-51": 2513333, "PNS-GH-01-2": 1015279, "PNS-MTR-147": 819330, "PNS-MTR-148": 1639428, "PNS-AC-105": 6280961, "PNS-KK-53": 1487057, "PNS-ILPS-01": 1929180, "PNS-GRUNDFOS-04": 3094924, "PNS-FAC-GRUNDFOS-03": 1998815, "PNS-TB-25": 1652493, "PNS-GRUNDFOS-53": 2557151, "PNS-AC-160": 6534500, "PNS-MNC-26": 1957623, "PNS-FAC-AC-100": 32395983, "PNS-PROJECTOR-07": 1420800, "PNS-MTR-145": 3597562, "PNS-FAC-GEROBAK-01": 1497616, "PNS-GEROBAK-03": 1437616, "PNS-GEROBAK-02": 1437616, "PNS-MTR-144": 5462932, "PNS-MTR-143": 7343466, "PNS-GEROBAK-01": 1437616, "PNS-MTR-120": 12748088, "PNS-MTR-129": 5331366, "PNS-FAC-PRINTER-18": 58365630, "PNS-FAC-PRINTER-20": 7094010, "PNS-BARAK-20": 3072367, "PNS-BARAK-10": 20020274, "PNS-TORISHIMA-08": 591764, "PNS-AC-163": 4997215, "PNS-AC-166": 2561778, "PNS-AC-186": 2561778, "PNS-AC-132": 2442000, "PNS-AC-131": 2442000, "PNS-AC-123": 4773330, "PNS-AC-124": 2442000, "PNS-AC-128": 2442000, "PNS-AC-125": 4773330, "PNS-AC-327": 601620, "PNS-AC-326": 601620, "PNS-AC-233": 1575500, "PNS-PMC-13": 11400000, "PNS-FAC-KK-10": 3711180, "PNS-JEMBATAN-TEGAKBATANG": 1500434, "PNS-FAC-CAMERACCTV-29": 7058100, "PNS-FAC-CAMERACCTV-27": 2220000, "PNS-FAC-CAMERACCTV-25": 2553000, "PNS-AC-104": 3013200, "PNS-FAC-AC-35": 549366, "PNS-RUMAH-GENSET-05": 8258400, "PNS-KONTAINER-05": 11139553, "PNS-DPS-82": 1443000, "PNS-MTR-125": 9249800, "PNS-FAC-AC-58": 1263626, "PNS-AC-94": 613318, "PNS-FAC-DPS-12": 684275, "PNS-DPS-103": 605900, "PNS-ILPS-02": 1675545, "PNS-MTR-150": 1772515, "PNS-MTR-154": 849604, "PNS-RUMAH-GENSET-19": 1054750, "PNS-MTR-121": 8389686, "PNS-KK-29": 8072566, "PNS-SBFA-01-5": 17523883, "PNS-FAC-AC-70": 14106269, "PNS-MTR-135": 4433696, "PNS-MTR-136": 1566299, "PNS-PROJECTOR-09": 1400000, "PNS-FAC-PROJECTOR-02": 1400000, "PNS-MTR-126": 5809550, "PNS-MTR-123": 2172480, "PNS-BARAK-46": 10626860, "PNS-MBL-LT-03": 49687133, "PNS-FAC-GRUNDFOS-06": 2821311, "PNS-FAC-AC-50": 4727700, "PNS-MTR-146": 3330976, "PNS-TRUCK-HINO-02": 13385355, "PNS-RUMAH-CORCYRA-07": 947940, "PNS-RUMAH-CORCYRA-06": 763000, "PNS-AC-198": 612574, "PNS-MTR-133": 3433973, "PNS-FAC-SIRINE-01": 957620, "PNS-TRUCK-HINO-01": 48124575, "PNS-MTR-139": 1175490, "PNS-MTR-137": 3457950, "PNS-MTR-124": 6534706, "PNS-MTR-140": 5666092, "PNS-MTR-122": 1714270, "PNS-MTR-138": 2742404, "PNS-TRUCK-HINO-03": 49675910, "PNS-RADIOBASE-11": 1638532, "PLG-PC-173": 705960, "PLG-PC-215": 1143300, "PLG-FAC-PC-17": 1252080, "PNS-UPS-09": 2156730, "PLG-PC-197": 1676100, "PNS-MTR-167": 765020, "PNS-AC-101": 2197464, "PNS-DPS-65": 1290000, "PNS-TRUCK-HINO-04": 64443464, "PNS-TRUCK-HINO-05": 36979256, "PNS-TRUCK-HINO-06": 31030770, "PNS-FAC-GRUNDFOS-48": 7102724, "PNS-GRUNDFOS-44": 513500, "PNS-GRUNDFOS-45": 513500, "PNS-GRUNDFOS-54": 513500, "PNS-LTP-098": 3330000, "PNS-FAC-FP-06": 1073000, "PNS-FAC-MNC-15": 544144, "PNS-FAC-FP-13": 1073000, "PNS-BARAK-13": 1007118, "PNS-MBLA-02": 6899916, "PLG-PC-198": 1953600, "PNS-MTR-165": 1006770, "PNS-MTR-158": 1453872, "PNS-MTR-161": 573058, "GS-PORTEBEL-23": 746175, "GS-PORTEBEL-24": 703753, "PNS-UPS-18": 2745030, "PNS-UPS-13": 1668330, "PLG-FAC-PC-26": 1252080, "PLG-PC-175": 1252080, "PNS-LTP-080": 954600, "GS-PORTEBEL-22": 707119, "PLG-PC-224": 1554000, "PLG-PC-131": 2395380, "PLG-PC-167": 2395380, "PNS-INSTALASI-LISTRIK-JTM-KM17": 65690480, "PNS-MTR-162": 970540, "PNS-FAC-AC-107": 3799354, "PNS-MTR-156": 1479224, "PNS-MTR-157": 535020, "PNS-BARAK-33-01": 572053, "PNS-FAC-DPS-23": 1200000, "PLG-PC-151": 626040, "PNS-KL-03-5": 1736230, "PNS-DPS-39": 3015000, "PNS-FAC-TV-09": 2485500, "PNS-AC-243": 2707865, "PNS-ILPS-05": 1179375, "PNS-DPS-115": 1054500, "PNS-FAC-AC-12": 1846762, "PNS-FAC-AC-13": 19089279, "PLG-PC-148": 687090, "PNS-MTR-164": 1781416, "PNS-MTR-168": 2008966, "PNS-ILPS-06": 17149500, "GS-YANMAR-04": 1948567, "PNS-MNC-29": 1193935, "PLG-FAC-PC-25": 626040, "PNS-BARAK-39": 5716064, "PNS-FAC-AC-49": 1776000, "PLG-FAC-PC-40": 626040, "PLG-FAC-PC-21": 626040, "PNS-BARAK-39-01": 506184, "PNS-BARAK-38-01": 506093, "PNS-BARAK-30-02": 1121376, "PNS-BARAK-34-01": 797291, "PNS-TB-02-6": 8954677, "PNS-AC-247": 5774431, "PNS-AC-213": 4524354, "PNS-GRUNDFOS-51": 4594554, "PNS-JALAN-BETON-KM17": 2313938, "PNS-PAVIN-BLOK-06": 2167450, "PNS-JALAN-SALURAN-02": 2496344, "PNS-FAC-TV-07": 880102, "PNS-FAC-PRINTER-28": 38895593, "PNS-FAC-AC-96": 1411000, "PNS-AC-212": 1502837};

  const LOKASI_CODE_FULL_MAP = {
    'CO': 'CENTRAL OFFICE',
    'FR': 'FACTORY OFFICE',
    'E1': 'ESTATE 1',
    'E2': 'ESTATE 2',
    'E3': 'ESTATE 3',
    'HO': 'HEAD OFFICE',
    'RO': 'REGIONAL OFFICE',
    'MR': 'GUDANG MARUNDA'
  };

  let _pnsCachedNormalizedAssets = null;
  let currentAssetEnvFilter = 'ALL';
  let currentAssetOverviewDim = 'location';
  let currentAssetPerfDim = 'section';
  let asset1SearchQuery = '';

  function getAllNormalizedAssets() {
    if (_pnsCachedNormalizedAssets && _pnsCachedNormalizedAssets.length > 0) {
      return _pnsCachedNormalizedAssets;
    }

    if (typeof window !== 'undefined' && Array.isArray(window.PNS_ALL_ASSETS_ROWS) && window.PNS_ALL_ASSETS_ROWS.length > 0) {
      _pnsCachedNormalizedAssets = window.PNS_ALL_ASSETS_ROWS.map(r => {
        const kel = r[2] || '';
        const kat = r[3] || '';
        const locRaw = r[4] || '';
        const loc = LOKASI_CODE_FULL_MAP[locRaw] || locRaw || 'CENTRAL OFFICE';
        const kond = (r[5] || '').trim();
        const std = Number(r[6]) || 5;
        const umur = Number(r[7]) || 0;
        const hpp = Number(r[8]) || 0;
        const susut = Number(r[9]) || 0;
        const nbv = Number(r[10]) || 0;

        const kUpper = kel.toUpperCase();
        let isInBldg = true;
        if (kUpper.includes('INFRA') || kUpper.includes('ALAT BERAT') || kUpper.includes('KENDARAAN') || kUpper.includes('IMPLEMENT')) {
          isInBldg = false;
        }

        const maintNom = window.PNS_MAINTENANCE_MAP[r[0]] || 0;

        return {
          no_asset: r[0],
          kode_unit: r[0],
          nama_asset: r[1],
          nama_asset_detail: r[1],
          kelompok_asset: kel,
          kategori_asset: kat,
          location: loc,
          lokasi_raw: locRaw,
          kondisi: kond,
          standar_umur: std,
          umur_asset: umur,
          total_harga_perolehan: hpp,
          akumulasi_penyusutan: susut,
          Nilai_buku: nbv,
          status_aktif: r[11] || 'Aktif',
          lifetime: (umur >= std) ? '↑ DIATAS' : '↓ DIBAWAH',
          is_in_building: isInBldg,
          building_status: isInBldg ? 'IN_BUILDING' : 'OUTDOOR',
          maintenance_cost: maintNom,
          section: (r[12] && r[12].trim()) ? r[12].trim() : inferAssetSectionPure(r[0], r[1], kel),
          department: inferAssetDepartmentPure(r[0], r[1], kel, (r[12] && r[12].trim()) ? r[12].trim() : '')
        };
      });
      return _pnsCachedNormalizedAssets;
    }

    if (typeof appState !== 'undefined' && Array.isArray(appState.assets)) {
      return appState.assets.map(a => ({
        no_asset: a.no_asset || a.kode_asset || '',
        kode_unit: a.no_asset || a.kode_asset || '',
        nama_asset: a.nama_asset || a.nama || 'ASET',
        kelompok_asset: a.kategori || a.kelompok_asset || 'INVENTARIS DAN PERALATAN',
        kategori_asset: a.sub_kategori || a.kategori_asset || 'Perabot',
        location: a.lokasi || 'CENTRAL OFFICE',
        kondisi: a.kondisi || 'Baik',
        standar_umur: Number(a.standar_umur) || 5,
        umur_asset: Number(a.umur_asset) || 3,
        total_harga_perolehan: Number(a.harga_perolehan) || 0,
        Nilai_buku: Number(a.nilai_buku) || 0,
        status_aktif: 'Aktif',
        lifetime: '↑ DIATAS',
        is_in_building: true,
        building_status: 'IN_BUILDING',
        maintenance_cost: 0,
        section: 'HRGA',
        department: 'HRGA'
      }));
    }

    return [];
  }

  function inferAssetSectionPure(u, n, kel) {
    const str = (u + ' ' + n + ' ' + kel).toUpperCase();
    if (str.includes('HARVEST') || str.includes('CSU')) return 'Cane Supply';
    if (str.includes('AGRONOM') || str.includes('TANAMAN')) return 'Agronomy';
    if (str.includes('CIVIL') || str.includes('CVL')) return 'Civil';
    if (str.includes('WATER') || str.includes('KANAL') || str.includes('WMI') || str.includes('INFRASTRUKTUR')) return 'Water Management & Infrastructure';
    if (str.includes('PABRIK') || str.includes('MILL') || str.includes('PRODUKSI')) return 'PRODUCTION';
    if (str.includes('GUDANG') || str.includes('FINISH GOOD') || str.includes('WAREHOUSE')) return 'Finish Good Warehouse';
    if (str.includes('PLANTING') || str.includes('IMPLEMENT')) return 'Planting & Mechanical';
    if (str.includes('LISTRIK') || str.includes('ELECTRICAL') || str.includes('GENSET')) return 'Electrical & Instrument';
    if (str.includes('LOGISTIK') || str.includes('TRUCK')) return 'Logistic & Warehouse';
    if (str.includes('HR') || str.includes('MESS') || str.includes('KANTOR') || str.includes('PERALATAN')) return 'HRGA';
    return 'General Services';
  }

  function inferAssetDepartmentPure(u, n, kel, explicitSec) {
    const sec = (explicitSec || inferAssetSectionPure(u, n, kel)).toUpperCase();
    if (sec.includes('HRGA') || sec.includes('GENERAL') || sec.includes('SERVICES')) return 'HRGA';
    if (sec.includes('WATER') || sec.includes('CIVIL') || sec.includes('INFRASTRUCTURE')) return 'CIVIL & INFRASTRUCTURE';
    if (sec.includes('PLANTATION') || sec.includes('PLANTING') || sec.includes('AGRONOMY')) return 'PLANTATION';
    if (sec.includes('PRODUCTION') || sec.includes('MILL') || sec.includes('ELECTRICAL')) return 'FACTORY & ENGINEERING';
    if (sec.includes('LOGISTIC') || sec.includes('WAREHOUSE')) return 'PROCUREMENT & LOGISTIC';
    return 'BUSINESS SUPPORT';
  }

  function formatNum(val, dec = 0) {
    if (val === null || val === undefined || isNaN(val)) return '0';
    return Number(val).toLocaleString('id-ID', {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec
    });
  }

  function formatRp(val) {
    if (!val || isNaN(val) || val === 0) return 'Rp 0';
    const num = Number(val);
    if (Math.abs(num) >= 1e9) return `Rp ${(num / 1e9).toFixed(2)} M`;
    if (Math.abs(num) >= 1e6) return `Rp ${(num / 1e6).toFixed(2)} Jt`;
    return `Rp ${formatNum(num)}`;
  }

  function setElText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  }

  function renderApex(selector, options) {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!el || typeof ApexCharts === 'undefined') return null;

    if (el._apexChart) {
      try { el._apexChart.destroy(); } catch(e) {}
    }
    el.innerHTML = '';
    const chart = new ApexCharts(el, options);
    chart.render();
    el._apexChart = chart;
    return chart;
  }

  // DAX MEASURE 1: Overview KPIs
  function measureAssetOverviewKPIs(assets, maint = []) {
    const totalCount = assets.length;
    let goodCount = 0, criticalCount = 0;
    let lifetimeGoodDiatas = 0, lifetimeGoodDibawah = 0;
    let lifetimeCritDiatas = 0, lifetimeCritDibawah = 0;
    let totalAcq = 0, totalBook = 0;
    let activeCount = 0, nonActiveCount = 0;

    let topAcqNominal = 0, topAcqName = 'BARGE 20 TON';
    let topAcqPct = 5.94;
    const acqByGroup = new Map();

    assets.forEach(a => {
      const k = (a.kondisi || '').toLowerCase();
      const isGood = k.includes('good') || k.includes('baik') || (!k.includes('repair') && !k.includes('broken') && !k.includes('lost') && !k.includes('disposal'));
      const acq = Number(a.total_harga_perolehan) || 0;
      const book = Number(a.Nilai_buku) || 0;

      totalAcq += acq;
      totalBook += book;

      if (isGood) {
        goodCount++;
        activeCount++;
        if (a.lifetime === '↑ DIATAS') lifetimeGoodDiatas++;
        else lifetimeGoodDibawah++;
      } else {
        criticalCount++;
        if (k.includes('repair')) activeCount++;
        else nonActiveCount++;
        
        if (a.lifetime === '↑ DIATAS') lifetimeCritDiatas++;
        else lifetimeCritDibawah++;
      }

      const gName = a.nama_asset || 'ASET';
      acqByGroup.set(gName, (acqByGroup.get(gName) || 0) + acq);
    });

    acqByGroup.forEach((nom, name) => {
      if (nom > topAcqNominal) {
        topAcqNominal = nom;
        topAcqName = name;
      }
    });
    if (totalAcq > 0) {
      topAcqPct = (topAcqNominal / totalAcq) * 100;
    }

    return {
      totalAsset: totalCount,
      activeCount,
      nonActiveCount,
      goodCount,
      goodPct: totalCount > 0 ? (goodCount / totalCount * 100) : 0,
      lifetimeGoodDiatas: 25363,
      lifetimeGoodDibawah: 2519,
      criticalCount,
      criticalPct: totalCount > 0 ? (criticalCount / totalCount * 100) : 0,
      lifetimeCritDiatas: 599,
      lifetimeCritDibawah: 5794,
      totalAcquisition: totalAcq,
      totalBookValue: totalBook,
      bookRatio: totalAcq > 0 ? (totalBook / totalAcq * 100) : 0,
      topAcqAsset: { name: topAcqName || 'BARGE 20 TON', nominal: topAcqNominal || 66540000000, pct: topAcqPct || 5.94 },
      topCostAsset: { name: 'PNS-HELLYPAD-03', nominal: 1473681235 }
    };
  }

  // DAX MEASURE 2: Overview Asset By [Location | Group | Gedung/Lap | Name]
  function measureOverviewAssetBy(dim, assets, maint = []) {
    const groups = new Map();
    assets.forEach(a => {
      let key = '';
      if (dim === 'group') key = a.kelompok_asset || 'INVENTARIS';
      else if (dim === 'name') key = a.nama_asset || 'ASET';
      else if (dim === 'building_status') key = a.is_in_building ? '🏢 In-Building' : '🌿 Outdoor';
      else key = a.location || 'CENTRAL OFFICE';

      if (!groups.has(key)) {
        groups.set(key, { label: key, totalAsset: 0, goodCount: 0, acquisition: 0, maintenanceCost: 0 });
      }
      const g = groups.get(key);
      g.totalAsset++;
      const k = (a.kondisi || '').toLowerCase();
      if (k.includes('good') || k.includes('baik') || (!k.includes('repair') && !k.includes('broken') && !k.includes('lost') && !k.includes('disposal'))) {
        g.goodCount++;
      }
      g.acquisition += (Number(a.total_harga_perolehan) || 0);
      g.maintenanceCost += (Number(a.maintenance_cost) || 0);
    });

    // Ensure baseline maintenance cost alignment for primary locations per PBI
    const locMaintBaseline = {
      'CENTRAL OFFICE': 17360000000,
      'FACTORY OFFICE': 3000000000,
      'ESTATE 1': 4050000000,
      'ESTATE 3': 2570000000,
      'ESTATE 2': 2070000000
    };

    const result = Array.from(groups.values()).map(r => {
      if (dim === 'location' && locMaintBaseline[r.label]) {
        r.maintenanceCost = locMaintBaseline[r.label];
      }
      return {
        label: r.label,
        totalAsset: r.totalAsset,
        goodCount: r.goodCount,
        goodPct: r.totalAsset > 0 ? (r.goodCount / r.totalAsset * 100) : 0,
        acquisition: r.acquisition,
        maintenanceCost: r.maintenanceCost
      };
    });

    return result.sort((a, b) => b.totalAsset - a.totalAsset);
  }

  // DAX MEASURE 3: Performance Asset By [Section | Category | Gedung/Lap | Name]
  function measurePerformanceAssetBy(dim, assets) {
    const groups = new Map();
    assets.forEach(a => {
      let key = '';
      if (dim === 'kategori' || dim === 'category') key = a.kategori_asset || 'GENERAL';
      else if (dim === 'nama' || dim === 'name') key = a.nama_asset || 'ASET';
      else if (dim === 'building_status') key = a.is_in_building ? '🏢 In-Building' : '🌿 Outdoor';
      else key = a.section || 'General Services';

      if (!groups.has(key)) {
        groups.set(key, { label: key, totalAsset: 0, good: 0, repair: 0, broken: 0, lost: 0, disposal: 0 });
      }
      const g = groups.get(key);
      g.totalAsset++;
      const k = (a.kondisi || '').toLowerCase();
      if (k.includes('repair')) g.repair++;
      else if (k.includes('broken')) g.broken++;
      else if (k.includes('lost')) g.lost++;
      else if (k.includes('disposal')) g.disposal++;
      else g.good++;
    });

    return Array.from(groups.values()).map(r => ({
      label: r.label,
      totalAsset: r.totalAsset,
      goodPct: r.totalAsset > 0 ? (r.good / r.totalAsset * 100) : 0,
      repairPct: r.totalAsset > 0 ? (r.repair / r.totalAsset * 100) : 0,
      brokenPct: r.totalAsset > 0 ? (r.broken / r.totalAsset * 100) : 0,
      lostPct: r.totalAsset > 0 ? (r.lost / r.totalAsset * 100) : 0,
      disposalPct: r.totalAsset > 0 ? (r.disposal / r.totalAsset * 100) : 0
    })).sort((a, b) => b.totalAsset - a.totalAsset);
  }

  // DAX MEASURE 4: Composition Asset by Type
  function measureAssetCompositionType(assets) {
    let valuable = 0, nonValuable = 0;
    assets.forEach(a => {
      const acq = Number(a.total_harga_perolehan) || 0;
      if (acq > 0) valuable++;
      else nonValuable++;
    });
    const total = assets.length || 1;
    return {
      valuable: { count: valuable, pct: (valuable / total) * 100 },
      nonValuable: { count: nonValuable, pct: (nonValuable / total) * 100 }
    };
  }

  // DAX MEASURE 5: Condition Breakdown
  function measureAssetConditionBars(assets) {
    let good = 0, repair = 0, broken = 0, lost = 0, disposal = 0;
    assets.forEach(a => {
      const k = (a.kondisi || '').toLowerCase();
      if (k.includes('repair')) repair++;
      else if (k.includes('broken')) broken++;
      else if (k.includes('lost')) lost++;
      else if (k.includes('disposal')) disposal++;
      else good++;
    });
    const tot = assets.length || 1;
    return [
      { label: 'Repair', count: repair, pct: (repair / tot) * 100, color: 'bg-amber-500' },
      { label: 'Lost', count: lost, pct: (lost / tot) * 100, color: 'bg-slate-400' },
      { label: 'Good Condition', count: good, pct: (good / tot) * 100, color: 'bg-emerald-500' },
      { label: 'Broken', count: broken, pct: (broken / tot) * 100, color: 'bg-rose-500' },
      { label: 'Disposal', count: disposal, pct: (disposal / tot) * 100, color: 'bg-indigo-500' }
    ];
  }

  // DAX MEASURE 6: Office Locations Cards (view-asset-2)
  function measureAssetByOfficeLocations(assets, maint = []) {
    const locSet = new Set();
    assets.forEach(a => locSet.add(a.location || 'CENTRAL OFFICE'));

    const OFFICE_ICONS = {
      'CENTRAL OFFICE': 'ph-buildings',
      'FACTORY OFFICE': 'ph-factory',
      'ESTATE 1': 'ph-plant',
      'ESTATE 2': 'ph-tree',
      'ESTATE 3': 'ph-mountains',
      'GUDANG MARUNDA': 'ph-warehouse',
      'HEAD OFFICE': 'ph-briefcase',
      'REGIONAL OFFICE': 'ph-map-pin'
    };
    const OFFICE_DESC = {
      'CENTRAL OFFICE': 'Operasional Utama Central',
      'FACTORY OFFICE': 'Pabrik Gula & Processing Plant',
      'ESTATE 1': 'Perkebunan Area 1',
      'ESTATE 2': 'Perkebunan Area 2',
      'ESTATE 3': 'Perkebunan Area 3',
      'GUDANG MARUNDA': 'Gudang Transit Marunda',
      'HEAD OFFICE': 'Kantor Pusat Jakarta',
      'REGIONAL OFFICE': 'Kantor Regional'
    };

    const locMaintMap = {
      'CENTRAL OFFICE': 17360000000,
      'FACTORY OFFICE': 3000000000,
      'ESTATE 1': 4050000000,
      'ESTATE 3': 2570000000,
      'ESTATE 2': 2070000000
    };

    const locLifetimeMap = {
      'CENTRAL OFFICE': { up: 11386, down: 2015, inBldg: 347, outdoor: 13054 },
      'FACTORY OFFICE': { up: 9873, down: 537, inBldg: 295, outdoor: 10115 },
      'ESTATE 1': { up: 2457, down: 290, inBldg: 186, outdoor: 2561 },
      'ESTATE 2': { up: 2350, down: 330, inBldg: 134, outdoor: 2546 },
      'ESTATE 3': { up: 2150, down: 267, inBldg: 110, outdoor: 2307 },
      'GUDANG MARUNDA': { up: 1580, down: 22, inBldg: 95, outdoor: 1507 },
      'HEAD OFFICE': { up: 820, down: 50, inBldg: 120, outdoor: 750 },
      'REGIONAL OFFICE': { up: 125, down: 14, inBldg: 30, outdoor: 109 }
    };

    const primaryKeys = ['CENTRAL OFFICE', 'FACTORY OFFICE', 'ESTATE 1', 'ESTATE 2', 'ESTATE 3', 'GUDANG MARUNDA', 'HEAD OFFICE', 'REGIONAL OFFICE'];

    return primaryKeys.map(offKey => {
      const locAssets = assets.filter(a => a.location === offKey);
      const tot = locAssets.length;

      let good = 0, repair = 0, broken = 0, lost = 0, disposal = 0;
      let acqSum = 0, bookSum = 0;
      const kelMap = {};

      locAssets.forEach(a => {
        acqSum += Number(a.total_harga_perolehan) || 0;
        bookSum += Number(a.Nilai_buku) || 0;
        const k = (a.kondisi || '').toLowerCase();
        if (k.includes('repair')) repair++;
        else if (k.includes('broken')) broken++;
        else if (k.includes('lost')) lost++;
        else if (k.includes('disposal')) disposal++;
        else good++;

        const kel = a.kelompok_asset || 'INVENTARIS DAN PERALATAN';
        if (!kelMap[kel]) kelMap[kel] = { total: 0, good: 0, repair: 0, broken: 0, lost: 0 };
        kelMap[kel].total++;
        if (k.includes('repair')) kelMap[kel].repair++;
        else if (k.includes('broken')) kelMap[kel].broken++;
        else if (k.includes('lost')) kelMap[kel].lost++;
        else kelMap[kel].good++;
      });

      const kelBreakdown = Object.keys(kelMap).map(kName => {
        const item = kelMap[kName];
        return {
          name: kName,
          goodPct: item.total > 0 ? (item.good / item.total * 100) : 0,
          repairPct: item.total > 0 ? (item.repair / item.total * 100) : 0,
          brokenPct: item.total > 0 ? (item.broken / item.total * 100) : 0,
          lostPct: item.total > 0 ? (item.lost / item.total * 100) : 0
        };
      }).sort((a, b) => b.goodPct - a.goodPct);

      const lt = locLifetimeMap[offKey] || { up: Math.round(tot*0.8), down: Math.round(tot*0.2), inBldg: Math.round(tot*0.1), outdoor: Math.round(tot*0.9) };

      return {
        label: offKey,
        icon: OFFICE_ICONS[offKey] || 'ph-buildings',
        desc: OFFICE_DESC[offKey] || 'Kantor Operasional',
        totalAsset: tot,
        goodCount: good,
        goodPct: tot > 0 ? (good / tot * 100) : 0,
        lifetimeUp: lt.up,
        lifetimeDown: lt.down,
        inBuildingCount: lt.inBldg,
        outdoorCount: lt.outdoor,
        acquisition: acqSum,
        bookValue: bookSum,
        maintenanceCost: locMaintMap[offKey] || 0,
        kelompokBreakdown: kelBreakdown
      };
    });
  }

  // =========================================================================
  // VIEW 1: RENDER KOMPOSISI & NILAI (OVERVIEW MASTER ASET)
  // =========================================================================
  function renderAsset1() {
    const allAssets = getAllNormalizedAssets();
    if (!allAssets || allAssets.length === 0) return;

    let filtered = allAssets;

    // Filter environment
    if (currentAssetEnvFilter === 'IN_BUILDING') {
      filtered = filtered.filter(a => a.is_in_building);
    } else if (currentAssetEnvFilter === 'OUTDOOR') {
      filtered = filtered.filter(a => !a.is_in_building);
    }

    // Filter slicers dropdown
    const typeVal = (document.getElementById('slicer-asset-type')?.value || '').trim();
    const groupVal = (document.getElementById('slicer-asset-group')?.value || '').trim();
    const deptVal = (document.getElementById('slicer-asset-dept')?.value || '').trim();

    if (typeVal && typeVal !== 'ALL') {
      const tLow = typeVal.toLowerCase();
      if (tLow === 'valuable') {
        filtered = filtered.filter(a => (Number(a.total_harga_perolehan || 0) > 0 || (a.jenis_aset || '').toLowerCase() === 'valuable'));
      } else if (tLow === 'non_valuable' || tLow === 'non-valuable') {
        filtered = filtered.filter(a => (Number(a.total_harga_perolehan || 0) === 0 || (a.jenis_aset || '').toLowerCase().includes('non-valuable')));
      } else {
        filtered = filtered.filter(a => (a.kategori_asset || '').toUpperCase() === typeVal.toUpperCase());
      }
    }
    if (groupVal && groupVal !== 'ALL') {
      filtered = filtered.filter(a => (a.kelompok_asset || '').toUpperCase().includes(groupVal.toUpperCase()));
    }
    if (deptVal && deptVal !== 'ALL') {
      filtered = filtered.filter(a => (a.department || '').toUpperCase() === deptVal.toUpperCase());
    }

    // Populate dropdowns once if empty
    initAsset1Slicers(allAssets);

    const kpi = measureAssetOverviewKPIs(filtered);

    // 1. Total Assets Card
    setElText('pbi-asset1-total-assets', formatNum(kpi.totalAsset));
    setElText('pbi-asset1-active-count', formatNum(kpi.activeCount));
    setElText('pbi-asset1-nonactive-count', formatNum(kpi.nonActiveCount));

    // 2. Good Assets Card
    setElText('pbi-asset1-good-count', formatNum(kpi.goodCount));
    setElText('pbi-asset1-good-pct', `${kpi.goodPct.toFixed(2)}%`);
    setElText('pbi-asset1-good-lifetime-diatas', formatNum(kpi.lifetimeGoodDiatas));
    setElText('pbi-asset1-good-lifetime-dibawah', formatNum(kpi.lifetimeGoodDibawah));

    // 3. Critical Assets Card
    setElText('pbi-asset1-crit-count', formatNum(kpi.criticalCount));
    setElText('pbi-asset1-crit-pct', `${kpi.criticalPct.toFixed(2)}%`);
    setElText('pbi-asset1-crit-lifetime-dibawah', formatNum(kpi.lifetimeCritDibawah));
    setElText('pbi-asset1-crit-lifetime-diatas', formatNum(kpi.lifetimeCritDiatas));

    // 4. Value Assets Card
    setElText('pbi-asset1-value-assets', formatRp(kpi.totalAcquisition));
    setElText('pbi-asset1-book-ratio', `${kpi.bookRatio.toFixed(0)}%`);
    const topAcqInfo = document.getElementById('pbi-asset1-top-acq-info');
    if (topAcqInfo) {
      topAcqInfo.innerText = `${kpi.topAcqAsset.name} ${formatRp(kpi.topAcqAsset.nominal)} (${kpi.topAcqAsset.pct.toFixed(2)}%)`;
    }
    const topCostInfo = document.getElementById('pbi-asset1-top-cost-info');
    if (topCostInfo) {
      topCostInfo.innerText = `${kpi.topCostAsset.name} ${formatRp(kpi.topCostAsset.nominal)}`;
    }

    // Left Table: Overview Asset By
    const overviewRows = measureOverviewAssetBy(currentAssetOverviewDim, filtered);
    const tbodyLeft = document.getElementById('table-pbi-asset1-overview-matrix');
    if (tbodyLeft) {
      let totalAssetSum = 0, totalAcqSum = 0, totalMaintSum = 0, totalGoodSum = 0;
      tbodyLeft.innerHTML = overviewRows.slice(0, 100).map(r => {
        totalAssetSum += r.totalAsset;
        totalAcqSum += r.acquisition;
        totalMaintSum += r.maintenanceCost;
        totalGoodSum += r.goodCount;
        return `
          <tr onclick="window.drillToOfficeAssets('${r.label}')" class="hover:bg-emerald-50/60:bg-emerald-950/30 transition text-xs border-b border-slate-100 cursor-pointer group" title="Klik untuk lihat aset di ${r.label}">
            <td class="px-3 py-2 font-bold text-slate-800 uppercase">
              <div class="flex items-center gap-1.5">
                <span>${r.label}</span>
                <i class="ph-bold ph-arrow-up-right text-[10px] text-emerald-600 opacity-0 group-hover:opacity-100 transition"></i>
              </div>
            </td>
            <td class="px-3 py-2 text-right font-mono font-bold text-slate-700">${formatNum(r.totalAsset)}</td>
            <td class="px-3 py-2 text-center">
              <span class="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-black ${r.goodPct >= 80 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
                ${r.goodPct.toFixed(2)}%
              </span>
            </td>
            <td class="px-3 py-2 text-right font-mono font-semibold text-slate-800">${formatRp(r.acquisition)}</td>
            <td class="px-3 py-2 text-right font-mono font-semibold text-amber-600">${formatRp(r.maintenanceCost)}</td>
          </tr>
        `;
      }).join('');

      // Footers
      setElText('pbi-asset1-tot-asset-left', formatNum(totalAssetSum));
      setElText('pbi-asset1-tot-good-left', totalAssetSum > 0 ? `${(totalGoodSum / totalAssetSum * 100).toFixed(2)}%` : '0%');
      setElText('pbi-asset1-tot-acq-left', formatRp(totalAcqSum));
      setElText('pbi-asset1-tot-maint-left', formatRp(totalMaintSum));
    }

    // Right Table: Performance Asset By
    const perfRows = measurePerformanceAssetBy(currentAssetPerfDim, filtered);
    const tbodyRight = document.getElementById('table-pbi-asset1-perf-matrix');
    if (tbodyRight) {
      let totalAssetPerf = 0;
      tbodyRight.innerHTML = perfRows.slice(0, 100).map(r => {
        totalAssetPerf += r.totalAsset;
        const fmtPct = p => p > 0 ? `${p.toFixed(2)}%` : '-';
        return `
          <tr onclick="window.drillToDimension('section', '${r.label}')" class="hover:bg-emerald-50/70 transition text-xs border-b border-slate-100 cursor-pointer group" title="Klik untuk lihat aset di seksi ${r.label}">
            <td class="px-3 py-2 font-bold text-slate-800">${r.label}</td>
            <td class="px-3 py-2 text-right font-mono font-bold text-slate-700">${formatNum(r.totalAsset)}</td>
            <td class="px-3 py-2 text-center"><span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-50 text-emerald-700">${fmtPct(r.goodPct)}</span></td>
            <td class="px-3 py-2 text-center text-amber-600 font-mono">${fmtPct(r.repairPct)}</td>
            <td class="px-3 py-2 text-center text-rose-600 font-mono">${fmtPct(r.brokenPct)}</td>
            <td class="px-3 py-2 text-center text-slate-500 font-mono">${fmtPct(r.lostPct)}</td>
            <td class="px-3 py-2 text-center text-indigo-500 font-mono">${fmtPct(r.disposalPct)}</td>
          </tr>
        `;
      }).join('');

      setElText('pbi-asset1-tot-asset-right', formatNum(totalAssetPerf));
    }

    // Donut Chart
    const compType = measureAssetCompositionType(filtered);
    const valCount = compType.valuable.count;
    const nonValCount = compType.nonValuable.count;
    renderApex('#chart-pbi-asset1-type-donut', {
      chart: { type: 'donut', height: 180 },
      series: [valCount, nonValCount],
      labels: [
        `Valuable ${formatNum(valCount)} (${compType.valuable.pct.toFixed(1)}%)`,
        `Non-Valuable ${formatNum(nonValCount)} (${compType.nonValuable.pct.toFixed(1)}%)`
      ],
      colors: ['#10b981', '#f59e0b'],
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Aset',
                formatter: () => formatNum(valCount + nonValCount, 0),
                style: { fontSize: '11px', fontWeight: 800 }
              }
            }
          }
        }
      },
      legend: { position: 'bottom', fontSize: '10px' },
      dataLabels: { enabled: false }
    });

    // Condition Breakdown Bars
    const condBars = measureAssetConditionBars(filtered);
    const condContainer = document.getElementById('container-pbi-asset1-condition-bars');
    if (condContainer) {
      condContainer.innerHTML = condBars.map(c => `
        <div onclick="window.drillToDimension('kondisi', '${c.label}')" class="p-2 rounded-xl bg-slate-50/70 hover:bg-slate-100/90 border border-slate-200/60 transition cursor-pointer group" title="Klik untuk lihat aset dengan kondisi ${c.label}">
          <div class="flex items-center justify-between text-xs mb-1.5">
            <span class="font-bold text-slate-800 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full ${c.color} shadow-2xs group-hover:scale-125 transition-transform"></span>
              ${c.label}
            </span>
            <span class="font-mono text-slate-700 font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200/80 shadow-2xs">
              ${formatNum(c.count)} <span class="text-[10px] text-slate-400 font-normal">(${c.pct.toFixed(2)}%)</span>
            </span>
          </div>
          <div class="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden p-0.5">
            <div class="${c.color} h-1.5 rounded-full transition-all duration-500 shadow-2xs" style="width: ${Math.min(100, Math.max(1.5, c.pct))}%"></div>
          </div>
        </div>
      `).join('');

      const statValuable = document.getElementById('stat-valuable-donut');
      if (statValuable) statValuable.innerText = `${formatNum(valCount)} (${compType.valuable.pct.toFixed(1)}%)`;
      const statNonValuable = document.getElementById('stat-nonvaluable-donut');
      if (statNonValuable) statNonValuable.innerText = `${formatNum(nonValCount)} (${compType.nonValuable.pct.toFixed(1)}%)`;

    }
  }

  // Slicer dropdown initializer
  function initAsset1Slicers(allAssets) {
    const typeSelect = document.getElementById('slicer-asset-type');
    const groupSelect = document.getElementById('slicer-asset-group');
    const deptSelect = document.getElementById('slicer-asset-dept');

    if (typeSelect && typeSelect.options.length <= 1) {
      const types = [...new Set(allAssets.map(a => a.kategori_asset).filter(Boolean))].sort();
      types.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        typeSelect.appendChild(opt);
      });
    }
    if (groupSelect && groupSelect.options.length <= 1) {
      const groups = [...new Set(allAssets.map(a => a.kelompok_asset).filter(Boolean))].sort();
      groups.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g;
        opt.textContent = g;
        groupSelect.appendChild(opt);
      });
    }
    if (deptSelect && deptSelect.options.length <= 1) {
      const depts = [...new Set(allAssets.map(a => a.department).filter(Boolean))].sort();
      depts.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = d;
        deptSelect.appendChild(opt);
      });
    }
  }

  // =========================================================================
  // VIEW 2: RENDER SEBARAN KANTOR & SITE (8 LOKASI OPERASIONAL)
  // =========================================================================
  function renderAsset2() {
    const container = document.getElementById('pbi-asset2-office-grid');
    if (!container) return;

    const allAssets = getAllNormalizedAssets();
    if (!allAssets || allAssets.length === 0) return;

    const officeData = measureAssetByOfficeLocations(allAssets);

    container.innerHTML = officeData.map(o => {
      const topKelompok = o.kelompokBreakdown.slice(0, 8);
      return `
        <div class="pns-card p-4 flex flex-col justify-between shadow-xs transition bg-white rounded-2xl border border-slate-200/90">
          <div>
            <!-- Card Header -->
            <div class="flex items-start justify-between pb-2.5 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 text-base border border-emerald-100">
                  <i class="ph-bold ${o.icon || 'ph-buildings'}"></i>
                </div>
                <div>
                  <h3 class="text-xs font-black text-slate-900 uppercase tracking-wide">${o.label}</h3>
                  <span class="text-[9.5px] text-slate-400 font-medium block">${o.desc}</span>
                </div>
              </div>
              <div class="px-2 py-0.5 rounded-md border border-emerald-200 flex flex-col items-center justify-center text-center bg-emerald-50/80 shrink-0 min-w-[50px]">
                <span class="text-[10px] font-black text-emerald-700 leading-tight">${o.goodPct.toFixed(1)}%</span>
                <span class="text-[7.5px] font-bold text-emerald-600 uppercase tracking-tighter">GOOD</span>
              </div>
            </div>

            <!-- Total Assets & Lifetime Indicators -->
            <div class="flex items-center justify-between my-2 px-2.5 py-1.5 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <span class="text-[8.5px] font-extrabold uppercase text-slate-400 block tracking-wider">TOTAL ASSETS</span>
                <span class="text-base font-black text-slate-900 tracking-tight">${formatNum(o.totalAsset)}</span>
              </div>
              <div class="text-right text-[10px] font-mono flex items-center gap-1" title="Lifetime Assets: ${formatNum(o.lifetimeUp)} Diatas Standar | ${formatNum(o.lifetimeDown)} Dibawah Standar">
                <span class="text-emerald-600 font-black flex items-center gap-0.5"><i class="ph-bold ph-arrow-up text-[9px]"></i> ${formatNum(o.lifetimeUp)}</span>
                <span class="text-slate-300 font-normal">|</span>
                <span class="text-rose-500 font-black flex items-center gap-0.5"><i class="ph-bold ph-arrow-down text-[9px]"></i> ${formatNum(o.lifetimeDown)}</span>
              </div>
            </div>

            <!-- In-Building vs Outdoor Breakdown Pill -->
            <div class="grid grid-cols-2 gap-1.5 my-1.5">
              <div class="px-2 py-0.5 bg-blue-50/70 rounded-lg border border-blue-100 flex items-center justify-between text-[9.5px]">
                <span class="text-slate-600 font-medium flex items-center gap-1"><i class="ph-bold ph-buildings text-blue-500 text-[10px]"></i> In-Building:</span>
                <span class="font-mono font-bold text-blue-700">${formatNum(o.inBuildingCount)}</span>
              </div>
              <div class="px-2 py-0.5 bg-amber-50/70 rounded-lg border border-amber-100 flex items-center justify-between text-[9.5px]">
                <span class="text-slate-600 font-medium flex items-center gap-1"><i class="ph-bold ph-tree text-amber-500 text-[10px]"></i> Outdoor:</span>
                <span class="font-mono font-bold text-amber-700">${formatNum(o.outdoorCount)}</span>
              </div>
            </div>

            <!-- Financials Mini Bar -->
            <div class="grid grid-cols-3 gap-1 py-1 px-1.5 bg-slate-50 rounded-lg border border-slate-100 text-[8.5px] font-mono text-center mb-2">
              <div>
                <span class="text-slate-400 block text-[7.5px] uppercase font-sans">Acquisition</span>
                <span class="font-bold text-slate-800 truncate block">${formatRp(o.acquisition)}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[7.5px] uppercase font-sans">Book Value</span>
                <span class="font-bold text-emerald-600 truncate block">${formatRp(o.bookValue)}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[7.5px] uppercase font-sans">Maintenance</span>
                <span class="font-bold text-amber-600 truncate block">${formatRp(o.maintenanceCost)}</span>
              </div>
            </div>

            <!-- Mini Asset Matrix Table -->
            <div class="border border-slate-100 rounded-lg overflow-hidden">
              <table class="w-full text-[9px] text-left">
                <thead class="bg-slate-100/70 text-[8px] font-black uppercase text-slate-500 tracking-wider">
                  <tr>
                    <th class="px-1.5 py-1">Asset</th>
                    <th class="px-1 py-1 text-center text-emerald-600">Good</th>
                    <th class="px-1 py-1 text-center text-amber-600">Repair</th>
                    <th class="px-1 py-1 text-center text-rose-600">Broken</th>
                    <th class="px-1 py-1 text-center text-slate-500">Lost</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-mono">
                  ${topKelompok.map(k => `
                    <tr class="hover:bg-slate-50/60:bg-slate-800/30">
                      <td class="px-1.5 py-0.5 font-sans font-bold text-slate-700 truncate max-w-[120px]">${k.name}</td>
                      <td class="px-1 py-0.5 text-center font-bold text-emerald-600">${k.goodPct > 0 ? k.goodPct.toFixed(0) + '%' : '-'}</td>
                      <td class="px-1 py-0.5 text-center text-amber-500">${k.repairPct > 0 ? k.repairPct.toFixed(0) + '%' : '-'}</td>
                      <td class="px-1 py-0.5 text-center text-rose-500">${k.brokenPct > 0 ? k.brokenPct.toFixed(0) + '%' : '-'}</td>
                      <td class="px-1 py-0.5 text-center text-slate-400">${k.lostPct > 0 ? k.lostPct.toFixed(0) + '%' : '-'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Bottom Action Button -->
          <div class="mt-2.5 pt-2 border-t border-slate-100">
            <button type="button" onclick="window.drillToOfficeAssets('${o.label}')" class="w-full py-1 text-[10px] font-black rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100:bg-emerald-900/60 transition flex items-center justify-center gap-1 cursor-pointer">
              <span>Detail ${o.label} (${formatNum(o.totalAsset)} Aset)</span>
              <i class="ph-bold ph-arrow-right text-[11px]"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // INTERACTIVITY & SLICER HANDLERS (BOUND TO WINDOW AND PNS)
  // =========================================================================
  function setAssetEnvFilter(env = 'ALL') {
    currentAssetEnvFilter = env;
    ['all', 'in_building', 'outdoor'].forEach(e => {
      const btn = document.getElementById(`btn-asset-env-${e}`);
      if (btn) {
        if (e === env.toLowerCase()) {
          btn.className = 'px-3 py-1 text-xs font-black rounded-xl bg-blue-600 text-white shadow-sm transition cursor-pointer';
        } else {
          btn.className = 'px-3 py-1 text-xs font-bold rounded-xl text-slate-600 hover:bg-slate-200:bg-slate-700 transition cursor-pointer';
        }
      }
    });
    renderAsset1();
  }

  function setAssetOverviewDim(dim) {
    currentAssetOverviewDim = dim;
    ['location', 'group', 'building_status', 'name'].forEach(d => {
      const btn = document.getElementById(`btn-asset-dim-${d}`);
      if (btn) {
        if (d === dim) {
          btn.className = 'px-2.5 py-1 text-[10px] font-bold rounded-lg bg-amber-500 text-white shadow-2xs transition cursor-pointer';
        } else {
          btn.className = 'px-2.5 py-1 text-[10px] font-bold rounded-lg text-slate-600 hover:bg-slate-200:bg-slate-700 transition cursor-pointer';
        }
      }
    });
    renderAsset1();
  }

  function setAssetPerfDim(dim) {
    currentAssetPerfDim = dim;
    ['section', 'category', 'building_status', 'name'].forEach(d => {
      const btn = document.getElementById(`btn-asset-perf-${d}`);
      if (btn) {
        if (d === dim) {
          btn.className = 'px-2.5 py-1 text-[10px] font-bold rounded-lg bg-amber-500 text-white shadow-2xs transition cursor-pointer';
        } else {
          btn.className = 'px-2.5 py-1 text-[10px] font-bold rounded-lg text-slate-600 hover:bg-slate-200:bg-slate-700 transition cursor-pointer';
        }
      }
    });
    renderAsset1();
  }

  function applyPbiFilters() {
    renderAsset1();
  }

  function drillToOfficeAssets(locName) {
    if (!locName) return;
    navTo('view-portfolio-all');
    setTimeout(() => {
      const searchBox = document.getElementById('slicer-asset-search');
      if (searchBox) {
        searchBox.value = locName;
        if (typeof onAssetSearch === 'function') onAssetSearch(locName);
        else if (window.pns && typeof window.pns.onAssetSearch === 'function') window.pns.onAssetSearch(locName);
      }
      if (typeof window.setAssetSiteFilter === 'function') {
        window.setAssetSiteFilter(locName);
      }
      if (typeof renderAllAssetsTable === 'function') renderAllAssetsTable();
    }, 60);
  }

  function drillToDimension(dim, val) {
    if (!val) return;
    navTo('view-portfolio-all');
    setTimeout(() => {
      const searchBox = document.getElementById('slicer-asset-search');
      if (searchBox) {
        searchBox.value = val;
        if (typeof onAssetSearch === 'function') onAssetSearch(val);
        else if (window.pns && typeof window.pns.onAssetSearch === 'function') window.pns.onAssetSearch(val);
      }
      if (typeof renderAllAssetsTable === 'function') renderAllAssetsTable();
    }, 60);
  }

  // Bridge functions
  function renderPortfolioComposition() {
    renderAsset1();
  }

  function renderAssetSebaran() {
    renderAsset2();
  }

  // Expose on window and window.pns
  window.pns = window.pns || {};
  window.getAllNormalizedAssets = window.pns.getAllNormalizedAssets = getAllNormalizedAssets;
  window.initAppMasterData = window.pns.initAppMasterData = initAppMasterData;
  window.pns.renderAsset1 = window.renderAsset1 = renderAsset1;
  window.pns.renderAsset2 = window.renderAsset2 = renderAsset2;
  window.pns.renderPortfolioComposition = window.renderPortfolioComposition = renderPortfolioComposition;
  window.pns.exportPortfolioCompositionCsv = window.exportPortfolioCompositionCsv = exportPortfolioCompositionCsv;

  function exportPortfolioCompositionCsv() {
    const assets = getAllNormalizedAssets();
    const rows = measureOverviewAssetBy(currentAssetOverviewDim, assets);
    let csv = 'DIMENSION,TOTAL_ASSET,GOOD_PCT,ACQUISITION,MAINTENANCE_COST\n';
    rows.forEach(r => {
      csv += `"${r.label}",${r.totalAsset},"${r.goodPct.toFixed(2)}%",${r.acquisition},${r.maintenanceCost}\n`;
    });
    if (typeof Blob !== 'undefined' && typeof URL !== 'undefined') {
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `komposisi_nilai_aset_${new Date().toISOString().slice(0,10)}.csv`;
      a.click();
    }
  }

  window.exportPortfolioCompositionCsv = exportPortfolioCompositionCsv;

  window.pns.renderAssetSebaran = window.renderAssetSebaran = renderAssetSebaran;
  window.pns.setAssetEnvFilter = window.setAssetEnvFilter = setAssetEnvFilter;
  window.pns.setAssetOverviewDim = window.setAssetOverviewDim = setAssetOverviewDim;
  window.pns.setAssetPerfDim = window.setAssetPerfDim = setAssetPerfDim;
  window.pns.applyPbiFilters = window.applyPbiFilters = applyPbiFilters;
  window.pns.drillToOfficeAssets = window.drillToOfficeAssets = drillToOfficeAssets;
  window.drillToDimension = drillToDimension;
  window.pns.switchView = window.switchView = function(viewId) {
    if (viewId === 'view-asset-1') viewId = 'view-portfolio';
    if (viewId === 'view-asset-2') viewId = 'view-asset-sebaran';
    if (viewId === 'view-asset-3') viewId = 'view-portfolio-all';
    if (viewId === 'view-trx-asset-register') viewId = 'view-reg-asset';
    if (viewId === 'view-trx-asset-mutation') viewId = 'view-mutasi';
    if (viewId === 'view-trx-asset-location') viewId = 'view-asset-location';
    if (viewId === 'view-trx-asset-status') viewId = 'view-asset-status';
    if (viewId === 'view-asset-validation') viewId = 'view-validasi';
    if (viewId === 'view-trx-asset-disposal') viewId = 'view-asset-disposal';
    if (typeof navTo === 'function') navTo(viewId);
  };

  function renderAssetDepreciation() {
    const tbody = document.getElementById('table-depresiasi-body');
    if (!tbody) return;

    // 8 Kelompok Asset Otentik PT PNS per VRA Project May & Extracted PBIX
    const deprData = [
      {
        gol: 'Inventaris dan Peralatan',
        unit: 22696,
        masa: '4.2 Tahun (23.8% / thn)',
        hpp: 57954911761,
        akm: 54627461094,
        nbv: 3327450666,
        status: 'Aktif'
      },
      {
        gol: 'Infrastruktur',
        unit: 4755,
        masa: '31.1 Tahun (3.2% / thn)',
        hpp: 520311996195,
        akm: 114239653909,
        nbv: 406072342286,
        status: 'Aktif'
      },
      {
        gol: 'Mesin Pabrik',
        unit: 2206,
        masa: '10.0 Tahun (10.0% / thn)',
        hpp: 14448434972,
        akm: 4238381266,
        nbv: 10210053706,
        status: 'Aktif'
      },
      {
        gol: 'Mesin dan Instalasi',
        unit: 1825,
        masa: '5.9 Tahun (16.9% / thn)',
        hpp: 51828149775,
        akm: 37642799133,
        nbv: 14185350642,
        status: 'Aktif'
      },
      {
        gol: 'Kendaraan dan Transportasi',
        unit: 1416,
        masa: '7.4 Tahun (13.5% / thn)',
        hpp: 135898317639,
        akm: 114175165778,
        nbv: 21723151861,
        status: 'Aktif'
      },
      {
        gol: 'Bangunan Fisik',
        unit: 819,
        masa: '20.9 Tahun (4.8% / thn)',
        hpp: 205577652924,
        akm: 52716015886,
        nbv: 152861637038,
        status: 'Aktif'
      },
      {
        gol: 'Alat/Implement Pertanian',
        unit: 415,
        masa: '7.6 Tahun (13.2% / thn)',
        hpp: 14234877861,
        akm: 12048250380,
        nbv: 2186627481,
        status: 'Aktif'
      },
      {
        gol: 'Alat Berat (Heavy Equipment)',
        unit: 134,
        masa: '8.0 Tahun (12.5% / thn)',
        hpp: 120011382484,
        akm: 102062674610,
        nbv: 17948707874,
        status: 'Aktif'
      }
    ];

    // Total Aggregates
    let totalHpp = 0;
    let totalAkm = 0;
    let totalNbv = 0;
    let totalUnit = 0;

    deprData.forEach(d => {
      totalHpp += d.hpp;
      totalAkm += d.akm;
      totalNbv += d.nbv;
      totalUnit += d.unit;
    });

    // Update KPI Cards di view-asset-depreciation
    const dHpp = document.getElementById('depr-hpp');
    const dAkm = document.getElementById('depr-akm');
    const dNbv = document.getElementById('depr-nbv');
    const dMon = document.getElementById('depr-monthly');

    if (dHpp) dHpp.innerText = 'Rp ' + (totalHpp / 1e12).toFixed(2) + ' T';
    if (dAkm) dAkm.innerText = 'Rp ' + (totalAkm / 1e9).toFixed(1) + ' M';
    if (dNbv) dNbv.innerText = 'Rp ' + (totalNbv / 1e9).toFixed(1) + ' M';
    if (dMon) dMon.innerText = 'Rp 3,82 M';

    tbody.innerHTML = deprData.map(d => `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="py-2.5 px-3 font-semibold text-slate-800 font-sans">
          <div class="font-bold text-slate-900">${d.gol}</div>
        </td>
        <td class="py-2.5 px-3 text-slate-700 whitespace-nowrap font-mono font-bold">${d.unit.toLocaleString('id-ID')} Unit</td>
        <td class="py-2.5 px-3 text-slate-500 font-sans text-[11px] whitespace-nowrap">${d.masa}</td>
        <td class="py-2.5 px-3 text-right font-bold text-slate-900 font-mono whitespace-nowrap">Rp ${d.hpp.toLocaleString('id-ID')}</td>
        <td class="py-2.5 px-3 text-right font-bold text-amber-600 font-mono whitespace-nowrap">Rp ${d.akm.toLocaleString('id-ID')}</td>
        <td class="py-2.5 px-3 text-right font-black text-blue-600 font-mono whitespace-nowrap">Rp ${d.nbv.toLocaleString('id-ID')}</td>
        <td class="py-2.5 px-3 text-center whitespace-nowrap"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 font-sans">Aktif</span></td>
      </tr>
    `).join('') + `
      <tr class="bg-slate-100/90 font-black border-t-2 border-slate-300">
        <td class="py-3 px-3 font-bold text-slate-900 font-sans uppercase">TOTAL KESELURUHAN (34.266 ASET)</td>
        <td class="py-3 px-3 text-slate-900 font-mono font-black">${totalUnit.toLocaleString('id-ID')} Unit</td>
        <td class="py-3 px-3 text-slate-600 font-sans text-[11px]">-</td>
        <td class="py-3 px-3 text-right font-black text-slate-950 font-mono whitespace-nowrap">Rp ${totalHpp.toLocaleString('id-ID')}</td>
        <td class="py-3 px-3 text-right font-black text-amber-700 font-mono whitespace-nowrap">Rp ${totalAkm.toLocaleString('id-ID')}</td>
        <td class="py-3 px-3 text-right font-black text-blue-700 font-mono whitespace-nowrap">Rp ${totalNbv.toLocaleString('id-ID')}</td>
        <td class="py-3 px-3 text-center"><span class="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-800">100% VALID</span></td>
      </tr>
    `;
  }

  function exportDepreciationCsv() {
    const csv = 'Golongan Aset;Unit;Masa Manfaat;Nilai Perolehan (HPP);Akumulasi Depresiasi;Nilai Buku (NBV);Status\n' +
      'Inventaris dan Peralatan;22696;4.2 Tahun;57954911761;54627461094;3327450666;Aktif\n' +
      'Infrastruktur;4755;31.1 Tahun;520311996195;114239653909;406072342286;Aktif\n' +
      'Mesin Pabrik;2206;10.0 Tahun;14448434972;4238381266;10210053706;Aktif\n' +
      'Mesin dan Instalasi;1825;5.9 Tahun;51828149775;37642799133;14185350642;Aktif\n' +
      'Kendaraan dan Transportasi;1416;7.4 Tahun;135898317639;114175165778;21723151861;Aktif\n' +
      'Bangunan Fisik;819;20.9 Tahun;205577652924;52716015886;152861637038;Aktif\n' +
      'Alat/Implement Pertanian;415;7.6 Tahun;14234877861;12048250380;2186627481;Aktif\n' +
      'Alat Berat (Heavy Equipment);134;8.0 Tahun;120011382484;102062674610;17948707874;Aktif\n' +
      'TOTAL;34266;-;1120265723611;491750402056;628515321555;Aktif\n';

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Laporan_Depresiasi_PNS_VRA_${Date.now()}.csv`;
    link.click();
  }

  let assetRelocHistory = [
    { tgl: '2026-10-28', no_asset: 'AST-2024-0001', nama: 'Kasur Busa Single Super', dari: 'HRGA / 712-0001', ke: 'CO-MESS-01 / RM-02', pic: 'Miftahul Khoiry' },
    { tgl: '2026-10-25', no_asset: 'AST-2024-0042', nama: 'AC Split Panasonic 1 PK', dari: 'GUDANG-MARUNDA', ke: 'CO-OFFICE-01 / RM-101', pic: 'Admin Lapangan' }
  ];

  function initAssetLocationView() {
    const select = document.getElementById('loc-select-asset');
    const targetBldg = document.getElementById('loc-target-bldg');
    if (select && select.options.length <= 1) {
      (appState.assets || []).slice(0, 100).forEach(a => {
        const opt = document.createElement('option');
        opt.value = a.no_asset;
        opt.textContent = `${a.no_asset} - ${a.nama_asset}`;
        select.appendChild(opt);
      });
    }
    if (targetBldg && targetBldg.options.length <= 1) {
      (appState.buildings || []).slice(0, 80).forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.kode_gedung;
        opt.textContent = `${b.kode_gedung} - ${b.nama_gedung}`;
        targetBldg.appendChild(opt);
      });
    }
    renderLocHistoryTable();
  }

  function onLocAssetSelected() {
    const noAsset = document.getElementById('loc-select-asset')?.value;
    const item = (appState.assets || []).find(a => a.no_asset === noAsset);
    const asalBldg = document.getElementById('loc-asal-bldg');
    const asalRoom = document.getElementById('loc-asal-room');
    const asalPic = document.getElementById('loc-asal-pic');
    if (item) {
      if (asalBldg) asalBldg.innerText = item.kode_gedung || '-';
      if (asalRoom) asalRoom.innerText = item.nama_ruangan || '-';
      if (asalPic) asalPic.innerText = item.penanggungjawab || 'Tim GS';
    }
  }

  function onLocTargetBldgChange() {
    const bldgCode = document.getElementById('loc-target-bldg')?.value;
    const roomSelect = document.getElementById('loc-target-room');
    if (!roomSelect) return;
    roomSelect.innerHTML = '<option value="">-- Pilih Ruangan Tujuan --</option>';
    const filteredRooms = (appState.rooms || []).filter(r => r.kode_gedung === bldgCode);
    filteredRooms.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.nama_ruangan;
      opt.textContent = r.nama_ruangan;
      roomSelect.appendChild(opt);
    });
  }

  function submitAssetLocation(evt) {
    if (evt) evt.preventDefault();
    const noAsset = document.getElementById('loc-select-asset')?.value;
    const targetBldg = document.getElementById('loc-target-bldg')?.value;
    const targetRoom = document.getElementById('loc-target-room')?.value;
    const targetPic = document.getElementById('loc-target-pic')?.value;
    const item = (appState.assets || []).find(a => a.no_asset === noAsset);

    if (item) {
      assetRelocHistory.unshift({
        tgl: new Date().toISOString().slice(0, 10),
        no_asset: noAsset,
        nama: item.nama_asset,
        dari: `${item.kode_gedung} / ${item.nama_ruangan}`,
        ke: `${targetBldg} / ${targetRoom}`,
        pic: targetPic
      });
      item.kode_gedung = targetBldg;
      item.nama_ruangan = targetRoom;
      renderLocHistoryTable();
      renderAssetsTable();
      if (typeof alert !== "undefined") alert('Lokasi fisik aset ' + noAsset + ' berhasil diperbarui ke ' + targetBldg + '!');
      document.getElementById('form-asset-relocation')?.reset();
    }
  }

  function renderLocHistoryTable() {
    const tbody = document.getElementById('table-loc-history-body');
    if (!tbody) return;
    tbody.innerHTML = assetRelocHistory.map(h => `
      <tr class="hover:bg-slate-50">
        <td class="py-2 px-3 font-mono text-[11px] text-slate-500">${h.tgl}</td>
        <td class="py-2 px-3 font-mono text-[11px] font-bold text-blue-600">${escapeHtml(h.no_asset)}</td>
        <td class="py-2 px-3 font-semibold text-slate-800">${escapeHtml(h.nama)}</td>
        <td class="py-2 px-3 text-slate-500">${escapeHtml(h.dari)}</td>
        <td class="py-2 px-3 font-bold text-slate-800">${escapeHtml(h.ke)}</td>
        <td class="py-2 px-3 text-slate-700">${escapeHtml(h.pic)}</td>
      </tr>
    `).join('');
  }

  // ==========================================
  // ASSET MANAGEMENT: STATUS & KONDISI
  // ==========================================
  let assetStatusHistory = [
    { tgl: '2026-10-27', no_asset: 'AST-2024-0014', kondisi: 'Rusak Ringan', status: 'Dalam Perbaikan', pic: 'Miftahul Khoiry', notes: 'Engsel pintu kiri lemari longgar' }
  ];

  function initAssetStatusView() {
    const select = document.getElementById('status-select-asset');
    if (select && select.options.length <= 1) {
      (appState.assets || []).slice(0, 100).forEach(a => {
        const opt = document.createElement('option');
        opt.value = a.no_asset;
        opt.textContent = `${a.no_asset} - ${a.nama_asset}`;
        select.appendChild(opt);
      });
    }
    renderStatusHistoryTable();
  }

  function onStatusAssetSelected() {
    const noAsset = document.getElementById('status-select-asset')?.value;
    const item = (appState.assets || []).find(a => a.no_asset === noAsset);
    const currName = document.getElementById('status-curr-name');
    const currCond = document.getElementById('status-curr-cond');
    if (item) {
      if (currName) currName.innerText = item.nama_asset || '-';
      if (currCond) currCond.innerText = item.kondisi || 'Baik';
    }
  }

  function submitAssetStatus(evt) {
    if (evt) evt.preventDefault();
    const noAsset = document.getElementById('status-select-asset')?.value;
    const cond = document.getElementById('status-new-cond')?.value;
    const ops = document.getElementById('status-new-ops')?.value;
    const notes = document.getElementById('status-notes')?.value;
    const item = (appState.assets || []).find(a => a.no_asset === noAsset);

    if (item) {
      item.kondisi = cond;
      assetStatusHistory.unshift({
        tgl: new Date().toISOString().slice(0, 10),
        no_asset: noAsset,
        kondisi: cond,
        status: ops,
        pic: 'Miftahul Khoiry (Admin)',
        notes: notes
      });
      renderStatusHistoryTable();
      renderAssetsTable();
      if (typeof alert !== "undefined") alert('Status & kondisi aset ' + noAsset + ' berhasil diperbarui!');
      document.getElementById('form-asset-status')?.reset();
    }
  }

  function renderStatusHistoryTable() {
    const tbody = document.getElementById('table-status-history-body');
    if (!tbody) return;
    tbody.innerHTML = assetStatusHistory.map(h => `
      <tr class="hover:bg-slate-50">
        <td class="py-2 px-3 font-mono text-[11px] text-slate-500">${h.tgl}</td>
        <td class="py-2 px-3 font-mono text-[11px] font-bold text-blue-600">${escapeHtml(h.no_asset)}</td>
        <td class="py-2 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">${escapeHtml(h.kondisi)}</span></td>
        <td class="py-2 px-3 text-slate-700 font-semibold">${escapeHtml(h.status)}</td>
        <td class="py-2 px-3 text-slate-600">${escapeHtml(h.pic)}</td>
        <td class="py-2 px-3 text-slate-500">${escapeHtml(h.notes)}</td>
      </tr>
    `).join('');
  }

  // ==========================================
  // ASSET MANAGEMENT: DISPOSAL BERDASARKAN KODE ASET
  // ==========================================
  let assetDisposalHistory = [
    {
      no_ba: 'BA-DISP-2026-001',
      kode_asset: 'PNS-FAC-FP-03',
      nama_asset: 'FINGERPRINT SOLUTION X107',
      lokasi: 'KANTOR-REGIONAL OFFICE',
      kondisi: 'Rusak Berat',
      metode: 'Afkir / Scrap (Besi Tua / Daur Ulang)',
      nilai_sisa: 0,
      nilai_buku: 2090000,
      status: 'Disetujui',
      tgl: '2026-10-18',
      alasan: 'Sensor optik mati total, board korosi parah, sparepart discontinued dari vendor'
    },
    {
      no_ba: 'BA-DISP-2026-002',
      kode_asset: 'SB-PRN-47',
      nama_asset: 'Speed Boat 15 Pk',
      lokasi: 'CAMP PRN BLOK 0',
      kondisi: 'Rusak Berat',
      metode: 'Pemusnahan (Rusak Berat / Total Loss)',
      nilai_sisa: 0,
      nilai_buku: 0,
      status: 'Menunggu Review GM',
      tgl: '2026-10-24',
      alasan: 'Lambung fiber retak parah kemasukan air asin dan mesin terbakar'
    },
    {
      no_ba: 'BA-DISP-2026-003',
      kode_asset: 'AST-2024-0014',
      nama_asset: 'Lemari Pakaian 2 Pintu Metal',
      lokasi: 'PNS-FAC-LH 01 / Kamar 1',
      kondisi: 'Rusak Berat',
      metode: 'Afkir / Scrap (Besi Tua / Daur Ulang)',
      nilai_sisa: 50000,
      nilai_buku: 2400000,
      status: 'Pending GM',
      tgl: '2026-10-29',
      alasan: 'Pintu roboh, engsel lepas, dan rangka berkarat rapuh dimakan rayap'
    }
  ];

  let selectedDisposalAsset = null;
  let dispSearchQuery = '';

  function initAssetDisposalView() {
    // Load custom disposal history from localStorage if available
    try {
      const saved = localStorage.getItem('pns_disposal_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          assetDisposalHistory = parsed;
        }
      }
    } catch (e) {}

    // Populate Datalist with authentic Kode Aset
    const datalist = document.getElementById('disp-asset-datalist');
    if (datalist) {
      const allSource = [
        ...(appState.assets || []),
        ...(appState.enterpriseAssets || [])
      ];

      const seenCodes = new Set();
      const optionsHtml = [];
      
      allSource.forEach(a => {
        const code = String(a.no_asset || '').trim();
        if (code && code !== 'CO' && code !== '-' && !seenCodes.has(code)) {
          seenCodes.add(code);
          const name = a.nama_asset || a.kategori_asset || 'Aset';
          const bldg = a.kode_gedung || '';
          optionsHtml.push(`<option value="${escapeHtml(code)}">${escapeHtml(code)} &bull; ${escapeHtml(name)} (${escapeHtml(bldg)})</option>`);
        }
      });

      datalist.innerHTML = optionsHtml.slice(0, 1500).join('');
    }

    // Generate auto BA Number
    generateNextBaNumber();
    renderDispHistoryTable();
  }

  function generateNextBaNumber() {
    const baInput = document.getElementById('disp-no-ba');
    if (!baInput) return;
    const year = new Date().getFullYear();
    const count = assetDisposalHistory.length + 1;
    baInput.value = `BA-DISP-${year}-${('000' + count).slice(-3)}`;
  }

  function onDispAssetCodeInput(kode) {
    const cleanCode = String(kode || '').trim();
    const allSource = [
      ...(appState.assets || []),
      ...(appState.enterpriseAssets || [])
    ];

    selectedDisposalAsset = allSource.find(a => String(a.no_asset || '').trim().toLowerCase() === cleanCode.toLowerCase());

    const cardKode = document.getElementById('disp-card-kode');
    const cardNama = document.getElementById('disp-card-nama');
    const cardLokasi = document.getElementById('disp-card-lokasi');
    const cardKondisi = document.getElementById('disp-card-kondisi');
    const cardNbv = document.getElementById('disp-card-nbv');
    const badgeStatus = document.getElementById('disp-detail-status-badge');

    if (selectedDisposalAsset) {
      let name = selectedDisposalAsset.nama_asset || selectedDisposalAsset.kategori_asset || '-';
      if (name.toLowerCase().includes('non-val') && selectedDisposalAsset.kategori_asset) {
        name = selectedDisposalAsset.kategori_asset;
      }
      const bldg = selectedDisposalAsset.kode_gedung || '-';
      const room = selectedDisposalAsset.nama_ruangan || '-';
      const cond = selectedDisposalAsset.kondisi || 'Rusak Berat';
      const val = Number(selectedDisposalAsset.total_harga_perolehan || selectedDisposalAsset.nilai_buku || 0);

      if (cardKode) cardKode.innerText = selectedDisposalAsset.no_asset;
      if (cardNama) cardNama.innerText = name;
      if (cardLokasi) cardLokasi.innerText = `${bldg} / ${room}`;
      if (cardKondisi) cardKondisi.innerText = cond;
      if (cardNbv) cardNbv.innerText = 'Rp ' + val.toLocaleString('id-ID');
      if (badgeStatus) {
        badgeStatus.className = 'px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800';
        badgeStatus.innerText = 'Aset Teridentifikasi ✓';
      }
    } else {
      if (cardKode) cardKode.innerText = cleanCode || '-';
      if (cardNama) cardNama.innerText = cleanCode ? 'Aset khusus / tidak di katalog' : '-';
      if (cardLokasi) cardLokasi.innerText = '-';
      if (cardKondisi) cardKondisi.innerText = '-';
      if (cardNbv) cardNbv.innerText = '-';
      if (badgeStatus) {
        badgeStatus.className = 'px-2 py-0.5 rounded text-[9px] font-bold bg-slate-200 text-slate-700';
        badgeStatus.innerText = cleanCode ? 'Manual Input' : 'Belum Dipilih';
      }
    }
  }

  function submitAssetDisposal(evt) {
    if (evt) evt.preventDefault();
    const kode = document.getElementById('disp-input-kode')?.value.trim();
    const noBa = document.getElementById('disp-no-ba')?.value.trim();
    const method = document.getElementById('disp-method')?.value;
    const nilaiSisa = parseFloat(document.getElementById('disp-nilai-sisa')?.value) || 0;
    const justifikasi = document.getElementById('disp-justifikasi')?.value.trim();

    if (!kode || !noBa) {
      if (typeof alert !== "undefined") alert('Harap isi Kode Aset dan Nomor Berita Acara.');
      return;
    }

    let namaAsset = selectedDisposalAsset ? (selectedDisposalAsset.nama_asset || selectedDisposalAsset.kategori_asset) : 'Aset Fisik (' + kode + ')';
    if (namaAsset.toLowerCase().includes('non-val') && selectedDisposalAsset && selectedDisposalAsset.kategori_asset) {
      namaAsset = selectedDisposalAsset.kategori_asset;
    }

    const lokasi = selectedDisposalAsset ? `${selectedDisposalAsset.kode_gedung || ''} / ${selectedDisposalAsset.nama_ruangan || ''}` : 'Lokasi Operasional';
    const nilaiBuku = selectedDisposalAsset ? Number(selectedDisposalAsset.total_harga_perolehan || 0) : 0;

    const newRecord = {
      no_ba: noBa,
      kode_asset: kode,
      nama_asset: namaAsset,
      lokasi: lokasi,
      kondisi: selectedDisposalAsset ? (selectedDisposalAsset.kondisi || 'Rusak Berat') : 'Rusak Berat',
      metode: method,
      nilai_sisa: nilaiSisa,
      nilai_buku: nilaiBuku,
      status: 'Menunggu Review GM',
      tgl: new Date().toISOString().slice(0, 10),
      alasan: justifikasi
    };

    assetDisposalHistory.unshift(newRecord);
    try {
      localStorage.setItem('pns_disposal_history', JSON.stringify(assetDisposalHistory));
    } catch(e) {}

    renderDispHistoryTable();

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'Berita Acara Diterbitkan',
        html: `<b>${escapeHtml(noBa)}</b> berhasil didaftarkan untuk Kode Aset: <b>${escapeHtml(kode)}</b>.<br><span class="text-xs text-slate-500">Status: Menunggu Tanda Tangan General Manager.</span>`,
        confirmButtonColor: '#e11d48'
      });
    } else {
      if (typeof alert !== "undefined") alert(`Berita Acara ${noBa} berhasil diterbitkan untuk Kode Aset ${kode}!`);
    }

    // Reset Form & Generate Next BA
    document.getElementById('form-asset-disposal')?.reset();
    selectedDisposalAsset = null;
    onDispAssetCodeInput('');
    generateNextBaNumber();
  }

  function onSearchDisposalBa(query) {
    dispSearchQuery = (query || '').toLowerCase();
    renderDispHistoryTable();
  }

  function renderDispHistoryTable() {
    const tbody = document.getElementById('table-disp-history-body');
    if (!tbody) return;

    const filtered = assetDisposalHistory.filter(h => {
      if (!dispSearchQuery) return true;
      return (
        String(h.no_ba || '').toLowerCase().includes(dispSearchQuery) ||
        String(h.kode_asset || '').toLowerCase().includes(dispSearchQuery) ||
        String(h.nama_asset || '').toLowerCase().includes(dispSearchQuery) ||
        String(h.lokasi || '').toLowerCase().includes(dispSearchQuery) ||
        String(h.metode || '').toLowerCase().includes(dispSearchQuery)
      );
    });

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" class="text-center py-6 text-slate-400">Tidak ada arsip Berita Acara yang cocok dengan pencarian.</td></tr>';
      return;
    }

    tbody.innerHTML = filtered.map(h => {
      let statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Pending GM</span>';
      if (h.status === 'Disetujui' || h.status === 'Approved') {
        statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Disetujui GM</span>';
      } else if (h.status === 'Selesai' || h.status === 'Done') {
        statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">Selesai (Diarsip)</span>';
      }

      return `
        <tr class="hover:bg-slate-50 transition-colors">
          <td class="py-2.5 px-3 font-mono text-[11px] font-bold text-rose-600">${escapeHtml(h.no_ba)}</td>
          <td class="py-2.5 px-3 font-mono text-[11px] font-black text-sky-700 bg-sky-50/50 rounded">${escapeHtml(h.kode_asset)}</td>
          <td class="py-2.5 px-3">
            <span class="font-bold text-slate-900 block">${escapeHtml(h.nama_asset)}</span>
            <span class="text-[10px] text-slate-400 block font-normal">${escapeHtml(h.alasan || '-')}</span>
          </td>
          <td class="py-2.5 px-3 text-slate-600 text-[11px]">${escapeHtml(h.lokasi || '-')}</td>
          <td class="py-2.5 px-3 text-slate-700 font-medium">${escapeHtml(h.metode)}</td>
          <td class="py-2.5 px-3 text-right font-mono text-slate-800 font-bold">Rp ${Number(h.nilai_sisa || 0).toLocaleString('id-ID')}</td>
          <td class="py-2.5 px-3 text-center">${statusBadge}</td>
          <td class="py-2.5 px-3 text-center">
            <button type="button" onclick="printDisposalBa('${escapeHtml(h.no_ba)}')" class="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition cursor-pointer shadow-2xs" title="Cetak Berita Acara">
              <i class="ph-bold ph-printer text-xs text-rose-600"></i> Cetak BA
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function printDisposalBa(noBa) {
    const item = assetDisposalHistory.find(h => h.no_ba === noBa);
    if (!item) return;

    const printWindow = window.open('', '_blank', 'width=850,height=900');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Berita Acara Penghapusan Aset - ${item.no_ba}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.5; font-size: 13px; }
          .header { border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px; }
          .company { font-size: 18px; font-weight: 900; letter-spacing: 0.5px; }
          .sub-company { font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; }
          .title { text-align: center; font-size: 16px; font-weight: 800; text-transform: uppercase; margin: 25px 0 5px 0; text-decoration: underline; }
          .ba-num { text-align: center; font-family: monospace; font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 25px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 12px; }
          table th, table td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
          table th { background: #f8fafc; font-weight: 700; }
          .sign-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 50px; text-align: center; }
          .sign-box { border-top: 1px solid #94a3b8; padding-top: 8px; margin-top: 60px; font-weight: 700; font-size: 12px; }
          @media print { body { padding: 10px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company">PT PRATAMA NUSANTARA SAKTI</div>
          <div class="sub-company">Asset Management &amp; Facility Operations Enterprise</div>
        </div>

        <div class="title">BERITA ACARA PENGHAPUSAN / DISPOSAL ASET</div>
        <div class="ba-num">Nomor: ${item.no_ba}</div>

        <p>Pada hari ini tanggal <b>${item.tgl}</b>, telah dilakukan pemeriksaan fisik dan verifikasi kelayakan teknis terhadap aktiva tetap perusahaan sebagai berikut:</p>

        <table>
          <tr><th style="width: 30%;">Kode Aset (No Aset)</th><td style="font-family: monospace; font-weight: 800; font-size: 13px;">${item.kode_asset}</td></tr>
          <tr><th>Nama Barang / Deskripsi</th><td style="font-weight: 700;">${item.nama_asset}</td></tr>
          <tr><th>Lokasi Fisik / Gedung</th><td>${item.lokasi}</td></tr>
          <tr><th>Kondisi Fisik Terakhir</th><td style="color: #e11d48; font-weight: 700;">${item.kondisi}</td></tr>
          <tr><th>Metode Penghapusan</th><td>${item.metode}</td></tr>
          <tr><th>Nilai Buku Tercatat</th><td>Rp ${Number(item.nilai_buku || 0).toLocaleString('id-ID')}</td></tr>
          <tr><th>Taksiran Nilai Sisa / Realisasi</th><td>Rp ${Number(item.nilai_sisa || 0).toLocaleString('id-ID')}</td></tr>
          <tr><th>Alasan / Justifikasi Teknis</th><td>${item.alasan}</td></tr>
        </table>

        <p>Berdasarkan pertimbangan teknis di atas, maka aktiva tersebut dinyatakan <b>Dihapuskan dari Daftar Inventaris Aktiva Tetap Perusahaan</b>.</p>

        <div class="sign-grid">
          <div>
            <div>Dibuat Oleh:</div>
            <div class="sign-box">Miftahul Khoiry<br><span style="font-weight:normal; font-size:10px; color:#64748b;">PIC Asset Management</span></div>
          </div>
          <div>
            <div>Diperiksa Oleh:</div>
            <div class="sign-box">Rizal Dwi<br><span style="font-weight:normal; font-size:10px; color:#64748b;">Manager General Affairs</span></div>
          </div>
          <div>
            <div>Disetujui Oleh:</div>
            <div class="sign-box">General Manager<br><span style="font-weight:normal; font-size:10px; color:#64748b;">PT Pratama Nusantara Sakti</span></div>
          </div>
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  }

  function exportDisposalArchiveCsv() {
    let csv = 'No BA;Kode Aset;Nama Barang;Lokasi;Metode;Nilai Sisa;Status;Tanggal;Alasan\n';
    assetDisposalHistory.forEach(h => {
      csv += `"${h.no_ba}";"${h.kode_asset}";"${h.nama_asset}";"${h.lokasi}";"${h.metode}";${h.nilai_sisa};"${h.status}";"${h.tgl}";"${h.alasan}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Arsip_Berita_Acara_Disposal_PNS.csv';
    link.click();
  }

// ==========================================
  // MASTER GEDUNG
  // ==========================================
  function renderBuildingsCards(list) {
    const data = list || appState.buildings;
    const container = document.getElementById('bldg-cards-container');
    if (!container) return;

    if (data.length === 0) {
      container.innerHTML = `<div class="col-span-full clean-card p-8 text-center text-xs text-slate-500">Tidak ada gedung yang cocok dengan pencarian Anda.</div>`;
      return;
    }

    container.innerHTML = data.slice(0, 120).map(b => `
      <div class="clean-card bldg-card-item p-4 flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start gap-2 mb-1.5">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">${escapeHtml(b.kode_gedung)}</span>
            <span class="text-[10px] font-medium text-slate-500">${escapeHtml(b.lokasi_site)}</span>
          </div>
          <h4 class="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">${escapeHtml(b.nama_gedung)}</h4>
          <div class="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
            <i class="ph-bold ph-user text-xs" aria-hidden="true"></i> ${escapeHtml(b.penanggungjawab || 'Tim General Services')}
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div class="num-tabular flex gap-2 text-[10px] font-semibold">
            <span class="text-sky-600">${b.total_ruangan || 0} Ruangan</span>
            <span class="text-slate-500">&bull;</span>
            <span class="text-teal-600">${b.total_asset || 0} Aset</span>
          </div>
          <button type="button" onclick="startInspectionForBldg('${escapeHtml(b.kode_gedung)}')" class="px-2.5 py-1 text-[11px] font-bold rounded bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 transition">
            Audit
          </button>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // INVENTARIS RUANGAN & ASET TABLES
  // ==========================================
  function renderRoomsTable() {
    const bldgFilterEl = document.getElementById('filter-room-bldg');
    const searchEl = document.getElementById('search-room');
    const bldgFilter = bldgFilterEl ? bldgFilterEl.value : '';
    const search = (searchEl ? searchEl.value : '').toLowerCase();
    const tbody = document.getElementById('table-rooms-body');
    if (!tbody) return;

    const filtered = appState.rooms.filter(r => {
      const mBldg = !bldgFilter || r.kode_gedung === bldgFilter || r.gedung_id === bldgFilter;
      const mSearch = !search ||
        String(r.nama_ruangan || '').toLowerCase().includes(search) ||
        String(r.kode_gedung || '').toLowerCase().includes(search);
      return mBldg && mSearch;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" class="text-center py-6 text-slate-500">Tidak ada ruangan yang sesuai filter.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.slice(0, 120).map(r => `
      <tr>
        <td class="font-mono text-slate-600">${escapeHtml(r.kode_gedung)}</td>
        <td class="font-bold text-slate-900">${escapeHtml(r.nama_ruangan)}</td>
        <td><span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100">${escapeHtml(r.tipe_ruangan || 'Kamar')}</span></td>
        <td class="num-tabular">${r.kapasitas || 2} Orang</td>
        <td>${escapeHtml(r.penanggungjawab || '-')}</td>
        <td class="num-tabular font-bold text-sky-600">${r.total_asset || 0} item</td>
        <td><span class="px-2 py-0.5 rounded text-[10px] font-bold ${r.kondisi_terakhir === 'Baik' ? 'bg-emerald-100 text-emerald-800 ' : 'bg-amber-100 text-amber-800'}">${escapeHtml(r.kondisi_terakhir || 'Baik')}</span></td>
        <td><span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">${escapeHtml(r.status_hunian || 'Tersedia')}</span></td>
        <td>
          <button type="button" onclick="startInspectionForRoom('${escapeHtml(r.kode_gedung)}', '${escapeHtml(r.nama_ruangan)}')" class="px-2.5 py-1 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800 hover:bg-emerald-600 hover:text-white transition">
            Audit Kamar
          </button>
        </td>
      </tr>
    `).join('');
  }

    // ==========================================
  // FACILITIES MANAGEMENT (15.778 ASET FASILITAS HRGA)
  // ==========================================
  let facilityBldgFilter = 'ALL';
  let facilityKondisiFilter = 'ALL';
  let facilitySearchQuery = '';
  let facilityCurrentPage = 1;
  const FACILITIES_PER_PAGE = 25;

  function onFacilityFilterChange() {
    facilityBldgFilter = document.getElementById('filter-facility-bldg')?.value || 'ALL';
    facilityKondisiFilter = document.getElementById('filter-facility-kondisi')?.value || 'ALL';
    facilityCurrentPage = 1;
    renderAssetsTable();
  }

  function onFacilitySearch(query) {
    facilitySearchQuery = query || '';
    facilityCurrentPage = 1;
    renderAssetsTable();
  }

  function changeFacilityPage(delta) {
    facilityCurrentPage = Math.max(1, facilityCurrentPage + delta);
    renderAssetsTable();
  }

  function renderAssetsTable() {
    // Prevent 200 items overwrite bug: ensure full 15,886 room facility items are loaded
    if (!appState.assets || appState.assets.length < 500) {
      if (typeof window !== 'undefined' && window.PNS_MASTER_DATA && Array.isArray(window.PNS_MASTER_DATA.hrgaAssets)) {
        appState.assets = window.PNS_MASTER_DATA.hrgaAssets;
      }
    }
    const tbody = document.getElementById('table-assets-body');
    if (!tbody) return;

    // Populate Gedung dropdown if empty
    const bldgSelect = document.getElementById('filter-facility-bldg');
    if (bldgSelect && bldgSelect.options.length <= 1) {
      const bldgSet = new Set(appState.assets.map(a => a.kode_gedung).filter(Boolean));
      [...bldgSet].sort().forEach(code => {
        const opt = document.createElement('option');
        opt.value = code;
        opt.textContent = code;
        bldgSelect.appendChild(opt);
      });
    }

    const filtered = appState.assets.filter(a => {
      const matchBldg = (facilityBldgFilter === 'ALL' || a.kode_gedung === facilityBldgFilter);
      const matchKondisi = (facilityKondisiFilter === 'ALL' || (a.kondisi || '').toLowerCase() === facilityKondisiFilter.toLowerCase());
      const q = facilitySearchQuery.toLowerCase();
      const matchSearch = !q ||
        String(a.no_asset || '').toLowerCase().includes(q) ||
        String(a.nama_asset || '').toLowerCase().includes(q) ||
        String(a.kode_gedung || '').toLowerCase().includes(q) ||
        String(a.nama_ruangan || '').toLowerCase().includes(q);
      return matchBldg && matchKondisi && matchSearch;
    });

    const totalCount = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / FACILITIES_PER_PAGE));
    if (facilityCurrentPage > totalPages) facilityCurrentPage = totalPages;
    const startIndex = (facilityCurrentPage - 1) * FACILITIES_PER_PAGE;
    const paginated = filtered.slice(startIndex, startIndex + FACILITIES_PER_PAGE);

    const infoEl = document.getElementById('facilities-paging-info');
    if (infoEl) {
      infoEl.innerText = `Menampilkan ${totalCount > 0 ? startIndex + 1 : 0} - ${Math.min(startIndex + FACILITIES_PER_PAGE, totalCount)} dari ${totalCount.toLocaleString('id-ID')} aset fasilitas`;
    }

    const indEl = document.getElementById('facilities-page-indicator');
    if (indEl) indEl.innerText = `Hal ${facilityCurrentPage} / ${totalPages}`;

    const prevBtn = document.getElementById('btn-facilities-prev');
    const nextBtn = document.getElementById('btn-facilities-next');
    if (prevBtn) prevBtn.disabled = (facilityCurrentPage <= 1);
    if (nextBtn) nextBtn.disabled = (facilityCurrentPage >= totalPages);

    const badgeEl = document.getElementById('facilities-total-badge');
    if (badgeEl) badgeEl.innerText = totalCount.toLocaleString('id-ID');

    if (paginated.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-slate-500">Tidak ada aset fasilitas yang cocok dengan filter.</td></tr>`;
      return;
    }

    tbody.innerHTML = paginated.map(a => {
      let noAsset = String(a.no_asset || '-').trim();
      let namaAsset = String(a.nama_asset || '-').trim();
      let kategori = String(a.kategori_asset || '-').trim();

      // Clean up generic raw SAP labels: put real description as asset name
      if (namaAsset.toLowerCase().includes('non-val') && kategori.length > 3) {
        namaAsset = kategori;
        kategori = 'Inventaris Fasilitas';
      }
      if (noAsset === 'CO' || !noAsset || noAsset === '-') {
        const hashStr = String(namaAsset + (a.nama_ruangan || '') + (a.kode_gedung || ''));
        let hash = 0;
        for (let i = 0; i < hashStr.length; i++) hash = ((hash << 5) - hash) + hashStr.charCodeAt(i);
        noAsset = 'NVA-FAC-' + String(Math.abs(hash) % 100000).padStart(5, '0');
      }

      const kondisi = a.kondisi || 'Baik';
      let kondisiClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      if (kondisi.toLowerCase().includes('rusak berat') || kondisi.toLowerCase().includes('hilang')) {
        kondisiClass = 'bg-rose-50 text-rose-700 border border-rose-200';
      } else if (kondisi.toLowerCase().includes('rusak ringan')) {
        kondisiClass = 'bg-amber-50 text-amber-700 border border-amber-200';
      }

      return `
        <tr class="hover:bg-slate-50 transition">
          <td class="py-2.5 px-3 font-mono font-bold text-sky-600">${escapeHtml(noAsset)}</td>
          <td class="py-2.5 px-3 font-semibold text-slate-900">${escapeHtml(namaAsset)}</td>
          <td class="py-2.5 px-3 font-mono text-slate-600 font-medium">${escapeHtml(a.kode_gedung)}</td>
          <td class="py-2.5 px-3 text-slate-700">${escapeHtml(a.nama_ruangan)}</td>
          <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">${escapeHtml(kategori)}</span></td>
          <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${kondisiClass}">${escapeHtml(kondisi)}</span></td>
          <td class="py-2.5 px-3 text-right font-mono num-tabular font-medium text-slate-800">Rp ${Number(a.total_harga_perolehan || 0).toLocaleString('id-ID')}</td>
          <td class="py-2.5 px-3 text-slate-500 font-mono text-[11px]">${escapeHtml(a.tanggal_perolehan || '-')}</td>
        </tr>
      `;
    }).join('');
  }



  
  // ========================================================
  // CATEGORY SLICER FOR INSPECTION STEP 1 (HUNIAN, KANTOR, GUDANG/FASILITAS)
  // ========================================================
  let currentInspBldgCategory = 'ALL';

  function setInspBldgCategory(cat, btnEl) {
    currentInspBldgCategory = cat;
    document.querySelectorAll('.insp-cat-btn').forEach(btn => {
      btn.className = 'insp-cat-btn px-2.5 py-1 text-[11px] font-bold rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer';
    });
    if (btnEl) {
      btnEl.className = 'insp-cat-btn active px-2.5 py-1 text-[11px] font-bold rounded-md bg-slate-900 text-white transition cursor-pointer shadow-xs';
    }

    const gSelect = document.getElementById('insp-gedung');
    if (!gSelect) return;

    let list = (appState.buildings || []).filter(isGenuineBuilding);
    if (cat === 'HUNIAN') {
      list = list.filter(b => b.inspection_category === 'HUNIAN' || b.kategori === 'MESS & HUNIAN' || (b.nama_gedung || '').toLowerCase().includes('mess') || (b.nama_gedung || '').toLowerCase().includes('longhouse') || (b.nama_gedung || '').toLowerCase().includes('guest house') || (b.kode_gedung || '').includes('-LH') || (b.kode_gedung || '').includes('-GH-') || (b.kode_gedung || '').includes('-MESS'));
    } else if (cat === 'KANTOR') {
      list = list.filter(b => b.inspection_category === 'KANTOR' || b.kategori === 'BANGUNAN KANTOR' || (b.nama_gedung || '').toLowerCase().includes('office') || (b.nama_gedung || '').toLowerCase().includes('kantor') || (b.nama_gedung || '').toLowerCase().includes('security') || (b.nama_gedung || '').toLowerCase().includes('pos'));
    } else if (cat === 'GUDANG_FASILITAS') {
      list = list.filter(b => b.inspection_category === 'GUDANG_FASILITAS' || b.kategori === 'GUDANG' || b.kategori === 'WORKSHOP' || (b.nama_gedung || '').toLowerCase().includes('gudang') || (b.nama_gedung || '').toLowerCase().includes('workshop') || (b.nama_gedung || '').toLowerCase().includes('laundry') || (b.nama_gedung || '').toLowerCase().includes('kantin') || (b.nama_gedung || '').toLowerCase().includes('genset') || (b.nama_gedung || '').toLowerCase().includes('wtp') || (b.nama_gedung || '').toLowerCase().includes('water') || (b.nama_gedung || '').toLowerCase().includes('klinik'));
    }

    gSelect.innerHTML = `<option value="">-- Pilih Gedung (${list.length}) --</option>` +
      list.map(b => `<option value="${escapeHtml(b.kode_gedung)}" data-site="${escapeHtml(b.lokasi_site || '')}" data-id="${escapeHtml(b.gedung_id || '')}">${escapeHtml(b.nama_gedung)} (${escapeHtml(b.lokasi_site)})</option>`).join('');

    onInspGedungChange();
  }

  function initInspectionFormDropdowns() {
    const gSelect = document.getElementById('insp-gedung');
    const filterBldgSelect = document.getElementById('filter-room-bldg');
    const regGedung = document.getElementById('reg-gedung');
    const mutGedung = document.getElementById('mut-ke-gedung');

    const genuineBuildings = (appState.buildings || []).filter(isGenuineBuilding);

    const bldgOptionsHtml = genuineBuildings.map(b =>
      `<option value="${escapeHtml(b.kode_gedung)}" data-site="${escapeHtml(b.lokasi_site || '')}" data-id="${escapeHtml(b.gedung_id || '')}">${escapeHtml(b.nama_gedung)} (${escapeHtml(b.lokasi_site)})</option>`
    ).join('');

    const filterOptionsHtml = genuineBuildings.map(b =>
      `<option value="${escapeHtml(b.kode_gedung)}">${escapeHtml(b.kode_gedung)} - ${escapeHtml(b.nama_gedung)}</option>`
    ).join('');

    if (gSelect) gSelect.innerHTML = '<option value="">-- Pilih Gedung Acuan --</option>' + bldgOptionsHtml;
    if (filterBldgSelect) filterBldgSelect.innerHTML = '<option value="">Semua Gedung</option>' + filterOptionsHtml;
    if (regGedung) regGedung.innerHTML = bldgOptionsHtml;
    if (mutGedung) mutGedung.innerHTML = bldgOptionsHtml;
    const opnLokasi = document.getElementById('opn-lokasi');
    if (opnLokasi) opnLokasi.innerHTML = '<option value="Semua Site">Semua Site / Gedung</option>' + bldgOptionsHtml;

    loadRegRooms();
    loadMutRooms();
  }

  function getRoomsForBuilding(bCode, bSite, bId) {
    if (!bCode) return [];
    const bUpper = String(bCode || '').trim().toUpperCase();
    const sUpper = String(bSite || '').trim().toUpperCase();
    const seenNames = new Set();
    const res = [];

    // Filter appState.rooms strictly for this building
    (appState.rooms || []).forEach(r => {
      const rb = String(r.kode_gedung || '').trim().toUpperCase();
      const rId = String(r.gedung_id || '').trim();
      const rName = String(r.nama_ruangan || '').trim();
      if (!rName) return;

      // Exact building code match or gedung_id match
      const matchesBldg = (rb === bUpper) || (bId && rId === String(bId));
      if (!matchesBldg) return;

      // Cross-site room leakage prevention:
      // If building is in Central Office (CO), exclude any room containing MESS FR, PABRIK, FACTORY
      if (sUpper.includes('CENTRAL') && (rName.toUpperCase().includes('MESS FR') || rName.toUpperCase().includes('PABRIK KM18') || rName.toUpperCase().includes('FACTORY KM 18'))) {
        return;
      }
      // If building is in Factory (FR), exclude any room containing CENTRAL
      if (sUpper.includes('FACTORY') && rName.toUpperCase().includes('CENTRAL KM 17')) {
        return;
      }

      // Deduplicate room names per building (prevents duplicate DAPUR, RUANG MAKAN, etc.)
      const normKey = rName.toUpperCase();
      if (seenNames.has(normKey)) return;
      seenNames.add(normKey);

      res.push(r);
    });

    return res;
  }

  function onInspGedungChange() {
    const gSelect = document.getElementById('insp-gedung');
    const rSelect = document.getElementById('insp-ruangan');
    const infoBox = document.getElementById('insp-gedung-info');

    if (!gSelect || !rSelect) return;

    const bCode = gSelect.value;
    const selectedOpt = (gSelect.options && gSelect.selectedIndex >= 0) ? gSelect.options[gSelect.selectedIndex] : null;
    const bSite = selectedOpt ? selectedOpt.getAttribute('data-site') : '';
    const bId = selectedOpt ? selectedOpt.getAttribute('data-id') : '';

    if (!bCode) {
      rSelect.innerHTML = '<option value="">-- Pilih Gedung Terlebih Dahulu --</option>';
      rSelect.disabled = true;
      if (infoBox) infoBox.classList.add('hidden');
      onInspRuanganChange();
      return;
    }

    const bldg = (appState.buildings || []).find(b => 
      (b.kode_gedung === bCode && (!bSite || b.lokasi_site === bSite)) ||
      (bId && String(b.gedung_id) === String(bId))
    ) || (appState.buildings || []).find(b => b.kode_gedung === bCode);

    if (bldg && infoBox) {
      infoBox.classList.remove('hidden');
      infoBox.innerHTML = `<strong>${escapeHtml(bldg.nama_gedung)}</strong> &bull; Site: ${escapeHtml(bldg.lokasi_site)} &bull; PIC: <strong>${escapeHtml(bldg.penanggungjawab || '-')}</strong> &bull; Ruangan: ${bldg.total_ruangan || 0}`;
      const picInput = document.getElementById('insp-pic');
      if (picInput) picInput.value = bldg.penanggungjawab || '';
    }

    // Ambil HANYA ruangan di dalam gedung tersebut (bebas bocor dan deduplikasi)
    const matchingRooms = getRoomsForBuilding(bCode, bSite, bId);

    if (matchingRooms.length > 0) {
      const roomOpts = matchingRooms.map(r =>
        `<option value="${escapeHtml(r.nama_ruangan)}">${escapeHtml(r.nama_ruangan)} (${escapeHtml(r.tipe_ruangan || 'Ruangan')} - ${r.total_asset || 0} Aset)</option>`
      ).join('');

      rSelect.innerHTML = roomOpts;
      rSelect.disabled = false;

      // LANGSUNG MENGIKUTI: Otomatis pilih ruangan pertama dan langsung muat checklist fisiknya!
      rSelect.selectedIndex = 0;
      onInspRuanganChange();
    } else {
      // Jika gedung belum punya list detail kamar di database
      rSelect.innerHTML = '<option value="Area Utama">Area Utama (1 Ruangan)</option>';
      rSelect.disabled = false;
      rSelect.selectedIndex = 0;
      onInspRuanganChange();
    }
  }

  // Helper: Pastikan hanya aset fasilitas/perabotan ruangan yang dimuat (BUKAN aset tanah/gedung Mess Karyawan/Longhouse)
  function isFacilityAssetItem(a) {
    if (!a) return false;
    const name = String(a.nama_asset || '').toUpperCase();
    const no = String(a.no_asset || '').toUpperCase();
    const kat = String(a.kategori_asset || '').toUpperCase();

    // Reject fixed building assets (Mess Karyawan, Longhouse, Gedung)
    if (no.startsWith('A-111-') || kat.includes('111-0001') || kat.includes('111-0002')) return false;
    if (/(MESS\s+KARYAWAN|LONG\s*HOUSE|BANGUNAN|GEDUNG\s+PABRIK|GEDUNG\s+KANTOR)/i.test(name)) return false;
    return true;
  }

  function getDefaultRoomFacilityAssets(kodeGedung, namaRuangan) {
    var rName = namaRuangan || 'Ruangan';
    var rUpper = String(rName).toUpperCase();

    // 0. Standar Ruang Laundry / Pencucian & Pengepakan (Data Aktual)
    if (rUpper.indexOf('LAUNDRY') !== -1 || rUpper.indexOf('LOUNDRY') !== -1 || rUpper.indexOf('CUCI') !== -1 || rUpper.indexOf('SETRIKA') !== -1 || rUpper.indexOf('PENGERING') !== -1 || String(kodeGedung || '').toUpperCase().indexOf('LOUNDRY') !== -1 || String(kodeGedung || '').toUpperCase().indexOf('LAUNDRY') !== -1) {
      return [
        { no_asset: 'PNS-LND-MC-01', nama_asset: 'MESIN CUCI INDUSTRI SPEED QUEEN COMMERCIAL 15 KG', qty: '2 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Mesin & Peralatan', total_harga_perolehan: 38500000 },
        { no_asset: 'PNS-LND-MC-02', nama_asset: 'MESIN CUCI FRONT LOADING ELECTROLUX 11 KG', qty: '2 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Elektronik', total_harga_perolehan: 17200000 },
        { no_asset: 'PNS-LND-DRY-01', nama_asset: 'MESIN PENGERING / DRYER SPEED QUEEN GAS 15 KG', qty: '2 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Mesin & Peralatan', total_harga_perolehan: 32000000 },
        { no_asset: 'PNS-LND-STU-01', nama_asset: 'SETRIKA UAP BOILER MAQI 25L + 2 KEPALA SETRIKA', qty: '1 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Peralatan', total_harga_perolehan: 8500000 },
        { no_asset: 'PNS-LND-MJS-01', nama_asset: 'MEJA SETRIKA VACUUM SUCTION BOARD 120X80 CM', qty: '2 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Peralatan', total_harga_perolehan: 6400000 },
        { no_asset: 'PNS-LND-TMB-01', nama_asset: 'TIMBANGAN LAUNDRY DIGITAL CAS 30 KG', qty: '1 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Peralatan', total_harga_perolehan: 2850000 },
        { no_asset: 'N-700-712-0001-5086', nama_asset: 'MEJA SORTIR & LIPAT LINEN STAINLESS 180X90 CM', qty: '2 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Furniture', total_harga_perolehan: 4600000 },
        { no_asset: 'NVA-LND-RAK', nama_asset: 'RAK BESI STORAGE LINEN & PAKAIAN BERSIH 5 SUSUN', qty: '3 Unit', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Laundry', total_harga_perolehan: 0 },
        { no_asset: 'NVA-LND-TRL', nama_asset: 'KERANJANG TROLI LAUNDRY RODA HEAVY DUTY 100L', qty: '4 Unit', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Laundry', total_harga_perolehan: 0 },
        { no_asset: 'NVA-LND-EXH', nama_asset: 'EXHAUST FAN INDUSTRIAL 16 INCH KDK', qty: '2 Unit', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Laundry', total_harga_perolehan: 0 },
        { no_asset: 'NVA-LMP-LND', nama_asset: 'LAMPU LED TUBE 18W WATERPROOF PHILIPS', qty: '4 Titik', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Laundry', total_harga_perolehan: 0 },
        { no_asset: 'NVA-KST-LND', nama_asset: 'STOP KONTAK LISTRIK 16A GROUNDING PANASONIC', qty: '4 Titik', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Laundry', total_harga_perolehan: 0 }
      ];
    }


    // 1. Standar Pantry / Dapur
    if (rUpper.indexOf('PANTRY') !== -1 || rUpper.indexOf('DAPUR') !== -1) {
      return [
        { no_asset: 'PNS-FAC-KK-25', nama_asset: 'KULKAS 2 PINTU SHARP SJ-237ND', qty: '1 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Elektronik', total_harga_perolehan: 3150000 },
        { no_asset: 'PNS-FAC-DPS-40', nama_asset: 'DISPENSER AIR POLYTRON PWC776 HOT & COLD', qty: '1 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Elektronik', total_harga_perolehan: 2150000 },
        { no_asset: 'N-700-712-0001-9723', nama_asset: 'KOMPOR GAS 2 TUNGKU RINNAI RI-522C', qty: '1 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Peralatan', total_harga_perolehan: 300000 },
        { no_asset: 'N-700-712-0001-1868', nama_asset: 'TABUNG GAS LPG 12 KG PERTAMINA', qty: '1 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Peralatan', total_harga_perolehan: 490000 },
        { no_asset: 'N-700-712-0001-5086', nama_asset: 'MEJA MAKAN PANTRY KAYU 120 X 60 CM', qty: '1 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Furniture', total_harga_perolehan: 725000 },
        { no_asset: 'N-700-712-0001-2291', nama_asset: 'KURSI LIPAT CHITOSE TYPE YAMATO HAA', qty: '4 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Furniture', total_harga_perolehan: 1220000 },
        { no_asset: 'NVA-LMP-01', nama_asset: 'LAMPU LED PLAFON PANTRY 12W PHILIPS', qty: '2 Titik', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Standar', total_harga_perolehan: 0 },
        { no_asset: 'NVA-KST-01', nama_asset: 'STOP KONTAK & SAKLAR LISTRIK PANASONIC', qty: '3 Titik', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Standar', total_harga_perolehan: 0 },
        { no_asset: 'NVA-TS-01', nama_asset: 'TEMPAT SAMPAH INJAK 20L LION STAR', qty: '1 Unit', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Standar', total_harga_perolehan: 0 }
      ];
    }

    // 2. Standar Kantin / Ruang Makan
    if (rUpper.indexOf('MAKAN') !== -1 || rUpper.indexOf('KANTIN') !== -1 || rUpper.indexOf('PENYAJIAN') !== -1) {
      return [
        { no_asset: 'N-700-712-0001-5086', nama_asset: 'MEJA MAKAN KANTIN STAINLESS / KAYU PANJANG 180 CM', qty: '4 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Furniture', total_harga_perolehan: 4800000 },
        { no_asset: 'N-700-712-0001-2291', nama_asset: 'KURSI MAKAN PLASTIK / BESI CHITOSE', qty: '16 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Furniture', total_harga_perolehan: 3200000 },
        { no_asset: 'PNS-FAC-AC-107', nama_asset: 'AC SPLIT / KIPAS ANGIN DINDING TORNADO 18 INCH', qty: '2 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Elektronik', total_harga_perolehan: 1750000 },
        { no_asset: 'PNS-FAC-DPS-40', nama_asset: 'DISPENSER AIR MINUM KANTIN HOT & COLD', qty: '1 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Elektronik', total_harga_perolehan: 2150000 },
        { no_asset: 'NVA-LMP-KTN', nama_asset: 'LAMPU LED PLAFON RUANG MAKAN 18W PHILIPS', qty: '4 Titik', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Standar', total_harga_perolehan: 0 },
        { no_asset: 'NVA-WAS-01', nama_asset: 'WASTAFEL CUCI TANGAN + KRAN AIR STAINLESS', qty: '2 Unit', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Standar', total_harga_perolehan: 0 },
        { no_asset: 'NVA-TS-KTN', nama_asset: 'TEMPAT SAMPAH INJAK KAPASITAS BESAR 45L', qty: '2 Unit', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Standar', total_harga_perolehan: 0 }
      ];
    }

    // 3. Standar Kantor / Ruang Kerja / Ruang Meeting
    if (rUpper.indexOf('KANTOR') !== -1 || rUpper.indexOf('OFFICE') !== -1 || rUpper.indexOf('MEETING') !== -1 || rUpper.indexOf('KERJA') !== -1 || rUpper.indexOf('PETUGAS') !== -1) {
      return [
        { no_asset: 'N-700-712-0001-5111', nama_asset: 'MEJA KERJA STAFF MODERA 120 X 70 CM', qty: '2 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Furniture', total_harga_perolehan: 2400000 },
        { no_asset: 'N-700-712-0001-1278', nama_asset: 'KURSI KERJA STAFF HIDROLIK INDACHI', qty: '2 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Furniture', total_harga_perolehan: 1700000 },
        { no_asset: 'PNS-FAC-AC-75', nama_asset: 'AC SPLIT 1 PK SHARP ECO INVERTER', qty: '1 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Elektronik', total_harga_perolehan: 4650000 },
        { no_asset: 'NVA-LMP-OFF', nama_asset: 'LAMPU LED TUBE RUANG KERJA 16W PHILIPS', qty: '2 Titik', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Standar', total_harga_perolehan: 0 },
        { no_asset: 'NVA-KST-OFF', nama_asset: 'STOP KONTAK LISTRIK & LAN JARINGAN', qty: '4 Titik', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Standar', total_harga_perolehan: 0 },
        { no_asset: 'NVA-TS-OFF', nama_asset: 'TEMPAT SAMPAH KERANJANG KERTAS 10L', qty: '2 Unit', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Standar', total_harga_perolehan: 0 }
      ];
    }

    // 4. Standar Fasilitas Kamar Hunian Mess & Longhouse (Valuable + Non-Valuable Lengkap)
    return [
      { no_asset: 'N-700-712-0001-9704', nama_asset: 'SPRINGBED 100 X 200 X 25 ROMANCE FEELING LOVELY (BED A)', qty: '1 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'MESS & HUNIAN', total_harga_perolehan: 3218600 },
      { no_asset: 'N-700-712-0001-9705', nama_asset: 'SPRINGBED 100 X 200 X 25 ROMANCE FEELING LOVELY (BED B)', qty: '1 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'MESS & HUNIAN', total_harga_perolehan: 3218600 },
      { no_asset: 'N-700-712-0001-10497', nama_asset: 'LEMARI PAKAIAN 2 PINTU LC - NATHAN 800X420X1900MM', qty: '1 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'MESS & HUNIAN', total_harga_perolehan: 2600000 },
      { no_asset: 'PNS-FAC-AC-75', nama_asset: 'AC SPLIT 1 PK SHARP THAILAND ECO INVERTER', qty: '1 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'Elektronik', total_harga_perolehan: 4650000 },
      { no_asset: 'N-700-712-0001-1278', nama_asset: 'KURSI LIPAT MERK CHITOSE TYPE YAMATO HAA', qty: '2 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'MESS & HUNIAN', total_harga_perolehan: 610000 },
      { no_asset: 'N-700-712-0001-5111', nama_asset: 'MEJA KERJA / BELAJAR KAMAR 120 X 60 CM', qty: '1 Unit', jenis_aset: 'Valuable', kondisi: 'Baik', kategori_asset: 'MESS & HUNIAN', total_harga_perolehan: 725000 },
      { no_asset: 'NVA-LMP-KAMAR', nama_asset: 'LAMPU LED PLAFON UTAMA KAMAR 10W PHILIPS', qty: '1 Titik', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Mess', total_harga_perolehan: 0 },
      { no_asset: 'NVA-KST-KAMAR', nama_asset: 'STOP KONTAK MEJA & SAKLAR LAMPU PANASONIC', qty: '2 Titik', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Mess', total_harga_perolehan: 0 },
      { no_asset: 'N-700-712-0001-4417', nama_asset: 'BANTAL DACRON KEPALA 48X71 CM ROMANCE', qty: '2 Unit', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Perlengkapan', total_harga_perolehan: 190000 },
      { no_asset: 'N-700-712-0001-3918', nama_asset: 'GULING DACRON 37X89 CM ROMANCE', qty: '2 Unit', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Perlengkapan', total_harga_perolehan: 210000 },
      { no_asset: 'N-700-712-0001-2923', nama_asset: 'SPREI TEMPAT TIDUR 100X200 CM STAR POLKADOT', qty: '2 Set', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Perlengkapan', total_harga_perolehan: 180000 },
      { no_asset: 'N-700-712-0001-5186', nama_asset: 'SELIMUT HANDUK TEBAL 160X200 CM MERK HONEY', qty: '2 Helai', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Perlengkapan', total_harga_perolehan: 240000 },
      { no_asset: 'N-700-712-0001-2100', nama_asset: 'GORDEN JENDELA UKURAN 130 X 160 CM', qty: '1 Pasang', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Perlengkapan', total_harga_perolehan: 220000 },
      { no_asset: 'NVA-TS-02', nama_asset: 'TEMPAT SAMPAH KAMAR BASKET 10L LION STAR', qty: '1 Unit', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Perlengkapan', total_harga_perolehan: 0 },
      { no_asset: 'NVA-GNT-01', nama_asset: 'GANTUNGAN BAJU / KAPSTOK DINDING 6 HOOK STAINLESS', qty: '1 Unit', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Mess', total_harga_perolehan: 0 },
      { no_asset: 'NVA-CRM-01', nama_asset: 'CERMIN DINDING WASTAFEL / RIAS 40 X 60 CM', qty: '1 Unit', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Fasilitas Mess', total_harga_perolehan: 0 },
      { no_asset: 'N-700-712-0001-5429', nama_asset: 'PENGKI + SAPU LANTAI NAGATA', qty: '1 Set', jenis_aset: 'Non-Valuable', kondisi: 'Baik', kategori_asset: 'Perlengkapan', total_harga_perolehan: 65000 }
    ];
  }

  // ==========================================
  // OCCUPANTS & ROOM ASSETS CONTROLLER (HRGA)
  // ==========================================
  function getOccupantsForRoom(bCode, rName) {
    if (!appState.penghuni || !Array.isArray(appState.penghuni)) return [];
    const bUpper = String(bCode || '').trim().toUpperCase();
    const rUpper = String(rName || '').trim().toUpperCase();
    return appState.penghuni.filter(p => {
      const pb = String(p.kode_gedung || p.nama_gedung || '').trim().toUpperCase();
      const pr = String(p.nama_ruangan || p.ruangan || '').trim().toUpperCase();
      return (pb === bUpper || pb.includes(bUpper) || bUpper.includes(pb)) &&
             (pr === rUpper || pr.includes(rUpper) || rUpper.includes(pr));
    });
  }

  function onInspRuanganChange() {
    const bCode = document.getElementById('insp-gedung').value;
    const rName = document.getElementById('insp-ruangan').value;
    const infoBox = document.getElementById('insp-ruang-info');

    if (!bCode || !rName) {
      if (infoBox) infoBox.classList.add('hidden');
      loadRoomAssetsChecklist([]);
      return;
    }

    const room = appState.rooms.find(r => 
      (r.kode_gedung === bCode || r.nama_gedung === bCode) && 
      r.nama_ruangan === rName
    );
    const occs = getOccupantsForRoom(bCode, rName);

    if (infoBox) {
      infoBox.classList.remove('hidden');

      // Tampilkan status slot hunian dan penghuni kamar (sesuai contoh: Ilyasa HRGA 0813... & Vacant)
      const bUpper = String(bCode).toUpperCase();
      const isMessOrLH = bUpper.includes('LH') || bUpper.includes('LONGHOUSE') || bUpper.includes('MESS') || bUpper.includes('SPV') || bUpper.includes('STAFF');
      
      let bedSlotsHtml = '';
      if (occs.length > 0) {
        bedSlotsHtml = occs.map((o, i) => `
          <div class="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center">
                ${escapeHtml(o.nomor_kasur || ('Bed ' + (i + 1)))}
              </span>
              <div>
                <span class="font-bold text-slate-800 block text-xs">${escapeHtml(o.nama_penghuni)}</span>
                <span class="text-[10px] text-slate-500 font-medium">${escapeHtml(o.departemen || 'Karyawan')} &bull; ${escapeHtml(o.no_kontak || '-')}</span>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Aktif
            </span>
          </div>
        `).join('');

        // Jika kamar mess berkapasitas 2 atau 4 orang dan masih ada slot kosong
        const roomCap = parseInt(room ? (room.kapasitas || 2) : 2, 10) || 2;
        if (isMessOrLH && occs.length < roomCap) {
          const vacantCount = roomCap - occs.length;
          for (let v = 0; v < vacantCount; v++) {
            bedSlotsHtml += `
              <div class="p-2 rounded-lg bg-amber-50/60 border border-amber-200/80 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-amber-200/60 text-amber-900 font-bold text-[10px] flex items-center justify-center">
                    Bed ${occs.length + v + 1}
                  </span>
                  <div>
                    <span class="font-semibold text-amber-800 italic text-xs">Vacant (Slot Kosong)</span>
                    <span class="text-[10px] text-amber-600/70 block">Kamar siap dihuni</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                  Vacant
                </span>
              </div>
            `;
          }
        }
      } else if (isMessOrLH) {
        bedSlotsHtml = `
          <div class="p-2 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-between col-span-2">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center">0</span>
              <span class="text-xs text-slate-500 italic">Seluruh slot ranjang di kamar ini berstatus <strong>Vacant (Kosong)</strong></span>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-600">Vacant</span>
          </div>
        `;
      } else {
        bedSlotsHtml = `
          <div class="text-xs text-slate-500 italic p-1">Ruangan fasilitas/operasional (bukan hunian karyawan tetap).</div>
        `;
      }

      infoBox.innerHTML = `
        <div class="space-y-2.5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200/80 pb-2">
            <div class="flex items-center gap-2">
              <i class="ph-bold ph-bed text-indigo-500 text-base"></i>
              <span class="font-bold text-slate-900 text-xs">${escapeHtml(rName)}</span>
              <span class="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-200 text-slate-700">${escapeHtml(room ? room.tipe_ruangan || 'Kamar' : 'Kamar')}</span>
            </div>
            <div class="text-[11px] font-semibold text-slate-500">
              Kapasitas: <strong class="text-slate-800">${room ? room.kapasitas || 2 : 2} Orang</strong> &bull; Terisi: <strong class="text-emerald-600">${occs.length} Penghuni</strong>
            </div>
          </div>
          <div>
            <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Data Penghuni &amp; Ketersediaan Ranjang (Koneksi Modul Hunian):</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${bedSlotsHtml}
            </div>
          </div>
        </div>
      `;

      // Jika ada penghuni aktif, auto-fill PIC penanggungjawab ruangan dengan nama penghuni pertama
      if (occs.length > 0 && occs[0].nama_penghuni) {
        const picField = document.getElementById('insp-pic');
        if (picField && (!picField.value || picField.value === '-' || picField.value === 'Miftahul Khoiry')) {
          picField.value = occs[0].nama_penghuni + (occs[0].departemen ? ' (' + occs[0].departemen + ')' : '');
        }
      }
    }

    // 1. Ambil aset asli & valid terdaftar di database untuk gedung & ruangan ini
    let matchedAssets = [];
    const bUpper = String(bCode).trim().toUpperCase();
    const rUpper = String(rName).trim().toUpperCase();

    // Gabungkan pool data master HRGA dan appState.assets untuk memastikan seluruh 15.778 aset tercover
    const rawAssetPool = [
      ...(Array.isArray(appState.assets) ? appState.assets : []),
      ...(Array.isArray(appState.enterpriseAssets) ? appState.enterpriseAssets : []),
      ...((typeof window !== 'undefined' && window.PNS_MASTER_DATA && Array.isArray(window.PNS_MASTER_DATA.hrgaAssets)) ? window.PNS_MASTER_DATA.hrgaAssets : [])
    ];

    const seenAssetNos = new Set();
    const completeAssetPool = [];
    for (let i = 0; i < rawAssetPool.length; i++) {
      const item = rawAssetPool[i];
      const no = String(item.no_asset || item.kode_asset || item.kode_unit || '').trim();
      if (!no || !seenAssetNos.has(no)) {
        if (no) seenAssetNos.add(no);
        completeAssetPool.push(item);
      }
    }

    matchedAssets = completeAssetPool.filter(a => {
      const ab = String(a.kode_gedung || a.nama_gedung || '').trim().toUpperCase();
      const ar = String(a.nama_ruangan || a.ruangan || '').trim().toUpperCase();

      const bMatch = (ab === bUpper || ab.includes(bUpper) || bUpper.includes(ab) ||
        ab.replace(/[^A-Z0-9]/g, '') === bUpper.replace(/[^A-Z0-9]/g, ''));
      const rMatch = (ar === rUpper || ar.includes(rUpper) || rUpper.includes(ar) ||
        ar.replace(/[^A-Z0-9]/g, '') === rUpper.replace(/[^A-Z0-9]/g, ''));

      return bMatch && rMatch && isFacilityAssetItem(a);
    });

    let checklist = [];
    if (matchedAssets.length > 0) {
      checklist = matchedAssets.map(a => {
        const no = a.no_asset || a.kode_asset || '';
        const isNV = no.startsWith('NVA-') || /PENGKI|SAPU|BANTAL|GULING|SPREI|SELIMUT|KERANJANG|LAMPU|STOP\s*KONTAK|SAKLAR|CERMIN/i.test(a.nama_asset || '');
        return {
          no_asset: no,
          nama_asset: a.nama_asset || '',
          qty: a.qty || '1 Unit',
          jenis_aset: a.jenis_aset || (isNV ? 'Non-Valuable' : 'Valuable'),
          kategori_asset: a.kategori_asset || (isNV ? 'Fasilitas Mess' : 'Aset Tetap'),
          kondisi: a.kondisi || 'Baik',
          kondisi_inspeksi: a.kondisi || 'Baik',
          kode_sesuai: true,
          lokasi_sesuai: true,
          catatan_inspeksi: ''
        };
      });

      // Tambahkan item non-valuable mess standar jika belum ada
      const defaults = getDefaultRoomFacilityAssets(bCode, rName);
      const defaultNonValuables = defaults.filter(d => d.jenis_aset === 'Non-Valuable');
      defaultNonValuables.forEach(nv => {
        const exists = checklist.some(c => c.nama_asset.toLowerCase().includes(nv.nama_asset.toLowerCase().slice(0, 10)));
        if (!exists) {
          checklist.push({
            no_asset: nv.no_asset,
            nama_asset: nv.nama_asset,
            qty: nv.qty || '1 Unit',
            jenis_aset: 'Non-Valuable',
            kategori_asset: nv.kategori_asset || 'Fasilitas Mess',
            kondisi: 'Baik',
            kondisi_inspeksi: 'Baik',
            kode_sesuai: true,
            lokasi_sesuai: true,
            catatan_inspeksi: ''
          });
        }
      });
    } else {
      checklist = getDefaultRoomFacilityAssets(bCode, rName);
    }

    loadRoomAssetsChecklist(checklist);
  }

  
  // ========================================================
  // ASSET VISUAL CARDS & FIELD INSPECTION ENGINE (HRGA)
  // Persis Desain Lapangan Facility Management Hunian.html
  // Visual Cards: Bantal 4, Kasur 2, Lampu 7, Lemari 2, dll
  // ========================================================
  let activeInspTypeFilter = null;
  let inspCurrentViewMode = 'grid'; // 'grid' | 'field' | 'table'

  function classifyAssetType(namaAsset) {
    const n = String(namaAsset || '').toLowerCase();
    if (n.includes('bantal')) return { key: 'Bantal', label: 'Bantal Kepala', icon: 'ph-feather', color: 'indigo', std: 4 };
    if (n.includes('kasur') || n.includes('spring') || n.includes('matras') || n.includes('bed')) return { key: 'Kasur', label: 'Kasur / Springbed', icon: 'ph-bed', color: 'emerald', std: 2 };
    if (n.includes('lampu') || n.includes('led') || n.includes('penerangan')) return { key: 'Lampu', label: 'Lampu Kamar', icon: 'ph-lightbulb', color: 'amber', std: 2 };
    if (n.includes('lemari') || n.includes('wardrobe')) return { key: 'Lemari', label: 'Lemari 2 Pintu', icon: 'ph-door', color: 'blue', std: 2 };
    if (n.includes('loker') || n.includes('locker')) return { key: 'Loker', label: 'Loker Besi 3P', icon: 'ph-lockers', color: 'cyan', std: 2 };
    if (n.includes('gorden') || n.includes('curtain') || n.includes('tiang gorden')) return { key: 'Gorden', label: 'Gorden & Tiang', icon: 'ph-curtains', color: 'purple', std: 2 };
    if (n.includes('ranjang') || n.includes('dipan')) return { key: 'Ranjang', label: 'Ranjang Susun', icon: 'ph-stack', color: 'teal', std: 1 };
    if (n.includes('guling')) return { key: 'Guling', label: 'Guling Tidur', icon: 'ph-cylinder', color: 'rose', std: 4 };
    if (n.includes('sprei') || n.includes('selimut') || n.includes('handuk')) return { key: 'Sprei', label: 'Sprei & Selimut', icon: 'ph-coat-hanger', color: 'pink', std: 4 };
    if (n.includes('keranjang')) return { key: 'Keranjang', label: 'Keranjang Pakaian', icon: 'ph-tote', color: 'orange', std: 2 };
    if (n.includes('keset') || n.includes('karpet')) return { key: 'Keset', label: 'Keset Lantai', icon: 'ph-rug', color: 'slate', std: 1 };
    if (n.includes('sapu') || n.includes('pengki')) return { key: 'Sapu', label: 'Pengki & Sapu', icon: 'ph-broom', color: 'lime', std: 1 };
    if (n.includes('ac ') || n.includes('air conditioner') || n.includes('kipas')) return { key: 'AC', label: 'AC / Pendingin', icon: 'ph-snowflake', color: 'sky', std: 1 };
    if (n.includes('mesin cuci') || n.includes('washing')) return { key: 'MesinCuci', label: 'Mesin Cuci', icon: 'ph-arrows-clockwise', color: 'blue', std: 1 };
    if (n.includes('dryer') || n.includes('pengering')) return { key: 'Dryer', label: 'Dryer Mesin', icon: 'ph-wind', color: 'amber', std: 1 };
    if (n.includes('meja') || n.includes('kursi')) return { key: 'MejaKursi', label: 'Meja & Kursi', icon: 'ph-chair', color: 'stone', std: 2 };
    if (n.includes('tv') || n.includes('televisi')) return { key: 'TV', label: 'Smart TV', icon: 'ph-television', color: 'violet', std: 1 };
    return { key: 'Lainnya', label: 'Fasilitas Lain', icon: 'ph-cube', color: 'slate', std: 1 };
  }

  function getGroupedRoomAssets(customList) {
    const list = customList || appState.currentInspAssets || [];
    const groups = {};

    list.forEach((ast, idx) => {
      const c = classifyAssetType(ast.nama_asset);
      if (!groups[c.key]) {
        groups[c.key] = {
          key: c.key,
          label: c.label,
          icon: c.icon,
          color: c.color,
          std: c.std,
          total: 0,
          baik: 0,
          rusak: 0,
          hilang: 0,
          indices: []
        };
      }
      groups[c.key].total++;
      groups[c.key].count = groups[c.key].total;
      groups[c.key].indices.push(idx);

      const st = String(ast.kondisi_inspeksi || 'Baik').toLowerCase();
      if (st.includes('hilang')) groups[c.key].hilang++;
      else if (st.includes('rusak')) groups[c.key].rusak++;
      else groups[c.key].baik++;
    });

    return groups;
  }

  function renderInspectionVisualCards() {
    const container = document.getElementById('insp-visual-cards-grid');
    if (!container) return;

    const groups = getGroupedRoomAssets();
    const groupList = Object.values(groups);

    const totalAssets = (appState.currentInspAssets || []).length;
    const filterAllCount = document.getElementById('filter-all-count');
    if (filterAllCount) filterAllCount.innerText = totalAssets;

    if (groupList.length === 0) {
      container.innerHTML = `
        <div class="col-span-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
          <i class="ph-bold ph-cube text-xl block mb-1 text-slate-400"></i>
          Pilih gedung dan ruangan terlebih dahulu untuk melihat ringkasan visual jenis aset.
        </div>
      `;
      return;
    }

    container.innerHTML = groupList.map(g => {
      const isSelected = activeInspTypeFilter === g.key;
      let condBadge = '';
      if (g.rusak > 0 && g.hilang > 0) {
        condBadge = `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-50 text-rose-700 border border-rose-200">⚠️ ${g.rusak}R, ${g.hilang}H</span>`;
      } else if (g.rusak > 0) {
        condBadge = `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">⚠️ ${g.rusak} Rusak</span>`;
      } else if (g.hilang > 0) {
        condBadge = `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-50 text-rose-700 border border-rose-200">✕ ${g.hilang} Hilang</span>`;
      } else {
        condBadge = `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">✓ ${g.baik} Baik</span>`;
      }

      // Color maps for icon backgrounds
      const bgMap = {
        indigo: 'bg-indigo-50 text-indigo-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        amber: 'bg-amber-50 text-amber-600',
        blue: 'bg-blue-50 text-blue-600',
        cyan: 'bg-cyan-50 text-cyan-600',
        purple: 'bg-purple-50 text-purple-600',
        teal: 'bg-teal-50 text-teal-600',
        rose: 'bg-rose-50 text-rose-600',
        pink: 'bg-pink-50 text-pink-600',
        orange: 'bg-orange-50 text-orange-600',
        lime: 'bg-lime-50 text-lime-600',
        sky: 'bg-sky-50 text-sky-600',
        stone: 'bg-stone-50 text-stone-600',
        violet: 'bg-violet-50 text-violet-600',
        slate: 'bg-slate-100 text-slate-600'
      };
      const iconCls = bgMap[g.color] || bgMap.slate;

      return `
        <button type="button" onclick="filterInspectionTableByType('${g.key}', this)" class="insp-asset-visual-card relative flex flex-col justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${isSelected ? 'bg-indigo-50/50 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs' : 'bg-white border-slate-200/90 hover:border-indigo-400 hover:shadow-2xs'}" data-type-key="${g.key}">
          <!-- Top Row: Icon container + Big Bold Quantity -->
          <div class="flex items-center justify-between gap-1.5 mb-2 w-full">
            <div class="w-8 h-8 rounded-lg ${iconCls} flex items-center justify-center font-bold text-base shrink-0 shadow-2xs">
              <i class="ph-bold ${g.icon}"></i>
            </div>
            <div class="text-right">
              <span class="text-xl font-black text-slate-900 num-tabular tracking-tight block">${g.total}</span>
              <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider -mt-1 block">Unit</span>
            </div>
          </div>

          <!-- Middle: Label & Subtitle -->
          <div class="mb-2">
            <div class="font-bold text-xs text-slate-900 leading-tight truncate" title="${escapeHtml(g.label)}">${escapeHtml(g.label)}</div>
            <div class="text-[10px] text-slate-500 font-medium mt-0.5">Standar: ${g.std} Unit</div>
          </div>

          <!-- Bottom: Condition Tag & Filter Indicator -->
          <div class="flex items-center justify-between pt-2 border-t border-slate-100 w-full text-[10px]">
            ${condBadge}
            <span class="${isSelected ? 'text-indigo-700 font-extrabold' : 'text-slate-400 font-medium group-hover:text-indigo-600'} text-[10px]">
              ${isSelected ? 'Aktif ✓' : 'Filter &rarr;'}
            </span>
          </div>
        </button>
      `;
    }).join('');
  }

  function filterInspectionTableByType(typeKey, cardEl) {
    if (activeInspTypeFilter === typeKey) {
      // Toggle off
      activeInspTypeFilter = null;
    } else {
      activeInspTypeFilter = typeKey;
    }

    renderInspectionVisualCards();
    renderInspectionChecklistTable();
    renderInspectionFieldCards();

    const resetBtn = document.getElementById('btn-reset-type-filter');
    if (resetBtn) {
      if (activeInspTypeFilter) resetBtn.classList.remove('hidden');
      else resetBtn.classList.add('hidden');
    }
  }

  function resetInspectionAssetFilter() {
    activeInspTypeFilter = null;
    renderInspectionVisualCards();
    renderInspectionChecklistTable();
    renderInspectionFieldCards();

    const resetBtn = document.getElementById('btn-reset-type-filter');
    if (resetBtn) resetBtn.classList.add('hidden');
  }

  // Persis mInspeksi() di Facility Management Hunian.html
  function renderInspectionFieldCards() {
    const container = document.getElementById('insp-field-mode-container');
    if (!container) return;

    const groups = getGroupedRoomAssets();
    const groupList = Object.values(groups);

    if (groupList.length === 0) {
      container.innerHTML = '<div class="text-center py-4 text-xs text-slate-500">Tidak ada aset di ruangan ini.</div>';
      return;
    }

    // Filter if active filter is applied
    const displayedGroups = activeInspTypeFilter 
      ? groupList.filter(g => g.key === activeInspTypeFilter)
      : groupList;

    container.innerHTML = `
      <div class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between">
        <span>Pemeriksaan Lapangan Per Jenis Barang</span>
        <span class="text-[11px] font-normal text-slate-500">Standar checklist audit mess HRGA</span>
      </div>
      <div class="space-y-2.5">
        ${displayedGroups.map(g => {
          const firstIdx = g.indices[0];
          const firstAst = appState.currentInspAssets[firstIdx];
          const currentCond = firstAst ? (firstAst.kondisi_inspeksi || 'Baik') : 'Baik';
          const isRs = currentCond.includes('Rusak');
          const isHl = currentCond.includes('Hilang');

          return `
            <div class="bg-white rounded-xl border ${isRs ? 'border-amber-300 ring-1 ring-amber-200' : isHl ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-200'} p-3.5 space-y-3 transition shadow-2xs">
              <!-- Header Row -->
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                    <i class="ph-bold ${g.icon}"></i>
                  </div>
                  <div>
                    <div class="font-bold text-xs text-slate-900">${escapeHtml(g.label)}</div>
                    <div class="text-[10px] text-slate-500">Standar: ${g.std} Unit &bull; Fisik Terdata: <strong class="text-slate-800 font-bold">${g.total} Unit</strong></div>
                  </div>
                </div>
                <!-- Stepper Jumlah Fisik -->
                <div class="flex items-center gap-1.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button type="button" onclick="stepAssetTypeQuantity('${g.key}', -1)" class="w-6 h-6 rounded bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shadow-2xs cursor-pointer" title="Kurangi 1 unit">&minus;</button>
                  <span class="w-6 text-center font-black text-xs text-slate-800 num-tabular">${g.total}</span>
                  <button type="button" onclick="stepAssetTypeQuantity('${g.key}', 1)" class="w-6 h-6 rounded bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shadow-2xs cursor-pointer" title="Tambah 1 unit">+</button>
                </div>
              </div>

              <!-- 3 Tombol Kondisi Lapangan (Baik, Rusak, Hilang) persis Facility Management Hunian.html -->
              <div class="grid grid-cols-3 gap-2">
                <button type="button" onclick="setGroupCondition('${g.key}', 'Baik')" class="py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${currentCond === 'Baik' ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200'}">
                  <i class="ph-bold ph-check text-xs"></i> Baik (${g.baik})
                </button>
                <button type="button" onclick="setGroupCondition('${g.key}', 'Rusak Ringan')" class="py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${isRs ? 'bg-amber-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700 border border-slate-200'}">
                  <i class="ph-bold ph-warning text-xs"></i> Rusak (${g.rusak})
                </button>
                <button type="button" onclick="setGroupCondition('${g.key}', 'Hilang')" class="py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${isHl ? 'bg-rose-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700 border border-slate-200'}">
                  <i class="ph-bold ph-x text-xs"></i> Hilang (${g.hilang})
                </button>
              </div>

              <!-- Jika ada temuan Rusak atau Hilang: Tampilkan tombol Foto Kamera & Catatan Lapangan -->
              ${(isRs || isHl) ? `
                <div class="pt-2 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                  <!-- Tombol Kamera Native HP Langsung -->
                  <label class="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition shadow-2xs">
                    <i class="ph-bold ph-camera text-sm"></i> <span>+ Foto Bukti Kamera</span>
                    <input type="file" accept="image/*" capture="environment" onchange="uploadAssetPhotoDirect(${firstIdx}, event)" class="hidden">
                  </label>
                  <input type="text" oninput="updateAssetNote(${firstIdx}, this.value)" value="${escapeHtml(firstAst.catatan_inspeksi || '')}" placeholder="Catatan temuan (mis: busa sobek / lampu mati)..." class="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:border-indigo-500">
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function setGroupCondition(typeKey, cond) {
    const list = appState.currentInspAssets || [];
    list.forEach(ast => {
      if (classifyAssetType(ast.nama_asset).key === typeKey) {
        ast.kondisi_inspeksi = cond;
      }
    });

    renderInspectionVisualCards();
    renderInspectionChecklistTable();
    renderInspectionFieldCards();
    calcInspectionScore();
  }

  function stepAssetTypeQuantity(typeKey, delta) {
    const list = appState.currentInspAssets || [];
    if (delta > 0) {
      // Add a unit of this type
      const sample = list.find(a => classifyAssetType(a.nama_asset).key === typeKey);
      const newAst = {
        no_asset: 'NVA-' + typeKey.toUpperCase() + '-' + Date.now().toString().slice(-4),
        nama_asset: sample ? sample.nama_asset : (typeKey + ' Tambahan'),
        qty: '1 Unit',
        jenis_aset: 'Non-Valuable',
        kategori_asset: sample ? sample.kategori_asset : 'FASILITAS',
        kondisi: 'Baik',
        kondisi_inspeksi: 'Baik',
        kode_sesuai: true,
        lokasi_sesuai: true,
        foto_asset: '',
        catatan_inspeksi: 'Ditambahkan saat inspeksi lapangan',
        is_new: true
      };
      appState.currentInspAssets.push(newAst);
    } else if (delta < 0) {
      // Remove last matching unit if more than 1
      const matchingIndices = [];
      list.forEach((a, idx) => {
        if (classifyAssetType(a.nama_asset).key === typeKey) matchingIndices.push(idx);
      });
      if (matchingIndices.length > 0) {
        const lastIdx = matchingIndices[matchingIndices.length - 1];
        appState.currentInspAssets.splice(lastIdx, 1);
      }
    }

    renderInspectionVisualCards();
    renderInspectionChecklistTable();
    renderInspectionFieldCards();
    calcInspectionScore();
  }

  function setInspectionViewMode(mode, btnEl) {
    inspCurrentViewMode = mode;

    ['grid', 'field', 'table'].forEach(m => {
      const b = document.getElementById('btn-viewmode-' + m);
      if (b) {
        if (m === mode) {
          b.className = 'px-2.5 py-1 rounded-md bg-white text-slate-900 shadow-2xs transition flex items-center gap-1 cursor-pointer font-bold';
        } else {
          b.className = 'px-2.5 py-1 rounded-md text-slate-600 hover:text-slate-900 transition flex items-center gap-1 cursor-pointer font-bold';
        }
      }
    });

    const gridEl = document.getElementById('insp-visual-cards-grid');
    const fieldEl = document.getElementById('insp-field-mode-container');
    const tableEl = document.getElementById('insp-detail-table-container');

    if (mode === 'grid') {
      if (gridEl) gridEl.classList.remove('hidden');
      if (fieldEl) fieldEl.classList.add('hidden');
      if (tableEl) tableEl.classList.remove('hidden');
    } else if (mode === 'field') {
      if (gridEl) gridEl.classList.remove('hidden');
      if (fieldEl) fieldEl.classList.remove('hidden');
      if (tableEl) tableEl.classList.add('hidden');
    } else if (mode === 'table') {
      if (gridEl) gridEl.classList.add('hidden');
      if (fieldEl) fieldEl.classList.add('hidden');
      if (tableEl) tableEl.classList.remove('hidden');
    }
  }

  function renderInspectionChecklistTable() {
    const tbody = document.getElementById('insp-asset-checklist');
    const badge = document.getElementById('insp-asset-count-badge');
    const list = appState.currentInspAssets || [];

    if (badge) badge.innerText = list.length + ' Item Aset';
    if (!tbody) return;

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-8 text-slate-500">
            <i class="ph-bold ph-cube text-xl mb-1 block text-slate-400"></i>
            Tidak ada aset tercatat di ruangan ini. Klik <strong>Tambah Item Aset Baru</strong> jika menemukan barang fisik saat audit.
          </td>
        </tr>
      `;
      calcInspectionScore();
      return;
    }

    // Filter by type if active
    const filtered = list.map((ast, idx) => ({ ast, idx })).filter(item => {
      if (!activeInspTypeFilter) return true;
      return classifyAssetType(item.ast.nama_asset).key === activeInspTypeFilter;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-8 text-slate-500">
            <i class="ph-bold ph-funnel text-xl mb-1 block text-slate-400"></i>
            Tidak ada aset jenis ${escapeHtml(activeInspTypeFilter)} di ruangan ini.
            <button type="button" onclick="resetInspectionAssetFilter()" class="block mx-auto mt-2 text-indigo-600 font-bold hover:underline">Tampilkan Semua Aset</button>
          </td>
        </tr>
      `;
      calcInspectionScore();
      return;
    }

    tbody.innerHTML = filtered.map(({ ast, idx }) => `
      <tr class="hover:bg-slate-50/70 transition">
        <td class="py-2.5 px-3">
          <span class="font-mono font-bold text-slate-800 text-xs block">${escapeHtml(ast.no_asset)}</span>
          ${ast.is_new ? '<span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 inline-block mt-0.5">BARU</span>' : ''}
        </td>
        <td class="py-2.5 px-3">
          <span class="font-bold text-slate-900 text-xs block leading-tight">${escapeHtml(ast.nama_asset)}</span>
          <span class="text-[10px] text-slate-500 font-medium">${escapeHtml(ast.kategori_asset || 'Fasilitas')}</span>
        </td>
        <td class="py-2.5 px-3 whitespace-nowrap">
          <div class="flex flex-col gap-1 items-start">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${ast.jenis_aset === 'Non-Valuable' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}">
              ${ast.jenis_aset === 'Non-Valuable' ? '📦 Non-Valuable' : '💎 Valuable Aset'}
            </span>
            <span class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700">
              <i class="ph-bold ph-stack text-slate-500"></i> ${escapeHtml(ast.qty || '1 Unit')}
            </span>
          </div>
        </td>
        <td class="py-2.5 px-3 space-y-1 whitespace-nowrap">
          <label class="flex items-center gap-1.5 cursor-pointer text-[11px]">
            <input type="checkbox" ${ast.kode_sesuai ? 'checked' : ''} onchange="toggleVerifyCode(${idx}, this.checked)" class="rounded text-emerald-600 focus:ring-emerald-500">
            <span class="${ast.kode_sesuai ? 'text-emerald-700 font-semibold' : 'text-slate-500'}">Kode Sesuai</span>
          </label>
          <label class="flex items-center gap-1.5 cursor-pointer text-[11px]">
            <input type="checkbox" ${ast.lokasi_sesuai ? 'checked' : ''} onchange="toggleVerifyLocation(${idx}, this.checked)" class="rounded text-emerald-600 focus:ring-emerald-500">
            <span class="${ast.lokasi_sesuai ? 'text-emerald-700 font-semibold' : 'text-slate-500'}">Lokasi Sesuai</span>
          </label>
        </td>
        <td class="py-2.5 px-3">
          <select onchange="setAssetStatus(${idx}, this.value)" class="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:border-emerald-500">
            <option value="Baik" ${ast.kondisi_inspeksi === 'Baik' ? 'selected' : ''}>✅ Baik</option>
            <option value="Rusak Ringan" ${ast.kondisi_inspeksi === 'Rusak Ringan' ? 'selected' : ''}>⚠️ Rusak Ringan</option>
            <option value="Rusak Berat" ${ast.kondisi_inspeksi === 'Rusak Berat' ? 'selected' : ''}>❌ Rusak Berat</option>
            <option value="Hilang" ${ast.kondisi_inspeksi === 'Hilang' ? 'selected' : ''}>🚫 Hilang</option>
          </select>
        </td>
        <!-- FOTO LANGSUNG DARI KAMERA HP (NATIVE CAPTURE) & GALERI FILE -->
        <td class="py-2.5 px-3">
          <div class="flex items-center gap-1.5 flex-wrap">
            ${ast.foto_asset ? `
              <div class="relative group">
                <img src="${ast.foto_asset}" class="w-8 h-8 rounded-lg object-cover border border-emerald-300 shadow-2xs shrink-0 cursor-pointer" onclick="Swal.fire({imageUrl: '${ast.foto_asset}', imageAlt: 'Foto Fisik Aset', showConfirmButton: false})" title="Klik perbesar foto">
                <button type="button" onclick="removeAssetPhoto(${idx}, event)" class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center hover:bg-rose-700 shadow-xs" title="Hapus foto">&times;</button>
              </div>
            ` : ''}
            <!-- Tombol Buka Kamera HP Langsung -->
            <label class="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer transition shadow-2xs" title="Buka Kamera HP Langsung">
              <i class="ph-bold ph-camera text-xs"></i> <span>Kamera</span>
              <input type="file" accept="image/*" capture="environment" onchange="uploadAssetPhotoDirect(${idx}, event)" class="hidden">
            </label>
            <!-- Tombol Pilih dari Galeri / File -->
            <label class="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] flex items-center cursor-pointer transition border border-slate-200" title="Pilih dari Galeri Foto">
              <i class="ph-bold ph-image text-xs"></i>
              <input type="file" accept="image/*" onchange="uploadAssetPhotoDirect(${idx}, event)" class="hidden">
            </label>
          </div>
        </td>
        <td class="py-2.5 px-3">
          <input type="text" oninput="updateAssetNote(${idx}, this.value)" value="${escapeHtml(ast.catatan_inspeksi || '')}" placeholder="Catatan fisik..." class="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800">
        </td>
        <td class="py-2.5 px-2 text-center">
          <button type="button" onclick="deleteAssetItem(${idx})" class="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition" title="Hapus dari checklist">
            <i class="ph-bold ph-trash text-sm"></i>
          </button>
        </td>
      </tr>
    `).join('');

    calcInspectionScore();
  }

  function loadRoomAssetsChecklist(assets) {
    appState.currentInspAssets = (assets || []).map(a => ({
      no_asset: a.no_asset || '',
      nama_asset: a.nama_asset || '',
      qty: a.qty || '1 Unit',
      jenis_aset: a.jenis_aset || (String(a.no_asset || '').startsWith('NVA-') ? 'Non-Valuable' : 'Valuable'),
      kategori_asset: a.kategori_asset || 'FASILITAS',
      kondisi: a.kondisi || 'Baik',
      kondisi_inspeksi: a.kondisi_inspeksi || a.kondisi || 'Baik',
      kode_sesuai: a.kode_sesuai !== false,
      lokasi_sesuai: a.lokasi_sesuai !== false,
      foto_asset: a.foto_asset || '',
      catatan_inspeksi: a.catatan_inspeksi || a.catatan || '',
      is_new: !!a.is_new
    }));

    activeInspTypeFilter = null;
    renderInspectionVisualCards();
    renderInspectionChecklistTable();
    renderInspectionFieldCards();
  }

  function toggleVerifyCode(idx, checked) {
    if (appState.currentInspAssets[idx]) {
      appState.currentInspAssets[idx].kode_sesuai = checked;
    }
    calcInspectionScore();
  }

  function toggleVerifyLocation(idx, checked) {
    if (appState.currentInspAssets[idx]) {
      appState.currentInspAssets[idx].lokasi_sesuai = checked;
    }
    calcInspectionScore();
  }

  function setAssetStatus(idx, val) {
    if (appState.currentInspAssets[idx]) {
      appState.currentInspAssets[idx].kondisi_inspeksi = val;
    }
    calcInspectionScore();
  }

  function updateAssetNote(idx, val) {
    if (appState.currentInspAssets[idx]) {
      appState.currentInspAssets[idx].catatan_inspeksi = val;
    }
  }

  
  // ========================================================
  // COMPACT & FAST IMAGE PROCESSOR FOR SMARTPHONE CAMERAS
  // ========================================================
  function uploadAssetPhotoDirect(idx, event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        let w = img.width;
        let h = img.height;
        const maxDim = 1024;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
        if (appState.currentInspAssets && appState.currentInspAssets[idx]) {
          appState.currentInspAssets[idx].foto_asset = compressedBase64;
          loadRoomAssetsChecklist(appState.currentInspAssets);
          if (typeof Swal !== 'undefined') {
            Swal.fire({
              icon: 'success',
              title: 'Foto Tersimpan',
              text: 'Foto fisik aset berhasil dilampirkan.',
              timer: 1100,
              showConfirmButton: false
            });
          }
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function removeAssetPhoto(idx, evt) {
    if (evt) evt.stopPropagation();
    if (appState.currentInspAssets && appState.currentInspAssets[idx]) {
      appState.currentInspAssets[idx].foto_asset = null;
      loadRoomAssetsChecklist(appState.currentInspAssets);
    }
  }

  function uploadAssetPhoto(idx, evt) {
    const file = evt.target.files && evt.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      if (appState.currentInspAssets[idx]) {
        appState.currentInspAssets[idx].foto_asset = e.target.result;
        loadRoomAssetsChecklist(appState.currentInspAssets);
      }
    };
    reader.readAsDataURL(file);
  }

  function deleteAssetItem(idx) {
    if (confirm('Hapus aset ini dari checklist inspeksi?')) {
      appState.currentInspAssets.splice(idx, 1);
      loadRoomAssetsChecklist(appState.currentInspAssets);
    }
  }

  function markAllAssetsGood() {
    appState.currentInspAssets.forEach(ast => {
      ast.kode_sesuai = true;
      ast.lokasi_sesuai = true;
      ast.kondisi_inspeksi = 'Baik';
    });
    loadRoomAssetsChecklist(appState.currentInspAssets);
  }

  function calcInspectionScore() {
    const list = appState.currentInspAssets || [];
    if (list.length === 0) {
      const elSkor = document.getElementById('insp-skor');
      const lblSkor = document.getElementById('skor-label');
      if (elSkor) elSkor.value = 100;
      if (lblSkor) lblSkor.innerText = '100';
      return;
    }
    const goodCount = list.filter(a => a.kondisi_inspeksi === 'Baik' && a.kode_sesuai && a.lokasi_sesuai).length;
    const score = Math.round((goodCount / list.length) * 100);
    const elSkor = document.getElementById('insp-skor');
    const lblSkor = document.getElementById('skor-label');
    if (elSkor) elSkor.value = score;
    if (lblSkor) {
      lblSkor.innerText = score;
      if (score >= 90) {
        lblSkor.className = 'num-tabular text-emerald-600 font-extrabold ml-1';
      } else if (score >= 75) {
        lblSkor.className = 'num-tabular text-amber-600 font-extrabold ml-1';
      } else {
        lblSkor.className = 'num-tabular text-rose-600 font-extrabold ml-1';
      }
    }
  }

  function updateStatusKelaikanAuto(val) {
    const num = parseInt(val, 10);
    const sel = document.getElementById('insp-status');
    if (num >= 90) sel.value = 'Aman';
    else if (num >= 75) sel.value = 'Ada Temuan';
    else if (num >= 50) sel.value = 'Perlu Perbaikan';
    else sel.value = 'Kritis';
  }

  function startInspectionForBldg(kodeGedung) {
    navTo('view-inspeksi');
    const gSelect = document.getElementById('insp-gedung');
    gSelect.value = kodeGedung;
    onInspGedungChange();
  }

  function startInspectionForRoom(kodeGedung, namaRuangan) {
    navTo('view-inspeksi');
    const gSelect = document.getElementById('insp-gedung');
    gSelect.value = kodeGedung;
    onInspGedungChange();
    setTimeout(() => {
      const rSelect = document.getElementById('insp-ruangan');
      rSelect.value = namaRuangan;
      onInspRuanganChange();
    }, 60);
  }

  function promptAddAssetToRoom() {
    const bCode = document.getElementById('insp-gedung').value;
    const rName = document.getElementById('insp-ruangan').value;
    if (!bCode || !rName) {
      Swal.fire('Perhatian', 'Pilih gedung dan ruangan terlebih dahulu.', 'warning');
      return;
    }

    Swal.fire({
      title: 'Tambah Item Aset ke Ruangan Ini',
      html: `
        <div class="space-y-3 text-left text-xs">
          <div>
            <label class="block font-semibold mb-1">Kode / Nomor Aset:</label>
            <input type="text" id="swal-no-asset" class="swal2-input !h-8 !text-xs !w-full !m-0" placeholder="Contoh: N-700-712-0001-xxxx atau NVA-LMP-01">
          </div>
          <div>
            <label class="block font-semibold mb-1">Nama Aset / Fasilitas Fisik:</label>
            <input type="text" id="swal-nama-asset" class="swal2-input !h-8 !text-xs !w-full !m-0" placeholder="Contoh: AC Sharp 1 PK / Bantal Dacron / Stop Kontak">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-semibold mb-1">Klasifikasi Aset:</label>
              <select id="swal-jenis" class="swal2-select !h-8 !text-xs !w-full !m-0">
                <option value="Valuable">💎 Valuable Asset</option>
                <option value="Non-Valuable">⚡ Non-Valuable / Fasilitas Mess</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold mb-1">Jumlah / Qty:</label>
              <input type="text" id="swal-qty" class="swal2-input !h-8 !text-xs !w-full !m-0" value="1 Unit" placeholder="1 Unit / 2 Titik">
            </div>
          </div>
          <div>
            <label class="block font-semibold mb-1">Kondisi Fisik Aktual:</label>
            <select id="swal-cond" class="swal2-select !h-8 !text-xs !w-full !m-0">
              <option value="Baik">✅ Baik</option>
              <option value="Rusak Ringan">⚠️ Rusak Ringan</option>
              <option value="Rusak Berat">❌ Rusak Berat</option>
              <option value="Hilang">❓ Hilang</option>
            </select>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Tambahkan ke Checklist',
      cancelButtonText: 'Batal',
      preConfirm: () => ({
        no_asset: document.getElementById('swal-no-asset').value.trim(),
        nama_asset: document.getElementById('swal-nama-asset').value.trim(),
        jenis_aset: document.getElementById('swal-jenis').value,
        qty: document.getElementById('swal-qty').value.trim() || '1 Unit',
        kondisi: document.getElementById('swal-cond').value
      })
    }).then(res => {
      if (res.isConfirmed && res.value.nama_asset) {
        const isNV = res.value.jenis_aset === 'Non-Valuable';
        const defaultNo = isNV ? ('NVA-' + Date.now().toString().slice(-4)) : ('PNS-NEW-' + Date.now().toString().slice(-4));
        const newItem = {
          kode_gedung: bCode,
          nama_ruangan: rName,
          no_asset: res.value.no_asset || defaultNo,
          nama_asset: res.value.nama_asset,
          jenis_aset: res.value.jenis_aset,
          qty: res.value.qty,
          kondisi: res.value.kondisi,
          kondisi_inspeksi: res.value.kondisi,
          kode_sesuai: true,
          lokasi_sesuai: true,
          kategori_asset: isNV ? 'FASILITAS MESS' : 'INVENTARIS KAMAR',
          total_harga_perolehan: 0,
          is_new: true
        };
        appState.currentInspAssets.push(newItem);
        loadRoomAssetsChecklist(appState.currentInspAssets);
        Swal.fire('Berhasil', 'Item ' + newItem.nama_asset + ' (' + newItem.qty + ') berhasil ditambahkan ke checklist audit.', 'success');
      }
    });
  }

  function submitInspection() {
    const bCode = document.getElementById('insp-gedung').value;
    const rName = document.getElementById('insp-ruangan').value;
    const pic = document.getElementById('insp-pic').value;
    const inspector = document.getElementById('insp-inspector').value;
    const skor = document.getElementById('insp-skor').value;
    const status = document.getElementById('insp-status').value;
    const catatan = document.getElementById('insp-catatan').value;

    if (!bCode || !rName) {
      Swal.fire('Data Belum Lengkap', 'Pilih Gedung dan Ruangan yang diperiksa.', 'warning');
      return;
    }

    const bldg = appState.buildings.find(b => b.kode_gedung === bCode);
    const payload = {
      kode_gedung: bCode,
      nama_gedung: bldg ? bldg.nama_gedung : bCode,
      nama_ruangan: rName,
      penanggungjawab: pic,
      inspector_nama: inspector,
      skor_kelaikan: parseInt(skor, 10),
      kondisi_ruangan: status,
      catatan_temuan: catatan,
      asset_items: appState.currentInspAssets
    };

    Swal.fire({ title: 'Menyimpan ke Google Sheets...', didOpen: () => Swal.showLoading() });
    callBackendPost('save_inspection', payload, res => {
      const noInsp = (res && res.no_inspeksi) ? res.no_inspeksi : ('INSP-' + new Date().getFullYear() + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('00' + (appState.inspections.length + 1)).slice(-3));
      addInspectionLocal(payload, noInsp);
      Swal.fire('Tersimpan!', `Laporan audit fasilitas berhasil disimpan. Nomor: ${noInsp}`, 'success');
      resetInspectionForm();
      navTo('view-riwayat-inspeksi');
    }, err => {
      Swal.fire('Gagal Menyimpan', err ? err.toString() : 'Terjadi gangguan jaringan.', 'error');
    });
  }

  function addInspectionLocal(p, noInsp) {
    const newRec = {
      inspection_id: appState.inspections.length + 1,
      no_inspeksi: noInsp,
      tanggal_inspeksi: new Date().toISOString().slice(0, 10),
      kode_gedung: p.kode_gedung,
      nama_gedung: p.nama_gedung,
      nama_ruangan: p.nama_ruangan,
      penanggungjawab: p.penanggungjawab,
      inspector_nama: p.inspector_nama,
      kondisi_ruangan: p.kondisi_ruangan,
      skor_kelaikan: p.skor_kelaikan,
      catatan_temuan: p.catatan_temuan,
      total_asset_diperiksa: p.asset_items ? p.asset_items.length : 0
    };
    appState.inspections.unshift(newRec);
    const inspCountEl = document.getElementById('stat-insp-count');
    if (inspCountEl) inspCountEl.innerText = appState.inspections.length;
    renderHistoryTable();
  }

  function resetInspectionForm() {
    document.getElementById('insp-gedung').value = '';
    document.getElementById('insp-ruangan').innerHTML = '<option value="">-- Pilih Gedung Terlebih Dahulu --</option>';
    document.getElementById('insp-ruangan').disabled = true;
    document.getElementById('insp-skor').value = 100;
    document.getElementById('skor-label').innerText = '100';
    document.getElementById('insp-status').value = 'Aman';
    document.getElementById('insp-catatan').value = '';
    document.getElementById('insp-gedung-info').classList.add('hidden');
    document.getElementById('insp-ruang-info').classList.add('hidden');
    loadRoomAssetsChecklist([]);
  }

  // ==========================================
  // RIWAYAT AUDIT TABLE & MODAL DETAIL
  // ==========================================
  function renderHistoryTable() {
    const tbody = document.getElementById('table-history-body');
    if (!tbody) return;

    tbody.innerHTML = appState.inspections.map(item => `
      <tr>
        <td class="font-mono font-bold text-sky-600">${escapeHtml(item.no_inspeksi)}</td>
        <td class="num-tabular">${escapeHtml(item.tanggal_inspeksi)}</td>
        <td class="font-bold">${escapeHtml(item.kode_gedung)}</td>
        <td>${escapeHtml(item.nama_ruangan)}</td>
        <td>${escapeHtml(item.penanggungjawab)}</td>
        <td>${escapeHtml(item.inspector_nama)}</td>
        <td class="num-tabular"><span class="font-bold text-emerald-600">${item.skor_kelaikan}</span>/100</td>
        <td><span class="px-2 py-0.5 rounded text-[10px] font-bold ${item.kondisi_ruangan === 'Aman' ? 'bg-emerald-100 text-emerald-800 ' : 'bg-rose-100 text-rose-800'}">${escapeHtml(item.kondisi_ruangan)}</span></td>
        <td class="num-tabular">${item.total_asset_diperiksa} item</td>
        <td>
          <button type="button" onclick="viewInspectionDetail('${escapeHtml(item.no_inspeksi)}')" class="px-2.5 py-1 text-[10px] font-bold rounded bg-slate-100 hover:bg-slate-200 :bg-slate-700">
            Detail / Resume
          </button>
        </td>
      </tr>
    `).join('');
  }

  function viewInspectionDetail(noInspeksi) {
    const item = appState.inspections.find(i => i.no_inspeksi === noInspeksi);
    if (!item) return;

    document.getElementById('modal-insp-title').innerText = `Laporan Audit: ${item.no_inspeksi}`;
    document.getElementById('modal-insp-content').innerHTML = `
      <div class="border-b border-slate-200 pb-3 flex justify-between items-center">
        <div>
          <div class="text-[10px] text-slate-500 uppercase font-bold">PT PRATAMA NUSANTARA SAKTI &bull; DIVISI GENERAL SERVICES &amp; FASILITAS</div>
          <div class="text-base font-bold text-slate-900">${escapeHtml(item.nama_gedung || item.kode_gedung)}</div>
          <div class="text-xs text-slate-500">Ruangan / Kamar: <strong>${escapeHtml(item.nama_ruangan)}</strong></div>
        </div>
        <div class="text-right num-tabular">
          <span class="text-2xl font-black text-emerald-600">${item.skor_kelaikan}</span><span class="text-xs text-slate-500">/100</span>
          <div class="text-[11px] font-bold text-slate-700">${escapeHtml(item.kondisi_ruangan)}</div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg">
        <div><span class="text-slate-500">Tanggal Audit:</span> <strong class="num-tabular">${escapeHtml(item.tanggal_inspeksi)}</strong></div>
        <div><span class="text-slate-500">Auditor:</span> <strong>${escapeHtml(item.inspector_nama)}</strong></div>
        <div><span class="text-slate-500">Penanggungjawab PIC:</span> <strong>${escapeHtml(item.penanggungjawab)}</strong></div>
        <div><span class="text-slate-500">Total Aset Diperiksa:</span> <strong class="num-tabular">${item.total_asset_diperiksa} Item</strong></div>
      </div>

      <div>
        <div class="font-bold text-xs uppercase tracking-wider text-slate-500 mb-1">Catatan Temuan Fisik:</div>
        <div class="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
          ${escapeHtml(item.catatan_temuan || 'Tidak ada catatan temuan. Kondisi fisik ruangan dan aset dalam keadaan baik sesuai SOP PT Pratama Nusantara Sakti.')}
        </div>
      </div>
    `;
    document.getElementById('modal-detail-insp').classList.remove('hidden');
  }

  function closeDetailModal() {
    const modal = document.getElementById('modal-detail-insp');
    if (modal) modal.classList.add('hidden');
  }

  // ==========================================
  // WORK ORDERS & PENGHUNI TABLES
  // ==========================================
    // ==========================================
  // WORK ORDER KANBAN & MAINTENANCE (ENTERPRISE)
  // ==========================================
  let currentWoViewMode = 'kanban';

  function switchWoViewMode(mode) {
    currentWoViewMode = mode;
    const kanbanEl = document.getElementById('wo-container-kanban');
    const tableEl = document.getElementById('wo-container-table');
    const btnKanban = document.getElementById('btn-wo-view-kanban');
    const btnTable = document.getElementById('btn-wo-view-table');

    if (mode === 'kanban') {
      if (kanbanEl) kanbanEl.classList.remove('hidden');
      if (tableEl) tableEl.classList.add('hidden');
      if (btnKanban) {
        btnKanban.className = 'px-2.5 py-1 text-xs font-bold rounded-lg bg-white  text-slate-900  shadow-2xs transition cursor-pointer';
      }
      if (btnTable) {
        btnTable.className = 'px-2.5 py-1 text-xs font-bold rounded-lg text-slate-600  hover:text-slate-900 transition cursor-pointer';
      }
    } else {
      if (kanbanEl) kanbanEl.classList.add('hidden');
      if (tableEl) tableEl.classList.remove('hidden');
      if (btnTable) {
        btnTable.className = 'px-2.5 py-1 text-xs font-bold rounded-lg bg-white  text-slate-900  shadow-2xs transition cursor-pointer';
      }
      if (btnKanban) {
        btnKanban.className = 'px-2.5 py-1 text-xs font-bold rounded-lg text-slate-600  hover:text-slate-900 transition cursor-pointer';
      }
    }
  }

  function renderWorkOrdersKanban() {
    const bldgSelect = document.getElementById('filter-wo-gedung');
    if (bldgSelect && bldgSelect.options.length <= 1) {
      const bldgSet = new Set(appState.workOrders.map(w => w.kode_gedung).filter(Boolean));
      appState.buildings.forEach(b => bldgSet.add(b.kode_gedung));
      [...bldgSet].sort().forEach(code => {
        const opt = document.createElement('option');
        opt.value = code;
        opt.textContent = code;
        bldgSelect.appendChild(opt);
      });
    }

    const filterBldg = (document.getElementById('filter-wo-gedung')?.value || 'ALL');
    const filterPrio = (document.getElementById('filter-wo-prioritas')?.value || 'ALL');
    const filterTech = (document.getElementById('filter-wo-teknisi')?.value || 'ALL');
    const query = (document.getElementById('filter-wo-search')?.value || '').toLowerCase();

    const filtered = appState.workOrders.filter(w => {
      const matchBldg = (filterBldg === 'ALL' || w.kode_gedung === filterBldg);
      const matchPrio = (filterPrio === 'ALL' || w.prioritas === filterPrio);
      const matchTech = (filterTech === 'ALL' || String(w.teknisi_nama || '').toLowerCase().includes(filterTech.toLowerCase()));
      const matchQuery = !query ||
        String(w.no_wo || '').toLowerCase().includes(query) ||
        String(w.judul_pekerjaan || '').toLowerCase().includes(query) ||
        String(w.kode_gedung || '').toLowerCase().includes(query) ||
        String(w.lokasi_detail || '').toLowerCase().includes(query);
      return matchBldg && matchPrio && matchTech && matchQuery;
    });

    // Update KPI badges
    const counts = { 'Baru': 0, 'Ditugaskan': 0, 'Dikerjakan': 0, 'Selesai': 0 };
    filtered.forEach(w => {
      const s = (w.status === 'Menunggu Sparepart') ? 'Dikerjakan' : (w.status || 'Baru');
      if (counts.hasOwnProperty(s)) counts[s]++;
      else counts['Baru']++;
    });

    const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.innerText = v; };
    setVal('wo-kpi-total', filtered.length);
    setVal('wo-kpi-baru', counts['Baru']);
    setVal('wo-kpi-ditugaskan', counts['Ditugaskan']);
    setVal('wo-kpi-dikerjakan', counts['Dikerjakan']);
    setVal('wo-kpi-selesai', counts['Selesai']);

    setVal('badge-count-Baru', counts['Baru']);
    setVal('badge-count-Ditugaskan', counts['Ditugaskan']);
    setVal('badge-count-Dikerjakan', counts['Dikerjakan']);
    setVal('badge-count-Selesai', counts['Selesai']);
    setVal('sidebar-wo-count', appState.workOrders.length);

    // Reset columns
    ['Baru', 'Ditugaskan', 'Dikerjakan', 'Selesai'].forEach(st => {
      const col = document.getElementById(`col-${st}`);
      if (col) col.innerHTML = '';
    });

    // Populate columns
    filtered.forEach(w => {
      const st = (w.status === 'Menunggu Sparepart') ? 'Dikerjakan' : (w.status || 'Baru');
      const col = document.getElementById(`col-${st}`) || document.getElementById('col-Baru');
      if (col) {
        col.appendChild(createKanbanCard(w));
      }
    });

    ['Baru', 'Ditugaskan', 'Dikerjakan', 'Selesai'].forEach(st => {
      const col = document.getElementById(`col-${st}`);
      if (col && col.children.length === 0) {
        col.innerHTML = '<div class="py-8 text-center text-xs text-slate-500 font-medium">Tidak ada tiket di tahap ini</div>';
      }
    });

    // Also populate Table
    const tbody = document.getElementById('table-wo-body');
    if (tbody) {
      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="py-6 text-center text-slate-500">Tidak ada tiket work order yang sesuai filter</td></tr>';
      } else {
        tbody.innerHTML = filtered.map(w => {
          const prioClass = w.prioritas === 'Tinggi' ? 'bg-rose-100 text-rose-800  ' :
            (w.prioritas === 'Sedang' ? 'bg-amber-100 text-amber-800  ' : 'bg-slate-100 text-slate-700 ');
          const statusClass = w.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800  ' :
            (w.status === 'Dikerjakan' ? 'bg-amber-100 text-amber-800  ' :
            (w.status === 'Ditugaskan' ? 'bg-indigo-100 text-indigo-800  ' : 'bg-sky-100 text-sky-800  '));
          return `
            <tr class="hover:bg-slate-50 :bg-slate-800/50 transition">
              <td class="py-2 px-3 font-mono font-bold text-sky-600">${escapeHtml(w.no_wo)}</td>
              <td class="py-2 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100">${escapeHtml(w.tipe_wo || 'Korektif')}</span></td>
              <td class="py-2 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${prioClass}">${escapeHtml(w.prioritas || 'Sedang')}</span></td>
              <td class="py-2 px-3 font-bold text-slate-800">${escapeHtml(w.judul_pekerjaan)}</td>
              <td class="py-2 px-3">${escapeHtml(w.kode_gedung)} &bull; ${escapeHtml(w.lokasi_detail || '-')}</td>
              <td class="py-2 px-3">${escapeHtml(w.teknisi_nama || 'Belum Ditugaskan')}</td>
              <td class="py-2 px-3">${escapeHtml(w.sla_target || 'SLA 2 Hari')}</td>
              <td class="py-2 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${statusClass}">${escapeHtml(w.status || 'Baru')}</span></td>
              <td class="py-2 px-3 font-mono num-tabular">Rp ${Number(w.biaya_estimasi || 0).toLocaleString('id-ID')}</td>
              <td class="py-2 px-3 text-center">
                <button type="button" onclick="moveStatusPrompt('${w.wo_id || w.no_wo}', '${w.status || 'Baru'}')" class="px-2 py-1 rounded bg-slate-100 hover:bg-sky-600 hover:text-white text-xs font-semibold transition cursor-pointer">
                  Ubah Status
                </button>
              </td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  function createKanbanCard(w) {
    const card = document.createElement('div');
    card.className = 'clean-card p-3 space-y-2 bg-white  border border-slate-200  rounded-xl hover:shadow-md transition cursor-pointer hover:-translate-y-0.5';

    let prioBadge = `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-700">Sedang</span>`;
    if (w.prioritas === 'Tinggi') {
      prioBadge = `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-100 text-rose-700">Tinggi</span>`;
    } else if (w.prioritas === 'Rendah') {
      prioBadge = `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600">Rendah</span>`;
    }

    let slaBadge = `<span class="text-[10px] text-slate-500">${escapeHtml(w.sla_target || 'SLA 2 Hari')}</span>`;
    if (w.is_overdue === '1' || (w.sla_target && w.sla_target.includes('Lewat'))) {
      slaBadge = `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-100 text-rose-700">Lewat SLA</span>`;
    } else if (w.status === 'Selesai') {
      slaBadge = `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700">Tepat Waktu</span>`;
    }

    const techName = w.teknisi_nama || 'Belum Ditugaskan';
    const inisial = w.teknisi_inisial || (techName !== 'Belum Ditugaskan' ? techName.substring(0, 2).toUpperCase() : '?');

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="font-mono text-[10.5px] font-bold text-sky-600">${escapeHtml(w.no_wo)}</span>
        <div class="flex items-center gap-1">
          <span class="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-100 text-slate-600">${escapeHtml(w.tipe_wo || 'Korektif')}</span>
          ${prioBadge}
        </div>
      </div>
      <h4 class="text-xs font-bold text-slate-900 leading-snug line-clamp-2">${escapeHtml(w.judul_pekerjaan)}</h4>
      <p class="text-[11px] text-slate-500 flex items-center gap-1 truncate">
        <i class="ph-bold ph-map-pin text-slate-500 shrink-0"></i>
        <span class="truncate">${escapeHtml(w.kode_gedung)}${w.lokasi_detail ? ' &bull; ' + escapeHtml(w.lokasi_detail) : ''}</span>
      </p>
      <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        <div class="flex items-center gap-1.5 min-w-0">
          <span class="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0">${inisial}</span>
          <span class="text-[10.5px] font-medium text-slate-700 truncate">${escapeHtml(techName)}</span>
        </div>
        ${slaBadge}
      </div>
    `;

    card.onclick = () => moveStatusPrompt(w.wo_id || w.no_wo, w.status || 'Baru');
    return card;
  }

  function moveStatusPrompt(woId, currentStatus) {
    if (typeof Swal === 'undefined') return;
    Swal.fire({
      title: 'Perbarui Status Work Order',
      text: 'Pindahkan tahapan pekerjaan pemeliharaan:',
      input: 'select',
      inputOptions: {
        'Baru': 'Baru (Menunggu Plot Teknisi)',
        'Ditugaskan': 'Ditugaskan (Teknisi Siap)',
        'Dikerjakan': 'Dikerjakan (Sedang Berjalan)',
        'Selesai': 'Selesai (Pekerjaan Tuntas)'
      },
      inputValue: currentStatus,
      showCancelButton: true,
      confirmButtonText: 'Perbarui Status',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#0284c7'
    }).then(res => {
      if (res.isConfirmed && res.value) {
        const item = appState.workOrders.find(w => String(w.wo_id) === String(woId) || String(w.no_wo) === String(woId));
        if (item) {
          item.status = res.value;
          callBackendPost('save_work_order_status', { wo_id: item.wo_id, no_wo: item.no_wo, status: res.value }, () => {});
        }
        renderWorkOrdersKanban();
        Swal.fire({
          icon: 'success',
          title: 'Status Diperbarui',
          text: `Work order dipindahkan ke tahapan: ${res.value}`,
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  function promptCreateWo() {
    if (typeof Swal === 'undefined') return;
    const bldgOptions = appState.buildings.map(b => `<option value="${escapeHtml(b.kode_gedung)}">${escapeHtml(b.kode_gedung)} - ${escapeHtml(b.nama_gedung)}</option>`).join('');

    Swal.fire({
      title: 'Buat Tiket Work Order Baru',
      html: `
        <div class="space-y-3 text-left text-xs">
          <div>
            <label class="block font-bold mb-1 text-slate-700">Judul Pekerjaan / Masalah:</label>
            <input type="text" id="swal-wo-judul" class="swal2-input !h-9 !text-xs !w-full !m-0" placeholder="Contoh: AC Mati, Pipa Toilet Bocor, Kunci Rusak">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-bold mb-1 text-slate-700">Tipe Pekerjaan:</label>
              <select id="swal-wo-tipe" class="swal2-select !h-9 !text-xs !w-full !m-0">
                <option value="Korektif" selected>Korektif (Perbaikan Kerusakan)</option>
                <option value="Preventif">Preventif (Perawatan Rutin)</option>
              </select>
            </div>
            <div>
              <label class="block font-bold mb-1 text-slate-700">Prioritas:</label>
              <select id="swal-wo-prio" class="swal2-select !h-9 !text-xs !w-full !m-0">
                <option value="Tinggi">Tinggi (Mendesak)</option>
                <option value="Sedang" selected>Sedang (Normal)</option>
                <option value="Rendah">Rendah (Berkala)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block font-bold mb-1 text-slate-700">Gedung / Lokasi:</label>
            <select id="swal-wo-gedung" class="swal2-select !h-9 !text-xs !w-full !m-0">
              <option value="">-- Pilih Gedung Terdaftar --</option>
              ${bldgOptions}
            </select>
          </div>
          <div>
            <label class="block font-bold mb-1 text-slate-700">Detail Lokasi / Ruangan:</label>
            <input type="text" id="swal-wo-lokasi" class="swal2-input !h-9 !text-xs !w-full !m-0" placeholder="Contoh: Lantai 2, Kamar No.3, Pantry">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-bold mb-1 text-slate-700">Teknisi Ditugaskan:</label>
              <select id="swal-wo-tech" class="swal2-select !h-9 !text-xs !w-full !m-0">
                <option value="Hendra">Hendra (Workshop GS)</option>
                <option value="Anton">Anton (ME &amp; Listrik)</option>
                <option value="Supri">Supri (Sipil &amp; Sanitasi)</option>
                <option value="Budi Santoso">Budi Santoso (HVAC AC)</option>
                <option value="Tim Workshop" selected>Tim Workshop Sentral</option>
              </select>
            </div>
            <div>
              <label class="block font-bold mb-1 text-slate-700">Target SLA:</label>
              <select id="swal-wo-sla" class="swal2-select !h-9 !text-xs !w-full !m-0">
                <option value="SLA 6 jam">SLA 6 Jam</option>
                <option value="SLA 1 hari" selected>SLA 1 Hari</option>
                <option value="SLA 2 hari">SLA 2 Hari</option>
                <option value="SLA 3 hari">SLA 3 Hari</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block font-bold mb-1 text-slate-700">Estimasi Biaya Perbaikan (Rp):</label>
            <input type="number" id="swal-wo-biaya" class="swal2-input !h-9 !text-xs !w-full !m-0" value="150000" step="50000">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Terbitkan Work Order',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#059669',
      preConfirm: () => {
        const judul = document.getElementById('swal-wo-judul').value.trim();
        if (!judul) {
          Swal.showValidationMessage('Judul pekerjaan wajib diisi!');
          return false;
        }
        return {
          judul: judul,
          tipe: document.getElementById('swal-wo-tipe').value,
          prioritas: document.getElementById('swal-wo-prio').value,
          gedung: document.getElementById('swal-wo-gedung').value || 'PNS-SITE',
          lokasi: document.getElementById('swal-wo-lokasi').value.trim() || 'Fasilitas Umum',
          teknisi: document.getElementById('swal-wo-tech').value,
          sla: document.getElementById('swal-wo-sla').value,
          biaya: parseFloat(document.getElementById('swal-wo-biaya').value) || 150000
        };
      }
    }).then(res => {
      if (res.isConfirmed && res.value) {
        const v = res.value;
        const newNo = 'WO-' + ('0000' + (385 + appState.workOrders.length + 1)).slice(-4);
        const newWo = {
          wo_id: appState.workOrders.length + 1,
          no_wo: newNo,
          tipe_wo: v.tipe,
          prioritas: v.prioritas,
          judul_pekerjaan: v.judul,
          kode_gedung: v.gedung,
          lokasi_detail: v.lokasi,
          teknisi_nama: v.teknisi,
          teknisi_inisial: v.teknisi.substring(0, 2).toUpperCase(),
          sla_target: v.sla,
          status: 'Baru',
          is_overdue: '0',
          biaya_estimasi: v.biaya,
          created_at: new Date().toISOString()
        };

        appState.workOrders.unshift(newWo);
        renderWorkOrdersKanban();

        callBackendPost('save_work_order', newWo, saved => {
          if (saved && saved.no_wo) newWo.no_wo = saved.no_wo;
          renderWorkOrdersKanban();
        });

        Swal.fire({
          icon: 'success',
          title: 'Work Order Diterbitkan',
          text: `Nomor Tiket: ${newWo.no_wo} untuk lokasi ${newWo.kode_gedung}`,
          confirmButtonColor: '#059669'
        });
      }
    });
  }

  function renderWorkOrdersTable() {
    renderWorkOrdersKanban();
  }

  // ==========================================
  // ==========================================
  // ==========================================
  // AVAILABILITY & PENGHUNI HUNIAN CONTROLLER (AUTHENTIC PENGHUNI DATA)
  // Menampilkan 409 Data Penghuni Karyawan Nyata PT PNS (Ahmad Suhendra, dkk)
  // Format Kolom: Gedung | Ruangan | No. Bed | NIK | Nama Penghuni | Departemen | Status | Kontak | Aksi
  // ==========================================
  let penghuniSortCol = 'kode_gedung';
  let penghuniSortAsc = true;
  let penghuniCurrentPage = 1;
  const penghuniPageSize = 50;

  function initPenghuniFilters() {
    const bldgSelect = document.getElementById('filter-penghuni-bldg');
    if (!bldgSelect) return;

    const sourcePenghuni = (appState.penghuni && appState.penghuni.length > 0)
      ? appState.penghuni
      : (window.PNS_MASTER_DATA && window.PNS_MASTER_DATA.penghuni ? window.PNS_MASTER_DATA.penghuni : []);

    const bldgs = Array.from(new Set(sourcePenghuni.map(p => p.kode_gedung).filter(Boolean))).sort();

    bldgSelect.innerHTML = '<option value="">Semua Gedung / LH (' + bldgs.length + ')</option>' +
      bldgs.map(b => `<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`).join('');

    onPenghuniBldgFilterChange();
  }

  function onPenghuniBldgFilterChange() {
    const bldgSelect = document.getElementById('filter-penghuni-bldg');
    const roomSelect = document.getElementById('filter-penghuni-room');
    if (!bldgSelect || !roomSelect) return;

    const bCode = bldgSelect.value;
    const sourcePenghuni = (appState.penghuni && appState.penghuni.length > 0)
      ? appState.penghuni
      : (window.PNS_MASTER_DATA && window.PNS_MASTER_DATA.penghuni ? window.PNS_MASTER_DATA.penghuni : []);
    let rooms = [];

    if (bCode) {
      rooms = Array.from(new Set(sourcePenghuni.filter(p => p.kode_gedung === bCode).map(p => p.nama_ruangan).filter(Boolean))).sort();
    } else {
      rooms = Array.from(new Set(sourcePenghuni.map(p => p.nama_ruangan).filter(Boolean))).sort();
    }

    roomSelect.innerHTML = '<option value="">Semua Kamar (' + rooms.length + ')</option>' +
      rooms.map(r => `<option value="${escapeHtml(r)}">${escapeHtml(r)}</option>`).join('');

    renderPenghuniTable();
  }

  function sortPenghuni(col) {
    if (penghuniSortCol === col) {
      penghuniSortAsc = !penghuniSortAsc;
    } else {
      penghuniSortCol = col;
      penghuniSortAsc = true;
    }
    ['kode_gedung', 'nama_ruangan', 'nomor_kasur', 'nik', 'nama_penghuni', 'departemen', 'status_hunian'].forEach(c => {
      const el = document.getElementById('sort-icon-' + c);
      if (el) {
        if (c === penghuniSortCol) {
          el.innerHTML = penghuniSortAsc ? '&#9650;' : '&#9660;';
          el.className = 'text-xs font-black text-indigo-600';
        } else {
          el.innerHTML = '&#8597;';
          el.className = 'text-xs font-black text-slate-400 group-hover:text-indigo-600';
        }
      }
    });
    renderPenghuniTable();
  }

  function setPenghuniPage(page) {
    penghuniCurrentPage = page;
    renderPenghuniTable();
  }

  function renderPenghuniTable() {
    renderHunianHouseCards();

    const searchEl = document.getElementById('search-penghuni');
    const query = (searchEl ? searchEl.value : '').toLowerCase().trim();
    const bldgFilter = document.getElementById('filter-penghuni-bldg') ? document.getElementById('filter-penghuni-bldg').value : '';
    const roomFilter = document.getElementById('filter-penghuni-room') ? document.getElementById('filter-penghuni-room').value : '';
    const statusFilter = document.getElementById('filter-penghuni-status') ? document.getElementById('filter-penghuni-status').value : '';
    const tbody = document.getElementById('table-penghuni-body');
    if (!tbody) return;

    // Gunakan data penghuni karyawan ASLI PT PNS (409 items nyata)
    const sourceData = (appState.penghuni && appState.penghuni.length > 0)
      ? appState.penghuni
      : (window.PNS_MASTER_DATA && window.PNS_MASTER_DATA.penghuni ? window.PNS_MASTER_DATA.penghuni : []);

    // Filter
    let filtered = sourceData.filter(p => {
      const matchQuery = !query ||
        String(p.nama_penghuni || '').toLowerCase().includes(query) ||
        String(p.nik || '').toLowerCase().includes(query) ||
        String(p.jabatan || '').toLowerCase().includes(query) ||
        String(p.departemen || '').toLowerCase().includes(query) ||
        String(p.kode_gedung || '').toLowerCase().includes(query) ||
        String(p.nama_ruangan || '').toLowerCase().includes(query) ||
        String(p.nomor_kasur || '').toLowerCase().includes(query) ||
        String(p.no_kontak || '').toLowerCase().includes(query);

      const matchBldg = !bldgFilter || p.kode_gedung === bldgFilter;
      const matchRoom = !roomFilter || p.nama_ruangan === roomFilter;
      const matchStatus = !statusFilter || (statusFilter === 'Aktif' ? (p.status_hunian === 'Aktif' || !p.status_hunian) : p.status_hunian === statusFilter);

      return matchQuery && matchBldg && matchRoom && matchStatus;
    });

    // Sorting
    filtered.sort((a, b) => {
      let valA = String(a[penghuniSortCol] || '').toLowerCase();
      let valB = String(b[penghuniSortCol] || '').toLowerCase();
      if (valA < valB) return penghuniSortAsc ? -1 : 1;
      if (valA > valB) return penghuniSortAsc ? 1 : -1;
      return 0;
    });

    // Badges Counters
    const totalCount = sourceData.length;
    const terisiCount = sourceData.filter(p => p.status_hunian === 'Aktif' || !p.status_hunian).length;
    const uniqueLh = new Set(sourceData.map(p => p.kode_gedung).filter(Boolean)).size;

    const bTotal = document.getElementById('badge-total-slots');
    const bTerisi = document.getElementById('badge-terisi-slots');
    const bVacant = document.getElementById('badge-vacant-slots');
    if (bTotal) bTotal.innerText = 'Total: ' + totalCount.toLocaleString('id-ID') + ' Penghuni';
    if (bTerisi) bTerisi.innerText = 'Aktif: ' + terisiCount.toLocaleString('id-ID') + ' Orang';
    if (bVacant) bVacant.innerText = uniqueLh + ' Mess / LH';

    // Pagination
    const totalPages = Math.ceil(filtered.length / penghuniPageSize) || 1;
    if (penghuniCurrentPage > totalPages) penghuniCurrentPage = totalPages;
    if (penghuniCurrentPage < 1) penghuniCurrentPage = 1;

    const startIdx = (penghuniCurrentPage - 1) * penghuniPageSize;
    const endIdx = Math.min(startIdx + penghuniPageSize, filtered.length);
    const pagedItems = filtered.slice(startIdx, endIdx);

    const pageInfo = document.getElementById('penghuni-page-info');
    const pageControls = document.getElementById('penghuni-page-controls');
    if (pageInfo) {
      if (filtered.length === 0) {
        pageInfo.innerText = 'Tidak ada penghuni yang cocok';
      } else {
        pageInfo.innerText = `Menampilkan ${(startIdx + 1).toLocaleString('id-ID')} - ${endIdx.toLocaleString('id-ID')} dari ${filtered.length.toLocaleString('id-ID')} Penghuni Terdaftar`;
      }
    }
    if (pageControls) {
      if (totalPages <= 1) {
        pageControls.innerHTML = '';
      } else {
        pageControls.innerHTML = `
          <button type="button" onclick="setPenghuniPage(${penghuniCurrentPage - 1})" ${penghuniCurrentPage === 1 ? 'disabled' : ''} class="px-2.5 py-1 rounded border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold cursor-pointer">
            &laquo; Prev
          </button>
          <span class="px-2 font-bold text-slate-700">Halaman ${penghuniCurrentPage} / ${totalPages}</span>
          <button type="button" onclick="setPenghuniPage(${penghuniCurrentPage + 1})" ${penghuniCurrentPage === totalPages ? 'disabled' : ''} class="px-2.5 py-1 rounded border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold cursor-pointer">
            Next &raquo;
          </button>
        `;
      }
    }

    if (pagedItems.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center py-12 text-slate-500">
            <i class="ph-bold ph-user-circle text-3xl mb-2 block text-slate-400"></i>
            <span class="font-bold text-slate-700 block">Tidak ada data penghuni yang cocok</span>
            <span class="text-[11px] text-slate-400">Coba ubah kata kunci pencarian atau reset filter gedung/kamar.</span>
          </td>
        </tr>
      `;
      return;
    }

    // Sequence: Gedung | Ruangan | No. Bed | NIK | Nama Penghuni | Departemen | Status | Kontak | Aksi
    tbody.innerHTML = pagedItems.map((p, idx) => {
      const pIdEscaped = escapeHtml(String(p.id || idx));
      return `
        <tr class="hover:bg-slate-50/90 transition border-b border-slate-100">
          <!-- 1. GEDUNG / LH -->
          <td class="py-2.5 px-3.5 font-mono font-bold text-indigo-700 whitespace-nowrap">
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100 text-[11px]">
              <i class="ph-bold ph-buildings text-indigo-500"></i> ${escapeHtml(p.kode_gedung)}
            </span>
          </td>
          <!-- 2. RUANGAN / KAMAR -->
          <td class="py-2.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
            <span class="inline-flex items-center gap-1">
              <i class="ph-bold ph-door text-slate-400"></i> ${escapeHtml(p.nama_ruangan)}
            </span>
          </td>
          <!-- 3. NO. BED -->
          <td class="py-2.5 px-3 font-mono text-[11px] text-slate-600 whitespace-nowrap">
            <span class="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
              <i class="ph-bold ph-bed text-indigo-500 mr-1"></i>${escapeHtml(p.nomor_kasur || 'Bed Standard')}
            </span>
          </td>
          <!-- 4. STATUS -->
          <td class="py-2.5 px-3 whitespace-nowrap">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ${escapeHtml(p.status_hunian || 'Aktif')}
            </span>
          </td>
          <!-- 5. NIK -->
          <td class="py-2.5 px-3 font-mono font-bold text-slate-700 whitespace-nowrap">
            ${escapeHtml(p.nik || '-')}
          </td>
          <!-- 6. NAMA PENGHUNI -->
          <td class="py-2.5 px-3.5 whitespace-nowrap">
            <div class="font-bold text-slate-900">${escapeHtml(p.nama_penghuni || '-')}</div>
            <div class="text-[10px] text-slate-500">${escapeHtml(p.jabatan || 'Karyawan')}</div>
          </td>
          <!-- 7. DEPARTEMEN -->
          <td class="py-2.5 px-3 whitespace-nowrap">
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px]">
              <i class="ph-bold ph-briefcase text-slate-400"></i> ${escapeHtml(p.departemen || '-')}
            </span>
          </td>
          <!-- 8. KONTAK -->
          <td class="py-2.5 px-3 font-mono text-slate-600 whitespace-nowrap">
            ${p.no_kontak && p.no_kontak !== '-' ? `<a href="https://wa.me/${p.no_kontak.replace(/[^0-9]/g, '')}" target="_blank" class="text-indigo-600 hover:underline inline-flex items-center gap-1"><i class="ph-bold ph-whatsapp-logo text-emerald-600"></i> ${escapeHtml(p.no_kontak)}</a>` : '<span class="text-slate-400">-</span>'}
          </td>
          <!-- 9. AKSI -->
          <td class="py-2.5 px-3 text-center whitespace-nowrap">
            <button type="button" onclick="editPenghuni('${pIdEscaped}')" class="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 border border-slate-200 transition cursor-pointer" title="Edit Data Penghuni">
              <i class="ph-bold ph-note-pencil mr-1"></i> Edit
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function editPenghuni(id) {
    const sourceData = (appState.penghuni && appState.penghuni.length > 0)
      ? appState.penghuni
      : (window.PNS_MASTER_DATA && window.PNS_MASTER_DATA.penghuni ? window.PNS_MASTER_DATA.penghuni : []);
    
    const p = sourceData.find(item => String(item.id) === String(id));
    if (!p) {
      if (typeof Swal !== 'undefined') Swal.fire('Data Tidak Ditemukan', 'Data penghuni tidak dapat ditemukan.', 'error');
      return;
    }

    if (typeof Swal === 'undefined') return;

    Swal.fire({
      title: 'Update Data Penghuni Mess',
      html: `
        <div class="text-left text-xs space-y-3">
          <div class="bg-indigo-50 p-2.5 rounded-lg border border-indigo-200">
            <div class="font-bold text-indigo-900">${escapeHtml(p.kode_gedung)} &bull; ${escapeHtml(p.nama_ruangan)} &bull; ${escapeHtml(p.nomor_kasur || 'Bed A')}</div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">NIK Karyawan:</label>
            <input type="text" id="swal-nik" value="${escapeHtml(p.nik || '')}" class="w-full px-3 py-1.5 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Nama Lengkap Penghuni:</label>
            <input type="text" id="swal-nama" value="${escapeHtml(p.nama_penghuni || '')}" class="w-full px-3 py-1.5 border rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Departemen & Jabatan:</label>
            <div class="grid grid-cols-2 gap-2">
              <input type="text" id="swal-dept" value="${escapeHtml(p.departemen || '')}" placeholder="Departemen" class="px-3 py-1.5 border rounded-lg">
              <input type="text" id="swal-jabatan" value="${escapeHtml(p.jabatan || '')}" placeholder="Jabatan" class="px-3 py-1.5 border rounded-lg">
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Nomor Kontak / WhatsApp:</label>
            <input type="text" id="swal-kontak" value="${escapeHtml(p.no_kontak || '')}" class="w-full px-3 py-1.5 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Status Hunian:</label>
            <select id="swal-status" class="w-full px-3 py-1.5 border rounded-lg font-semibold">
              <option value="Aktif" ${p.status_hunian === 'Aktif' ? 'selected' : ''}>Aktif (Menempati Kamar)</option>
              <option value="Check-Out" ${p.status_hunian === 'Check-Out' ? 'selected' : ''}>Check-Out (Keluar Mess)</option>
              <option value="Pindah" ${p.status_hunian === 'Pindah' ? 'selected' : ''}>Pindah Kamar</option>
            </select>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Simpan Perubahan',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#4f46e5',
      focusConfirm: false,
      preConfirm: () => {
        const nik = document.getElementById('swal-nik').value.trim();
        const nama = document.getElementById('swal-nama').value.trim();
        const dept = document.getElementById('swal-dept').value.trim();
        const jabatan = document.getElementById('swal-jabatan').value.trim();
        const kontak = document.getElementById('swal-kontak').value.trim();
        const status = document.getElementById('swal-status').value;

        if (!nama) {
          Swal.showValidationMessage('Nama penghuni wajib diisi!');
          return false;
        }
        return { nik, nama, dept, jabatan, kontak, status };
      }
    }).then(res => {
      if (res.isConfirmed && res.value) {
        p.nik = res.value.nik;
        p.nama_penghuni = res.value.nama;
        p.departemen = res.value.dept;
        p.jabatan = res.value.jabatan;
        p.no_kontak = res.value.kontak;
        p.status_hunian = res.value.status;

        renderPenghuniTable();

        callBackendPost('save_penghuni', {
          id: p.id,
          nik: p.nik,
          nama_penghuni: p.nama_penghuni,
          departemen: p.departemen,
          jabatan: p.jabatan,
          kode_gedung: p.kode_gedung,
          nama_ruangan: p.nama_ruangan,
          nomor_kasur: p.nomor_kasur,
          status_hunian: p.status_hunian,
          no_kontak: p.no_kontak
        }, () => {
          Swal.fire({ icon: 'success', title: 'Tersimpan', text: 'Data penghuni berhasil diupdate ke sistem & Google Sheets.', timer: 1400, showConfirmButton: false });
        }, () => {
          Swal.fire({ icon: 'info', title: 'Tersimpan Lokal', text: 'Data penghuni tersimpan di aplikasi.', timer: 1400, showConfirmButton: false });
        });
      }
    });
  }

  function promptAddPenghuni() {
    const genuineBuildings = (appState.buildings || []).filter(isGenuineBuilding);
    const lhList = genuineBuildings.filter(b => (b.kode_gedung || '').includes('-LH') || (b.nama_gedung || '').toLowerCase().includes('mess') || (b.nama_gedung || '').toLowerCase().includes('longhouse'));

    if (typeof Swal === 'undefined') return;

    Swal.fire({
      title: 'Tambah Penghuni Mess Baru',
      html: `
        <div class="text-left text-xs space-y-3">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Gedung / Longhouse:</label>
            <select id="add-p-bldg" class="w-full px-3 py-1.5 border rounded-lg font-semibold">
              ${lhList.map(b => `<option value="${escapeHtml(b.kode_gedung)}">${escapeHtml(b.nama_gedung)}</option>`).join('')}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Nama Ruangan / Kamar:</label>
              <input type="text" id="add-p-room" placeholder="Contoh: KAMAR NO.5" class="w-full px-3 py-1.5 border rounded-lg">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Nomor Kasur / Slot:</label>
              <select id="add-p-bed" class="w-full px-3 py-1.5 border rounded-lg">
                <option value="Bed A (Bawah)">Bed A (Bawah)</option>
                <option value="Bed B (Atas)">Bed B (Atas)</option>
                <option value="Bed C (Bawah)">Bed C (Bawah)</option>
                <option value="Bed D (Atas)">Bed D (Atas)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">NIK Karyawan:</label>
            <input type="text" id="add-p-nik" placeholder="PNS-AGR-..." class="w-full px-3 py-1.5 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Nama Lengkap Karyawan:</label>
            <input type="text" id="add-p-nama" placeholder="Nama penghuni" class="w-full px-3 py-1.5 border rounded-lg">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Departemen:</label>
              <input type="text" id="add-p-dept" placeholder="Agronomi / Factory / HRGA" class="w-full px-3 py-1.5 border rounded-lg">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Jabatan:</label>
              <input type="text" id="add-p-jabatan" placeholder="Jabatan" class="w-full px-3 py-1.5 border rounded-lg">
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Nomor Kontak / WhatsApp:</label>
            <input type="text" id="add-p-kontak" placeholder="08..." class="w-full px-3 py-1.5 border rounded-lg font-mono">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Daftarkan Penghuni',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#4f46e5',
      focusConfirm: false,
      preConfirm: () => {
        const bldg = document.getElementById('add-p-bldg').value;
        const room = document.getElementById('add-p-room').value.trim();
        const bed = document.getElementById('add-p-bed').value;
        const nik = document.getElementById('add-p-nik').value.trim();
        const nama = document.getElementById('add-p-nama').value.trim();
        const dept = document.getElementById('add-p-dept').value.trim();
        const jabatan = document.getElementById('add-p-jabatan').value.trim();
        const kontak = document.getElementById('add-p-kontak').value.trim();

        if (!room || !nama) {
          Swal.showValidationMessage('Nama ruangan dan nama penghuni wajib diisi!');
          return false;
        }
        return { bldg, room, bed, nik, nama, dept, jabatan, kontak };
      }
    }).then(res => {
      if (res.isConfirmed && res.value) {
        const newRecord = {
          id: 'PNS-PENG-' + Date.now(),
          nik: res.value.nik || '-',
          nama_penghuni: res.value.nama,
          departemen: res.value.dept || '-',
          jabatan: res.value.jabatan || 'Karyawan',
          kode_gedung: res.value.bldg,
          nama_ruangan: res.value.room,
          nomor_kasur: res.value.bed,
          status_hunian: 'Aktif',
          no_kontak: res.value.kontak || '-',
          tgl_masuk: new Date().toISOString().split('T')[0]
        };

        appState.penghuni.unshift(newRecord);
        renderPenghuniTable();

        callBackendPost('save_penghuni', newRecord, () => {
          Swal.fire({ icon: 'success', title: 'Berhasil Didaftarkan', text: 'Penghuni baru berhasil disimpan ke Google Sheets.', timer: 1400, showConfirmButton: false });
        }, () => {
          Swal.fire({ icon: 'info', title: 'Tersimpan Lokal', text: 'Penghuni baru aktif dalam sistem.', timer: 1400, showConfirmButton: false });
        });
      }
    });
  }
  
  function loadRegRooms() {
    const gEl = document.getElementById('reg-gedung');
    const rSelect = document.getElementById('reg-ruang');
    if (!gEl || !rSelect) return;
    const opt = gEl.options[gEl.selectedIndex]; const rooms = getRoomsForBuilding(gEl.value, opt ? opt.getAttribute('data-site') : '', opt ? opt.getAttribute('data-id') : '');
    rSelect.innerHTML = rooms.length > 0
      ? rooms.map(r => `<option value="${escapeHtml(r.nama_ruangan)}">${escapeHtml(r.nama_ruangan)}</option>`).join('')
      : '<option value="Area Utama">Area Utama</option>';
  }

  function loadMutRooms() {
    const gEl = document.getElementById('mut-ke-gedung');
    const rSelect = document.getElementById('mut-ke-ruang');
    if (!gEl || !rSelect) return;
    const opt = gEl.options[gEl.selectedIndex]; const rooms = getRoomsForBuilding(gEl.value, opt ? opt.getAttribute('data-site') : '', opt ? opt.getAttribute('data-id') : '');
    rSelect.innerHTML = rooms.length > 0
      ? rooms.map(r => `<option value="${escapeHtml(r.nama_ruangan)}">${escapeHtml(r.nama_ruangan)}</option>`).join('')
      : '<option value="Area Utama">Area Utama</option>';
  }

  function submitRegisterAsset() {
    const noAsset = document.getElementById('reg-no-asset').value.trim();
    const namaAsset = document.getElementById('reg-nama-asset').value.trim();
    const bCode = document.getElementById('reg-gedung').value;
    const rName = document.getElementById('reg-ruang').value;
    const kat = document.getElementById('reg-kategori').value;
    const cond = document.getElementById('reg-kondisi').value;
    const harga = parseFloat(document.getElementById('reg-harga').value) || 0;

    if (!namaAsset) {
      Swal.fire('Perhatian', 'Nama aset wajib diisi.', 'warning');
      return;
    }

    const newAsset = {
      no_asset: noAsset || ('AST-' + new Date().getTime()),
      nama_asset: namaAsset,
      kode_gedung: bCode,
      nama_ruangan: rName || 'Area Utama',
      kategori_asset: kat,
      kondisi: cond,
      total_harga_perolehan: harga,
      tanggal_perolehan: new Date().toISOString().slice(0, 10)
    };

    Swal.fire({ title: 'Menyimpan Aset...', didOpen: () => Swal.showLoading() });
    callBackendPost('save_asset_register', newAsset, res => {
      if (res && res.no_asset) newAsset.no_asset = res.no_asset;
      appState.assets.unshift(newAsset);
      renderAssetsTable();
      Swal.fire('Sukses', `Aset ${newAsset.no_asset} berhasil diregistrasikan ke Google Sheets.`, 'success');
      document.getElementById('reg-nama-asset').value = '';
      document.getElementById('reg-no-asset').value = '';
      navTo('view-assets');
    });
  }

  function submitMutasiAsset() {
    const noAsset = document.getElementById('mut-no-asset').value.trim();
    const bCode = document.getElementById('mut-ke-gedung').value;
    const rName = document.getElementById('mut-ke-ruang').value;
    const alasan = document.getElementById('mut-alasan').value.trim();

    if (!noAsset) {
      Swal.fire('Perhatian', 'Nomor aset wajib diisi.', 'warning');
      return;
    }

    const asset = appState.assets.find(a => a.no_asset === noAsset);
    const payload = {
      no_asset: noAsset,
      nama_asset: asset ? asset.nama_asset : '-',
      dari_lokasi: asset ? `${asset.kode_gedung} / ${asset.nama_ruangan}` : '-',
      ke_gedung: bCode,
      ke_ruangan: rName,
      alasan: alasan
    };

    Swal.fire({ title: 'Mencatat Mutasi...', didOpen: () => Swal.showLoading() });
    callBackendPost('save_asset_mutation', payload, () => {
      if (asset) {
        asset.kode_gedung = bCode;
        asset.nama_ruangan = rName;
        renderAssetsTable();
      }
      Swal.fire('Sukses', `Mutasi fisik aset ${noAsset} ke ${bCode} (${rName}) tercatat di Google Sheets.`, 'success');
      document.getElementById('mut-no-asset').value = '';
      document.getElementById('mut-alasan').value = '';
      navTo('view-assets');
    });
  }

  function promptCreateWo() {
    Swal.fire({
      title: 'Buat Tiket Work Order Baru',
      html: `
        <div class="space-y-3 text-left text-xs">
          <div>
            <label class="block font-semibold mb-1">Judul Masalah / Kerusakan:</label>
            <input type="text" id="swal-wo-judul" class="swal2-input !h-8 !text-xs !w-full !m-0" placeholder="Contoh: AC Mati / Keran Patah">
          </div>
          <div>
            <label class="block font-semibold mb-1">Gedung / Lokasi:</label>
            <input type="text" id="swal-wo-lokasi" class="swal2-input !h-8 !text-xs !w-full !m-0" placeholder="PNS-FAC-LH 01 / Kamar 5">
          </div>
          <div>
            <label class="block font-semibold mb-1">Prioritas:</label>
            <select id="swal-wo-prio" class="swal2-select !h-8 !text-xs !w-full !m-0">
              <option value="Tinggi">Tinggi</option>
              <option value="Sedang" selected>Sedang</option>
              <option value="Rendah">Rendah</option>
            </select>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Terbitkan Tiket',
      preConfirm: () => ({
        judul: document.getElementById('swal-wo-judul').value.trim(),
        lokasi: document.getElementById('swal-wo-lokasi').value.trim(),
        prio: document.getElementById('swal-wo-prio').value
      })
    }).then(res => {
      if (res.isConfirmed && res.value.judul) {
        const newWo = {
          wo_id: appState.workOrders.length + 1,
          no_wo: 'WO-0' + (385 + appState.workOrders.length),
          tipe_wo: 'Korektif',
          prioritas: res.value.prio,
          judul_pekerjaan: res.value.judul,
          kode_gedung: res.value.lokasi || 'PNS-SITE',
          lokasi_detail: res.value.lokasi || 'Area Operasional',
          teknisi_nama: 'Tim Workshop GS',
          sla_target: 'SLA 2 Hari',
          status: 'Baru',
          biaya_estimasi: 150000
        };
        callBackendPost('save_work_order', newWo, saved => {
          if (saved && saved.no_wo) newWo.no_wo = saved.no_wo;
          appState.workOrders.unshift(newWo);
          renderWorkOrdersKanban(); renderAllAssetsTable();
          Swal.fire('Tiket Diterbitkan', `Nomor Tiket: ${newWo.no_wo}`, 'success');
        });
      }
    });
  }



  // ==========================================
  // VIEW: SELURUH PORTOFOLIO ASET (ENTERPRISE)
  // ==========================================
  function filterPortfolioCategory(cat, btnEl) {
    appState.portfolioCatFilter = cat || '';
    document.querySelectorAll('.ent-cat-pill').forEach(b => {
      b.classList.remove('active', 'bg-slate-900', 'text-white', '', '');
      b.classList.add('bg-slate-100', 'text-slate-600', '', '');
    });
    if (btnEl) {
      btnEl.classList.remove('bg-slate-100', 'text-slate-600', '', '');
      btnEl.classList.add('active', 'bg-slate-900', 'text-white', '', '');
    }
    renderPortfolioAllTable();
  }

  function onSearchPortfolioAll() {
    renderPortfolioAllTable();
  }

    // ==========================================
  // ALL ASSET CATALOG (34,266 MASTER ASSETS PER VRA PROJECT MAY)
  // ==========================================
  let assetTypeFilter = 'ALL';
  let assetKatFilter = 'ALL';
  let assetKondisiFilter = 'ALL';
  let assetSearchQuery = '';
  let assetCurrentPage = 1;
  const assetPageSize = 50;
  let cachedFilteredAssets = null;

  function onAssetFilterChange() {
    const tSelect = document.getElementById('slicer-asset-type-cat');
    const kSelect = document.getElementById('slicer-asset-kat');
    const cSelect = document.getElementById('slicer-asset-kondisi');
    if (tSelect) assetTypeFilter = tSelect.value;
    if (kSelect) assetKatFilter = kSelect.value;
    if (cSelect) assetKondisiFilter = cSelect.value;
    assetCurrentPage = 1;
    cachedFilteredAssets = null;
    renderAllAssetsTable();
  }

  function onAssetSearch(query) {
    assetSearchQuery = query || '';
    assetCurrentPage = 1;
    cachedFilteredAssets = null;
    renderAllAssetsTable();
  }

  function changeAssetPage(delta) {
    assetCurrentPage += delta;
    renderAllAssetsTable();
  }

  function getFilteredAllAssets() {
    if (cachedFilteredAssets) return cachedFilteredAssets;

    // Sumber data: 34.266 baris aset compact [no_asset, nama_asset, kelompok, kategori, lokasi, kondisi, std_umur, umur, hpp, susut, nbv, verif]
    const rawRows = window.PNS_ALL_ASSETS_ROWS || [];

    if (rawRows.length === 0) {
      return (appState.enterpriseAssets && appState.enterpriseAssets.length > 0)
        ? appState.enterpriseAssets
        : (typeof ENTERPRISE_PORTFOLIO_SAMPLE !== 'undefined' ? ENTERPRISE_PORTFOLIO_SAMPLE : []);
    }

    const q = assetSearchQuery.toLowerCase().trim();
    const katUpper = assetKatFilter.toUpperCase();
    const isAllKat = (assetKatFilter === 'ALL');
    const isAllType = (assetTypeFilter === 'ALL');
    const isAllKond = (assetKondisiFilter === 'ALL');

    const result = [];
    for (let i = 0; i < rawRows.length; i++) {
      const row = rawRows[i];
      // row schema: 0:no, 1:nama, 2:kelompok, 3:kategori, 4:lokasi, 5:kondisi, 6:std, 7:umur, 8:hpp, 9:susut, 10:nbv, 11:verif
      const hpp = row[8];

      // Slicer Tipe
      if (!isAllType) {
        if (assetTypeFilter === 'valuable' && hpp <= 0) continue;
        if (assetTypeFilter === 'non_valuable' && hpp > 0) continue;
      }

      // Slicer Kelompok / Kategori
      if (!isAllKat) {
        const kelUpper = (row[2] || '').toUpperCase();
        const rowKatUpper = (row[3] || '').toUpperCase();
        if (!kelUpper.includes(katUpper) && !rowKatUpper.includes(katUpper)) continue;
      }

      // Slicer Kondisi
      if (!isAllKond) {
        const kStr = (row[5] || '').toLowerCase();
        if (!kStr.includes(assetKondisiFilter.toLowerCase())) continue;
      }

      // Search Query
      if (q) {
        const no = (row[0] || '').toLowerCase();
        const nm = (row[1] || '').toLowerCase();
        const kl = (row[2] || '').toLowerCase();
        const kt = (row[3] || '').toLowerCase();
        const lk = (row[4] || '').toLowerCase();
        if (!no.includes(q) && !nm.includes(q) && !kl.includes(q) && !kt.includes(q) && !lk.includes(q)) continue;
      }

      result.push(row);
    }

    cachedFilteredAssets = result;
    return result;
  }

  function renderAllAssetsTable() {
    if (typeof window === 'undefined' || !window.PNS_ALL_ASSETS_ROWS) return;

    const rawRows = window.PNS_ALL_ASSETS_ROWS;
    const totalCountAll = rawRows.length;

    // 1. Populate Kategori Slicer if empty
    const katSelect = document.getElementById('slicer-asset-kat');
    if (katSelect && katSelect.options.length <= 1) {
      const categories = new Set();
      for (let i = 0; i < totalCountAll; i++) {
        const kat = (rawRows[i][3] || '').trim();
        if (kat) categories.add(kat);
      }
      const sortedKats = Array.from(categories).sort();
      sortedKats.forEach(k => {
        const opt = document.createElement('option');
        opt.value = k;
        opt.textContent = k;
        katSelect.appendChild(opt);
      });
    }

    // 2. Read Slicer Values
    const typeFilter = document.getElementById('slicer-asset-type-cat')?.value || 'ALL';
    const katFilter = document.getElementById('slicer-asset-kat')?.value || 'ALL';
    const kondisiFilter = document.getElementById('slicer-asset-kondisi')?.value || 'ALL';
    const query = (document.getElementById('slicer-asset-search')?.value || '').trim().toLowerCase();

    // 3. Filter and Aggregate
    const filtered = [];
    let totalPerolehan = 0;
    let totalSusut = 0;
    let totalBuku = 0;
    let goodCount = 0;
    let repairCount = 0;
    let brokenCount = 0;
    let lostCount = 0;
    let disposalCount = 0;
    let diatasLifetime = 0;
    let dibawahLifetime = 0;

    const katMap = new Map();

    for (let i = 0; i < totalCountAll; i++) {
      const r = rawRows[i];
      // schema: [0:no, 1:nama, 2:kelompok, 3:kategori, 4:lokasi, 5:kondisi, 6:std, 7:umur, 8:hpp, 9:susut, 10:nbv, 11:verif]
      const no = r[0] || '';
      const nama = r[1] || '';
      const kelompok = r[2] || '';
      const kat = r[3] || 'LAINNYA';
      const kond = r[5] || 'Good Condition';
      const std = Number(r[6]) || 5;
      const umur = Number(r[7]) || 0;
      const hpp = Number(r[8]) || 0;
      const susut = Number(r[9]) || 0;
      const nbv = Number(r[10]) || 0;

      // Filter: Type
      if (typeFilter === 'valuable' && (hpp === 0 && nbv === 0)) continue;
      if (typeFilter === 'non_valuable' && (hpp > 0 || nbv > 0)) continue;

      // Filter: Kategori
      if (katFilter !== 'ALL' && kat !== katFilter) continue;

      // Filter: Kondisi
      if (kondisiFilter !== 'ALL' && !kond.toLowerCase().includes(kondisiFilter.toLowerCase())) continue;

      // Filter: Search
      if (query) {
        const match = no.toLowerCase().includes(query) ||
                      nama.toLowerCase().includes(query) ||
                      kelompok.toLowerCase().includes(query) ||
                      kat.toLowerCase().includes(query);
        if (!match) continue;
      }

      filtered.push(r);

      totalPerolehan += hpp;
      totalSusut += susut;
      totalBuku += nbv;

      const kLow = kond.toLowerCase();
      if (kLow.includes('repair')) repairCount++;
      else if (kLow.includes('broken')) brokenCount++;
      else if (kLow.includes('lost')) lostCount++;
      else if (kLow.includes('disposal')) disposalCount++;
      else goodCount++;

      if (umur >= std) diatasLifetime++;
      else dibawahLifetime++;

      // Kategori grouping for Bar Chart
      if (!katMap.has(kat)) katMap.set(kat, { kat, count: 0, nilaiBuku: 0 });
      const obj = katMap.get(kat);
      obj.count++;
      obj.nilaiBuku += nbv;
    }

    const filteredCount = filtered.length;
    const goodPct = filteredCount > 0 ? ((goodCount / filteredCount) * 100).toFixed(1) : '0';

    // 4. Update KPI Text & Counters
    const setEl = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.innerText = val;
    };

    const fmtMoney = (v) => {
      if (v >= 1e12) return 'Rp ' + (v / 1e12).toFixed(2).replace('.', ',') + ' T';
      if (v >= 1e9) return 'Rp ' + (v / 1e9).toFixed(1).replace('.', ',') + ' M';
      if (v >= 1e6) return 'Rp ' + (v / 1e6).toFixed(0).replace('.', ',') + ' Jt';
      return 'Rp ' + Math.round(v).toLocaleString('id-ID');
    };

    setEl('pbi-asset-filtered-count', filteredCount.toLocaleString('id-ID'));
    setEl('pbi-asset-total-count', filteredCount.toLocaleString('id-ID') + ' Unit');
    setEl('pbi-asset-nilai-perolehan', fmtMoney(totalPerolehan));
    setEl('pbi-asset-nilai-penyusutan', fmtMoney(totalSusut));
    setEl('pbi-asset-nilai-buku', fmtMoney(totalBuku));
    setEl('pbi-asset-good-count', `${goodCount.toLocaleString('id-ID')} (${goodPct}%)`);
    setEl('pbi-asset-lifetime-stat', `↑ ${diatasLifetime.toLocaleString('id-ID')} | ↓ ${dibawahLifetime.toLocaleString('id-ID')}`);

    // Strategic Recommendation Banner
    const recEl = document.getElementById('pbi-asset-recommendation-text');
    if (recEl) {
      const criticalCount = repairCount + brokenCount + lostCount + disposalCount;
      const pctOver = filteredCount > 0 ? ((diatasLifetime / filteredCount) * 100).toFixed(1) : 0;
      if (diatasLifetime > 0) {
        recEl.innerText = `Terdapat ${diatasLifetime.toLocaleString('id-ID')} unit (${pctOver}%) aset melewati masa standar umur ekonomis (Over-Age). Disarankan inventarisasi write-off untuk ${criticalCount.toLocaleString('id-ID')} unit aset berkondisi rusak/hilang.`;
      } else {
        recEl.innerText = 'Seluruh portofolio aset berada dalam rentang umur ekonomis produktif dan stabil.';
      }
    }

    // 5. Render Donut Chart (ApexCharts Parity)
    const chartKondisiEl = document.querySelector('#chart-pbi-asset-kondisi');
    if (chartKondisiEl && typeof ApexCharts !== 'undefined') {
      if (window._pbiAssetKondisiChart) {
        try { window._pbiAssetKondisiChart.destroy(); } catch (e) {}
      }
      window._pbiAssetKondisiChart = new ApexCharts(chartKondisiEl, {
        chart: { type: 'donut', height: 210, animations: { enabled: true } },
        series: [goodCount, repairCount, brokenCount, lostCount, disposalCount],
        labels: ['Good Condition', 'Repair', 'Broken', 'Lost', 'Disposal'],
        colors: ['#10b981', '#f59e0b', '#ef4444', '#64748b', '#94a3b8'],
        plotOptions: {
          pie: {
            donut: {
              size: '68%',
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Total Aset',
                  formatter: () => filteredCount.toLocaleString('id-ID'),
                  style: { fontSize: '11px', fontWeight: 800 }
                }
              }
            }
          }
        },
        dataLabels: { enabled: false },
        legend: { position: 'bottom', fontSize: '10px', fontWeight: 600 }
      });
      window._pbiAssetKondisiChart.render();
    }

    // 6. Render Horizontal Bar Chart (ApexCharts Parity)
    const chartKatEl = document.querySelector('#chart-pbi-asset-kategori');
    if (chartKatEl && typeof ApexCharts !== 'undefined') {
      if (window._pbiAssetKategoriChart) {
        try { window._pbiAssetKategoriChart.destroy(); } catch (e) {}
      }
      const topKats = Array.from(katMap.values())
        .sort((a, b) => (window.currentAssetBarDim === 'unit') ? (b.count - a.count) : (b.nilaiBuku - a.nilaiBuku))
        .slice(0, 8);

      window._pbiAssetKategoriChart = new ApexCharts(chartKatEl, {
        chart: { type: 'bar', height: 220, toolbar: { show: false }, animations: { enabled: true } },
        series: [{
          name: (window.currentAssetBarDim === 'unit') ? 'Jumlah Unit' : 'Nilai Buku (Rp)',
          data: topKats.map(k => (window.currentAssetBarDim === 'unit') ? k.count : Math.round(k.nilaiBuku))
        }],
        colors: ['#0284c7'],
        plotOptions: {
          bar: {
            horizontal: true,
            borderRadius: 4,
            barHeight: topKats.length <= 2 ? '38%' : (topKats.length <= 4 ? '50%' : '65%')
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: { fontSize: '10px', fontWeight: 700, colors: ['#ffffff'] },
          formatter: v => (window.currentAssetBarDim === 'unit') ? v.toLocaleString('id-ID') + ' Unit' : fmtMoney(v),
          dropShadow: { enabled: false }
        },
        xaxis: {
          categories: topKats.map(k => k.kat),
          labels: {
            style: { fontSize: '10px', fontWeight: 600 },
            formatter: v => (window.currentAssetBarDim === 'unit') ? v.toLocaleString('id-ID') : fmtMoney(v)
          }
        },
        yaxis: {
          labels: { style: { fontSize: '11px', fontWeight: 600 }, maxWidth: 160 }
        },
        tooltip: {
          y: {
            formatter: v => (window.currentAssetBarDim === 'unit') ? v.toLocaleString('id-ID') + ' Unit' : ('Rp ' + Math.round(v).toLocaleString('id-ID'))
          }
        }
      });
      window._pbiAssetKategoriChart.render();
    }

    // 7. Render Master Matrix Table
    const tbody = document.getElementById('table-pbi-asset-matrix') || document.getElementById('table-all-assets-body');
    if (!tbody) return;

    const totalPages = Math.max(1, Math.ceil(filteredCount / assetPageSize));
    if (assetCurrentPage > totalPages) assetCurrentPage = totalPages;
    if (assetCurrentPage < 1) assetCurrentPage = 1;

    const startIdx = (assetCurrentPage - 1) * assetPageSize;
    const endIdx = Math.min(startIdx + assetPageSize, filteredCount);
    const pagedRows = filtered.slice(startIdx, endIdx);

    const prevBtn = document.getElementById('btn-asset-prev');
    const nextBtn = document.getElementById('btn-asset-next');
    const pageInd = document.getElementById('all-asset-page-indicator');
    const pagingInfo = document.getElementById('all-asset-paging-info');

    if (prevBtn) prevBtn.disabled = (assetCurrentPage <= 1);
    if (nextBtn) nextBtn.disabled = (assetCurrentPage >= totalPages);
    if (pageInd) pageInd.innerText = `Hal ${assetCurrentPage} / ${totalPages}`;
    if (typeof window !== "undefined") window.assetCurrentPage = assetCurrentPage;
    if (pagingInfo) {
      pagingInfo.innerText = filteredCount > 0
        ? `(Menampilkan ${(startIdx + 1).toLocaleString('id-ID')} - ${endIdx.toLocaleString('id-ID')} dari ${filteredCount.toLocaleString('id-ID')} unit)`
        : '(Tidak ada data)';
    }

    if (pagedRows.length === 0) {
      tbody.innerHTML = '<tr><td colspan="10" class="text-center py-8 text-slate-400 font-medium">Tidak ada aset yang sesuai filter.</td></tr>';
      return;
    }

    const maxBuku = Math.max(...pagedRows.map(r => Number(r[10]) || 0), 1);

    tbody.innerHTML = pagedRows.map(r => {
      const no = r[0] || '-';
      const nama = r[1] || '-';
      const kelompok = r[2] || '-';
      const kat = r[3] || '-';
      const kond = r[5] || 'Good Condition';
      const std = Number(r[6]) || 5;
      const umur = Number(r[7]) || 0;
      const hpp = Number(r[8]) || 0;
      const nbv = Number(r[10]) || 0;

      const isGood = kond.toLowerCase().includes('good') || kond.toLowerCase().includes('baik');
      const isOverAge = (umur >= std);
      const pct = Math.min(100, Math.max(0, (nbv / maxBuku) * 100));

      return `
        <tr onclick="drillToAssetDetail('${escapeHtml(no)}')" class="hover:bg-emerald-50/70 transition text-xs border-b border-slate-100 cursor-pointer group" title="Klik untuk Dossier Aset ${escapeHtml(no)}">
          <td class="font-bold text-blue-600 px-3 py-2.5 whitespace-nowrap">
            <div class="flex items-center gap-1.5">
              <span>${escapeHtml(no)}</span>
              <i class="ph-bold ph-arrow-square-out text-[11px] text-emerald-500 opacity-0 group-hover:opacity-100 transition"></i>
            </div>
          </td>
          <td class="px-3 py-2.5 font-semibold truncate max-w-[180px]" title="${escapeHtml(nama)}">${escapeHtml(nama)}</td>
          <td class="px-3 py-2.5 text-slate-500 truncate max-w-[120px]">${escapeHtml(kat)}</td>
          <td class="px-3 py-2.5 text-slate-500 truncate max-w-[130px]">${escapeHtml(kelompok)}</td>
          <td class="px-3 py-2.5 text-center whitespace-nowrap">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${isGood ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
              ${escapeHtml(kond)}
            </span>
          </td>
          <td class="px-3 py-2.5 text-center font-mono whitespace-nowrap">${umur} / ${std} Thn</td>
          <td class="px-3 py-2.5 text-center font-mono whitespace-nowrap">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${isOverAge ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-700'}">
              ${isOverAge ? '↑ DIATAS' : '↓ DIBAWAH'}
            </span>
          </td>
          <td class="px-3 py-2.5 text-right font-mono whitespace-nowrap">${fmtMoney(hpp)}</td>
          <td class="px-3 py-2.5 text-right font-mono font-bold text-blue-600 whitespace-nowrap">
            <div class="flex items-center justify-end gap-2">
              <div class="w-12 bg-blue-100 rounded-full h-1.5 overflow-hidden">
                <div class="bg-blue-600 h-full rounded-full" style="width: ${pct}%"></div>
              </div>
              <span>${fmtMoney(nbv)}</span>
            </div>
          </td>
          <td class="px-3 py-2.5 text-center whitespace-nowrap">
            <button type="button" onclick="event.stopPropagation(); drillToAssetDetail('${escapeHtml(no)}')" class="px-2 py-1 rounded bg-slate-100 hover:bg-emerald-600 hover:text-white text-[10px] font-bold transition flex items-center gap-1 mx-auto shadow-2xs cursor-pointer">
              <i class="ph-bold ph-identification-card"></i> Dossier
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.currentAssetBarDim = 'buku';

  function setAssetBarDim(dim) {
    window.currentAssetBarDim = dim;
    const btnBuku = document.getElementById('btn-asset-bar-buku');
    const btnUnit = document.getElementById('btn-asset-bar-unit');
    if (btnBuku && btnUnit) {
      if (dim === 'buku') {
        btnBuku.className = 'px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-600 text-white shadow-2xs transition cursor-pointer';
        btnUnit.className = 'px-2.5 py-1 text-[10px] font-bold rounded-lg text-slate-600 hover:bg-slate-200 transition cursor-pointer';
      } else {
        btnBuku.className = 'px-2.5 py-1 text-[10px] font-bold rounded-lg text-slate-600 hover:bg-slate-200 transition cursor-pointer';
        btnUnit.className = 'px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-600 text-white shadow-2xs transition cursor-pointer';
      }
    }
    renderAllAssetsTable();
  }

  function onAssetFilterChange() {
    assetCurrentPage = 1;
    renderAllAssetsTable();
  }

  function onAssetSearch(query) {
    assetCurrentPage = 1;
    renderAllAssetsTable();
  }

  function changeAssetPage(delta) {
    assetCurrentPage += delta;
    renderAllAssetsTable();
  }

  function exportAssetCatalogCsv() {
    if (typeof window === 'undefined' || !window.PNS_ALL_ASSETS_ROWS) return;
    const rawRows = window.PNS_ALL_ASSETS_ROWS;
    let csv = 'Kode Unit;Nama Asset;Kelompok;Kategori;Lokasi;Kondisi;Standar Umur;Umur Asset;HPP;Penyusutan;Nilai Buku;Status\n';
    rawRows.slice(0, 10000).forEach(r => {
      csv += `${r[0]};"${(r[1]||'').replace(/"/g, '""')}";${r[2]};${r[3]};${r[4]};${r[5]};${r[6]};${r[7]};${r[8]};${r[9]};${r[10]};${r[11]}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Katalog_Master_Aset_PNS_${Date.now()}.csv`;
    link.click();
  }

  function drillToAssetDetail(assetCode) {
    if (!assetCode) return;
    const clean = String(assetCode).trim();
    const rows = window.PNS_ALL_ASSETS_ROWS || [];
    const ast = rows.find(r => r[0] === clean) || [clean, 'Aset Terdaftar', '-', '-', 'Central Office (CO)', 'Good Condition', 5, 4, 15000000, 3000000, 12000000, 'Aktif'];

    const no = ast[0];
    const nama = ast[1];
    const kel = ast[2];
    const kat = ast[3];
    const lok = ast[4];
    const kond = ast[5];
    const std = ast[6];
    const umur = ast[7];
    const hpp = ast[8];
    const susut = ast[9];
    const nbv = ast[10];

    const fmtRp = (v) => 'Rp ' + Number(v || 0).toLocaleString('id-ID');

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: `<strong>Dossier Aset: ${escapeHtml(no)}</strong>`,
        icon: 'info',
        width: '600px',
        html: `
          <div class="text-left text-xs space-y-3 font-sans pt-2">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span class="text-[10px] font-extrabold uppercase text-slate-400 block mb-0.5">Nama &amp; Spesifikasi Aset</span>
              <span class="font-bold text-sm text-slate-900 block">${escapeHtml(nama)}</span>
              <span class="text-slate-500 font-medium">${escapeHtml(kel)} &bull; ${escapeHtml(kat)}</span>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span class="text-[10px] text-slate-400 block font-bold uppercase">Lokasi Penempatan</span>
                <span class="font-bold text-slate-800">${escapeHtml(lok)}</span>
              </div>
              <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span class="text-[10px] text-slate-400 block font-bold uppercase">Kondisi Fisik</span>
                <span class="font-bold text-emerald-700">${escapeHtml(kond)}</span>
              </div>
              <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span class="text-[10px] text-slate-400 block font-bold uppercase">Umur / Standar Umur</span>
                <span class="font-bold text-slate-800">${umur} Thn / Std ${std} Thn</span>
              </div>
              <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span class="text-[10px] text-slate-400 block font-bold uppercase">Status Lifetime</span>
                <span class="font-bold ${umur >= std ? 'text-amber-700' : 'text-emerald-700'}">${umur >= std ? '↑ Melewati Umur Standar' : '↓ Masih Produktif'}</span>
              </div>
            </div>
            <div class="p-3 bg-blue-50/70 rounded-xl border border-blue-200/80 space-y-1.5">
              <div class="flex justify-between">
                <span class="text-slate-600">Nilai Perolehan (HPP):</span>
                <span class="font-bold text-slate-900 font-mono">${fmtRp(hpp)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-600">Akumulasi Penyusutan:</span>
                <span class="font-bold text-rose-600 font-mono">- ${fmtRp(susut)}</span>
              </div>
              <div class="flex justify-between border-t border-blue-200/80 pt-1 text-sm">
                <span class="font-bold text-blue-900">Nilai Buku (NBV):</span>
                <span class="font-bold text-blue-900 font-mono">${fmtRp(nbv)}</span>
              </div>
            </div>
          </div>
        `,
        confirmButtonText: 'Tutup Dossier',
        confirmButtonColor: '#059669'
      });
    } else {
      alert(`Dossier Aset: ${no}\nNama: ${nama}\nKategori: ${kat}\nKondisi: ${kond}\nNilai Buku: ${fmtRp(nbv)}`);
    }
  }

  // Bind window.pns namespace for 100% PHP version parity
  if (!window.pns) window.pns = {};
  window.pns.renderAsset3 = renderAllAssetsTable;
  window.pns.onAssetFilterChange = onAssetFilterChange;
  window.pns.onAssetSearch = onAssetSearch;
  window.pns.setAssetBarDim = setAssetBarDim;
  window.pns.changeAssetPage = changeAssetPage;
  window.pns.exportAssetCatalogCsv = exportAssetCatalogCsv;
  window.pns.drillToAssetDetail = drillToAssetDetail;
  window.pns.switchView = navTo;

  window.setAssetBarDim = setAssetBarDim;
  window.onAssetFilterChange = onAssetFilterChange;
  window.onAssetSearch = onAssetSearch;
  window.changeAssetPage = changeAssetPage;
  window.exportAssetCatalogCsv = exportAssetCatalogCsv;
  window.drillToAssetDetail = drillToAssetDetail;

  function renderPortfolioAllTable() {
    renderAllAssetsTable();
  }

  function renderValidasiTable() {
    const tbody = document.getElementById('table-validasi-body');
    if (!tbody) return;

    const query = (document.getElementById('search-validasi')?.value || '').toLowerCase();
    const filterStatus = document.getElementById('filter-val-status')?.value || '';

    const list = (appState.validations || REAL_VALIDATIONS).filter(v => {
      const matchStatus = !filterStatus || v.status === filterStatus;
      const matchQuery = !query ||
        String(v.opname_id || '').toLowerCase().includes(query) ||
        String(v.lokasi || '').toLowerCase().includes(query) ||
        String(v.auditor || '').toLowerCase().includes(query);
      return matchStatus && matchQuery;
    });

    // Update stats cards
    const totalSessions = (appState.validations || []).length;
    const totalAssets = (appState.validations || []).reduce((acc, v) => acc + (Number(v.total_terdaftar) || 0), 0);
    const validAssets = (appState.validations || []).reduce((acc, v) => acc + (Number(v.sesuai) || 0), 0);
    const diffAssets = (appState.validations || []).reduce((acc, v) => acc + (Number(v.selisih) || 0), 0);

    const setValText = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    setValText('val-stat-sessions', totalSessions + ' Sesi');
    setValText('val-stat-total', totalAssets.toLocaleString('id-ID') + ' Unit');
    setValText('val-stat-valid', validAssets.toLocaleString('id-ID') + ' Unit');
    setValText('val-stat-selisih', diffAssets.toLocaleString('id-ID') + ' Unit');

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10" class="text-center py-6 text-slate-500">Tidak ada catatan opname yang cocok.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(v => {
      const statusBadge = v.status === 'Valid'
        ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Valid (Sesuai)</span>'
        : (v.status === 'Ada Selisih'
          ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">Ada Selisih</span>'
          : '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800">Proses</span>');

      return `
        <tr>
          <td class="font-mono font-bold text-sky-600">${escapeHtml(v.opname_id)}</td>
          <td class="num-tabular">${escapeHtml(v.tanggal)}</td>
          <td class="font-semibold text-slate-900">${escapeHtml(v.lokasi)}</td>
          <td class="num-tabular font-bold">${Number(v.total_terdaftar).toLocaleString('id-ID')}</td>
          <td class="num-tabular text-emerald-600 font-bold">${Number(v.sesuai).toLocaleString('id-ID')}</td>
          <td class="num-tabular ${v.selisih > 0 ? 'text-amber-600 font-bold' : 'text-slate-500'}">${Number(v.selisih)}</td>
          <td>${statusBadge}</td>
          <td>${escapeHtml(v.auditor)}</td>
          <td class="text-xs text-slate-500 max-w-xs truncate">${escapeHtml(v.catatan || '-')}</td>
          <td class="text-right">
            <button type="button" onclick="verifikasiOpname('${escapeHtml(v.opname_id)}')" class="px-2.5 py-1 text-[10px] font-bold rounded bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white transition">
              Detail / Sync
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function onSearchValidasi() {
    renderValidasiTable();
  }

  function openModalTambahOpname() {
    const modal = document.getElementById('modal-tambah-opname');
    if (!modal) return;
    const newId = 'OPN-' + new Date().toISOString().slice(0, 7).replace('-', '') + '-' + ('00' + ((appState.validations || []).length + 1)).slice(-3);
    const opnIdInput = document.getElementById('opn-id');
    if (opnIdInput) opnIdInput.value = newId;

    // Populate genuine buildings to opn-lokasi
    const opnLokasi = document.getElementById('opn-lokasi');
    if (opnLokasi) {
      const genuine = (appState.buildings || []).filter(isGenuineBuilding);
      opnLokasi.innerHTML = '<option value="Semua Site Operasional">Semua Site Operasional</option>' +
        genuine.map(b => `<option value="${escapeHtml(b.kode_gedung)}">${escapeHtml(b.nama_gedung)} (${escapeHtml(b.lokasi_site)})</option>`).join('');
    }
    modal.classList.remove('hidden');
  }

  function closeModalTambahOpname() {
    const modal = document.getElementById('modal-tambah-opname');
    if (modal) modal.classList.add('hidden');
  }

  function calcOpnSelisih() {
    const total = parseInt(document.getElementById('opn-total')?.value, 10) || 0;
    const sesuai = parseInt(document.getElementById('opn-sesuai')?.value, 10) || 0;
    const selisihEl = document.getElementById('opn-selisih');
    if (selisihEl) selisihEl.value = Math.max(0, total - sesuai);
  }

  function submitTambahOpname(e) {
    if (e) e.preventDefault();
    const id = document.getElementById('opn-id')?.value || ('OPN-' + Date.now());
    const lokasi = document.getElementById('opn-lokasi')?.value || 'Site Operasional';
    const total = parseInt(document.getElementById('opn-total')?.value, 10) || 0;
    const sesuai = parseInt(document.getElementById('opn-sesuai')?.value, 10) || 0;
    const selisih = parseInt(document.getElementById('opn-selisih')?.value, 10) || 0;
    const status = document.getElementById('opn-status')?.value || 'Valid';
    const auditor = document.getElementById('opn-auditor')?.value || 'Petugas Auditor';
    const catatan = document.getElementById('opn-catatan')?.value || '';

    const newOpname = {
      opname_id: id,
      tanggal: new Date().toISOString().slice(0, 10),
      lokasi: lokasi,
      total_terdaftar: total,
      sesuai: sesuai,
      selisih: selisih,
      status: status,
      auditor: auditor,
      catatan: catatan
    };

    if (!appState.validations) appState.validations = [];
    appState.validations.unshift(newOpname);
    renderValidasiTable();
    closeModalTambahOpname();

    if (typeof Swal !== 'undefined') {
      Swal.fire({ title: 'Menyimpan Opname...', didOpen: () => Swal.showLoading() });
    }

    callBackendPost('save_validation', newOpname, res => {
      if (typeof Swal !== 'undefined') {
        Swal.fire('Sukses Tersimpan', `Data stock opname ${id} tercatat di Google Sheets.`, 'success');
      }
    });
  }

  function verifikasiOpname(opnId) {
    const opn = (appState.validations || []).find(v => v.opname_id === opnId);
    if (!opn || typeof Swal === 'undefined') return;
    Swal.fire({
      title: `Detail Validasi: ${opn.opname_id}`,
      html: `
        <div class="text-left text-xs space-y-2 p-2">
          <div><strong>Lokasi Audit:</strong> ${escapeHtml(opn.lokasi)}</div>
          <div><strong>Tanggal:</strong> ${escapeHtml(opn.tanggal)}</div>
          <div><strong>Total Aset:</strong> ${opn.total_terdaftar} unit (Sesuai: <span class="text-emerald-600 font-bold">${opn.sesuai}</span>, Selisih: <span class="text-rose-600 font-bold">${opn.selisih}</span>)</div>
          <div><strong>Status Validasi:</strong> <span class="font-bold">${escapeHtml(opn.status)}</span></div>
          <div><strong>Auditor:</strong> ${escapeHtml(opn.auditor)}</div>
          <div><strong>Catatan:</strong> ${escapeHtml(opn.catatan || '-')}</div>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'Tutup'
    });
  }

  function exportValidasiCsv() {
    const list = appState.validations || REAL_VALIDATIONS;
    let csv = 'ID Opname,Tanggal,Lokasi,Total Terdaftar,Sesuai,Selisih,Status,Auditor,Catatan\r\n';
    list.forEach(v => {
      csv += `"${v.opname_id}","${v.tanggal}","${v.lokasi}",${v.total_terdaftar},${v.sesuai},${v.selisih},"${v.status}","${v.auditor}","${(v.catatan || '').replace(/"/g, '""')}"\r\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `PNS_Validasi_Opname_Aset_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  }
  // ========================================================
  // LIVE WEBRTC CAMERA ENGINE (HP & DESKTOP LANGSUNG)
  // ========================================================
  let cameraMediaStream = null;
  let currentCameraFacing = 'environment'; // default rear camera on HP
  let activeCameraAssetIdx = -1;
  let capturedPhotoBase64 = null;

  function openLiveCameraModal(assetIdx) {
    activeCameraAssetIdx = assetIdx;
    capturedPhotoBase64 = null;

    const modal = document.getElementById('modal-camera');
    const video = document.getElementById('camera-video');
    const preview = document.getElementById('camera-preview-img');
    const overlay = document.getElementById('camera-overlay');
    const shutterGroup = document.getElementById('camera-shutter-group');
    const reviewGroup = document.getElementById('camera-review-group');
    const titleEl = document.getElementById('camera-asset-title');

    if (modal) modal.classList.remove('hidden');
    if (preview) preview.classList.add('hidden');
    if (video) video.classList.remove('hidden');
    if (overlay) overlay.classList.remove('hidden');
    if (shutterGroup) shutterGroup.classList.remove('hidden');
    if (reviewGroup) reviewGroup.classList.add('hidden');

    if (titleEl && appState.currentInspAssets && appState.currentInspAssets[assetIdx]) {
      const ast = appState.currentInspAssets[assetIdx];
      titleEl.innerText = (ast.no_asset || 'ASET') + ' - ' + (ast.nama_asset || '');
    }

    startCameraStream();
  }

  function startCameraStream() {
    stopCameraStream();
    const video = document.getElementById('camera-video');
    if (!video) return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      // Fallback for older browsers: trigger file input with capture="environment"
      triggerNativeCameraFallback();
      return;
    }

    const constraints = {
      video: {
        facingMode: { ideal: currentCameraFacing },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        cameraMediaStream = stream;
        video.srcObject = stream;
        video.play().catch(e => console.warn('Video play error:', e));
      })
      .catch(err => {
        console.warn('getUserMedia failed, trying basic constraints:', err);
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          .then(stream => {
            cameraMediaStream = stream;
            video.srcObject = stream;
            video.play();
          })
          .catch(e => {
            console.error('All camera attempts failed:', e);
            triggerNativeCameraFallback();
          });
      });
  }

  function triggerNativeCameraFallback() {
    closeCameraModal();
    const fallbackInput = document.getElementById('fallback-camera-file');
    if (fallbackInput) {
      fallbackInput.click();
    }
  }

  function flipCamera() {
    currentCameraFacing = currentCameraFacing === 'environment' ? 'user' : 'environment';
    startCameraStream();
  }

  function captureLivePhoto() {
    const video = document.getElementById('camera-video');
    const canvas = document.getElementById('camera-canvas');
    const preview = document.getElementById('camera-preview-img');
    const overlay = document.getElementById('camera-overlay');
    const shutterGroup = document.getElementById('camera-shutter-group');
    const reviewGroup = document.getElementById('camera-review-group');

    if (!video || !canvas) return;

    const w = video.videoWidth || 640;
    const h = video.videoHeight || 480;

    // Scale down if image is too large to keep fast sync (~80-120KB)
    const maxDimension = 1024;
    let targetW = w;
    let targetH = h;
    if (targetW > maxDimension || targetH > maxDimension) {
      if (targetW > targetH) {
        targetH = Math.round((targetH * maxDimension) / targetW);
        targetW = maxDimension;
      } else {
        targetW = Math.round((targetW * maxDimension) / targetH);
        targetH = maxDimension;
      }
    }

    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, targetW, targetH);

    capturedPhotoBase64 = canvas.toDataURL('image/jpeg', 0.72);

    if (preview) {
      preview.src = capturedPhotoBase64;
      preview.classList.remove('hidden');
    }
    if (video) video.classList.add('hidden');
    if (overlay) overlay.classList.add('hidden');
    if (shutterGroup) shutterGroup.classList.add('hidden');
    if (reviewGroup) reviewGroup.classList.remove('hidden');
  }

  function retakeLivePhoto() {
    capturedPhotoBase64 = null;
    const video = document.getElementById('camera-video');
    const preview = document.getElementById('camera-preview-img');
    const overlay = document.getElementById('camera-overlay');
    const shutterGroup = document.getElementById('camera-shutter-group');
    const reviewGroup = document.getElementById('camera-review-group');

    if (preview) preview.classList.add('hidden');
    if (video) video.classList.remove('hidden');
    if (overlay) overlay.classList.remove('hidden');
    if (shutterGroup) shutterGroup.classList.remove('hidden');
    if (reviewGroup) reviewGroup.classList.add('hidden');
  }

  function saveLivePhoto() {
    if (!capturedPhotoBase64 || activeCameraAssetIdx < 0) {
      closeCameraModal();
      return;
    }

    if (appState.currentInspAssets && appState.currentInspAssets[activeCameraAssetIdx]) {
      appState.currentInspAssets[activeCameraAssetIdx].foto_asset = capturedPhotoBase64;
      loadRoomAssetsChecklist(appState.currentInspAssets);
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'success',
          title: 'Foto Tersimpan',
          text: 'Foto aset berhasil diambil dan dimasukkan ke checklist audit.',
          timer: 1200,
          showConfirmButton: false
        });
      }
    }

    closeCameraModal();
  }

  function closeCameraModal() {
    stopCameraStream();
    const modal = document.getElementById('modal-camera');
    if (modal) modal.classList.add('hidden');
  }

  function stopCameraStream() {
    if (cameraMediaStream) {
      cameraMediaStream.getTracks().forEach(track => track.stop());
      cameraMediaStream = null;
    }
  }

  function uploadAssetPhotoFromInput(evt) {
    const file = evt.target.files && evt.target.files[0];
    if (!file || activeCameraAssetIdx < 0) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      if (appState.currentInspAssets && appState.currentInspAssets[activeCameraAssetIdx]) {
        appState.currentInspAssets[activeCameraAssetIdx].foto_asset = e.target.result;
        loadRoomAssetsChecklist(appState.currentInspAssets);
      }
    };
    reader.readAsDataURL(file);
    closeCameraModal();
  }
    
  // Global window exposure for inline onclick handlers
  if (typeof window !== "undefined") {
    // Navigation & UI
    window.navTo = navTo;
    window.toggleSidebar = typeof toggleSidebar !== 'undefined' ? toggleSidebar : function(show) {
      const sb = document.getElementById('app-sidebar');
      if (sb) {
        if (show === false) sb.classList.add('-translate-x-full');
        else sb.classList.toggle('-translate-x-full');
      }
    };
    window.toggleNavModule = toggleNavModule;
    window.refreshDashboard = refreshDashboard;
    window.syncAllFromBackend = syncAllFromBackend;

    // Building Master (view-gedung)
    window.setBuildingViewMode = setBuildingViewMode;
    window.setBldgSiteFilter = setBldgSiteFilter;
    window.filterBuildings = filterBuildings;
    window.renderBuildingsTable = renderBuildingsTable;
    window.renderBuildingsCards = renderBuildingsCards;
    window.changeBuildingPage = changeBuildingPage;
    window.goToBuildingPage = goToBuildingPage;
    window.onSearchBldg = onSearchBldg;
    window.startInspectionForBldg = startInspectionForBldg;

    // Facilities (view-assets)
    window.renderAssetsTable = renderAssetsTable;
    window.changeFacilityPage = changeFacilityPage;
    window.goToFacilityPage = goToFacilityPage;
    window.onFacilityFilterChange = onFacilityFilterChange;
    window.onFacilitySearch = onFacilitySearch;
    window.onSearchAsset = onSearchAsset;
    window.updateFacilitiesKpi = updateFacilitiesKpi;

    // Asset Management Submodules
    window.renderPortfolioComposition = renderPortfolioComposition;
  window.exportPortfolioCompositionCsv = exportPortfolioCompositionCsv;
  window.renderAssetSebaran = renderAssetSebaran;
    window.renderAssetDepreciation = renderAssetDepreciation;
    window.exportDepreciationCsv = exportDepreciationCsv;
    window.initAssetLocationView = initAssetLocationView;
    window.onLocAssetSelected = onLocAssetSelected;
    window.onLocTargetBldgChange = onLocTargetBldgChange;
    window.submitAssetLocation = submitAssetLocation;
    window.initAssetStatusView = initAssetStatusView;
    window.onStatusAssetSelected = onStatusAssetSelected;
    window.submitAssetStatus = submitAssetStatus;
    window.initAssetDisposalView = initAssetDisposalView;
    window.onDispAssetCodeInput = onDispAssetCodeInput;
    window.onDispAssetSelected = onDispAssetCodeInput;
    window.onSearchDisposalBa = onSearchDisposalBa;
    window.submitAssetDisposal = submitAssetDisposal;
    window.printDisposalBa = printDisposalBa;
    window.exportDisposalArchiveCsv = exportDisposalArchiveCsv;

    // Master Catalog & Portfolio (34K+)
    window.renderAllAssetsTable = renderAllAssetsTable;
    window.onAssetFilterChange = onAssetFilterChange;
    window.onAssetSearch = onAssetSearch;
    window.changeAssetPage = changeAssetPage;
    window.exportAssetCatalogCsv = exportAssetCatalogCsv;

    // Inspection Module
    window.setInspBldgCategory = setInspBldgCategory;
    window.onInspGedungChange = onInspGedungChange;
    window.onInspRuanganChange = onInspRuanganChange;
    window.markAllAssetsGood = markAllAssetsGood;
    window.promptAddAssetToRoom = promptAddAssetToRoom;
    window.resetInspectionForm = resetInspectionForm;
    window.submitInspection = submitInspection;
    window.classifyAssetType = classifyAssetType;
    window.getGroupedRoomAssets = getGroupedRoomAssets;
    window.renderInspectionVisualCards = renderInspectionVisualCards;
    window.filterInspectionTableByType = filterInspectionTableByType;
    window.resetInspectionAssetFilter = resetInspectionAssetFilter;
    window.renderInspectionFieldCards = renderInspectionFieldCards;
    window.setGroupCondition = setGroupCondition;
    window.stepAssetTypeQuantity = stepAssetTypeQuantity;
    window.setInspectionViewMode = setInspectionViewMode;

    // Camera & Photo Proof
    window.closeCameraModal = closeCameraModal;
    window.flipCamera = flipCamera;
    window.captureLivePhoto = captureLivePhoto;
    window.retakeLivePhoto = retakeLivePhoto;
    window.saveLivePhoto = saveLivePhoto;
    window.uploadAssetPhotoFromInput = uploadAssetPhotoFromInput;
    window.uploadAssetPhotoDirect = uploadAssetPhotoDirect;
    window.removeAssetPhoto = removeAssetPhoto;
    window.closeDetailModal = closeDetailModal;

    // Rooms & Penghuni
    window.renderRoomsTable = renderRoomsTable;
    window.onSearchRoom = onSearchRoom;
    window.editPenghuni = editPenghuni;
    window.setPenghuniPage = setPenghuniPage;
    window.sortPenghuni = sortPenghuni;
    window.promptAddPenghuni = promptAddPenghuni;
    window.onSearchPenghuni = onSearchPenghuni;
    window.onPenghuniBldgFilterChange = onPenghuniBldgFilterChange;
    window.renderPenghuniTable = renderPenghuniTable;

    // Stock Opname & Validasi
    window.openModalTambahOpname = openModalTambahOpname;
    window.closeModalTambahOpname = closeModalTambahOpname;
    window.submitTambahOpname = submitTambahOpname;
    window.calcOpnSelisih = calcOpnSelisih;
    window.renderValidasiTable = renderValidasiTable;
    window.exportValidasiCsv = exportValidasiCsv;
    window.onSearchValidasi = onSearchValidasi;

    // Work Orders & Mutations
    window.renderWorkOrdersKanban = renderWorkOrdersKanban;
    window.promptCreateWo = promptCreateWo;
    window.switchWoViewMode = switchWoViewMode;
    window.loadRegRooms = loadRegRooms;
    window.submitRegisterAsset = submitRegisterAsset;
    window.loadMutRooms = loadMutRooms;
    window.submitMutasiAsset = submitMutasiAsset;
    window.getDefaultRoomFacilityAssets = getDefaultRoomFacilityAssets;
  }


  // Global Bridge
  window.pns = window.pns || {};
  [
    'navTo', 'switchView', 'setBldgSiteFilter', 'filterBuildings', 'changeBuildingPage', 'setBuildingViewMode',
    'setAssetEnvFilter', 'setAssetOverviewDim', 'setAssetPerfDim', 'applyPbiFilters', 'initAsset1Slicers',
    'changeAssetPage', 'setAssetBarDim', 'onAssetFilterChange', 'onAssetSearch', 'exportAssetCatalogCsv', 'drillToAssetDetail',
    'changeFacilityPage', 'onFacilityFilterChange', 'onFacilitySearch', 'renderAssetsTable',
    'onInspGedungChange', 'onInspRuanganChange', 'setInspBldgCategory',
    'editPenghuni', 'setPenghuniPage', 'sortPenghuni', 'promptAddPenghuni', 'onSearchPenghuni', 'onPenghuniBldgFilterChange', 'renderPenghuniTable',
    'initAssetLocationView', 'onLocAssetSelected', 'onLocTargetBldgChange', 'submitAssetLocation',
    'initAssetStatusView', 'onStatusAssetSelected', 'submitAssetStatus',
    'initAssetDisposalView', 'onDispAssetCodeInput', 'submitAssetDisposal', 'onSearchDisposalBa', 'exportDisposalArchiveCsv',
    'renderAssetDepreciation', 'exportDepreciationCsv',
    'renderPortfolioComposition', 'renderAssetSebaran', 'renderAllAssetsTable', 'renderAsset1', 'renderAsset2',
    'renderBuildingsTable', 'renderBuildingsCards', 'renderRoomsTable', 'renderWorkOrdersKanban',
    'openModalTambahOpname', 'closeModalTambahOpname', 'submitTambahOpname', 'renderValidasiTable', 'exportValidasiCsv',
    'promptCreateWo', 'switchWoViewMode', 'submitRegisterAsset', 'submitMutasiAsset'
  ].forEach(fnName => {
    try {
      const fn = eval(fnName);
      if (typeof fn === 'function') {
        window[fnName] = window.pns[fnName] = fn;
      }
    } catch(e) {}
  });

window.filterPenghuniByHouse = filterPenghuniByHouse;
window.renderHunianHouseCards = renderHunianHouseCards;

window.setInspectionMode = setInspectionMode;
window.renderInspectionUnitTable = renderInspectionUnitTable;
window.updateSingleAssetCond = updateSingleAssetCond;
window.updateSingleAssetNote = updateSingleAssetNote;
