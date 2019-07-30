import {fireEvent, wait} from '@testing-library/dom'

const fireEventAsync = {}

Object.entries(fireEvent).reduce((obj, [key, val]) => {
  obj[key] = async (...args) => {
    const ret = val(...args)
    await wait()
    return ret
  }
  return obj
}, fireEventAsync)

export {fireEventAsync}
