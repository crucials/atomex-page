import './index.html'
import './index.scss'

const TRANSFORM_CLASSES = [
    'exchange-feature-2_moved-left', 
    'exchange-feature-2_moved-up', 
    'exchange-feature-2_shrinked'
]

let tabletResolutionReached = false

window.addEventListener('load', () => {
    import('./scripts/event-handler')

    checkWindowSize()

    window.addEventListener('resize', () => {
        checkWindowSize()
    })

    let remainingClasses = [...TRANSFORM_CLASSES]
    document.querySelectorAll('.exchange-feature-2').forEach(feature => {
        if(remainingClasses.length == 0) {       
            remainingClasses = [...TRANSFORM_CLASSES]
        }

        const randomClass = remainingClasses[getRandomNumber(0, remainingClasses.length)]
        feature.classList.add(randomClass)   
        remainingClasses.splice(remainingClasses.indexOf(randomClass), 1)
    })

    initObservers()
})

function checkWindowSize() {
    const converter = document.querySelector('.hero__converter')

    if(window.innerWidth <= 800) {
        if(!tabletResolutionReached) {
            const featureList = document.querySelector('.hero__features')

            converter?.remove()

            if(converter) {
                featureList?.insertAdjacentElement('afterend', converter)
            }
        }

        tabletResolutionReached = true
    }
    
    else if(window.innerWidth > 800) {
        if(tabletResolutionReached) {
            const heroSectionContent = document.querySelector('.hero__content')

            converter?.remove()

            if(converter) {
                heroSectionContent?.insertAdjacentElement('afterend', converter)
            }
        }

        tabletResolutionReached = false
    }
}

function initObservers() {
    const heroSection = document.querySelector('.hero')
    const heroSectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                document.querySelector('.hero__converter')?.classList.add('hero__converter_loaded')
                document.querySelector('.hero__features')?.classList.add('hero__features_loaded')
            }
        })
    }, { threshold: 0.3 })

    if(heroSection) {
        heroSectionObserver.observe(heroSection)
    }

    const FAQSection = document.querySelector('.faq-section__list')
    if(FAQSection) {
        const FAQSectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {  
                    FAQSection.querySelectorAll('.exchange-feature-2').forEach(feature => {
                        feature.classList.add('exchange-feature-2_loaded')
                    })
                    
                    observer.unobserve(FAQSection)
                }
            })
        }, { threshold: 0.4 })

        FAQSectionObserver.observe(FAQSection)
    }
}

function getRandomNumber(from : number, to : number) {
    return Math.floor(Math.random() * (to - from)) + from
}