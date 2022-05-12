export default function () {
  const getSizeStyle = (width: string | number, height: string | number) => {
    const reg = /^-?[0-9]+(.)?[0-9]+(px|vh|vw|em|rem|%)$/g
    const sizeObj = {
      width: '',
      height: ''
    }
    if (typeof width === 'string' && reg.test(width)) {
      sizeObj.width = width
    } else if (typeof width === 'number' || !isNaN(Number(width))) {
      sizeObj.width = `${width}px`
    } else {
      sizeObj.width = '500px'
    }
  
    if (typeof height === 'string' && reg.test(height)) {
      sizeObj.height = height
    } else if (typeof height === 'number' || !isNaN(Number(height))) {
      sizeObj.height = `${height}px`
    } else {
      sizeObj.height = '300px'
    }
  
    return sizeObj
  }

  return {
    getSizeStyle
  }
}