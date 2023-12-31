let sun = document.getElementById('sun');
let cloud = document.getElementById('cloud');
let text = document.getElementById('text');
let imageSection = document.getElementById('imageSection');
let sectionStart = imageSection.offsetTop;
let sectionEnd = sectionStart + imageSection.offsetHeight;
let typeSection = document.querySelector('.type-section');
let hasStartedTyping = false;

function updateSectionPositions() {
    sectionStart = imageSection.offsetTop;
    sectionEnd = sectionStart + imageSection.offsetHeight;
}

window.addEventListener('scroll', function() {
    let value = window.scrollY;

    updateSectionPositions();

    if (value > sectionStart && value < sectionEnd) {
        sun.style.top = (value - sectionStart) * 1 + 'px';
        cloud.style.left = (value - sectionStart) * 0.25 + 'px';
        text.style.marginRight = (value - sectionStart) * 0.8 + 'px';
    } else if (value >= sectionEnd) {
        sun.style.top = '';
        cloud.style.left = '';
        text.style.marginRight = '';
    }

    let sectionTop = typeSection.offsetTop;
    let sectionBottom = sectionTop + typeSection.offsetHeight;

    if (window.scrollY + window.innerHeight >= sectionTop && window.scrollY <= sectionBottom) {
        if (!hasStartedTyping) {
            type();
            hasStartedTyping = true;
        }
    } else {
        resetType();
        hasStartedTyping = false;
    }
});

window.addEventListener('resize', updateSectionPositions);

const texts = ["It's 6 PM already", "Time for CG Fun !"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function resetType() {
    textIndex = 0;
    charIndex = 0;
    isDeleting = false;
    document.getElementById('typed-text').textContent = "";
}

let typingTimeout;

function type() {
    clearTimeout(typingTimeout);

    if (isDeleting) {
        if (charIndex > 0) {
            charIndex--;
            updateText();
            typingTimeout = setTimeout(type, 25);
        } else {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingTimeout = setTimeout(type, 500);
        }
    } else {
        if (charIndex < texts[textIndex].length) {
            charIndex++;
            updateText();
            typingTimeout = setTimeout(type, 75);
        } else {
            typingTimeout = setTimeout(() => {
                isDeleting = true;
                type();
            }, 2000);
        }
    }
}

function updateText() {
    document.getElementById('typed-text').textContent = texts[textIndex].substring(0, charIndex);
}
type();

const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation ();
}

function addAnimation() {
    scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    const introElement = document.querySelector('.intro');

    setTimeout(() => {
        introElement.style.animation = 'fadeOut 1s forwards';

        setTimeout(() => {
            introElement.style.display = 'none';
        }, 1000);
    }, 2000);
});