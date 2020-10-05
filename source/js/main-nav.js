const mainNav = document.querySelector('.main-nav')
const btnClose = document.querySelector('.main-nav__button--close')
const btnOpen = document.querySelector('.main-nav__button--open')

btnClose.addEventListener('click', () => {
    mainNav.classList.add('main-nav--closed')
})  

btnOpen.addEventListener('click', () => {
    mainNav.classList.remove('main-nav--closed')
} )

