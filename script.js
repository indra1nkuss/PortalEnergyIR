/* ==============================================
   0. MOBILE HAMBURGER MENU & HINT
   ============================================== */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const mobileHint = document.getElementById('mobile-hint');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
        
        // Hapus hint jika menu diklik
        if (mobileHint && !mobileHint.classList.contains('hidden')) {
            mobileHint.classList.remove('opacity-100', 'animate-bounce');
            mobileHint.classList.add('opacity-0');
            setTimeout(() => mobileHint.classList.add('hidden'), 300);
        }
    });
}

/* ==============================================
   1. LOGIKA NAVIGASI TAB (Smooth SPA & Scroll)
   ============================================== */
let isAnimating = false;

function openTab(tabId, btnElement) {
    if (isAnimating) return; 

    const targetSection = document.getElementById(tabId);
    if (!targetSection || targetSection.classList.contains('block')) return;

    isAnimating = true;
    
    // Otomatis Gulir ke Atas saat pindah tab
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Tutup menu mobile jika sedang terbuka
    if(navMenu && !navMenu.classList.contains('hidden') && window.innerWidth < 768) {
        navMenu.classList.add('hidden');
    }

    const currentSection = document.querySelector('.section-content.block');
    
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active', 'text-darkbg');
        btn.classList.add('text-slate-400', 'hover:text-white');
    });
    btnElement.classList.add('active');
    btnElement.classList.remove('text-slate-400', 'hover:text-white');

    if (currentSection) {
        currentSection.classList.remove('animate-fade-in');
        currentSection.classList.add('animate-fade-out');

        setTimeout(() => {
            currentSection.classList.remove('block', 'animate-fade-out');
            currentSection.classList.add('hidden');
            showNewSection(targetSection);
        }, 300);
    } else {
        showNewSection(targetSection);
    }
}

function showNewSection(targetSection) {
    targetSection.classList.remove('hidden');
    void targetSection.offsetWidth; 
    targetSection.classList.add('block', 'animate-fade-in');
    
    setTimeout(() => {
        isAnimating = false;
        if (targetSection.id === 'tentang' && document.getElementById('team-container').innerHTML === '') renderTeam();
        if (targetSection.id === 'dokumentasi' && document.getElementById('gallery-container').innerHTML === '') renderGallery();
    }, 400);
}

/* ==============================================
   2. LOGIKA DATA PEMENANG & FITUR SEARCH
   ============================================== */
const winnersData = [
    { nik: '101001', name: 'Ahmad Subarjo', dept: 'Operasional Produksi' },
    { nik: '101002', name: 'Budi Santoso', dept: 'Engineering & Maintenance' },
    { nik: '101003', name: 'Citra Kirana', dept: 'Health, Safety & Environment' },
    { nik: '101004', name: 'Dadan Hermawan', dept: 'Logistik & Supply Chain' },
    { nik: '101005', name: 'Euis Komalasari', dept: 'Quality Control Analyst' },
    { nik: '101006', name: 'Fajar Nugraha', dept: 'Operasional Produksi' },
    { nik: '101007', name: 'Gita Savitri', dept: 'Human Resources' },
    { nik: '101008', name: 'Hendra Wijaya', dept: 'Engineering & Maintenance' },
    { nik: '101009', name: 'Intan Permatasari', dept: 'Finance & Accounting' },
    { nik: '101010', name: 'Joko Anwar', dept: 'Security & Patrol' },
    { nik: '101011', name: 'Kiki Amalia', dept: 'Dokumen Kontrol' },
    { nik: '101012', name: 'Lukman Hakim', dept: 'Logistik & Supply Chain' },
    { nik: '101013', name: 'Mila Rosmiati', dept: 'Health, Safety & Environment' },
    { nik: '101014', name: 'Nanda Pratama', dept: 'Information Technology' },
    { nik: '101015', name: 'Oki Setiawan', dept: 'Operasional Produksi' },
    { nik: '101016', name: 'Putri Marino', dept: 'Quality Control Analyst' },
    { nik: '101017', name: 'Qori Akbar', dept: 'Engineering & Maintenance' },
    { nik: '101018', name: 'Rina Nose', dept: 'Dokumen Kontrol' },
    { nik: '101019', name: 'Surya Saputra', dept: 'Security & Patrol' },
    { nik: '101020', name: 'Tono Hartono', dept: 'Logistik & Supply Chain' }
];

let filteredWinners = [...winnersData]; 
const itemsPerPage = 10;
let currentPage = 1;

document.getElementById('search-input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    filteredWinners = winnersData.filter(winner => 
        winner.name.toLowerCase().includes(searchTerm) || 
        winner.dept.toLowerCase().includes(searchTerm) ||
        winner.nik.includes(searchTerm)
    );
    currentPage = 1;
    displayWinners(currentPage);
});

function displayWinners(page) {
    const listContainer = document.getElementById('winner-list');
    const emptyState = document.getElementById('empty-state');
    const paginationContainer = document.getElementById('pagination-container');
    
    listContainer.innerHTML = ''; 

    if(filteredWinners.length === 0) {
        emptyState.classList.remove('hidden');
        paginationContainer.innerHTML = '';
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = filteredWinners.slice(start, end);

    paginatedItems.forEach((winner, index) => {
        const actualNumber = start + index + 1;
        const formatNo = actualNumber.toString().padStart(2, '0');
        const delay = index * 0.05; 
        
        const itemHTML = `
            <div class="stagger-item flex items-center gap-3 md:gap-5 p-3 md:p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-energi-gold/40 hover:bg-white/10 transition-all group" style="animation-delay: ${delay}s">
                <div class="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-darkbg rounded-lg flex items-center justify-center font-800 text-slate-400 group-hover:text-energi-gold transition-colors border border-white/10 shadow-inner">
                    ${formatNo}
                </div>
                <div class="flex-grow min-w-0">
                    <h3 class="text-sm md:text-base font-700 text-white truncate group-hover:text-energi-goldlight transition-colors">${winner.name}</h3>
                    <p class="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider truncate mt-0.5">
                        <span class="text-energi-cyan font-semibold">NIK: ${winner.nik}</span> <span class="mx-1 text-slate-600">|</span> ${winner.dept}
                    </p>
                </div>
                <div class="hidden md:block">
                    <span class="px-4 py-1.5 bg-white/5 text-slate-300 border border-white/10 rounded-full text-xs font-semibold tracking-widest group-hover:bg-energi-gold/10 group-hover:text-energi-gold group-hover:border-energi-gold/30 transition-all">TERBAIK</span>
                </div>
            </div>
        `;
        listContainer.insertAdjacentHTML('beforeend', itemHTML);
    });
    setupPagination(page);
}

function setupPagination(page) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';
    const pageCount = Math.ceil(filteredWinners.length / itemsPerPage);
    
    if(pageCount <= 1) return; 

    const createBtn = (text, onClick, isActive, isDisabled) => {
        const btn = document.createElement('button');
        btn.innerHTML = text;
        btn.disabled = isDisabled;
        if (isActive) {
            btn.className = 'px-3 md:px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-energi-gold to-yellow-200 text-darkbg shadow-[0_0_15px_rgba(212,175,55,0.4)]';
        } else if (isDisabled) {
            btn.className = 'px-3 md:px-4 py-2 rounded-lg font-bold bg-white/5 text-slate-600 cursor-not-allowed border border-white/5';
        } else {
            btn.className = 'px-3 md:px-4 py-2 rounded-lg font-bold bg-white/5 text-slate-400 hover:text-white hover:border-white/30 border border-white/5 transition-all';
            btn.onclick = onClick;
        }
        paginationContainer.appendChild(btn);
    };

    createBtn('←', () => { window.scrollTo({top: 0, behavior: 'smooth'}); displayWinners(page - 1); }, false, page === 1);
    
    let startPage = Math.max(1, page - 1);
    let endPage = Math.min(pageCount, startPage + 2);
    if (page === 1) endPage = Math.min(pageCount, 3);
    if (page === pageCount) startPage = Math.max(1, pageCount - 2);

    for (let i = startPage; i <= endPage; i++) {
        createBtn(i, () => { window.scrollTo({top: 0, behavior: 'smooth'}); displayWinners(i); }, i === page, false);
    }

    createBtn('→', () => { window.scrollTo({top: 0, behavior: 'smooth'}); displayWinners(page + 1); }, false, page === pageCount);
}

/* ==============================================
   3. RENDER KONTEN DINAMIS & LIGHTBOX (LOCAL IMAGES)
   ============================================== */
function renderGallery() {
    const container = document.getElementById('gallery-container');
    container.innerHTML = ''; // Pastikan kosong sebelum dirender ulang

    // CONTOH: Array nama file foto yang ada di folder 'images' Anda.
    // Silakan tambah/kurangi dan ganti namanya sesuai foto asli Anda.
    const galleryImages = [
        'pemenang_ip.jpeg', 'pemenang_p1.jpeg', 'pemenang_p3.jpeg', 'doc4.jpg', 'doc5.jpg',
        'doc6.jpg', 'doc7.jpg', 'doc8.jpg', 'doc9.jpg', 'doc10.jpg'
    ];

    galleryImages.forEach((imgName, index) => {
        const delay = (index + 1) * 0.05;
        // Arahkan sumber gambar ke folder 'images' lokal
        const imgSrc = `images/${imgName}`; 
        
        container.insertAdjacentHTML('beforeend', `
            <div onclick="openLightbox('${imgSrc}')" class="stagger-item bg-darkcard/60 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-lg hover:-translate-y-2 hover:border-energi-gold/50 transition-all duration-300 group cursor-pointer flex flex-col" style="animation-delay: ${delay}s">
                <div class="relative h-32 md:h-40 overflow-hidden">
                    <img src="${imgSrc}" alt="Dokumentasi ${index + 1}" loading="lazy" 
                         onerror="this.src='images/default.jpg'" 
                         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                    <div class="absolute inset-0 bg-gradient-to-t from-darkcard via-transparent to-transparent opacity-90"></div>
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span class="text-white text-2xl drop-shadow-lg">🔍</span>
                    </div>
                </div>
                <div class="p-3 md:p-4 relative bg-transparent flex-grow text-center">
                    <h3 class="text-sm md:text-base font-700 text-white group-hover:text-energi-gold transition-colors font-serif">Momen ${index + 1 < 10 ? '0'+(index+1) : index+1}</h3>
                    <p class="text-[10px] md:text-xs text-slate-400 mt-1">Klik untuk perbesar</p>
                </div>
            </div>
        `);
    });
}

// FIX: Menambahkan class 'flex' secara manual lewat JS agar tidak bentrok
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex'); // Add flex here
    
    setTimeout(() => {
        lightbox.classList.remove('opacity-0');
        img.classList.remove('scale-95');
    }, 10);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    
    lightbox.classList.add('opacity-0');
    img.classList.add('scale-95');
    
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex'); // Remove flex here
        img.src = ''; 
    }, 300);
}

/* ==============================================
   1. RENDER TEAM ENERGY (LUXURY STO + HEXAGON NEON)
   ============================================= */
function renderTeam() {
    const container = document.getElementById('team-container');
    if (!container) return; 
    
    // Fungsi pembantu untuk mencetak kartu Heksagon
    const createCard = (person, delay) => {
        // PERBAIKAN: Jika nama file ada, ambil dari folder images. Jika kosong, pakai default.jpg
        const imagePath = person.img ? `images/${person.img}` : `images/default.jpg`;

        return `
        <div class="luxury-card group w-[220px] md:w-[240px] p-6 text-center z-10" style="animation: fadeInUpTeam 0.6s ease backwards ${delay}s;">
            <div class="absolute inset-0 bg-gradient-to-br from-energi-cyan/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div class="hex-container relative z-10">
                <div class="hex-border"></div>
                <div class="hex-photo-wrap">
                    <img src="${imagePath}" 
     alt="${person.name}" 
     class="hex-photo object-cover w-full h-full transition-transform duration-500">
                </div>
            </div>

            <div class="relative z-10">
                <h3 class="text-base md:text-lg font-bold text-white tracking-wide group-hover:text-energi-gold transition-colors duration-300">${person.name}</h3>
                <div class="inline-block px-3 py-1.5 mt-3 rounded-full bg-[#050508]/80 border border-white/10 group-hover:border-energi-cyan/40 group-hover:bg-energi-cyan/10 transition-all duration-300 shadow-inner">
                    <p class="text-energi-cyan text-[10px] md:text-[11px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">${person.role}</p>
                </div>
            </div>
        </div>
        `;
    };
    
    // ... sisa fungsi renderTeam ...


    // Komponen Garis Khusus Mobile
    const mobileLine = `
        <div class="md:hidden flex justify-center w-full my-2">
            <div class="w-[2px] h-8 relative overflow-hidden line-glow">
                <div class="absolute inset-0 energy-flow-y"></div>
            </div>
        </div>
    `;

    // STRUKTUR HTML POHON STO
    container.innerHTML = `
        <div class="flex flex-col items-center w-full relative py-6 max-w-5xl mx-auto overflow-x-hidden">
            
            ${createCard({ name: 'Bapak Susanto', role: 'EC Manager', img: 'susanto.jpg' }, '0.1')}
            
            <div class="flex justify-center w-full my-2 md:my-0">
                <div class="w-[2px] h-10 md:h-12 relative overflow-hidden line-glow">
                    <div class="absolute inset-0 energy-flow-y"></div>
                </div>
            </div>

            ${createCard({ name: 'Ibu Sarah', role: 'EC Supervisor', img: 'sarah.jpg' }, '0.3')}

            <div class="flex justify-center w-full my-2 md:my-0">
                <div class="w-[2px] h-8 md:h-10 relative overflow-hidden line-glow">
                    <div class="absolute inset-0 energy-flow-y" style="animation-delay: 0.2s"></div>
                </div>
            </div>

            <div class="hidden md:block w-full max-w-[800px] relative">
                <div class="absolute top-0 left-[16.66%] right-[16.66%] h-[2px] overflow-hidden line-glow">
                    <div class="absolute inset-0 energy-flow-x"></div>
                </div>
                
                <div class="grid grid-cols-3 w-full">
                    <div class="flex justify-center"><div class="w-[2px] h-10 relative overflow-hidden line-glow"><div class="absolute inset-0 energy-flow-y" style="animation-delay: 0.4s"></div></div></div>
                    <div class="flex justify-center"><div class="w-[2px] h-10 relative overflow-hidden line-glow"><div class="absolute inset-0 energy-flow-y" style="animation-delay: 0.5s"></div></div></div>
                    <div class="flex justify-center"><div class="w-[2px] h-10 relative overflow-hidden line-glow"><div class="absolute inset-0 energy-flow-y" style="animation-delay: 0.6s"></div></div></div>
                </div>
            </div>

            <div class="flex flex-col items-center md:grid md:grid-cols-3 w-full max-w-[800px] gap-0 md:gap-4 justify-items-center relative z-10">
                ${createCard({ name: 'Marini', role: 'EC Document Control', img: 'marini.jpg' }, '0.5')}
                ${mobileLine}
                
                ${createCard({ name: 'Indra Nurul Kusuma', role: 'EC Staff', img: 'indra.png' }, '0.7')}
                
                ${mobileLine}
                ${createCard({ name: 'Juliansyah', role: 'EC Patrol & Control', img: 'juliansyah.jpg' }, '0.9')}
            </div>

        </div>
    `;
}
/* ==============================================
   4. LOGIKA LIVE RADIO PLAYER
   ============================================== */
let isRadioPlaying = false;

function toggleRadio(e) {
    e.stopPropagation(); 
    
    const audio = document.getElementById('radio-stream');
    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');
    const eq = document.getElementById('radio-eq');
    const radioBtn = document.getElementById('radio-btn');

    if (isRadioPlaying) {
        audio.pause();
        iconPlay.classList.remove('hidden');
        iconPause.classList.add('hidden');
        eq.classList.remove('flex');
        eq.classList.add('hidden');
        radioBtn.classList.remove('animate-pulse');
    } else {
        audio.play();
        iconPlay.classList.add('hidden');
        iconPause.classList.remove('hidden');
        eq.classList.remove('hidden');
        eq.classList.add('flex');
        radioBtn.classList.add('animate-pulse');
    }
    isRadioPlaying = !isRadioPlaying;
}

// Init Website
document.addEventListener('DOMContentLoaded', () => {
    displayWinners(1);

    // Fitur Hint Mobile yang Aman
    if (window.innerWidth < 768 && mobileHint) {
        setTimeout(() => {
            mobileHint.classList.remove('hidden');
            setTimeout(() => {
                mobileHint.classList.remove('opacity-0');
                mobileHint.classList.add('opacity-100', 'animate-bounce');
            }, 50);
        }, 1000);

        setTimeout(() => {
            if (mobileHint && mobileHint.classList.contains('opacity-100')) {
                mobileHint.classList.remove('opacity-100', 'animate-bounce');
                mobileHint.classList.add('opacity-0');
                setTimeout(() => mobileHint.classList.add('hidden'), 300);
            }
        }, 7000);
    }
});

/* ==============================================
   EFEK MENGETIK (TYPEWRITER) DI BERANDA
   ============================================== */
const textArray = [
    "Selamat kepada 100 para pemenang training online energi.",
    "Kerja keras dan dedikasi Anda telah membuahkan hasil yang luar biasa.",
    "Anda adalah standar emas bagi masa depan Team Energi.",
    "Kemenangan ini adalah awal dari pencapaian yang lebih besar!"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing-text");

function typeWriter() {
    if (!typingElement) return;

    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    // Kecepatan ngetik (50ms) dan kecepatan hapus (25ms)
    let typeSpeed = isDeleting ? 25 : 50; 

    if (!isDeleting && charIndex === currentText.length) {
        // Jeda santai agar kalimat bisa dibaca tuntas (2.5 detik)
        typeSpeed = 2500; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        // Jeda ambil napas sebelum mengetik kalimat berikutnya (0.5 detik)
        typeSpeed = 500; 
    }

    setTimeout(typeWriter, typeSpeed);
}

// (Penting: Jika Anda sudah memakai efek "Burn Loading" sebelumnya, 
// baris setTimeout di bawah ini BISA DIHAPUS karena pemanggilannya 
// sudah diatur otomatis menyala setelah layar loading meledak).
// Jika tidak memakai loading, biarkan saja:
// setTimeout(typeWriter, 1500);

/* ==============================================
   FITUR SAKELAR TEMA (DARK / LIGHT MODE)
   ============================================== */
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // 1. Cek apakah user sebelumnya sudah memilih Light Mode (di Local Storage)
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeToggleBtn.textContent = '🌙'; // Ganti ikon ke Bulan
    }

    // 2. Fungsi saat tombol ditekan
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // Animasi putar pada tombol saat diklik
            themeToggleBtn.style.transform = 'scale(0.5) rotate(180deg)';
            themeToggleBtn.style.opacity = '0';
            
            setTimeout(() => {
                body.classList.toggle('light-mode');
                
                if (body.classList.contains('light-mode')) {
                    // Jika pindah ke Terang
                    localStorage.setItem('theme', 'light');
                    themeToggleBtn.textContent = '🌙';
                } else {
                    // Jika pindah ke Gelap
                    localStorage.setItem('theme', 'dark');
                    themeToggleBtn.textContent = '☀️';
                }

                // Kembalikan tombol ke ukuran normal
                themeToggleBtn.style.transform = 'scale(1) rotate(0deg)';
                themeToggleBtn.style.opacity = '1';
            }, 200); // Jeda animasi 0.2 detik agar terlihat mulus
        });
    }
});

/* ==============================================
   7. INISIALISASI UTAMA (APP INIT & BURN LOADING)
   ============================================== */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- LOGIKA LOADING SCREEN (BURN EFFECT) ---
    const loadingScreen = document.getElementById('loading-screen');
    const loadingContent = document.getElementById('loading-content');
    const burnEffect = document.getElementById('burn-effect');
    
    // Kunci scroll saat loading
    document.body.style.overflow = 'hidden';

    // Biarkan pengguna menikmati animasi loading selama 2.5 detik
    setTimeout(() => {
        
        // 1. Hisap/Kecilkan logo dan teks sebelum meledak
        if(loadingContent) {
            loadingContent.style.opacity = '0';
            loadingContent.style.transform = 'scale(0.5)';
        }

        // 2. Memicu Efek "Burn" (Kilatan Cahaya Meluas)
        if(burnEffect) {
            burnEffect.style.opacity = '1';
            // Perbesar cahaya hingga menutupi seluruh layar (300% dari lebar layar)
            burnEffect.style.width = '300vw'; 
            burnEffect.style.height = '300vw';
        }

        // 3. Setelah layar putih menyilaukan, perlahan hilangkan tirai hitamnya
        setTimeout(() => {
            loadingScreen.classList.add('opacity-0');
            
            // 4. Hapus elemen loading dari sistem dan buka scroll
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.style.overflow = 'auto'; // Buka kunci scroll
                
                // Mulai efek Typewriter di Beranda setelah burn selesai
                setTimeout(typeWriter, 200); 
            }, 1000); // Jeda fade out transisi layar
            
        }, 600); // Waktu yang dibutuhkan cahaya untuk membesar

    }, 2500); // 2.5 Detik durasi loading awal

    // --- RENDER DATA ---
    displayWinners(1);

    // ... (Sisa kode seperti Hint Mobile & Theme Toggle biarkan tetap di bawah sini) ...
});