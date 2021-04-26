import produce from 'immer'

const paymentR = produce((state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'H_PAYMENT_CREATED':
      state.push(payload)
      break
    default:
  }
}, [])

export default paymentR
