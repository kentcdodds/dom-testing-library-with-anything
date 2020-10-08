import userEvent from '@testing-library/user-event'

const userEventAsync = {}

Object.entries(userEvent).reduce((obj, [key, val]) => {
  obj[key] = async (...args) => {
    const ret = val(...args)
    await new Promise(r => setTimeout(r, 0))
    return ret
  }
  return obj
}, userEventAsync)

export {userEventAsync}
