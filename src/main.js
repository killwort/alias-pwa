import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './registerServiceWorker'
const supportedLocales = ['en', 'ru']
function matchLocale (l) {
  if (supportedLocales.indexOf(l) !== -1) return l
  return null
}

const locale = matchLocale(localStorage.getItem('language')) || matchLocale(navigator.language) || navigator.languages.find(x => matchLocale(x)) || supportedLocales[0]

const app = createApp(App)
app.provide('locale', locale)
app.use(createI18n({
  legacy: false,
  locale,
  messages: { en: {}, ru: {} }
}))

app.mount('#app')
