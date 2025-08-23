const buttons = document.querySelectorAll("button");
const object = document.querySelector(".object");
const customColorInput = document.querySelector("#customColor");

buttons.forEach(button =>{
    button.addEventListener("click", () => {
        const color = button.innerText.toLowerCase();
        object.style.backgroundColor = color;
    });
});

customColorInput.addEventListener("input", () => {
    object.style.backgroundColor = customColorInput.value;
});

// Web Audio API sound generation
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSciFiBeep() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(800 + Math.random() * 400, audioContext.currentTime);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Add sound to color change events
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const color = button.innerText.toLowerCase();
        object.style.backgroundColor = color;
        updateHexDisplay(color);
        playSciFiBeep();
    });
});

customColorInput.addEventListener("input", () => {
    object.style.backgroundColor = customColorInput.value;
    updateHexDisplay(customColorInput.value);
    playSciFiBeep();
    createParticles(event);
});

function createParticles(event) {
    const container = document.getElementById('particle-container');
    const rect = event.target.getBoundingClientRect();
    const particles = 10;

    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Calculate position relative to container
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Random movement direction
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const velocity = 0.5 + Math.random() * 0.5;
        
        particle.style.setProperty('--dx', Math.cos(angle) * velocity);
        particle.style.setProperty('--dy', Math.sin(angle) * velocity);
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        container.appendChild(particle);
        
        // Remove particle after animation
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

// Initialize audio context on first user interaction
document.addEventListener('click', () => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}, {once: true});

// Framerate counter
let lastFrame = performance.now();
let frameCount = 0;

function updateFPS() {
    const now = performance.now();
    frameCount++;
    if (now - lastFrame >= 1000) {
        document.getElementById('fps-counter').textContent = frameCount;
        frameCount = 0;
        lastFrame = now;
    }
    requestAnimationFrame(updateFPS);
}

updateFPS();

// Update hex value display
function updateHexDisplay(color) {
    document.getElementById('hex-value').textContent = color.toUpperCase();
}

// Modify existing color change handlers
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const color = button.innerText.toLowerCase();
        object.style.backgroundColor = color;
        updateHexDisplay(color);
    });
});

customColorInput.addEventListener("input", () => {
    object.style.backgroundColor = customColorInput.value;
    updateHexDisplay(customColorInput.value);
});
// Add datetime display functionality
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const timeString = now.toLocaleTimeString('en-US', options);
    document.getElementById('datetime').textContent = timeString;
}

updateDateTime();
setInterval(updateDateTime, 1000);
// Add function to update and display the current datetime
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const timeString = now.toLocaleTimeString('en-US', options);
    document.getElementById('datetime').textContent = timeString;
}

// Initialize and set interval for updating datetime
updateDateTime();
setInterval(updateDateTime, 1000);