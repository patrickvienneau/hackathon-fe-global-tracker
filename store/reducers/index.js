import { combineReducers } from 'redux'
import testR from './testR'

const computedReducers = {
  testR,
  // websocketR,
}

const combinedReducers = combineReducers(computedReducers)

export default combinedReducers
