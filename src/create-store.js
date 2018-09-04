let currentState
let listenHandlers = []

export default function createStore(initialState = {}) {
  currentState = initialState

  function getState() {
    return currentState
  }

  function setState(newState, options = {}) {
    const oldState = currentState
    if (typeof newState === 'object' && newState !== null) {
      currentState = { ...currentState, ...newState }
    } else if (typeof newState === 'function') {
      currentState = { ...currentState, ...newState({ ...oldState }) }
    } else {
      throw new Error('Invalid argument of store.setState')
    }

    const { reactive = true } = options
    if (!reactive) {
      return
    }

    listenHandlers.forEach((func) => {
      func(oldState, currentState)
    })
  }

  function listen(handler) {
    listenHandlers.push(handler)
  }

  function unlisten(handler) {
    listenHandlers = listenHandlers.filter((func) => handler !== func)
  }

  return {
    getState,
    setState,
    listen,
    unlisten,
  }
}
