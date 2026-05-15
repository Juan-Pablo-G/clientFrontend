// Nav link active state
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 4;

if (loadMoreBtn) {
    loadMoreBtn.onclick = () => {
        let boxes = [...document.querySelectorAll('.box-container .box')];

        for (var i = currentItem; i < currentItem + 4; i++) {
            if (boxes[i]) {
                boxes[i].style.display = 'inline-block';
            }
        }
        currentItem += 4;
        if (currentItem >= boxes.length) {
            loadMoreBtn.style.display = 'none';
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

window.addEventListener('scroll', function () {
    const hero = document.querySelector('.hero-image-rounded');
    if (!hero) return;
    let scrollPosition = window.scrollY;
    let windowHeight = window.innerHeight;

    let opacity = 1 - scrollPosition / (windowHeight * 0.8);
    if (opacity < 0.3) opacity = 0.3;

    hero.style.opacity = opacity;
});

const boxes = document.querySelectorAll('.card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

boxes.forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(40px)';
    box.style.transition = 'all 0.6s ease';
    observer.observe(box);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

document.querySelectorAll('.btn-tertiary, .btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.98)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    });
});

console.log('Portafolio cargado correctamente 🚀');
