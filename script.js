const flowerTrigger = document.getElementById('flower-trigger');
const envelopeTrigger = document.getElementById('envelope-trigger');
const message = document.getElementById('message');
const container = document.querySelector('.container');
const modal = document.getElementById('letter-modal');
const closeBtn = document.getElementById('close-modal');
const passcodeInput = document.getElementById('passcode-input');
const passcodeOverlay = document.getElementById('passcode-overlay');
const unlockBtn = document.getElementById('unlock-btn');
const errorMsg = document.getElementById('error-msg');
const backgroundFlowers = document.querySelectorAll('.background-flowers .mini-flower');

const pinDigits = [
    document.getElementById('d1'),
    document.getElementById('d2'),
    document.getElementById('d3'),
    document.getElementById('d4')
];

// Auto-focus logic
pinDigits.forEach((digit, index) => {
    digit.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < 3) pinDigits[index + 1].focus();
    });
    digit.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) pinDigits[index - 1].focus();
    });
});

unlockBtn.addEventListener('click', () => {
    const pin = pinDigits.map(d => d.value).join('');
    if (pin === '0222') {
        startBloom();
    } else {
        errorMsg.style.opacity = '1';
        setTimeout(() => errorMsg.style.opacity = '0', 2000);
    }
});

function startBloom() {
    passcodeOverlay.classList.add('hidden');
    setTimeout(() => {
        container.classList.add('shake');
        flowerTrigger.classList.add('bloomed');
        message.classList.add('show');
        envelopeTrigger.classList.add('show');
        
        // Activate locked background flowers
        backgroundFlowers.forEach((flower, i) => {
            setTimeout(() => flower.classList.add('bloomed'), i * 50);
        });

        createParticles(100);
        setTimeout(() => container.classList.remove('shake'), 500);
    }, 800);
}

envelopeTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!envelopeTrigger.classList.contains('open')) {
        envelopeTrigger.classList.add('open');
    } else {
        modal.classList.add('active');
        container.classList.add('blur');
    }
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    container.classList.remove('blur');
});

function createParticles(count = 40) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = '❤️';
        particle.style.position = 'fixed';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.fontSize = Math.random() * 25 + 15 + 'px';
        particle.style.color = '#ff3e3e';
        const destinationX = (Math.random() - 0.5) * 1200;
        const destinationY = (Math.random() - 0.5) * 1200;
        document.body.appendChild(particle);
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { transform: `translate(calc(-50% + ${destinationX}px), calc(-50% + ${destinationY}px)) scale(1.5)`, opacity: 0 }
        ], {
            duration: 1500 + Math.random() * 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        }).onfinish = () => particle.remove();
    }
}
