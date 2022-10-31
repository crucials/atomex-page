// The export below was created just to make this file a module
export const MODULE_NAME = 'Event handler' 

document.querySelector('.navigation__menu-button')?.addEventListener('click', () => {
    const openMenuButton = document.querySelector('.navigation__menu-button')
    openMenuButton?.classList.add('navigation__menu-button_rotating')

    setTimeout(() => {
        openMenuButton?.classList.remove('navigation__menu-button_rotating')
    }, 500)

    document.querySelector('.navigation__menu')?.classList.add('navigation__menu_opened')
})

document.querySelector('.navigation__close-menu-button')?.addEventListener('click', () => {
    document.querySelector('.navigation__menu')?.classList.remove('navigation__menu_opened')
})


document.querySelectorAll('.currency-select').forEach(select => select.addEventListener('change', event => {
    const targetSelect = event.target as HTMLSelectElement
    let iconPath : string
    
    if(targetSelect.value == 'Bitcoin') {
        iconPath = 'assets/images/bitcoin.svg'
    }
    else if(targetSelect.value == 'Ethereum') {
        iconPath = 'assets/images/ethereum.svg'
    }
    else {
        return
    }

    (targetSelect.parentElement?.querySelector('.currency-icon') as HTMLImageElement).src = iconPath
}))

document.querySelectorAll('.converter-switcher-button').forEach(button => {
    button.addEventListener('click', event => {
        document.querySelector('.converter-switcher-button_selected')?.classList.remove('converter-switcher-button_selected')

        const targetTab = event.target as HTMLButtonElement
        targetTab.classList.add('converter-switcher-button_selected')

        const submitButton = document.querySelector('.hero__submit-button')
        let newSubmitButtonText : string

        if(targetTab.textContent?.trim() == 'Exchange Crypto') {
            newSubmitButtonText = 'Exchange'
        }
        else if(targetTab.textContent?.trim() == 'Buy / Sell Crypto') {
            newSubmitButtonText = 'Buy / Sell'
        }   
        else {
            return
        }

        if(submitButton?.textContent) {
            submitButton.textContent = newSubmitButtonText
        }
    })
})


document.querySelectorAll('.toggle-answer-button').forEach(button => button.addEventListener('click', event => {
    const question = (event.target as HTMLButtonElement)?.parentElement?.parentElement as HTMLDetailsElement

    if(question.hasAttribute('open')) {
        question.removeAttribute('open')
    }
    else if(!question.hasAttribute('open')) {
        question.setAttribute('open', '')
    }

    question?.dispatchEvent(new Event('toggle'))
}))

document.querySelectorAll('.question').forEach(question => question.addEventListener('toggle', event => {
    const question = event.currentTarget as HTMLDetailsElement
    const answer = question.querySelector('.answer') as HTMLParagraphElement
    const button = question.querySelector('.toggle-answer-button') as HTMLButtonElement

    if(question.open) {
        question.classList.add('question_opened')
        answer.style.height = `${answer.scrollHeight}px`

        button.textContent = '-'
    }
    else if(!question.open) {
        question.classList.remove('question_opened')
        answer.style.height = '0px'

        button.textContent = '+'
    }
}))