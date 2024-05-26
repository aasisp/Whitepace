document.addEventListener('DOMContentLoaded', ()=> {
    initMobileMenu();
});


const initMobileMenu = () => {

    const bodyElement = document.querySelector('body');
    const headerElement = bodyElement?.querySelector('.header');
    const navBar = headerElement?.querySelector('.nav-bar');
    const anchorTags = navBar?.querySelectorAll('a[href^="#"]');
    const dropNav = navBar?.querySelectorAll('.drop-nav');
    const dropDown = navBar?.querySelectorAll('.drop-down');

    const navOpenerClass = 'nav-opener';
    const navActiveClass = 'nav-active';
    const dropNavClass = 'drop-nav';

    // Handle mobile menu
    const handleMobileMenu = (element, className) => {

        if (element && className) {
            element.classList.toggle(className);
        }

    };

    // Handle mobile menu remove class
    const handleRemoveClass = (element, className) => {
        
        if (element && className) {
            element.classList.remove(className);
        }

    };

    // Accordion
    const accordion = (e) => {
        const nextSibling = e.target.nextElementSibling;

        if (nextSibling && !nextSibling.classList.contains('open')) {
            dropDown.forEach((item) => {
                if (item.classList.contains('open')) {
                    item.classList.remove('open');
                }
            });

            dropNav.forEach((item) => {
                item.classList.remove('rotate');
            });
        }

        if (nextSibling && nextSibling.classList.contains('drop-down')) {
            nextSibling.classList.toggle('open');
            e.target.classList.toggle('rotate');
        }
    };

    // Mobile Nav event
    navBar.addEventListener('click', (e) => {
        const getElementClass = e.target.classList;

        getElementClass.forEach((eleClass) => {
            // Handle mobile menu
            if (eleClass === navOpenerClass) {
                
                handleMobileMenu(bodyElement, navActiveClass);

            }

            // Accordion
            accordion(e);
        });
    }); 

    // Handle page scroll on click of anchor tag.
    anchorTags.forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = anchor.getAttribute('href').substring(1);

            if (targetId) {
                const targetElement = document.querySelector(`#${targetId}`);
                const headerOffset = headerElement.getBoundingClientRect().height;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition =
                    elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition
                });
            }
        });
    });


    document.addEventListener('click', (e)=> {

        const getClass = e.target.classList;

        const listOfClasses = [
            navOpenerClass,
            dropNavClass,
            'mobile-menu',
            'drop-down',
            'rotate',
            'open'
          ];

        getClass.forEach(itemClass => {

            if (!listOfClasses.includes(itemClass)) {
                const bodyClasses = bodyElement.classList;
            
                bodyClasses.forEach((bodyClass) => {
                  if (bodyClass === navActiveClass) {
                    handleRemoveClass(bodyElement, navActiveClass);
                  }
                });
              }
        });
          
    });
}