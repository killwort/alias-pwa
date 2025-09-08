import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './registerServiceWorker'
const supportedLocales = ['en', 'ru']
function matchLocale (l) {
  if (supportedLocales.indexOf(l) !== -1) return l
  return null
}

function slavicPlurals (choice, choicesLength, orgRule) {
  if (choice === 0) {
    return 0
  }

  const teen = choice > 10 && choice < 20
  const endsWithOne = choice % 10 === 1
  if (!teen && endsWithOne) {
    return 1
  }
  if (teen) return 3
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2
  }

  return choicesLength < 4 ? 2 : 3
}

const locale = matchLocale(localStorage.getItem('language')) || matchLocale(navigator.language) || navigator.languages.find(x => matchLocale(x)) || supportedLocales[0]
const app = createApp(App)

app.provide('locale', locale)
const i18n = createI18n({
  pluralRules: {
    ru: slavicPlurals
  },
  legacy: false,
  locale,
  messages: { en: {}, ru: {} }
})
app.use(i18n)

app.mount('#app')
export { app, i18n }
