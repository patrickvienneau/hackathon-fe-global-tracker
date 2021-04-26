import produce from 'immer'

const accountR = produce((state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'H_ACCOUNT_CREATED':
      state.push(payload)
      break
    default:
  }
}, [])

export default accountR
