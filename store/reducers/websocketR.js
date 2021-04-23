import produce from 'immer'

const websocketR = produce((state, action) => {
  const { type } = action
  switch (type) {
    case 'REDUX_WEBSOCKET::MESSAGE':
      console.log(action)
      break
    default:
  }
}, {})

export default websocketR
