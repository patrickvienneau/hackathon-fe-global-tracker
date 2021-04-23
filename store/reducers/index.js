import { combineReducers } from 'redux'
import testR from './testR'

const computedReducers = {
  testR,
}

const combinedReducers = combineReducers(computedReducers)

export default combinedReducers
