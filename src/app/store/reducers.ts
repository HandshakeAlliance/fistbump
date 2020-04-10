import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import AT from './actionTypes'

export interface SettingsType {
  apiKey: string
  nodeUrl: string
  walletId: string
}

export interface GlobalStateType {
  settings: SettingsType,
  nodeData: any,
  walletInfo: any,
  nameInfo: any,
  savedNames: any,
  form: any,
}

const settingsInitialState: SettingsType | {} = {}

const settings = (state = settingsInitialState, action: any) => {
  switch (action.type) {
    case AT.SET_HS_NODE:
      return { ...state, ...action.payload }
    case AT.REMOVE_HS_NODE:
      return {}
    default:
      return state
  }
}

const nodeDataInitialState = {}

const nodeData = (state = nodeDataInitialState, action: any) => {
  switch (action.type) {
    case AT.SET_NODE_DATA:
      return { ...action.payload }
    default:
      return state
  }
}

const walletInfoInitialState = {}

const walletInfo = (state = walletInfoInitialState, action: any) => {
  switch (action.type) {
    case AT.SET_WALLET_INFO:
      const { data, txHistory } = action.payload
      return { ...data, transactions: txHistory.reverse() }
    default:
      return state
  }
}

const nameInfoInitialState = {}

const nameInfo = (state = nameInfoInitialState, action: any) => {
  switch (action.type) {
    case AT.SET_NAME_INFO:
      return { ...action.payload }
    default:
      return state
  }
}

const savedNamesInitialState: string[] = []

const savedNames = (state = savedNamesInitialState, action: any) => {
  switch (action.type) {
    case AT.SET_SAVED_NAMES:
      return [ ...action.payload ]
    default:
      return state
  }
}

export default combineReducers<object>({
  form: formReducer,
  nodeData,
  settings,
  walletInfo,
  nameInfo,
  savedNames,
})
