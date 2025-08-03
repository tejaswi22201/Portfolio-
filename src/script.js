// Loading Animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingCommand = document.getElementById('loading-command');
    const loadingOutput = document.getElementById('loading-output');
    
    const commands = [
        'npm install portfolio-dependencies...',
        'Building React components...',
        'Initializing data science modules...',
        'Loading AI models...',
        'Compiling TypeScript...',
        'Portfolio ready! 🚀'
    ];
    
    let commandIndex = 0;
    
    function typeCommand() {
        if (commandIndex < commands.length) {
            const command = commands[commandIndex];
            loadingCommand.textContent = '';
            
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                loadingCommand.textContent += command[charIndex];
                charIndex++;
                
                if (charIndex === command.length) {
                    clearInterval(typeInterval);
                    
                    setTimeout(() => {
                        const output = document.createElement('div');
                        output.className = 'terminal-line';
                        output.innerHTML = `<span class="prompt">✓</span><span style="color: #00ff41;">${command}</span>`;
                        loadingOutput.appendChild(output);
                        
                        commandIndex++;
                        if (commandIndex < commands.length) {
                            setTimeout(typeCommand, 500);
                        } else {
                            setTimeout(() => {
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
    
    setTimeout(typeCommand, 1000);
});

// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Animated counters for stats
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

// Particle system for background
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

// Audio functionality
let audioPlaying = false;
const audio = document.getElementById('bg-audio');
const audioIcon = document.getElementById('audio-icon');

function toggleAudio() {
    if (audioPlaying) {
        audio.pause();
        audioIcon.className = 'fas fa-volume-mute';
    } else {
        audio.play().catch(e => console.log('Audio play failed:', e));
        audioIcon.className = 'fas fa-volume-up';
    }
    audioPlaying = !audioPlaying;
}

// Download CV function
function downloadCV() {
    // In a real implementation, this would download the actual CV file
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual CV file path
    link.download = 'Tejaswi_Venkatesh_CV.pdf';
    link.click();
    
    // Show notification
    showNotification('CV download started!', 'success');
}

// Notification system
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
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simulate form submission
    showNotification('Message sent successfully!', 'success');
    
    // Reset form
    this.reset();
});

// Terminal command simulation
function simulateTerminalCommand(command, output) {
    console.log(`$ ${command}`);
    console.log(output);
}

// Add some fun terminal commands to console
setTimeout(() => {
    simulateTerminalCommand('whoami', 'Tejaswi Venkatesh - Data Science & AI Enthusiast');
    simulateTerminalCommand('pwd', '/home/tejaswi/portfolio');
    simulateTerminalCommand('ls -la skills/', 'Python, React, TypeScript, PyTorch, Machine Learning');
}, 2000);

// Easter egg - Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

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

// Add CSS animations
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
`;
document.head.appendChild(style);
