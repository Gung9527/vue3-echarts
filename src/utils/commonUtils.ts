import { camelCase, paramCase } from 'change-case/dist.es2015'

function randomId() {
  return Math.random().toString(36).substring(2)
}

function getValue(obj: any, key: string, defaultValue?: any) {
  return obj[key] || obj[paramCase(key)] || obj[camelCase(key)] || defaultValue
}

export {
  randomId,
  getValue
}