const mainNav = document.querySelector('.main-nav')
const btnClose = document.querySelector('.main-nav__button--close')

btnClose.addEventListener('click', evt => {
    mainNav.innerHTML = 'none';
}) 

