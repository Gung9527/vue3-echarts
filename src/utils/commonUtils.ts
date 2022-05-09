function randomId() {
  return Math.random().toString(36).substring(2)
}

function deepClone(obj?: any) {
  if (!obj) {
    return {}
  }
  let newObj: any
  if (typeof obj === 'object' && obj) {
    newObj = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
      newObj[key] = deepClone(obj[key])
    }
  } else {
    newObj = obj
  }

  return newObj
}



export {
  randomId,
  deepClone
}