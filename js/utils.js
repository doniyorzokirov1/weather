const elSelector = (elName) => {
  return document.querySelector(elName)
}

const createEl = (elName) => {
  return document.createElement(elName)
}

let debounce = (callback, wait) => {
  let timeoutId = null

  return (...args) => {
    window.clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}

let request = async (path, options = { method: 'GET' }) => {
  let res = await fetch(`${BASE_URL}${path}`, options)
  let data = await res.json()
  return data
}
