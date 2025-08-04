class LoadingAudioManager {
    constructor() {
        this.typingSound = null;
        this.audioEnabled = false;
        this.isLoadingActive = false;
        this.initAudio();
    }
    
    initAudio() {
        // Create audio element for typing sounds
        this.typingSound = new Audio();
        this.typingSound.preload = 'auto';
        this.typingSound.volume = 0.4;
        
        // Use local audio file (recommended)
        this.typingSound.src = 'assets/audio/typing-sound.mp3';
        
        // Fallback: You can uncomment this line to use online audio for testing
        // this.typingSound.src = 'https://www.soundjay.com/misc/sounds/typewriter-key-1.mp3';
        
        // Handle audio loading errors
        this.typingSound.addEventListener('error', () => {
            console.log('Audio file not found - continuing without sound');
        });
    }
    
    enableAudio() {
        this.audioEnabled = true;
        console.log('Loading screen audio enabled');
    }
    
    disableAudio() {
        this.audioEnabled = false;
        this.isLoadingActive = false;
        if (this.typingSound) {
            this.typingSound.pause();
            this.typingSound.currentTime = 0;
        }
        console.log('Loading screen audio disabled');
    }
    
    playTypingSound() {
        if (this.audioEnabled && this.isLoadingActive && this.typingSound) {
            this.typingSound.currentTime = 0;
            this.typingSound.play().catch(e => {
                // Silently handle audio play failures (browser restrictions)
            });
        }
    }
    
    startLoadingAudio() {
        this.isLoadingActive = true;
    }
    
    stopLoadingAudio() {
        this.isLoadingActive = false;
        this.disableAudio();
    }
}

// Initialize Loading Audio Manager
const loadingAudio = new LoadingAudioManager();

// Enhanced Loading Animation with Audio
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingCommand = document.getElementById('loading-command');
    const loadingOutput = document.getElementById('loading-output');
    
    if (!loadingScreen || !loadingCommand || !loadingOutput) {
        console.log('Loading elements not found');
        return;
    }
    
//   const commands = [
//     'npm install portfolio-dependencies...',
//     'Loading React & TypeScript modules...',
//     'Building React components...',
//     'Setting up data visualization libraries...',
//     'Initializing data science modules...',
//     'Connecting to analytics APIs...',
//     'Loading AI models...',
//     'Building interactive dashboards...',
//     'Optimizing data rendering...',
//     'Compiling TypeScript...',
//     'Setting up real-time data streams...',
//     'Portfolio ready! 🚀',
//     'Data Science & Frontend Developer Online ✨'
// ];

const commands = [
    'npm install portfolio-deps...',
    'Loading React modules...',
    'Setting up data visualization...',
    'Initializing data science...',
    'Loading AI models...',
    'Building dashboards...',
    'Compiling TypeScript...',
    'Data Science Portfolio Online ✨'
];


    
    let commandIndex = 0;
    
    // Enable audio on first user interaction with loading screen
    function enableAudioOnInteraction() {
        loadingAudio.enableAudio();
        loadingAudio.startLoadingAudio();
        
        // Remove event listeners after first interaction
        loadingScreen.removeEventListener('click', enableAudioOnInteraction);
        loadingScreen.removeEventListener('touchstart', enableAudioOnInteraction);
        loadingScreen.removeEventListener('keydown', enableAudioOnInteraction);
        
        // Show audio enabled indicator
        const audioIndicator = document.createElement('div');
        audioIndicator.innerHTML = '<i class="fas fa-volume-up"></i> Audio Enabled';
        audioIndicator.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            color: #00ff41;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            opacity: 0.7;
        `;
        loadingScreen.appendChild(audioIndicator);
        
        setTimeout(() => {
            if (audioIndicator.parentNode) {
                audioIndicator.remove();
            }
        }, 2000);
    }
    
    // Add event listeners for enabling audio
    loadingScreen.addEventListener('click', enableAudioOnInteraction);
    loadingScreen.addEventListener('touchstart', enableAudioOnInteraction);
    loadingScreen.addEventListener('keydown', enableAudioOnInteraction);
    
    // Add instruction for audio
    const audioInstruction = document.createElement('div');
    audioInstruction.innerHTML = '<i class="fas fa-hand-pointer"></i> Click to enable typing sounds';
    audioInstruction.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        color: #666;
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        animation: pulse 2s infinite;
    `;
    loadingScreen.appendChild(audioInstruction);
    
    function typeCommand() {
        if (commandIndex < commands.length) {
            const command = commands[commandIndex];
            loadingCommand.textContent = '';
            
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                loadingCommand.textContent += command[charIndex];
                charIndex++;
                
                // Play typing sound every 2-3 characters for realistic effect
                if (charIndex % 3 === 0) {
                    loadingAudio.playTypingSound();
                }
                
                if (charIndex === command.length) {
                    clearInterval(typeInterval);
                    
                    // Play final keystroke sound
                    loadingAudio.playTypingSound();
                    
                    setTimeout(() => {
                        const output = document.createElement('div');
                        output.className = 'terminal-line';
                        output.innerHTML = `<span class="prompt">✓</span><span style="color: #00ff41;">${command}</span>`;
                        loadingOutput.appendChild(output);
                        
                        commandIndex++;
                        if (commandIndex < commands.length) {
                            setTimeout(typeCommand, 500);
                        } else {
                            // Loading complete - stop audio and hide loading screen
                            setTimeout(() => {
                                loadingAudio.stopLoadingAudio();
                                loadingScreen.classList.add('hidden');
                                setTimeout(() => {
                                    loadingScreen.style.display = 'none';
                                }, 500);
                            }, 1000);
                        }
                    }, 1000);
                }
            }, 50);
        }
    }
    
    // Start the loading animation
    setTimeout(() => {
        typeCommand();
        // Remove audio instruction after animation starts
        setTimeout(() => {
            if (audioInstruction.parentNode) {
                audioInstruction.remove();
            }
        }, 2000);
    }, 1000);
});

// Navigation functionality (no audio here)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}));

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }
});

// Animated counters for stats (no audio)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate stats counters
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
            }
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-progress')) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 300);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-number, .skill-progress, .timeline-item, .project-card').forEach(el => {
    observer.observe(el);
});

// Particle system for background (no audio)
function createParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const numParticles = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = '#4169E1';
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(65, 105, 225, ${(100 - distance) / 100 * 0.2})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize particles
createParticles();

// Download CV function (no audio)
function downloadCV() {
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual CV file path
    link.download = 'Tejaswi_Venkatesh_CV.pdf';
    link.click();
    
    showNotification('CV download started!', 'success');
}

// Notification system (no audio)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'JetBrains Mono', monospace;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Form submission (no audio)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        showNotification('Message sent successfully!', 'success');
        this.reset();
    });
}

// Easter egg - Konami code (no audio)
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konami.toString()) {
        showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
    }
});

// Add CSS animations for smooth effects
const style = document.createElement('style');
style.textContent = `
    .animate {
        animation: slideInUp 0.8s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification.success {
        background: #28a745 !important;
    }
    
    .notification.error {
        background: #dc3545 !important;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);
