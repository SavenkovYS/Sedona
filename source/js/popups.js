const form = document.querySelector('.review__form')
const overlay = document.querySelector('.overlay')
const modalSuccess = document.querySelector('.modal-success')
const modalFailure = document.querySelector('.modal-failure')
const closeBtns = document.querySelectorAll('.modal-button')

const firstName = document.getElementById('name-field')
const lastName = document.getElementById('surname-field')
const phone = document.getElementById('phone-field')
const mail = document.getElementById('mail-field')


function closePopup() {
    overlay.classList.remove('overlay--open')
    modalFailure.classList.remove('modal--open')
    modalSuccess.classList.remove('modal--open') 
}

form.addEventListener('submit', evt => {
    evt.preventDefault()
    if(!firstName.value || !lastName.value || !phone.value || !mail.value) {
        modalFailure.classList.add('modal--open')
        overlay.classList.add('overlay--open')
    } else {
        modalSuccess.classList.add('modal--open')
        overlay.classList.add('overlay--open')
    }

    overlay.addEventListener('click', evt => {
        if(evt.target === overlay) {
           closePopup()
        }
    })
})

closeBtns.forEach(btn => {
    btn.addEventListener('click', closePopup)
})