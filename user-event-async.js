import userEvent from '@testing-library/user-event'

const userEventAsync = {}

const nextTick = () => new Promise(r => setTimeout(r, 0))

Object.entries(userEvent).reduce((obj, [key, val]) => {
  obj[key] = async (...args) => {
    const ret = val(...args)
    await nextTick()
    return ret
  }
  return obj
}, userEventAsync)

export {userEventAsync, nextTick}
