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

  // Hedef mevcut ranktan düşükse fiyat = 0
  if (desiredValue <= currentValue) {
    finalPrice.textContent = "0.00 $";
    return 0;
  }

  // Aradaki fark * temel birim fiyat (örnek: 5 USD)
  const basePricePerStep = 5;
  const steps = desiredValue - currentValue;
  let price = steps * basePricePerStep;

  // Koridor çarpanı uygula
  price *= laneMultiplier;

  // Fiyatı güncelle
  finalPrice.textContent = price.toFixed(2) + " $";
  return price;
}

// Event listeners
currentRank.addEventListener("change", calculatePrice);
desiredRank.addEventListener("change", calculatePrice);
laneSelect.addEventListener("change", calculatePrice);

// Sipariş butonu
orderBtn.addEventListener("click", () => {
  const price = calculatePrice();
  if (price <= 0) {
    alert("Lütfen mevcut ligden daha yüksek bir hedef lig seçin.");
    return;
  }
  alert("Siparişiniz oluşturuldu. Toplam fiyat: " + price.toFixed(2) + " $\n(Burada ödeme sistemi bağlanacak)");
});


document.addEventListener('DOMContentLoaded', () => {

    const loginBtn = document.getElementById('btn-giris');
    const signupBtn = document.getElementById('btn-kayitol');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeBtns = document.querySelectorAll('.modal .close-btn');

    // Giriş butonuna tıklama olayını dinle
    if (loginBtn) {
        loginBtn.addEventListener('click', (event) => {
            event.preventDefault();
            loginModal.style.display = 'flex';
        });
    }

    // Kayıt ol butonuna tıklama olayını dinle
    if (signupBtn) {
        signupBtn.addEventListener('click', (event) => {
            event.preventDefault();
            signupModal.style.display = 'flex';
        });
    }

    // Tüm kapatma butonlarına tıklama olayını dinle
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Butonun ait olduğu modal pencereyi bulup gizle
            btn.closest('.modal').style.display = 'none';
        });
    });

    // Modal dışına tıklandığında kapat
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });

    // Formların submit olaylarını dinle (Şimdilik sadece konsola log atar)
    const loginForm = loginModal.querySelector('form');
    const signupForm = signupModal.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = loginModal.querySelector('#login-email').value;
            const password = loginModal.querySelector('#login-password').value;
            console.log('Login Form Verileri:', { email, password });

            // Burada API çağrısını yapacaksın
            // const response = await fetch('/api/login', { ... });
            // console.log(response);

            alert('Giriş işlemi yapıldı! (Konsola bakınız)');
            loginModal.style.display = 'none';
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = signupModal.querySelector('#signup-username').value;
            const email = signupModal.querySelector('#signup-email').value;
            const password = signupModal.querySelector('#signup-password').value;
            console.log('Sign Up Form Verileri:', { username, email, password });

            // Burada API çağrısını yapacaksın
            // const response = await fetch('/api/signup', { ... });
            // console.log(response);

            alert('Kayıt işlemi yapıldı! (Konsola bakınız)');
            signupModal.style.display = 'none';
        });
    }
});
