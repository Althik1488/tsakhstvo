// Знаходимо елементи
const loginBtn = document.getElementById('main-login-btn');
const counterDisplay = document.getElementById('click-counter');
const secretTabs = document.querySelectorAll('.secret-tab');
const timerDisplay = document.getElementById('cooldown-timer');
const linkBox = document.getElementById('link-box');

// Прогрес кліків і вкладок
let clickCount = 0; 
let unlockedTabs = 0; 

// Твоя нова логіка відкриття вкладок (2, 3, 5, 7, 10 кліків)
const unlockMilestones = [2, 3, 5, 7, 10]; 

let isCooldown = false; 

// Змінні для динамічного кулдауну
let currentMinCd = 2000; // Стартовий мінімум (2 секунди)
let currentMaxCd = 2600; // Стартовий максимум (2.6 секунди)

loginBtn.addEventListener('click', function() {
    if (isCooldown) return; 

    // 1. Підрахунок кліків
    clickCount++; 
    counterDisplay.textContent = clickCount; 

    // 2. Перевірка відкриття нових вкладок
    if (unlockedTabs < secretTabs.length && clickCount >= unlockMilestones[unlockedTabs]) {
        secretTabs[unlockedTabs].style.display = 'block'; 
        unlockedTabs++; 
    }

    // Блокуємо кнопку
    isCooldown = true;
    loginBtn.style.opacity = '0.5'; 
    loginBtn.style.cursor = 'not-allowed'; 

    // ЛОГІКА ДЛЯ ПЕРШОГО КЛІКУ (10 секунд тиші)
    if (clickCount === 1) {
        setTimeout(() => {
            loginBtn.style.opacity = '1';
            loginBtn.style.cursor = 'pointer';
            isCooldown = false;
            
            // Відкриваємо віконце з посиланням
            linkBox.style.display = 'block';
        }, 10000); 
    } 
    // ЛОГІКА ДЛЯ ВСІХ НАСТУПНИХ КЛІКІВ (динамічний таймер)
    else {
        let cooldownTime = Math.floor(Math.random() * (currentMaxCd - currentMinCd + 1)) + currentMinCd;
        let timeLeft = cooldownTime;

        // Збільшуємо межі для наступного разу (+0.2с та +0.4с)
        currentMinCd += 200; 
        currentMaxCd += 400;

        const countdownInterval = setInterval(() => {
            timeLeft -= 10;
            
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                timerDisplay.textContent = ''; 
                loginBtn.style.opacity = '1';
                loginBtn.style.cursor = 'pointer';
                isCooldown = false;
            } else {
                timerDisplay.textContent = `COOLDOWN: ${(timeLeft / 1000).toFixed(2)}s`;
            }
        }, 10);
    }
});