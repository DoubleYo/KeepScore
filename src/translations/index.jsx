import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import fr from './messages.fr'

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            fr: {
                translation: fr
            }
        },
        lng: 'fr',
        fallbackLng: 'fr',

        interpolation: {
            escapeValue: false
        }
    })