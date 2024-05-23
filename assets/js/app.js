const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const anchorTags = bodyElement.querySelectorAll('a[href^="#"]');
const dropNav = bodyElement.querySelectorAll('.drop-nav');
const dropDown = bodyElement.querySelectorAll('.drop-down');

document.addEventListener('DOMContentLoaded', ()=> {

    document.addEventListener('click', e=> {
        const getElementClass = e.target.classList;

        getElementClass.forEach(eleClass => {
            
            // Handle mobile menu
            handleMobileMenu(eleClass);

            // Accordion
            if (eleClass === 'drop-nav') {
                accordion(e);
            }

        });        
    });

    // Handle page scroll on click of anchor tag.
    anchorTags.forEach(anchor => {
        anchor.addEventListener('click', e=> {
            e.preventDefault();

            const targetId = anchor.getAttribute('href').substring(1);

            if (targetId) {
                const targetElement = document.querySelector(`#${targetId}`);
                const headerOffset = headerElement.getBoundingClientRect().height;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition
                });
            }
        });
    });
});


// Handle mobile menu
const handleMobileMenu = (eleClass) => {
    if (eleClass === 'nav-opener') {
        bodyElement.classList.toggle('nav-active');
    }
    
    const listOfClasses = ['nav-opener', 'drop-nav', 'mobile-menu', 'drop-down', 'rotate', 'open'];

    if (!listOfClasses.includes(eleClass)) {
        const bodyClasses = bodyElement.classList;

        bodyClasses.forEach(bodyClass => {

            if (bodyClass === 'nav-active') {
                bodyElement.classList.remove('nav-active');
            }

        });
    }
};


// Accordion
const accordion = (e) => {
    const nextSibling = e.target.nextElementSibling;

    if (!nextSibling.classList.contains('open')) {

        dropDown.forEach(item => {
        
            if (item.classList.contains('open')) {
                item.classList.remove('open');
            }
        });

        dropNav.forEach(item => {

            item.classList.remove('rotate');

        });
    }

    if (nextSibling && nextSibling.classList.contains('drop-down')) {
        nextSibling.classList.toggle('open');
        e.target.classList.toggle('rotate');
    }
};