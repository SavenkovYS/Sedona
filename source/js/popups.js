const form = document.querySelector('.review__form')
const overlay = document.querySelector('.overlay')
const moduleSuccess = document.querySelector('.module-success')
const moduleFailure = document.querySelector('.module-failure')
const btnCloseSuccess = document.querySelector('.module-success__button')
const btnCloseFailure = document.querySelector('.module-failure__button')

const firstName = document.getElementById('name-field')
const lastName = document.getElementById('surname-field')
const phone = document.getElementById('phone-field')
const mail = document.getElementById('mail-field')

form.addEventListener('submit', evt => {
    evt.preventDefault()
    if(!firstName.value || !lastName.value || !phone.value || !mail.value) {
        overlay.style.display = "block"
        moduleFailure.style.display = "block"
        btnCloseFailure.addEventListener('click', () => {
            overlay.style.display = "none"
            moduleFailure.style.display = "none"
        })    
    }
})