document.addEventListener('DOMContentLoaded', () => {
    
    const timeEl = document.getElementById('js-tokyo-time');
    function updateTokyoTime() {
        if (!timeEl) return;
        const options = { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', hour12: false };
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        timeEl.innerText = `[TOKYO TIME: ${formatter.format(new Date())} JST]`;
    }
    setInterval(updateTokyoTime, 1000);
    updateTokyoTime();

    let percent = 0;
    const bar = document.querySelector('.loading-bar');
    const text = document.getElementById('load-percent');
    const preloader = document.getElementById('preloader');

    const loadingInterval = setInterval(() => {
        percent += Math.floor(Math.random() * 8) + 2; 
        if (percent >= 100) {
            percent = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(() => preloader.style.display = 'none', 600);
                }
            }, 500);
        }
        if (bar) bar.style.width = percent + '%';
        if (text) text.innerText = percent.toString().padStart(2, '0');
    }, 50);

    const cursor = document.getElementById('cursor');
    if (cursor) {
        window.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
        });
        document.querySelectorAll('a, button, .product-card, .feed-item, .hover-trigger, .menu-item').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.product-card, .feed-item, .section-header, .hero-content, .info-terminal').forEach(el => {
        el.classList.add('reveal-hidden');
        revealObserver.observe(el);
    });

    const coordsEl = document.querySelector('.coordinates');
    const indicators = document.querySelectorAll('.indicator .cyan');
    
    function randomizeTelem() {
        if (coordsEl) {
            coordsEl.innerText = `X: ${Math.floor(Math.random() * 200 + 1100)} Y: ${Math.floor(Math.random() * 100 + 300)}`;
        }
        if (indicators.length >= 2 && indicators[1]) {
            indicators[1].innerText = `${Math.floor(Math.random() * 400 + 8800)} RPM`;
        }
    }
    setInterval(randomizeTelem, 150);

    const triggers = document.querySelectorAll('.hover-trigger, .hover-lights, .main-title, .gz8-logo-container');
    const backgrounds = document.querySelectorAll('.jdm-background, .background-container, .hero-video-container');
    const logoContainer = document.querySelector('.gz8-logo-container');

    triggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
            backgrounds.forEach(bg => {
                bg.classList.add('active');
                bg.classList.add('lights-on');
                bg.classList.add('headlights-on');
            });
            if (logoContainer) {
                logoContainer.classList.add('active');
                logoContainer.classList.add('gz8-powered');
            }
        });
        
        trigger.addEventListener('mouseleave', () => {
            backgrounds.forEach(bg => {
                bg.classList.remove('active');
                bg.classList.remove('lights-on');
                bg.classList.remove('headlights-on');
            });
            if (logoContainer) {
                logoContainer.classList.remove('active');
                logoContainer.classList.remove('gz8-powered');
            }
        });
    });
}); 

function showInfo(type) {
    const img = document.getElementById('info-image');
    if (!img) return;

    const paths = {
        'composition': 'img/composition.png',
        'fit': 'img/fit.png',
        'sizing': 'img/sizing.png'
    };

    if (paths[type]) {
        img.src = paths[type];
        img.style.opacity = '1';
        img.style.transform = 'scale(1) translateY(0)';
    }
}

function hideInfo() {
    const img = document.getElementById('info-image');
    if (img) {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95) translateY(20px)';
    }
}
