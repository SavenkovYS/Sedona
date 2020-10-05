const mainNav = document.querySelector('.main-nav')
const btnClose = document.querySelector('.main-nav__button--close')

btnClose.addEventListener('click', evt => {
    mainNav.classList.add('main-nav--closed');
})  

