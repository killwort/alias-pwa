/* eslint-disable import/no-webpack-loader-syntax */
import ruAdj from 'raw-loader!./adjectives.ru.txt'
import enAdj from 'raw-loader!./adjectives.en.txt'
import ruPlr from 'raw-loader!./plurals.ru.txt'
import enPlr from 'raw-loader!./plurals.en.txt'

const adjectives = {
  ru: ruAdj.split('\n').map((line) => line.trim()),
  en: enAdj.split('\n').map((line) => line.trim())
}
const plurals = {
  ru: ruPlr.split('\n').map((line) => line.trim()),
  en: enPlr.split('\n').map((line) => line.trim())
}
export default function (locale) {
  let name = ''
  let dict
  if (Math.random() > 0.25) {
    dict = adjectives[locale]
    name += dict[Math.floor(Math.random() * dict.length)] + ' '
  }
  dict = plurals[locale]
  name += dict[Math.floor(Math.random() * dict.length)]
  return name
}
