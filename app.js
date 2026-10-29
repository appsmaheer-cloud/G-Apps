/**
 * ==========================================================================
 * PNS ASSET MANAGEMENT ENTERPRISE — FRONTEND CONTROLLER
 * PT Pratama Nusantara Sakti (Dual-Engine: GAS + REST Fetch for GitHub Pages)
 * ==========================================================================
 */
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
        wo_id: 1,
        no_wo: 'WO-0384',
        tipe_wo: 'Korektif',
        prioritas: 'Tinggi',
        judul_pekerjaan: 'Penggantian keran wastafel bocor',
        kode_gedung: 'PNS-GH-01',
        lokasi_detail: 'Kamar Tamu 01',
        teknisi_nama: 'Slamet Riyadi',
        sla_target: 'SLA 1 Hari',
        status: 'Dikerjakan',
        biaya_estimasi: 120000
      },
      {
        wo_id: 2,
        no_wo: 'WO-0385',
        tipe_wo: 'Preventif',
        prioritas: 'Sedang',
        judul_pekerjaan: 'Pembersihan filter AC berkala',
        kode_gedung: 'PNS-FAC-LH 01',
        lokasi_detail: 'Seluruh Kamar Longhouse',
        teknisi_nama: 'Budi Santoso',
        sla_target: 'SLA 3 Hari',
        status: 'Baru',
        biaya_estimasi: 350000
      }
    ],
    penghuni: [
      { nik: 'PNS-AGR-01', nama_penghuni: 'Ahmad Suhendra', departemen: 'Agronomi', kode_gedung: 'PNS-FAC-LH 01', nama_ruangan: 'KAMAR NO.1', nomor_kasur: 'Bed A', status_hunian: 'Aktif', no_kontak: '0822-1476-369' },
      { nik: 'PNS-AGR-02', nama_penghuni: 'Bambang Triatmojo', departemen: 'Factory', kode_gedung: 'PNS-FAC-LH 01', nama_ruangan: 'KAMAR NO.1', nomor_kasur: 'Bed B', status_hunian: 'Aktif', no_kontak: '0813-8821-445' },
      { nik: 'PNS-LOG-01', nama_penghuni: 'Dedi Kurniawan', departemen: 'Logistik', kode_gedung: 'PNS-LH-05-01', nama_ruangan: 'KAMAR NO.2', nomor_kasur: 'Bed A', status_hunian: 'Aktif', no_kontak: '0857-9912-334' }
    ],
    currentBldgFilterSite: '',
    currentInspAssets: []
  };

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
  const onSearchPenghuni = debounce(() => renderPenghuniTable(), 150);

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
    renderWorkOrdersTable();
    renderPenghuniTable();

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
      appState.buildings = data.buildings;
      const subEl = document.getElementById('subtitle-gedung-count');
      if (subEl) subEl.innerText = `${data.buildings.length.toLocaleString('id-ID')} data gedung nyata dari database Google Sheets`;
    }
    if (Array.isArray(data.rooms) && data.rooms.length > 0) {
      appState.rooms = data.rooms;
    }
    if (Array.isArray(data.assets) && data.assets.length > 0) {
      appState.assets = data.assets;
    }
    if (Array.isArray(data.inspections) && data.inspections.length > 0) {
      appState.inspections = data.inspections;
    }
    if (Array.isArray(data.workOrders) && data.workOrders.length > 0) {
      appState.workOrders = data.workOrders;
    }
    if (Array.isArray(data.penghuni) && data.penghuni.length > 0) {
      appState.penghuni = data.penghuni;
    }

    initInspectionFormDropdowns();
    renderDashboardCharts();
    renderPortfolioSites();
    filterBuildings();
    renderRoomsTable();
    renderAssetsTable();
    renderHistoryTable();
    renderWorkOrdersTable();
    renderPenghuniTable();
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
  function navTo(viewId, btnEl) {
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

    if (window.innerWidth < 1024) {
      const sb = document.getElementById('app-sidebar');
      if (sb) sb.classList.add('-translate-x-full');
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
    const toggleBtn = document.getElementById('btn-theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
      });
    }
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
              <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">SITE ${s.code}</span>
              <span class="num-tabular text-xs font-semibold text-emerald-600 dark:text-emerald-400">Aktif Beroperasi</span>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">${escapeHtml(s.name)}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${escapeHtml(s.desc)}</p>
          </div>

          <div class="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div class="flex justify-between">
              <span class="text-slate-500">Penanggungjawab (PIC):</span>
              <strong class="text-slate-800 dark:text-slate-200">${escapeHtml(s.pic)}</strong>
            </div>
            <div class="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg">
              <div>
                <div class="text-[10px] text-slate-400 uppercase font-semibold">Total Gedung</div>
                <div class="num-tabular text-sm font-bold text-slate-900 dark:text-white">${countBldg.toLocaleString('id-ID')} Unit</div>
              </div>
              <div>
                <div class="text-[10px] text-slate-400 uppercase font-semibold">Estimasi Ruangan</div>
                <div class="num-tabular text-sm font-bold text-sky-600 dark:text-sky-400">${countRooms.toLocaleString('id-ID')} Ruang</div>
              </div>
            </div>
            <button onclick="openSiteBuildings('${s.name}')" class="w-full py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-900 hover:text-white dark:hover:bg-sky-500 dark:hover:text-slate-950 transition">
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

  // ==========================================
  // MASTER GEDUNG
  // ==========================================
  function setBldgSiteFilter(site, btnEl) {
    appState.currentBldgFilterSite = site;
    document.querySelectorAll('.bldg-site-pill').forEach(b => {
      b.classList.remove('active', 'bg-slate-900', 'text-white', 'dark:bg-sky-500', 'dark:text-slate-950');
      b.classList.add('bg-slate-100', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-300');
    });
    if (btnEl) {
      btnEl.classList.remove('bg-slate-100', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-300');
      btnEl.classList.add('active', 'bg-slate-900', 'text-white', 'dark:bg-sky-500', 'dark:text-slate-950');
    }
    filterBuildings();
  }

  function filterBuildings() {
    const searchInput = document.getElementById('search-bldg');
    const query = (searchInput ? searchInput.value : '').toLowerCase();
    const filtered = appState.buildings.filter(b => {
      const matchSite = !appState.currentBldgFilterSite || b.lokasi_site === appState.currentBldgFilterSite;
      const matchQuery = !query ||
        String(b.kode_gedung || '').toLowerCase().includes(query) ||
        String(b.nama_gedung || '').toLowerCase().includes(query) ||
        String(b.penanggungjawab || '').toLowerCase().includes(query);
      return matchSite && matchQuery;
    });
    renderBuildingsCards(filtered);
  }

  function renderBuildingsCards(list) {
    const data = list || appState.buildings;
    const container = document.getElementById('bldg-cards-container');
    if (!container) return;

    if (data.length === 0) {
      container.innerHTML = `<div class="col-span-full clean-card p-8 text-center text-xs text-slate-400">Tidak ada gedung yang cocok dengan pencarian Anda.</div>`;
      return;
    }

    container.innerHTML = data.slice(0, 120).map(b => `
      <div class="clean-card bldg-card-item p-4 flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start gap-2 mb-1.5">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">${escapeHtml(b.kode_gedung)}</span>
            <span class="text-[10px] font-medium text-slate-400">${escapeHtml(b.lokasi_site)}</span>
          </div>
          <h4 class="font-bold text-xs text-slate-900 dark:text-white line-clamp-2 leading-snug">${escapeHtml(b.nama_gedung)}</h4>
          <div class="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <i class="ph-bold ph-user text-xs" aria-hidden="true"></i> ${escapeHtml(b.penanggungjawab || 'Tim General Services')}
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div class="num-tabular flex gap-2 text-[10px] font-semibold">
            <span class="text-sky-600 dark:text-sky-400">${b.total_ruangan || 0} Ruangan</span>
            <span class="text-slate-300 dark:text-slate-700">&bull;</span>
            <span class="text-teal-600 dark:text-teal-400">${b.total_asset || 0} Aset</span>
          </div>
          <button onclick="startInspectionForBldg('${escapeHtml(b.kode_gedung)}')" class="px-2.5 py-1 text-[11px] font-bold rounded bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-700 dark:text-slate-200 transition">
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
      tbody.innerHTML = `<tr><td colspan="9" class="text-center py-6 text-slate-400">Tidak ada ruangan yang sesuai filter.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.slice(0, 120).map(r => `
      <tr>
        <td class="font-mono text-slate-600 dark:text-slate-400">${escapeHtml(r.kode_gedung)}</td>
        <td class="font-bold text-slate-900 dark:text-white">${escapeHtml(r.nama_ruangan)}</td>
        <td><span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800">${escapeHtml(r.tipe_ruangan || 'Kamar')}</span></td>
        <td class="num-tabular">${r.kapasitas || 2} Orang</td>
        <td>${escapeHtml(r.penanggungjawab || '-')}</td>
        <td class="num-tabular font-bold text-sky-600 dark:text-sky-400">${r.total_asset || 0} item</td>
        <td><span class="px-2 py-0.5 rounded text-[10px] font-bold ${r.kondisi_terakhir === 'Baik' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-amber-100 text-amber-800'}">${escapeHtml(r.kondisi_terakhir || 'Baik')}</span></td>
        <td><span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">${escapeHtml(r.status_hunian || 'Tersedia')}</span></td>
        <td>
          <button onclick="startInspectionForRoom('${escapeHtml(r.kode_gedung)}', '${escapeHtml(r.nama_ruangan)}')" class="px-2.5 py-1 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800 hover:bg-emerald-600 hover:text-white transition">
            Audit Kamar
          </button>
        </td>
      </tr>
    `).join('');
  }

  function renderAssetsTable() {
    const searchEl = document.getElementById('search-asset');
    const search = (searchEl ? searchEl.value : '').toLowerCase();
    const tbody = document.getElementById('table-assets-body');
    if (!tbody) return;

    const filtered = appState.assets.filter(a => {
      return !search ||
        String(a.no_asset || '').toLowerCase().includes(search) ||
        String(a.nama_asset || '').toLowerCase().includes(search) ||
        String(a.kode_gedung || '').toLowerCase().includes(search);
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center py-6 text-slate-400">Tidak ada aset fisik yang cocok dengan kata kunci.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.slice(0, 120).map(a => `
      <tr>
        <td class="font-mono font-bold text-sky-600 dark:text-sky-400">${escapeHtml(a.no_asset)}</td>
        <td class="font-medium text-slate-900 dark:text-white">${escapeHtml(a.nama_asset)}</td>
        <td class="font-mono text-slate-500">${escapeHtml(a.kode_gedung)}</td>
        <td>${escapeHtml(a.nama_ruangan)}</td>
        <td>${escapeHtml(a.kategori_asset || '-')}</td>
        <td><span class="px-2 py-0.5 rounded text-[10px] font-bold ${a.kondisi === 'Baik' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-rose-100 text-rose-800'}">${escapeHtml(a.kondisi)}</span></td>
        <td class="font-mono num-tabular">Rp ${Number(a.total_harga_perolehan || 0).toLocaleString('id-ID')}</td>
        <td class="num-tabular">${escapeHtml(a.tanggal_perolehan || '-')}</td>
      </tr>
    `).join('');
  }

  // ==========================================
  // FORM INSPEKSI 5-LANGKAH LOGIC (BATCHED DOM)
  // ==========================================
  function initInspectionFormDropdowns() {
    const gSelect = document.getElementById('insp-gedung');
    const filterBldgSelect = document.getElementById('filter-room-bldg');
    const regGedung = document.getElementById('reg-gedung');
    const mutGedung = document.getElementById('mut-ke-gedung');

    const bldgOptionsHtml = appState.buildings.map(b =>
      `<option value="${escapeHtml(b.kode_gedung)}">${escapeHtml(b.nama_gedung)} (${escapeHtml(b.lokasi_site)})</option>`
    ).join('');

    const filterOptionsHtml = appState.buildings.map(b =>
      `<option value="${escapeHtml(b.kode_gedung)}">${escapeHtml(b.kode_gedung)} - ${escapeHtml(b.nama_gedung)}</option>`
    ).join('');

    if (gSelect) gSelect.innerHTML = '<option value="">-- Pilih Gedung Acuan --</option>' + bldgOptionsHtml;
    if (filterBldgSelect) filterBldgSelect.innerHTML = '<option value="">Semua Gedung</option>' + filterOptionsHtml;
    if (regGedung) regGedung.innerHTML = bldgOptionsHtml;
    if (mutGedung) mutGedung.innerHTML = bldgOptionsHtml;

    loadRegRooms();
    loadMutRooms();
  }

  function getRoomsForBuilding(bCode) {
    if (!bCode) return [];
    const bldg = appState.buildings.find(b => b.kode_gedung === bCode);
    const bId = bldg ? bldg.gedung_id : '';
    return appState.rooms.filter(r => r.kode_gedung === bCode || (bId && r.gedung_id === bId));
  }

  function onInspGedungChange() {
    const bCode = document.getElementById('insp-gedung').value;
    const rSelect = document.getElementById('insp-ruangan');
    const infoBox = document.getElementById('insp-gedung-info');

    if (!bCode) {
      rSelect.innerHTML = '<option value="">-- Pilih Gedung Terlebih Dahulu --</option>';
      rSelect.disabled = true;
      infoBox.classList.add('hidden');
      return;
    }

    const bldg = appState.buildings.find(b => b.kode_gedung === bCode);
    if (bldg) {
      infoBox.classList.remove('hidden');
      infoBox.innerHTML = `<strong>${escapeHtml(bldg.nama_gedung)}</strong> &bull; Site: ${escapeHtml(bldg.lokasi_site)} &bull; PIC: <strong>${escapeHtml(bldg.penanggungjawab || '-')}</strong> &bull; Ruangan: ${bldg.total_ruangan || 0}`;
      document.getElementById('insp-pic').value = bldg.penanggungjawab || '';
    }

    const matchingRooms = getRoomsForBuilding(bCode);
    const roomOpts = matchingRooms.map(r =>
      `<option value="${escapeHtml(r.nama_ruangan)}">${escapeHtml(r.nama_ruangan)} (${escapeHtml(r.tipe_ruangan || 'Kamar')} - ${r.total_asset || 0} Aset)</option>`
    ).join('');

    rSelect.innerHTML = '<option value="">-- Pilih Ruangan / Kamar --</option>' + roomOpts;
    rSelect.disabled = false;
  }

  function onInspRuanganChange() {
    const bCode = document.getElementById('insp-gedung').value;
    const rName = document.getElementById('insp-ruangan').value;
    const infoBox = document.getElementById('insp-ruang-info');

    if (!rName) {
      infoBox.classList.add('hidden');
      loadRoomAssetsChecklist([]);
      return;
    }

    const matchingRooms = getRoomsForBuilding(bCode);
    const room = matchingRooms.find(r => r.nama_ruangan === rName);
    if (room) {
      infoBox.classList.remove('hidden');
      infoBox.innerHTML = `Kapasitas: <strong>${room.kapasitas || 2} Orang</strong> &bull; Kondisi Terakhir: <strong>${escapeHtml(room.kondisi_terakhir || 'Baik')}</strong> &bull; Status: ${escapeHtml(room.status_hunian || 'Tersedia')}`;
    }

    const localAssets = appState.assets.filter(a =>
      (a.kode_gedung === bCode && String(a.nama_ruangan || '').toLowerCase() === rName.toLowerCase()) ||
      (room && room.kode_ruangan && a.kode_ruangan === room.kode_ruangan)
    );
    loadRoomAssetsChecklist(localAssets);

    // Fetch live room assets from Google Sheets if connected
    const rCode = room ? (room.kode_ruangan || room.ruangan_id || '') : '';
    if (isGasEnvironment()) {
      google.script.run
        .withSuccessHandler(liveAssets => {
          if (Array.isArray(liveAssets) && liveAssets.length > 0) {
            loadRoomAssetsChecklist(liveAssets);
          }
        })
        .apiGetRuanganAssets(bCode, rName, rCode);
    } else {
      const remoteUrl = getRemoteGasUrl();
      if (remoteUrl) {
        const q = `?api=ruangan_assets&kode_gedung=${encodeURIComponent(bCode)}&nama_ruangan=${encodeURIComponent(rName)}&kode_ruangan=${encodeURIComponent(rCode)}`;
        fetch(remoteUrl + q)
          .then(r => r.json())
          .then(res => {
            const list = (res && res.data) ? res.data : res;
            if (Array.isArray(list) && list.length > 0) loadRoomAssetsChecklist(list);
          })
          .catch(() => {});
      }
    }
  }

  function loadRoomAssetsChecklist(assets) {
    appState.currentInspAssets = assets || [];
    const tbody = document.getElementById('insp-asset-checklist');
    if (!tbody) return;

    if (!assets || assets.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-6 text-slate-400">
            Tidak ada aset tercatat di ruangan ini. Klik <strong>Tambah Item Aset Baru</strong> jika menemukan barang fisik saat audit.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = assets.map((a, idx) => `
      <tr>
        <td class="font-mono font-bold text-sky-600 dark:text-sky-400">${escapeHtml(a.no_asset)}</td>
        <td class="font-medium">${escapeHtml(a.nama_asset)}</td>
        <td><span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800">${escapeHtml(a.kondisi || 'Baik')}</span></td>
        <td>
          <div class="flex flex-wrap items-center gap-3">
            <label class="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="asset_cond_${idx}" value="Baik" checked onchange="updateAuditItemCond(${idx}, 'Baik')" class="text-emerald-600">
              <span class="text-emerald-700 dark:text-emerald-400 font-bold">Baik</span>
            </label>
            <label class="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="asset_cond_${idx}" value="Rusak Ringan" onchange="updateAuditItemCond(${idx}, 'Rusak Ringan')" class="text-amber-600">
              <span class="text-amber-700 dark:text-amber-400">Rusak Ringan</span>
            </label>
            <label class="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="asset_cond_${idx}" value="Rusak Berat" onchange="updateAuditItemCond(${idx}, 'Rusak Berat')" class="text-rose-600">
              <span class="text-rose-700 dark:text-rose-400 font-bold">Rusak Berat</span>
            </label>
          </div>
        </td>
        <td>
          <input type="text" placeholder="Catatan fisik..." id="asset_note_${idx}" class="w-full px-2 py-1 text-[11px] rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        </td>
      </tr>
    `).join('');
  }

  function updateAuditItemCond(idx, cond) {
    if (appState.currentInspAssets[idx]) {
      appState.currentInspAssets[idx].kondisi_inspeksi = cond;
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
            <label class="block font-semibold mb-1">Nomor Aset / Barcode:</label>
            <input type="text" id="swal-no-asset" class="swal2-input !h-8 !text-xs !w-full !m-0" placeholder="PNS-NEW-001">
          </div>
          <div>
            <label class="block font-semibold mb-1">Nama Aset:</label>
            <input type="text" id="swal-nama-asset" class="swal2-input !h-8 !text-xs !w-full !m-0" placeholder="Kasur Busa / Meja / AC">
          </div>
          <div>
            <label class="block font-semibold mb-1">Kondisi Fisik:</label>
            <select id="swal-cond" class="swal2-select !h-8 !text-xs !w-full !m-0">
              <option value="Baik">Baik</option>
              <option value="Rusak Ringan">Rusak Ringan</option>
              <option value="Rusak Berat">Rusak Berat</option>
            </select>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Tambahkan',
      preConfirm: () => ({
        no_asset: document.getElementById('swal-no-asset').value,
        nama_asset: document.getElementById('swal-nama-asset').value,
        kondisi: document.getElementById('swal-cond').value
      })
    }).then(res => {
      if (res.isConfirmed && res.value.nama_asset) {
        const newItem = {
          kode_gedung: bCode,
          nama_ruangan: rName,
          no_asset: res.value.no_asset || ('NEW-' + new Date().getTime()),
          nama_asset: res.value.nama_asset,
          kondisi: res.value.kondisi,
          kategori_asset: 'FASILITAS KAMAR',
          total_harga_perolehan: 0
        };
        appState.assets.unshift(newItem);
        appState.currentInspAssets.push(newItem);
        loadRoomAssetsChecklist(appState.currentInspAssets);
        callBackendPost('save_asset_register', newItem);
        Swal.fire('Berhasil', 'Aset baru ditambahkan ke checklist audit dan Google Sheets.', 'success');
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
        <td class="font-mono font-bold text-sky-600 dark:text-sky-400">${escapeHtml(item.no_inspeksi)}</td>
        <td class="num-tabular">${escapeHtml(item.tanggal_inspeksi)}</td>
        <td class="font-bold">${escapeHtml(item.kode_gedung)}</td>
        <td>${escapeHtml(item.nama_ruangan)}</td>
        <td>${escapeHtml(item.penanggungjawab)}</td>
        <td>${escapeHtml(item.inspector_nama)}</td>
        <td class="num-tabular"><span class="font-bold text-emerald-600">${item.skor_kelaikan}</span>/100</td>
        <td><span class="px-2 py-0.5 rounded text-[10px] font-bold ${item.kondisi_ruangan === 'Aman' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-rose-100 text-rose-800'}">${escapeHtml(item.kondisi_ruangan)}</span></td>
        <td class="num-tabular">${item.total_asset_diperiksa} item</td>
        <td>
          <button onclick="viewInspectionDetail('${escapeHtml(item.no_inspeksi)}')" class="px-2.5 py-1 text-[10px] font-bold rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">
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
      <div class="border-b border-slate-200 dark:border-slate-700 pb-3 flex justify-between items-center">
        <div>
          <div class="text-[10px] text-slate-400 uppercase font-bold">PT PRATAMA NUSANTARA SAKTI &bull; DIVISI GENERAL SERVICES &amp; FASILITAS</div>
          <div class="text-base font-bold text-slate-900 dark:text-white">${escapeHtml(item.nama_gedung || item.kode_gedung)}</div>
          <div class="text-xs text-slate-500">Ruangan / Kamar: <strong>${escapeHtml(item.nama_ruangan)}</strong></div>
        </div>
        <div class="text-right num-tabular">
          <span class="text-2xl font-black text-emerald-600">${item.skor_kelaikan}</span><span class="text-xs text-slate-400">/100</span>
          <div class="text-[11px] font-bold text-slate-700 dark:text-slate-300">${escapeHtml(item.kondisi_ruangan)}</div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg">
        <div><span class="text-slate-400">Tanggal Audit:</span> <strong class="num-tabular">${escapeHtml(item.tanggal_inspeksi)}</strong></div>
        <div><span class="text-slate-400">Auditor:</span> <strong>${escapeHtml(item.inspector_nama)}</strong></div>
        <div><span class="text-slate-400">Penanggungjawab PIC:</span> <strong>${escapeHtml(item.penanggungjawab)}</strong></div>
        <div><span class="text-slate-400">Total Aset Diperiksa:</span> <strong class="num-tabular">${item.total_asset_diperiksa} Item</strong></div>
      </div>

      <div>
        <div class="font-bold text-xs uppercase tracking-wider text-slate-500 mb-1">Catatan Temuan Fisik:</div>
        <div class="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-900 dark:text-amber-200">
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
  function renderWorkOrdersTable() {
    const tbody = document.getElementById('table-wo-body');
    if (!tbody) return;
    tbody.innerHTML = appState.workOrders.map(w => `
      <tr>
        <td class="font-mono font-bold text-sky-600 dark:text-sky-400">${escapeHtml(w.no_wo)}</td>
        <td><span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800">${escapeHtml(w.tipe_wo)}</span></td>
        <td><span class="px-2 py-0.5 rounded text-[10px] font-bold ${w.prioritas === 'Tinggi' ? 'bg-rose-100 text-rose-800' : 'bg-sky-100 text-sky-800'}">${escapeHtml(w.prioritas)}</span></td>
        <td class="font-bold">${escapeHtml(w.judul_pekerjaan)}</td>
        <td>${escapeHtml(w.kode_gedung)} &bull; ${escapeHtml(w.lokasi_detail)}</td>
        <td>${escapeHtml(w.teknisi_nama)}</td>
        <td>${escapeHtml(w.sla_target)}</td>
        <td><span class="px-2 py-0.5 rounded text-[10px] font-bold ${w.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-amber-100 text-amber-800'}">${escapeHtml(w.status)}</span></td>
        <td class="font-mono num-tabular">Rp ${Number(w.biaya_estimasi || 0).toLocaleString('id-ID')}</td>
      </tr>
    `).join('');
  }

  function renderPenghuniTable() {
    const searchEl = document.getElementById('search-penghuni');
    const query = (searchEl ? searchEl.value : '').toLowerCase();
    const tbody = document.getElementById('table-penghuni-body');
    if (!tbody) return;

    const filtered = appState.penghuni.filter(p =>
      !query ||
      String(p.nama_penghuni || '').toLowerCase().includes(query) ||
      String(p.nik || '').toLowerCase().includes(query) ||
      String(p.kode_gedung || '').toLowerCase().includes(query)
    );

    tbody.innerHTML = filtered.map(p => `
      <tr>
        <td class="font-mono font-bold">${escapeHtml(p.nik)}</td>
        <td class="font-bold">${escapeHtml(p.nama_penghuni)}</td>
        <td>${escapeHtml(p.departemen)}</td>
        <td class="font-mono">${escapeHtml(p.kode_gedung)}</td>
        <td>${escapeHtml(p.nama_ruangan)}</td>
        <td>${escapeHtml(p.nomor_kasur)}</td>
        <td><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">${escapeHtml(p.status_hunian)}</span></td>
        <td class="num-tabular">${escapeHtml(p.no_kontak)}</td>
      </tr>
    `).join('');
  }

  // ==========================================
  // TRANSAKSI REGISTRASI, MUTASI & WORK ORDER
  // ==========================================
  function loadRegRooms() {
    const gEl = document.getElementById('reg-gedung');
    const rSelect = document.getElementById('reg-ruang');
    if (!gEl || !rSelect) return;
    const rooms = getRoomsForBuilding(gEl.value);
    rSelect.innerHTML = rooms.length > 0
      ? rooms.map(r => `<option value="${escapeHtml(r.nama_ruangan)}">${escapeHtml(r.nama_ruangan)}</option>`).join('')
      : '<option value="Area Utama">Area Utama</option>';
  }

  function loadMutRooms() {
    const gEl = document.getElementById('mut-ke-gedung');
    const rSelect = document.getElementById('mut-ke-ruang');
    if (!gEl || !rSelect) return;
    const rooms = getRoomsForBuilding(gEl.value);
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
          renderWorkOrdersTable();
          Swal.fire('Tiket Diterbitkan', `Nomor Tiket: ${newWo.no_wo}`, 'success');
        });
      }
    });
  }
