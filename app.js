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
    penghuni: [
      { nik: 'PNS-AGR-01', nama_penghuni: 'Ahmad Suhendra', departemen: 'Agronomi', kode_gedung: 'PNS-FAC-LH 01', nama_ruangan: 'KAMAR NO.1', nomor_kasur: 'Bed A', status_hunian: 'Aktif', no_kontak: '0822-1476-369' },
      { nik: 'PNS-AGR-02', nama_penghuni: 'Bambang Triatmojo', departemen: 'Factory', kode_gedung: 'PNS-FAC-LH 01', nama_ruangan: 'KAMAR NO.1', nomor_kasur: 'Bed B', status_hunian: 'Aktif', no_kontak: '0813-8821-445' },
      { nik: 'PNS-LOG-01', nama_penghuni: 'Dedi Kurniawan', departemen: 'Logistik', kode_gedung: 'PNS-LH-05-01', nama_ruangan: 'KAMAR NO.2', nomor_kasur: 'Bed A', status_hunian: 'Aktif', no_kontak: '0857-9912-334' }
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
    renderWorkOrdersKanban(); renderAllAssetsTable();
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
    renderWorkOrdersKanban(); renderAllAssetsTable();
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
    const toggleBtn = document.getElementById('btn-theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
      });
    }
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      
    } else {
      
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
            <button onclick="openSiteBuildings('${s.name}')" class="w-full py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-900 hover:text-white :bg-sky-500 :text-slate-950 transition">
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

  function filterBuildings() {
    const searchInput = document.getElementById('search-bldg');
    const query = (searchInput ? searchInput.value : '').toLowerCase();
    currentFilteredBuildings = (appState.buildings || []).filter(b => {
      if (!isGenuineBuilding(b)) return false;
      const matchSite = !appState.currentBldgFilterSite || b.lokasi_site === appState.currentBldgFilterSite;
      const matchQuery = !query ||
        String(b.kode_gedung || '').toLowerCase().includes(query) ||
        String(b.nama_gedung || '').toLowerCase().includes(query) ||
        String(b.penanggungjawab || '').toLowerCase().includes(query);
      return matchSite && matchQuery;
    });

    buildingCurrentPage = 1;
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
  function renderAssetSebaran() {
    const container = document.getElementById('asset-sebaran-grid');
    if (!container) return;

    const sites = [
      { name: 'Central Office (CO)', bldg: 355, rooms: 1240, assets: 11200, pic: 'Miftahul Khoiry / Rizal Dwi', color: 'sky' },
      { name: 'Factory / Pabrik (FR)', bldg: 32, rooms: 180, assets: 2850, pic: 'Ilyasa, Elvan, Nuh & Nando', color: 'amber' },
      { name: 'Estate 1 (E1)', bldg: 1, rooms: 15, assets: 320, pic: 'Biner & Basran', color: 'emerald' },
      { name: 'Estate 2 (E2)', bldg: 12, rooms: 54, assets: 756, pic: 'Rizal Dwi & Rocky', color: 'indigo' },
      { name: 'Estate 3 (E3)', bldg: 16, rooms: 70, assets: 760, pic: 'Budiono MU & Dwiki', color: 'teal' }
    ];

    container.innerHTML = sites.map(s => `
      <div class="clean-card p-4 space-y-3">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-${s.color}-50 text-${s.color}-600 flex items-center justify-center font-bold text-base">
              <i class="ph-bold ph-map-pin"></i>
            </div>
            <div>
              <h4 class="font-bold text-xs text-slate-900">${s.name}</h4>
              <p class="text-[10px] text-slate-400">Wilayah Operasional PNS</p>
            </div>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-${s.color}-50 text-${s.color}-700 border border-${s.color}-100">AKTIF</span>
        </div>
        <div class="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center font-mono">
          <div class="bg-slate-50 p-2 rounded-lg">
            <span class="text-xs font-black text-slate-900 block">${s.bldg}</span>
            <span class="text-[9px] text-slate-400 uppercase font-sans">Gedung</span>
          </div>
          <div class="bg-slate-50 p-2 rounded-lg">
            <span class="text-xs font-black text-slate-900 block">${s.rooms}</span>
            <span class="text-[9px] text-slate-400 uppercase font-sans">Ruangan</span>
          </div>
          <div class="bg-slate-50 p-2 rounded-lg">
            <span class="text-xs font-black text-emerald-600 block">${s.assets.toLocaleString('id-ID')}</span>
            <span class="text-[9px] text-slate-400 uppercase font-sans">Aset</span>
          </div>
        </div>
        <div class="text-[11px] text-slate-500 pt-1 flex items-center gap-1.5">
          <i class="ph-bold ph-user text-slate-400"></i> PIC: <span class="font-semibold text-slate-700">${s.pic}</span>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // ASSET MANAGEMENT: DEPRESIASI & NILAI BUKU
  // ==========================================
  function renderAssetDepreciation() {
    const tbody = document.getElementById('table-depresiasi-body');
    if (!tbody) return;

    const data = [
      { gol: 'Golongan 1 (Peralatan Kantor & IT)', unit: 4820, masa: '4 Tahun (25% / thn)', hpp: 14500000000, akm: 11200000000, nbv: 3300000000, status: 'Aktif' },
      { gol: 'Golongan 2 (Mebel & Fasilitas Hunian)', unit: 15886, masa: '8 Tahun (12.5% / thn)', hpp: 28400000000, akm: 14800000000, nbv: 13600000000, status: 'Aktif' },
      { gol: 'Golongan 3 (Mesin & Alat Operasional)', unit: 1240, masa: '16 Tahun (6.25% / thn)', hpp: 112500000000, akm: 52100000000, nbv: 60400000000, status: 'Aktif' },
      { gol: 'Bangunan Fisik & Properti', unit: 416, masa: '20 Tahun (5% / thn)', hpp: 327100000000, akm: 136700000000, nbv: 190400000000, status: 'Aktif' }
    ];

    tbody.innerHTML = data.map(d => `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="py-2.5 px-3 font-semibold text-slate-800 font-sans">${d.gol}</td>
        <td class="py-2.5 px-3 text-slate-600">${d.unit.toLocaleString('id-ID')} Unit</td>
        <td class="py-2.5 px-3 text-slate-500 font-sans text-[11px]">${d.masa}</td>
        <td class="py-2.5 px-3 text-right font-bold text-slate-900">Rp ${d.hpp.toLocaleString('id-ID')}</td>
        <td class="py-2.5 px-3 text-right font-bold text-amber-600">Rp ${d.akm.toLocaleString('id-ID')}</td>
        <td class="py-2.5 px-3 text-right font-black text-blue-600">Rp ${d.nbv.toLocaleString('id-ID')}</td>
        <td class="py-2.5 px-3 text-center"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 font-sans">Aktif</span></td>
      </tr>
    `).join('');
  }

  function exportDepreciationCsv() {
    const csv = 'Golongan;Unit;Masa Manfaat;HPP;Akumulasi Depresiasi;NBV;Status\n' +
      'Golongan 1 (Peralatan Kantor & IT);4820;4 Tahun;14500000000;11200000000;3300000000;Aktif\n' +
      'Golongan 2 (Mebel & Fasilitas Hunian);15886;8 Tahun;28400000000;14800000000;13600000000;Aktif\n' +
      'Golongan 3 (Mesin & Alat Operasional);1240;16 Tahun;112500000000;52100000000;60400000000;Aktif\n' +
      'Bangunan Fisik & Properti;416;20 Tahun;327100000000;136700000000;190400000000;Aktif\n';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Laporan_Depresiasi_PNS_Asset.csv';
    link.click();
  }

  // ==========================================
  // ASSET MANAGEMENT: PERUBAHAN LOKASI FISIK
  // ==========================================
  let assetRelocHistory = [
    { tgl: '2026-10-28', no_asset: 'AST-2024-0012', nama: 'Kasur Busa High Density', dari: 'PNS-FAC-LH 01 / Kamar 1', ke: 'PNS-FAC-LH 01 / Kamar 2', pic: 'Ilyasa' },
    { tgl: '2026-10-25', no_asset: 'AST-2023-0105', nama: 'AC Split 1.5 PK Daikin', dari: 'PNS-GH-01 / Kamar Tamu 1', ke: 'PNS-FAC-OFFICE-01 / HRGA', pic: 'Rocky' }
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
  function setBldgSiteFilter(site, btnEl) {
    appState.currentBldgFilterSite = site;
    document.querySelectorAll('.bldg-site-pill').forEach(b => {
      b.classList.remove('active', 'bg-slate-900', 'text-white', '', '');
      b.classList.add('bg-slate-100', 'text-slate-600', '', '');
    });
    if (btnEl) {
      btnEl.classList.remove('bg-slate-100', 'text-slate-600', '', '');
      btnEl.classList.add('active', 'bg-slate-900', 'text-white', '', '');
    }
    filterBuildings();
  }

  function filterBuildings() {
    const searchInput = document.getElementById('search-bldg');
    const query = (searchInput ? searchInput.value : '').toLowerCase();
    const filtered = (appState.buildings || []).filter(b => {
      if (!isGenuineBuilding(b)) return false;
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
          <button onclick="startInspectionForBldg('${escapeHtml(b.kode_gedung)}')" class="px-2.5 py-1 text-[11px] font-bold rounded bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 transition">
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
          <button onclick="startInspectionForRoom('${escapeHtml(r.kode_gedung)}', '${escapeHtml(r.nama_ruangan)}')" class="px-2.5 py-1 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800 hover:bg-emerald-600 hover:text-white transition">
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
      list.map(b => `<option value="${escapeHtml(b.kode_gedung)}">${escapeHtml(b.nama_gedung)} (${escapeHtml(b.lokasi_site)})</option>`).join('');

    onInspGedungChange();
  }

  function initInspectionFormDropdowns() {
    const gSelect = document.getElementById('insp-gedung');
    const filterBldgSelect = document.getElementById('filter-room-bldg');
    const regGedung = document.getElementById('reg-gedung');
    const mutGedung = document.getElementById('mut-ke-gedung');

    const genuineBuildings = (appState.buildings || []).filter(isGenuineBuilding);

    const bldgOptionsHtml = genuineBuildings.map(b =>
      `<option value="${escapeHtml(b.kode_gedung)}">${escapeHtml(b.nama_gedung)} (${escapeHtml(b.lokasi_site)})</option>`
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
          <button onclick="viewInspectionDetail('${escapeHtml(item.no_inspeksi)}')" class="px-2.5 py-1 text-[10px] font-bold rounded bg-slate-100 hover:bg-slate-200 :bg-slate-700">
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
                <button onclick="moveStatusPrompt('${w.wo_id || w.no_wo}', '${w.status || 'Baru'}')" class="px-2 py-1 rounded bg-slate-100 hover:bg-sky-600 hover:text-white text-xs font-semibold transition cursor-pointer">
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
  // AVAILABILITY & PENGHUNI HUNIAN CONTROLLER (UNIFIED BED SLOTS)
  // Standard LH Staff: 4 bed slots per room (Bed A Bawah, Bed B Atas, Bed C Bawah, Bed D Atas)
  // Format Kolom: Gedung | Ruangan | No. Bed | Status | NIK | Nama Penghuni | Departemen | Kontak | Aksi
  // ==========================================
  let penghuniSortCol = 'kode_gedung';
  let penghuniSortAsc = true;
  let penghuniCurrentPage = 1;
  const penghuniPageSize = 50;
  let cachedPenghuniSlots = null;

  function buildUnifiedPenghuniSlots() {
    const occMap = {};
    (appState.penghuni || []).forEach(p => {
      const key = (p.kode_gedung || '').trim() + '___' + (p.nama_ruangan || '').trim();
      if (!occMap[key]) occMap[key] = [];
      occMap[key].push(p);
    });

    const standardBeds = ['Bed A (Bawah)', 'Bed B (Atas)', 'Bed C (Bawah)', 'Bed D (Atas)'];
    const roomKeys = new Set();

    (appState.rooms || []).forEach(r => {
      const bldg = r.kode_gedung || '';
      const isHunian = bldg.includes('-LH') || bldg.includes('-GH') || bldg.includes('-MESS') ||
        (r.nama_ruangan || '').toLowerCase().includes('kamar') || (r.tipe_ruangan || '').toLowerCase().includes('kamar') ||
        occMap[bldg + '___' + r.nama_ruangan];
      if (isHunian) {
        roomKeys.add(bldg + '___' + r.nama_ruangan);
      }
    });
    Object.keys(occMap).forEach(k => roomKeys.add(k));

    const sortedKeys = Array.from(roomKeys).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    const slots = [];

    sortedKeys.forEach(k => {
      const [bldg, room] = k.split('___');
      const existing = occMap[k] || [];
      const isVip = bldg.includes('-GH-') || bldg.includes('GUEST');
      const cap = isVip ? 2 : 4;

      for (let i = 0; i < cap; i++) {
        const defaultBed = isVip ? ('Kamar VIP Bed ' + (i + 1)) : standardBeds[i];
        let occ = existing.find(p => p.nomor_kasur === defaultBed) || existing[i];

        if (occ && occ.nama_penghuni && occ.nama_penghuni !== '-' && occ.status_hunian !== 'Vacant') {
          slots.push({
            id: occ.id || (bldg + '_' + room + '_' + i),
            kode_gedung: bldg,
            nama_ruangan: room,
            nomor_kasur: occ.nomor_kasur || defaultBed,
            nik: occ.nik || '-',
            nama_penghuni: occ.nama_penghuni,
            departemen: occ.departemen || '-',
            status_hunian: 'Aktif',
            no_kontak: occ.no_kontak || '-'
          });
        } else {
          // Explicit Vacant bed slot per user specification (LH 1 - Kamar 1 - -)
          slots.push({
            id: 'vacant_' + bldg + '_' + room + '_' + i,
            kode_gedung: bldg,
            nama_ruangan: room,
            nomor_kasur: defaultBed,
            nik: '-',
            nama_penghuni: '-',
            departemen: '-',
            status_hunian: 'Vacant',
            no_kontak: '-'
          });
        }
      }
    });

    cachedPenghuniSlots = slots;
    return slots;
  }

  function initPenghuniFilters() {
    const bldgSelect = document.getElementById('filter-penghuni-bldg');
    if (!bldgSelect) return;

    const currentVal = bldgSelect.value;
    const allSlots = cachedPenghuniSlots || buildUnifiedPenghuniSlots();
    const bldgs = Array.from(new Set(allSlots.map(p => p.kode_gedung).filter(Boolean))).sort();

    bldgSelect.innerHTML = '<option value="">Semua Gedung / LH (' + bldgs.length + ')</option>' +
      bldgs.map(b => `<option value="${escapeHtml(b)}" ${b === currentVal ? 'selected' : ''}>${escapeHtml(b)}</option>`).join('');

    onPenghuniBldgFilterChange();
  }

  function onPenghuniBldgFilterChange() {
    const bldg = document.getElementById('filter-penghuni-bldg') ? document.getElementById('filter-penghuni-bldg').value : '';
    const roomSelect = document.getElementById('filter-penghuni-room');
    if (!roomSelect) return;

    const allSlots = cachedPenghuniSlots || buildUnifiedPenghuniSlots();
    let rooms = [];
    if (bldg) {
      rooms = Array.from(new Set(allSlots.filter(p => p.kode_gedung === bldg).map(p => p.nama_ruangan).filter(Boolean))).sort();
    } else {
      rooms = Array.from(new Set(allSlots.map(p => p.nama_ruangan).filter(Boolean))).sort();
    }

    roomSelect.innerHTML = '<option value="">Semua Kamar (' + rooms.length + ')</option>' +
      rooms.map(r => `<option value="${escapeHtml(r)}">${escapeHtml(r)}</option>`).join('');

    penghuniCurrentPage = 1;
    renderPenghuniTable();
  }


  function sortPenghuni(col) {
    if (penghuniSortCol === col) {
      penghuniSortAsc = !penghuniSortAsc;
    } else {
      penghuniSortCol = col;
      penghuniSortAsc = true;
    }

    ['kode_gedung', 'nama_ruangan', 'nomor_kasur', 'status_hunian', 'nik', 'nama_penghuni', 'departemen'].forEach(c => {
      const icon = document.getElementById('sort-icon-' + c);
      if (icon) {
        if (c === col) {
          icon.innerHTML = penghuniSortAsc ? '&#9650;' : '&#9660;';
          icon.className = 'text-xs ml-0.5 text-indigo-600 font-extrabold';
        } else {
          icon.innerHTML = '&#8597;';
          icon.className = 'text-xs ml-0.5 text-slate-400';
        }
      }
    });

    renderPenghuniTable();
  }

  function setPenghuniPage(page) {
    penghuniCurrentPage = page;
    renderPenghuniTable();
    const tableEl = document.getElementById('table-penghuni-body');
    if (tableEl) {
      tableEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function renderPenghuniTable() {
    const searchEl = document.getElementById('search-penghuni');
    const query = (searchEl ? searchEl.value : '').toLowerCase().trim();
    const bldgFilter = document.getElementById('filter-penghuni-bldg') ? document.getElementById('filter-penghuni-bldg').value : '';
    const roomFilter = document.getElementById('filter-penghuni-room') ? document.getElementById('filter-penghuni-room').value : '';
    const statusFilter = document.getElementById('filter-penghuni-status') ? document.getElementById('filter-penghuni-status').value : '';
    const tbody = document.getElementById('table-penghuni-body');
    if (!tbody) return;

    const allSlots = cachedPenghuniSlots || buildUnifiedPenghuniSlots();

    // Filter
    let filtered = allSlots.filter(p => {
      const matchQuery = !query ||
        String(p.nama_penghuni || '').toLowerCase().includes(query) ||
        String(p.nik || '').toLowerCase().includes(query) ||
        String(p.kode_gedung || '').toLowerCase().includes(query) ||
        String(p.nama_ruangan || '').toLowerCase().includes(query) ||
        String(p.nomor_kasur || '').toLowerCase().includes(query) ||
        String(p.departemen || '').toLowerCase().includes(query) ||
        String(p.no_kontak || '').toLowerCase().includes(query);

      const matchBldg = !bldgFilter || p.kode_gedung === bldgFilter;
      const matchRoom = !roomFilter || p.nama_ruangan === roomFilter;
      const matchStatus = !statusFilter || p.status_hunian === statusFilter;

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
    const totalSlots = allSlots.length;
    const terisiSlots = allSlots.filter(p => p.status_hunian === 'Aktif').length;
    const vacantSlots = totalSlots - terisiSlots;

    const bTotal = document.getElementById('badge-total-slots');
    const bTerisi = document.getElementById('badge-terisi-slots');
    const bVacant = document.getElementById('badge-vacant-slots');
    if (bTotal) bTotal.innerText = 'Total: ' + totalSlots.toLocaleString('id-ID') + ' Bed';
    if (bTerisi) bTerisi.innerText = 'Terisi: ' + terisiSlots.toLocaleString('id-ID');
    if (bVacant) bVacant.innerText = 'Vacant: ' + vacantSlots.toLocaleString('id-ID');

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
        pageInfo.innerText = 'Tidak ada slot kamar yang cocok';
      } else {
        pageInfo.innerText = `Menampilkan ${(startIdx + 1).toLocaleString('id-ID')} - ${endIdx.toLocaleString('id-ID')} dari ${filtered.length.toLocaleString('id-ID')} Slot Ranjang`;
      }
    }
    if (pageControls) {
      if (totalPages <= 1) {
        pageControls.innerHTML = '';
      } else {
        pageControls.innerHTML = `
          <button onclick="setPenghuniPage(${penghuniCurrentPage - 1})" ${penghuniCurrentPage === 1 ? 'disabled' : ''} class="px-2.5 py-1 rounded border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold cursor-pointer">
            &laquo; Prev
          </button>
          <span class="px-2 font-bold text-slate-700">Halaman ${penghuniCurrentPage} / ${totalPages}</span>
          <button onclick="setPenghuniPage(${penghuniCurrentPage + 1})" ${penghuniCurrentPage === totalPages ? 'disabled' : ''} class="px-2.5 py-1 rounded border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold cursor-pointer">
            Next &raquo;
          </button>
        `;
      }
    }

    if (pagedItems.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center py-12 text-slate-500">
            <i class="ph-bold ph-bed text-3xl mb-2 block text-slate-400"></i>
            <span class="font-bold text-slate-700 block">Tidak ada kamar atau slot ranjang yang cocok</span>
            <span class="text-[11px] text-slate-400">Coba ubah kata kunci pencarian atau reset filter gedung/kamar.</span>
          </td>
        </tr>
      `;
      return;
    }

    // Sequence: Gedung | Ruangan | No. Bed | Status | NIK | Nama Penghuni | Departemen | Kontak | Aksi
    tbody.innerHTML = pagedItems.map(p => {
      const isVacant = p.status_hunian === 'Vacant' || !p.nama_penghuni || p.nama_penghuni === '-';
      const slotIdEscaped = escapeHtml(String(p.id));

      return `
        <tr class="hover:bg-slate-50/90 transition border-b border-slate-100 ${isVacant ? 'bg-amber-50/20' : ''}">
          <!-- 1. GEDUNG / LH -->
          <td class="py-2.5 px-3.5 font-mono font-bold text-indigo-700 whitespace-nowrap">
            <span class="inline-flex items-center gap-1.5">
              <i class="ph-bold ph-buildings text-indigo-400"></i>
              ${escapeHtml(p.kode_gedung)}
            </span>
          </td>
          <!-- 2. RUANGAN / KAMAR -->
          <td class="py-2.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
            ${escapeHtml(p.nama_ruangan)}
          </td>
          <!-- 3. NO. BED / SLOT (Standar 4 Bed per Kamar) -->
          <td class="py-2.5 px-3 whitespace-nowrap">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold ${isVacant ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}">
              <i class="ph-bold ph-bed text-xs mr-0.5"></i> ${escapeHtml(p.nomor_kasur)}
            </span>
          </td>
          <!-- 4. STATUS HUNIAN -->
          <td class="py-2.5 px-3 whitespace-nowrap">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${isVacant ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'}">
              ${isVacant ? 'Vacant (Kosong)' : 'Aktif (Terisi)'}
            </span>
          </td>
          <!-- 5. NIK -->
          <td class="py-2.5 px-3 font-mono text-slate-600 whitespace-nowrap">
            ${isVacant ? '<span class="text-slate-400 font-bold">-</span>' : escapeHtml(p.nik)}
          </td>
          <!-- 6. NAMA PENGHUNI -->
          <td class="py-2.5 px-3.5 whitespace-nowrap">
            ${isVacant 
              ? '<span class="text-amber-700 font-semibold italic flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span> - (Belum Ada Penghuni)</span>'
              : `<strong class="text-slate-900 font-bold">${escapeHtml(p.nama_penghuni)}</strong>`}
          </td>
          <!-- 7. DEPARTEMEN -->
          <td class="py-2.5 px-3 whitespace-nowrap">
            ${isVacant ? '<span class="text-slate-400">-</span>' : `<span class="text-slate-700 font-medium">${escapeHtml(p.departemen || '-')}</span>`}
          </td>
          <!-- 8. KONTAK -->
          <td class="py-2.5 px-3 num-tabular whitespace-nowrap text-slate-600 font-mono text-[11px]">
            ${isVacant ? '<span class="text-slate-400">-</span>' : escapeHtml(p.no_kontak || '-')}
          </td>
          <!-- 9. AKSI EDIT / TETAPKAN PENGHUNI -->
          <td class="py-2.5 px-3 text-center whitespace-nowrap">
            <button onclick="editPenghuni('${slotIdEscaped}')" class="px-3 py-1 rounded-lg text-xs font-bold ${isVacant ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xs' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'} transition cursor-pointer" title="${isVacant ? 'Tetapkan Penghuni Baru' : 'Edit Data Penghuni'}">
              <i class="ph-bold ${isVacant ? 'ph-user-plus' : 'ph-pencil-simple'} text-xs"></i> ${isVacant ? '+ Isi' : 'Edit'}
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function editPenghuni(slotId) {
    const allSlots = cachedPenghuniSlots || buildUnifiedPenghuniSlots();
    const item = allSlots.find(p => String(p.id) === String(slotId));
    if (!item) return;

    const isCurrentlyVacant = item.status_hunian === 'Vacant' || !item.nama_penghuni || item.nama_penghuni === '-';

    Swal.fire({
      title: isCurrentlyVacant ? 'Tetapkan Penghuni Baru' : 'Edit Data Penghuni Hunian',
      html: `
        <div class="space-y-3 text-left text-xs">
          <div class="p-3 bg-indigo-50/80 border border-indigo-100 rounded-xl space-y-1">
            <div class="text-[10px] uppercase font-bold text-indigo-900 tracking-wider flex items-center gap-1.5">
              <i class="ph-bold ph-bed text-indigo-600"></i> Detail Kamar &amp; Ranjang
            </div>
            <div class="text-xs font-bold text-slate-800">
              Gedung: <span class="text-indigo-700">${escapeHtml(item.kode_gedung)}</span> &bull; Ruangan: <span class="text-slate-900">${escapeHtml(item.nama_ruangan)}</span>
            </div>
            <div class="text-xs font-semibold text-indigo-600">
              Posisi Ranjang: <strong>${escapeHtml(item.nomor_kasur)}</strong>
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Nama Lengkap Penghuni <span class="text-rose-500">*</span>:</label>
            <input type="text" id="swal-p-name" class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-semibold" value="${isCurrentlyVacant ? '' : escapeHtml(item.nama_penghuni)}" placeholder="Contoh: Aji Pratama">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">NIK Karyawan:</label>
              <input type="text" id="swal-p-nik" class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-indigo-500 font-mono" value="${isCurrentlyVacant || item.nik === '-' ? '' : escapeHtml(item.nik)}" placeholder="PNS-AGR-...">
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Departemen:</label>
              <input type="text" id="swal-p-dept" class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-indigo-500" value="${isCurrentlyVacant || item.departemen === '-' ? '' : escapeHtml(item.departemen)}" placeholder="Agronomi / HRGA / MB">
            </div>
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">No. Kontak / WhatsApp:</label>
            <input type="text" id="swal-p-kontak" class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-indigo-500 font-mono" value="${isCurrentlyVacant || item.no_kontak === '-' ? '' : escapeHtml(item.no_kontak)}" placeholder="0813-xxxx-xxxx">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Status Ketersediaan:</label>
            <select id="swal-p-status" class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-bold text-slate-800">
              <option value="Aktif" ${!isCurrentlyVacant ? 'selected' : ''}>Aktif (Terisi)</option>
              <option value="Vacant" ${isCurrentlyVacant ? 'selected' : ''}>Vacant (Kosong)</option>
            </select>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      showDenyButton: !isCurrentlyVacant,
      denyButtonText: 'Kosongkan (Check-out)',
      confirmButtonText: 'Simpan Data',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#4f46e5',
      denyButtonColor: '#e11d48',
      preConfirm: () => {
        const status = document.getElementById('swal-p-status').value;
        const name = document.getElementById('swal-p-name').value.trim();
        const nik = document.getElementById('swal-p-nik').value.trim();
        const dept = document.getElementById('swal-p-dept').value.trim();
        const kontak = document.getElementById('swal-p-kontak').value.trim();

        if (status === 'Aktif' && !name) {
          Swal.showValidationMessage('Nama penghuni wajib diisi untuk status Aktif Terisi');
          return false;
        }

        return {
          nama_penghuni: status === 'Vacant' ? '-' : name,
          nik: status === 'Vacant' ? '-' : (nik || '-'),
          departemen: status === 'Vacant' ? '-' : (dept || '-'),
          status_hunian: status,
          no_kontak: status === 'Vacant' ? '-' : (kontak || '-')
        };
      }
    }).then(res => {
      if (res.isConfirmed) {
        savePenghuniSlotData(item, res.value);
      } else if (res.isDenied) {
        savePenghuniSlotData(item, {
          nama_penghuni: '-',
          nik: '-',
          departemen: '-',
          status_hunian: 'Vacant',
          no_kontak: '-'
        });
      }
    });
  }

  function savePenghuniSlotData(slot, data) {
    if (!appState.penghuni) appState.penghuni = [];

    let existingIdx = appState.penghuni.findIndex(p => {
      return (p.kode_gedung === slot.kode_gedung) &&
             (p.nama_ruangan === slot.nama_ruangan) &&
             (p.nomor_kasur === slot.nomor_kasur);
    });

    if (data.status_hunian === 'Vacant' || !data.nama_penghuni || data.nama_penghuni === '-') {
      if (existingIdx >= 0) {
        appState.penghuni.splice(existingIdx, 1);
      }
    } else {
      const record = {
        id: (existingIdx >= 0 && appState.penghuni[existingIdx].id) ? appState.penghuni[existingIdx].id : ('p_' + Date.now()),
        nik: data.nik || '-',
        nama_penghuni: data.nama_penghuni,
        departemen: data.departemen || '-',
        kode_gedung: slot.kode_gedung,
        nama_ruangan: slot.nama_ruangan,
        nomor_kasur: slot.nomor_kasur,
        status_hunian: 'Aktif',
        no_kontak: data.no_kontak || '-',
        updated_at: new Date().toISOString()
      };
      if (existingIdx >= 0) {
        appState.penghuni[existingIdx] = Object.assign(appState.penghuni[existingIdx], record);
      } else {
        appState.penghuni.push(record);
      }
    }

    try {
      localStorage.setItem('pns_custom_penghuni', JSON.stringify(appState.penghuni));
    } catch (e) {}

    // Invalidate cached slots and rebuild
    buildUnifiedPenghuniSlots();
    renderPenghuniTable();

    const badge = document.getElementById('nav-badge-penghuni');
    if (badge) badge.innerText = appState.penghuni.length;

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'Tersimpan',
        text: 'Data kamar ' + slot.nama_ruangan + ' (' + slot.nomor_kasur + ') berhasil diperbarui.',
        timer: 1300,
        showConfirmButton: false
      });
    }

    // Background sync to GAS if available
    callBackendPost('save_penghuni', {
      kode_gedung: slot.kode_gedung,
      nama_ruangan: slot.nama_ruangan,
      nomor_kasur: slot.nomor_kasur,
      ...data
    });
  }

  function promptAddPenghuni() {
    const bldgs = Array.from(new Set(appState.rooms.map(r => r.kode_gedung).filter(Boolean))).sort();
    const bldgOpts = bldgs.map(b => `<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`).join('');

    Swal.fire({
      title: 'Tambah Penghuni Kamar Baru',
      html: `
        <div class="space-y-3 text-left text-xs">
          <div>
            <label class="block font-semibold mb-1">Pilih Gedung / LH:</label>
            <select id="swal-add-bldg" class="swal2-select !h-8 !text-xs !w-full !m-0" onchange="updateSwalAddRooms(this.value)">
              ${bldgOpts}
            </select>
          </div>
          <div>
            <label class="block font-semibold mb-1">Nama Ruangan / Kamar:</label>
            <input type="text" id="swal-add-room" class="swal2-input !h-8 !text-xs !w-full !m-0" placeholder="KAMAR NO.1">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-semibold mb-1">No. Ranjang / Bed:</label>
              <input type="text" id="swal-add-bed" class="swal2-input !h-8 !text-xs !w-full !m-0" value="Bed 1">
            </div>
            <div>
              <label class="block font-semibold mb-1">Status:</label>
              <select id="swal-add-status" class="swal2-select !h-8 !text-xs !w-full !m-0">
                <option value="Aktif">Aktif (Terisi)</option>
                <option value="Vacant">Vacant (Kosong)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block font-semibold mb-1">Nama Penghuni:</label>
            <input type="text" id="swal-add-name" class="swal2-input !h-8 !text-xs !w-full !m-0" placeholder="Nama lengkap karyawan...">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-semibold mb-1">NIK:</label>
              <input type="text" id="swal-add-nik" class="swal2-input !h-8 !text-xs !w-full !m-0" placeholder="PNS-AGR-...">
            </div>
            <div>
              <label class="block font-semibold mb-1">Departemen:</label>
              <input type="text" id="swal-add-dept" class="swal2-input !h-8 !text-xs !w-full !m-0" placeholder="Agronomi / HRGA / Pabrik">
            </div>
          </div>
          <div>
            <label class="block font-semibold mb-1">Kontak WhatsApp:</label>
            <input type="text" id="swal-add-kontak" class="swal2-input !h-8 !text-xs !w-full !m-0" placeholder="0813-xxxx-xxxx">
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Tambahkan Penghuni',
      cancelButtonText: 'Batal',
      preConfirm: () => ({
        kode_gedung: document.getElementById('swal-add-bldg').value,
        nama_ruangan: document.getElementById('swal-add-room').value.trim() || 'KAMAR NO.1',
        nomor_kasur: document.getElementById('swal-add-bed').value.trim() || 'Bed 1',
        status_hunian: document.getElementById('swal-add-status').value,
        nama_penghuni: document.getElementById('swal-add-name').value.trim() || '-',
        nik: document.getElementById('swal-add-nik').value.trim() || 'PNS-' + Date.now().toString().slice(-4),
        departemen: document.getElementById('swal-add-dept').value.trim() || '-',
        no_kontak: document.getElementById('swal-add-kontak').value.trim() || '-'
      })
    }).then(res => {
      if (res.isConfirmed) {
        const newP = res.value;
        newP.id = 'P' + Date.now();
        if (!appState.penghuni) appState.penghuni = [];
        appState.penghuni.unshift(newP);
        const badge = document.getElementById('nav-badge-penghuni');
        if (badge) badge.innerText = appState.penghuni.length;
        initPenghuniFilters();
        renderPenghuniTable();
        callBackendPost('save_penghuni', newP);
        Swal.fire('Berhasil', 'Penghuni baru ' + newP.nama_penghuni + ' berhasil ditambahkan ke ' + newP.kode_gedung + '.', 'success');
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
  // ALL ASSET CATALOG (COPY PERSIS VERSI PHP VIEW-ASSET-3)
  // ==========================================
  let assetTypeFilter = 'ALL';
  let assetKatFilter = 'ALL';
  let assetKondisiFilter = 'ALL';
  let assetSearchQuery = '';
  let assetCurrentPage = 1;
  const ASSETS_PER_PAGE = 15;

  function onAssetFilterChange() {
    assetTypeFilter = document.getElementById('slicer-asset-type-cat')?.value || 'ALL';
    assetKatFilter = document.getElementById('slicer-asset-kat')?.value || 'ALL';
    assetKondisiFilter = document.getElementById('slicer-asset-kondisi')?.value || 'ALL';
    assetCurrentPage = 1;
    renderAllAssetsTable();
  }

  function onAssetSearch(query) {
    assetSearchQuery = query || '';
    assetCurrentPage = 1;
    renderAllAssetsTable();
  }

  function changeAssetPage(delta) {
    assetCurrentPage = Math.max(1, assetCurrentPage + delta);
    renderAllAssetsTable();
  }

  function exportAssetCatalogCsv() {
    const list = getFilteredAllAssets();
    let csv = 'No Aset,Nama Aset,Kategori,Departemen,Lokasi,Kondisi,Nilai Perolehan,Nilai Buku\n';
    list.forEach(a => {
      csv += `"${a.no_asset}","${(a.nama_asset||'').replace(/"/g, '""')}","${a.kategori_asset||''}","${a.departemen||''}","${a.lokasi_site||''}","${a.kondisi||''}","${a.total_harga_perolehan||0}","${a.nilai_buku||0}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `PNS_All_Asset_Catalog_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function getFilteredAllAssets() {
    const sourceData = (appState.enterpriseAssets && appState.enterpriseAssets.length > 0)
      ? appState.enterpriseAssets
      : ENTERPRISE_PORTFOLIO_SAMPLE;

    return sourceData.filter(a => {
      // Slicer Tipe
      let matchType = true;
      const val = Number(a.total_harga_perolehan || a.nilai_buku || 0);
      if (assetTypeFilter === 'valuable') matchType = (val > 0);
      else if (assetTypeFilter === 'non_valuable') matchType = (val === 0);

      // Slicer Kategori
      let matchKat = true;
      if (assetKatFilter !== 'ALL') {
        matchKat = String(a.kategori_asset || '').toUpperCase().includes(assetKatFilter.toUpperCase());
      }

      // Slicer Kondisi
      let matchKondisi = true;
      if (assetKondisiFilter !== 'ALL') {
        matchKondisi = String(a.kondisi || '').toLowerCase().includes(assetKondisiFilter.toLowerCase());
      }

      // Search Query
      let matchQuery = true;
      if (assetSearchQuery.trim()) {
        const q = assetSearchQuery.toLowerCase();
        matchQuery = String(a.no_asset || '').toLowerCase().includes(q) ||
          String(a.nama_asset || '').toLowerCase().includes(q) ||
          String(a.kategori_asset || '').toLowerCase().includes(q) ||
          String(a.lokasi_site || a.kode_gedung || '').toLowerCase().includes(q);
      }

      return matchType && matchKat && matchKondisi && matchQuery;
    });
  }

  function renderAllAssetsTable() {
    const tbody = document.getElementById('table-all-assets-body');
    if (!tbody) return;

    // Populate Kategori dropdown dynamically if empty
    const katSelect = document.getElementById('slicer-asset-kat');
    if (katSelect && katSelect.options.length <= 1) {
      const source = (appState.enterpriseAssets && appState.enterpriseAssets.length > 0)
        ? appState.enterpriseAssets : ENTERPRISE_PORTFOLIO_SAMPLE;
      const kats = [...new Set(source.map(a => a.kategori_asset).filter(Boolean))].sort();
      katSelect.innerHTML = '<option value="ALL">Semua Kategori</option>';
      kats.forEach(k => {
        const opt = document.createElement('option');
        opt.value = k;
        opt.textContent = k;
        katSelect.appendChild(opt);
      });
    }

    const filtered = getFilteredAllAssets();

    // Calculate metrics for KPI cards
    const totalCount = filtered.length;
    let totalPerolehan = 0;
    let totalPenyusutan = 0;
    let totalBuku = 0;
    let goodCount = 0;

    filtered.forEach(a => {
      const perolehan = Number(a.total_harga_perolehan || 0);
      const buku = Number(a.nilai_buku || (perolehan * 0.65));
      const susut = Math.max(0, perolehan - buku);
      totalPerolehan += perolehan;
      totalPenyusutan += susut;
      totalBuku += buku;
      if ((a.kondisi || '').toLowerCase().includes('baik') || (a.kondisi || '').toLowerCase().includes('good')) {
        goodCount++;
      }
    });

    const pctGood = totalCount > 0 ? ((goodCount / totalCount) * 100).toFixed(0) : 0;

    const setEl = (id, text) => { const el = document.getElementById(id); if (el) el.innerText = text; };
    setEl('pbi-asset-filtered-count', totalCount.toLocaleString('id-ID'));
    setEl('pbi-asset-total-count', `${totalCount.toLocaleString('id-ID')} Unit`);
    setEl('pbi-asset-nilai-perolehan', totalPerolehan > 1000000000 ? `Rp ${(totalPerolehan / 1000000000).toFixed(1)} M` : `Rp ${(totalPerolehan / 1000000).toFixed(0)} Jt`);
    setEl('pbi-asset-nilai-penyusutan', totalPenyusutan > 1000000000 ? `Rp ${(totalPenyusutan / 1000000000).toFixed(1)} M` : `Rp ${(totalPenyusutan / 1000000).toFixed(0)} Jt`);
    setEl('pbi-asset-nilai-buku', totalBuku > 1000000000 ? `Rp ${(totalBuku / 1000000000).toFixed(1)} M` : `Rp ${(totalBuku / 1000000).toFixed(0)} Jt`);
    setEl('pbi-asset-good-count', `${goodCount.toLocaleString('id-ID')} (${pctGood}%)`);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / ASSETS_PER_PAGE));
    if (assetCurrentPage > totalPages) assetCurrentPage = totalPages;
    const startIndex = (assetCurrentPage - 1) * ASSETS_PER_PAGE;
    const paginated = filtered.slice(startIndex, startIndex + ASSETS_PER_PAGE);

    setEl('all-asset-paging-info', `(Menampilkan ${startIndex + 1} - ${Math.min(startIndex + ASSETS_PER_PAGE, filtered.length)} dari ${filtered.length} aset)`);
    setEl('all-asset-page-indicator', `Hal ${assetCurrentPage} / ${totalPages}`);

    const prevBtn = document.getElementById('btn-asset-prev');
    const nextBtn = document.getElementById('btn-asset-next');
    if (prevBtn) prevBtn.disabled = (assetCurrentPage <= 1);
    if (nextBtn) nextBtn.disabled = (assetCurrentPage >= totalPages);

    if (paginated.length === 0) {
      tbody.innerHTML = '<tr><td colspan="9" class="py-8 text-center text-slate-500">Tidak ada aset yang sesuai kriteria pencarian</td></tr>';
      return;
    }

    tbody.innerHTML = paginated.map(a => {
      const perolehan = Number(a.total_harga_perolehan || 0);
      const buku = Number(a.nilai_buku || (perolehan * 0.65));
      const kondisi = a.kondisi || 'Baik';
      let kondisiBadge = 'bg-emerald-100 text-emerald-800  ';
      if (kondisi.toLowerCase().includes('rusak') || kondisi.toLowerCase().includes('broken')) {
        kondisiBadge = 'bg-rose-100 text-rose-800  ';
      } else if (kondisi.toLowerCase().includes('repair') || kondisi.toLowerCase().includes('perbaikan')) {
        kondisiBadge = 'bg-amber-100 text-amber-800  ';
      }

      return `
        <tr class="hover:bg-slate-50 :bg-slate-800/50 transition">
          <td class="py-2.5 px-3 font-mono font-bold text-sky-600 whitespace-nowrap">${escapeHtml(a.no_asset)}</td>
          <td class="py-2.5 px-3 font-bold text-slate-800 max-w-[240px]">
            <div class="truncate">${escapeHtml(a.nama_asset)}</div>
            <div class="text-[10px] text-slate-500 font-normal">Tgl Perolehan: ${escapeHtml(a.tanggal_perolehan || '-')}</div>
          </td>
          <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100">${escapeHtml(a.kategori_asset || '-')}</span></td>
          <td class="py-2.5 px-3 text-slate-600">${escapeHtml(a.departemen || a.pic || 'Operasional')}</td>
          <td class="py-2.5 px-3 text-slate-600">${escapeHtml(a.lokasi_site || a.kode_gedung || 'Sentral')}</td>
          <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${kondisiBadge}">${escapeHtml(kondisi)}</span></td>
          <td class="py-2.5 px-3 text-right font-mono num-tabular">Rp ${perolehan.toLocaleString('id-ID')}</td>
          <td class="py-2.5 px-3 text-right font-mono font-bold text-emerald-600 num-tabular">Rp ${buku.toLocaleString('id-ID')}</td>
          <td class="py-2.5 px-3 text-center">
            <button onclick="showAssetDetailModal('${escapeHtml(a.no_asset)}')" class="px-2 py-1 rounded bg-slate-100 hover:bg-sky-600 hover:text-white text-xs font-semibold transition cursor-pointer">
              Detail
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function showAssetDetailModal(noAsset) {
    const sourceData = (appState.enterpriseAssets && appState.enterpriseAssets.length > 0)
      ? appState.enterpriseAssets : ENTERPRISE_PORTFOLIO_SAMPLE;
    const a = sourceData.find(x => x.no_asset === noAsset);
    if (!a || typeof Swal === 'undefined') return;

    Swal.fire({
      title: `<span class="text-base font-bold">${escapeHtml(a.no_asset)}</span>`,
      html: `
        <div class="text-left text-xs space-y-2 p-2 bg-slate-50 rounded-xl">
          <div><span class="text-slate-500">Nama Aset:</span> <b class="text-slate-900 block">${escapeHtml(a.nama_asset)}</b></div>
          <div class="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
            <div><span class="text-slate-500">Kategori:</span> <span class="font-semibold block">${escapeHtml(a.kategori_asset || '-')}</span></div>
            <div><span class="text-slate-500">Kondisi:</span> <span class="font-semibold block">${escapeHtml(a.kondisi || 'Baik')}</span></div>
            <div><span class="text-slate-500">Lokasi / Site:</span> <span class="font-semibold block">${escapeHtml(a.lokasi_site || a.kode_gedung || '-')}</span></div>
            <div><span class="text-slate-500">Departemen:</span> <span class="font-semibold block">${escapeHtml(a.departemen || 'Operasional')}</span></div>
            <div><span class="text-slate-500">Harga Perolehan:</span> <span class="font-mono font-bold text-sky-600 block">Rp ${Number(a.total_harga_perolehan || 0).toLocaleString('id-ID')}</span></div>
            <div><span class="text-slate-500">Nilai Buku:</span> <span class="font-mono font-bold text-emerald-600 block">Rp ${Number(a.nilai_buku || (Number(a.total_harga_perolehan || 0) * 0.65)).toLocaleString('id-ID')}</span></div>
          </div>
        </div>
      `,
      confirmButtonText: 'Tutup',
      confirmButtonColor: '#0284c7'
    });
  }

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
            <button onclick="verifikasiOpname('${escapeHtml(v.opname_id)}')" class="px-2.5 py-1 text-[10px] font-bold rounded bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white transition">
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
  }
