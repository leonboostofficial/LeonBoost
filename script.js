document.addEventListener('DOMContentLoaded', () => {

    // Fiyat hesaplama ve modal kodlarını birleştirelim
    
    // Rank'lerin sırası ve taban fiyatları (örnek)
    const rankPrices = {
        iron3: 1, iron2: 2, iron1: 3,
        bronze4: 4, bronze3: 5, bronze2: 6, bronze1: 7,
        silver4: 8, silver3: 9, silver2: 10, silver1: 11,
        gold4: 12, gold3: 13, gold2: 14, gold1: 15,
        platinum4: 16, platinum3: 17, platinum2: 18, platinum1: 19,
        emerald4: 20, emerald3: 21, emerald2: 22, emerald1: 23,
        diamond4: 24, diamond3: 25, diamond2: 26, diamond1: 27,
        master: 28
    };

    // Koridor çarpanları
    const laneMultipliers = {
        any: 1,
        top: 1.25,
        jungle: 1.25,
        mid: 1.25,
        adc: 1.35,
        support: 1.35,
        "champ-select": 1.40
    };

    // DOM elementleri
    const currentRank = document.getElementById("current-rank");
    const desiredRank = document.getElementById("desired-rank");
    const laneSelect = document.getElementById("lane-select");
    const finalPrice = document.getElementById("final-price");
    const orderBtn = document.querySelector(".order-btn");

    // Fiyat hesaplama fonksiyonu
    function calculatePrice() {
        const currentValue = rankPrices[currentRank.value];
        const desiredValue = rankPrices[desiredRank.value];
        const laneMultiplier = laneMultipliers[laneSelect.value] || 1;

        if (desiredValue <= currentValue) {
            finalPrice.textContent = "0.00 $";
            return 0;
        }

        const basePricePerStep = 5;
        const steps = desiredValue - currentValue;
        let price = steps * basePricePerStep;
        price *= laneMultiplier;

        finalPrice.textContent = price.toFixed(2) + " $";
        return price;
    }

    // Event listeners
    if (currentRank) currentRank.addEventListener("change", calculatePrice);
    if (desiredRank) desiredRank.addEventListener("change", calculatePrice);
    if (laneSelect) laneSelect.addEventListener("change", calculatePrice);

    // Sipariş butonu (Giriş yapmamışsa modalı aç)
    if (orderBtn) {
        orderBtn.addEventListener("click", () => {
            const price = calculatePrice();
            if (price <= 0) {
                alert("Lütfen mevcut ligden daha yüksek bir hedef lig seçin.");
                return;
            }
            
            // Eğer kullanıcı giriş yapmadıysa login modalını göster
            if (!isLoggedIn()) { // isLogggedIn fonksiyonunu aşağıda tanımlayacağız
                loginModal.style.display = 'flex';
            } else {
                // Giriş yapmışsa sipariş işlemini yap
                alert("Siparişiniz oluşturuldu. Toplam fiyat: " + price.toFixed(2) + " $");
                // Buradan boost API'ye istek gönderebilirsin
            }
        });
    }

    // Modal ve form yönetim kodları
    const loginBtn = document.getElementById('btn-giris');
    const signupBtn = document.getElementById('btn-kayitol');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeBtns = document.querySelectorAll('.modal .close-btn');
    const loginForm = document.querySelector('#loginModal form');
    const signupForm = document.querySelector('#signupModal form');

    if (loginBtn) {
        loginBtn.addEventListener('click', (event) => {
            event.preventDefault();
            loginModal.style.display = 'flex';
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', (event) => {
            event.preventDefault();
            signupModal.style.display = 'flex';
        });
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });

    // Giriş Formu Gönderimi
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = loginModal.querySelector('#login-email').value;
            const password = loginModal.querySelector('#login-password').value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Giriş başarılı!');
                    loginModal.style.display = 'none';
                    updateUIForLoggedInUser(); // Arayüzü güncelle
                } else {
                    alert('Giriş başarısız: ' + data.message);
                }

            } catch (error) {
                console.error('Hata:', error);
                alert('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
            }
        });
    }

    // Kayıt Formu Gönderimi
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = signupModal.querySelector('#signup-username').value;
            const email = signupModal.querySelector('#signup-email').value;
            const password = signupModal.querySelector('#signup-password').value;

            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Kayıt başarılı! Lütfen giriş yapın.');
                    signupModal.style.display = 'none';
                    loginModal.style.display = 'flex';
                } else {
                    alert('Kayıt başarısız: ' + data.message);
                }

            } catch (error) {
                console.error('Hata:', error);
                alert('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
            }
        });
    }

    // Kullanıcının giriş yapıp yapmadığını kontrol etme fonksiyonu
    function isLoggedIn() {
        // Çerez veya localStorage'dan token/oturum bilgisini kontrol et
        // Basit bir kontrol olarak şimdilik hep false dönelim
        // Gerçek uygulamada burası daha karmaşık olur
        return false;
    }

    // Giriş yapıldıktan sonra arayüzü güncelleme fonksiyonu
    function updateUIForLoggedInUser() {
        const userControls = document.querySelector('.user-controls');
        if (userControls) {
            // Giriş ve Kayıt butonlarını kaldır
            const loginBtn = document.getElementById('btn-giris');
            const signupBtn = document.getElementById('btn-kayitol');
            if (loginBtn) loginBtn.remove();
            if (signupBtn) signupBtn.remove();

            // Kullanıcı adını ve çıkış butonunu ekle (örnek)
            const userGreeting = document.createElement('span');
            userGreeting.textContent = "Merhaba, TestKullanici!";
            userControls.prepend(userGreeting);

            const logoutBtn = document.createElement('a');
            logoutBtn.textContent = 'Çıkış Yap';
            logoutBtn.classList.add('btn', 'btn-logout');
            logoutBtn.href = '#';
            userControls.appendChild(logoutBtn);

            logoutBtn.addEventListener('click', () => {
                alert('Çıkış yapıldı.');
                window.location.reload(); // Sayfayı yenile
            });
        }
    }
});
