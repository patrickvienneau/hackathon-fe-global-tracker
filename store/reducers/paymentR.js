import produce from 'immer'
import { H_PAYMENT_CREATED } from 'constants/actionConstants'
import initialValues from './fixtures/payments.json'

const paymentR = produce((state, action) => {
  const { type, payload } = action

  switch (type) {
    case H_PAYMENT_CREATED:
      state.push(payload)
      break
    default:
  }
}, initialValues)

export default paymentR
