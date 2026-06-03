// ============================================================
// JAVASCRIPT UTAMA — Logika WebGIS SMA Negeri Lampung Selatan
// ============================================================

// 1. INISIALISASI PETA
const map = L.map('map').setView([-5.55, 105.5], 10);

// 2. BASEMAP CONTROL (Street vs Satelit)
const street = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  { attribution: '© OpenStreetMap contributors' }
);

const satelit = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  { attribution: '© Esri World Imagery' }
);

street.addTo(map);

L.control.layers(
  { "🗺️ Street Map": street, "🛰️ Satelit": satelit }
).addTo(map);

// 3. CUSTOM MARKER (Desain pin lokasi sekolah warna hijau)
const ikonSekolah = L.divIcon({
  className: '',
  html: `
    <div style="
      background: #2d6a4f;
      border: 3px solid #95d5b2;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 3px 10px rgba(0,0,0,0.3);
    ">
      <span style="transform: rotate(45deg); font-size: 14px;">🏫</span>
    </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -36]
});

// 4. DATA GEOJSON (Koordinat dan Detail SMA Negeri)
const geojsonData = {
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "properties": { "nama": "Sekolah Rakyat Menengah Atas 32 Lampung Selatan", "alamat": "Jl. Sebiay, Desa Hajimena, Kec. Natar" }, "geometry": { "type": "Point", "coordinates": [105.2231, -5.3546] } },
    { "type": "Feature", "properties": { "nama": "SMAN 1 Natar", "alamat": "Jl. Dahlia III Natar" }, "geometry": { "type": "Point", "coordinates": [105.2026, -5.3229] } },
    { "type": "Feature", "properties": { "nama": "SMAN 2 Natar", "alamat": "Desa Pancasila" }, "geometry": { "type": "Point", "coordinates": [105.281, -5.2399] } },
    { "type": "Feature", "properties": { "nama": "SMAN 1 Jati Agung", "alamat": "Jl. Niskala Wastukencana" }, "geometry": { "type": "Point", "coordinates": [105.4137, -5.3492] } },
    { "type": "Feature", "properties": { "nama": "SMAN 1 Tanjung Bintang", "alamat": "Jl. Antara Kaliayu" }, "geometry": { "type": "Point", "coordinates": [105.4316, -5.4288] } },
    { "type": "Feature", "properties": { "nama": "SMAN 1 Katibung", "alamat": "Jl. Raden Awas" }, "geometry": { "type": "Point", "coordinates": [105.4852, -5.5437] } },
    { "type": "Feature", "properties": { "nama": "SMAN 1 Sidomulyo", "alamat": "Jl. Muria 101 Seloretno" }, "geometry": { "type": "Point", "coordinates": [105.5218, -5.6157] } },
    { "type": "Feature", "properties": { "nama": "SMAN 1 Palas", "alamat": "Jl. PLN Palas Aji" }, "geometry": { "type": "Point", "coordinates": [105.682, -5.6368] } },
    { "type": "Feature", "properties": { "nama": "SMAN 1 Penengahan", "alamat": "Jl. Raya Kelaten" }, "geometry": { "type": "Point", "coordinates": [105.6916, -5.7318] } },
    { "type": "Feature", "properties": { "nama": "SMAN 1 Merbau Mataram", "alamat": "Jl. Batin Putra No. 41 Talang Jawa" }, "geometry": { "type": "Point", "coordinates": [105.4874, -5.4571] } },
    { "type": "Feature", "properties": { "nama": "SMAN 1 Candipuro", "alamat": "Jl. Majapahit Ds. Titiwangi" }, "geometry": { "type": "Point", "coordinates": [105.5956, -5.5324] } },
    { "type": "Feature", "properties": { "nama": "SMAN 1 Rajabasa", "alamat": "Jl. Pesisir Kunjir" }, "geometry": { "type": "Point", "coordinates": [105.6479, -5.8332] } },
    { "type": "Feature", "properties": { "nama": "SMAN 1 Sragi", "alamat": "Jl. Lapangan Jati" }, "geometry": { "type": "Point", "coordinates": [105.7201, -5.6387] } },
    { "type": "Feature", "properties": { "nama": "SMAN 1 Ketapang", "alamat": "Jl. Trans Ketapang Umbul Dana No.209 Desa Sri Pendowo" }, "geometry": { "type": "Point", "coordinates": [105.7608, -5.7257] } },
    { "type": "Feature", "properties": { "nama": "SMAN 1 Bakauheni", "alamat": "Jl. Pariwisata Batu Alif Desa Kelawi" }, "geometry": { "type": "Point", "coordinates": [105.7243, -5.8552] } },
    { "type": "Feature", "properties": { "nama": "SMAN 1 Tanjung Sari", "alamat": "Jl. Raya Desa Wonodadi" }, "geometry": { "type": "Point", "coordinates": [105.4832, -5.3646] } },
    { "type": "Feature", "properties": { "nama": "SMAN 1 Way Sulan", "alamat": "Dusun Srimulyo Desa Karang Pucung" }, "geometry": { "type": "Point", "coordinates": [105.5163, -5.4942] } },
    // FIX: Struktur SMAN 1 Kalianda sudah diperbaiki di bawah ini
    { "type": "Feature", "properties": { "nama": "SMAN 1 Kalianda", "alamat": "Jl. Zainal Abidin Pagar Alam No.149" }, "geometry": { "type": "Point", "coordinates": [105.5883, -5.7265] } },
    { "type": "Feature", "properties": { "nama": "SMAN 2 Kalianda", "alamat": "Jl. Trans Sumatera" }, "geometry": { "type": "Point", "coordinates": [105.612, -5.7253] } }
  ]
};

// Wadah penyimpan layer marker untuk fitur pencarian
const markerLayers = [];

// 5. MERENDER DATA GEOJSON KE ATAS PETA
const geojsonLayer = L.geoJSON(geojsonData, {
  pointToLayer: function(feature, latlng) {
    const marker = L.marker(latlng, { icon: ikonSekolah });
    markerLayers.push({ name: feature.properties.nama.toLowerCase(), layer: marker });
    return marker;
  },
  onEachFeature: function(feature, layer) {
    const p = feature.properties;
    
    // FIX: Menggunakan Template Literals (backtick `) agar fungsi encodeURIComponent berjalan dengan benar
    const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.nama + ' ' + p.alamat)}`;

    layer.bindPopup(`
      <div style="font-family:'Plus Jakarta Sans',sans-serif; min-width:200px;">
        <div style="background:#2d6a4f;color:white;padding:10px 14px;margin:-13px -20px 10px;border-radius:4px 4px 0 0;font-weight:600;font-size:0.9rem;">
          🏫 ${p.nama}
        </div>
        <div style="padding: 0 4px; font-size:0.83rem; color:#444; line-height:1.7;">
          <b>📍 Alamat:</b><br/>${p.alamat}
        </div>
        <div style="margin-top:10px;">
          <a href="${gmapsUrl}"
             target="_blank"
             style="background:#2d6a4f;color:white;padding:5px 12px;border-radius:20px;text-decoration:none;font-size:0.78rem;font-weight:600;display:inline-block;">
            🗺️ Lihat di Google Maps
          </a>
        </div>
      </div>
    `);
  }
}).addTo(map);

// 6. LOGIKA PENCARIAN SEKOLAH INTERAKTIF
function cariSekolah() {
  const inputVal = document.getElementById('search-input').value.toLowerCase().trim();
  if (!inputVal) return;

  const hasil = markerLayers.find(m => m.name.includes(inputVal));

  if (hasil) {
    const targetMarker = hasil.layer;
    const koordinat = targetMarker.getLatLng();

    map.flyTo(koordinat, 14, {
      animate: true,
      duration: 1.5
    });

    setTimeout(() => {
      targetMarker.openPopup();
    }, 1500);
  } else {
    alert("Sekolah tidak ditemukan! Pastikan nama yang dicari benar.");
  }
}

// Hubungkan fungsi cariSekolah ke tombol dan tombol Enter
document.getElementById('search-btn').addEventListener('click', cariSekolah);
document.getElementById('search-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    cariSekolah();
  }
});