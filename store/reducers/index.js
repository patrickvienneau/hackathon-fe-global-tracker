import { combineReducers } from 'redux'
import testR from './testR'
import accountR from './accountR'
import paymentR from './paymentR'

const computedReducers = {
  testR,
  accountR,
  paymentR,
}

const combinedReducers = combineReducers(computedReducers)

export default combinedReducers
