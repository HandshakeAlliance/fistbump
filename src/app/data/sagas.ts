import { call, takeEvery, select, all, put } from 'redux-saga/effects';
import { path, values } from 'ramda'
import AT from '../store/actionTypes'
import Api from './api'
import { getNameSearch, getNodeInfo, getSettings, nameInfo } from './selectors'
import { browser } from 'webextension-polyfill-ts'
import {
  fetchNodeData,
  setHsNodeInfo,
  setNameInfo,
  setNodeData,
  setWalletInfo,
  setSavedNames,
  removeHSNodeInfo,
  WalletTxType,
} from '../store/actions'

const fetchNameInfo = function* () {
  const { searchName } = yield select(getNameSearch)
  const nodeData = yield select(getSettings)
  const api = new Api(nodeData)

  const data = yield call(api.getNameInfo, searchName)
  if (data) {
    data._fbName = searchName
    yield put(setNameInfo(data))
  }
}

const fetchNodeInfo = function* () {
  const nodeData = yield select(getSettings)
  const api = new Api(nodeData)
  const data = yield call(api.getInfo)

  if (data) {
    // yield put(setHsNodeInfo(nodeData))
    yield put(setNodeData(data))
    yield call(browser.storage.local.set, { nodeData: nodeData })
    yield call(browser.runtime.sendMessage, 'hello world')
  }
}

const selectNodeData = function* () {
  const nodeData = yield select(getNodeInfo)
  yield put(setHsNodeInfo(nodeData))
  yield put(fetchNodeData())
}

const fetchWalletInfo = function* () {
  const nodeData = yield select(getSettings)
  const api = new Api(nodeData)
  const data = yield call(api.getWalletInfo)
  const txHistory = yield call(api.getTransactions)
  const historyWithNames = yield all(txHistory.map(function*(tx: WalletTxType) {
    const nameHash: string | undefined =
      path(['outputs', 0, 'covenant', 'items', 0], tx)
    const name = nameHash ? yield call(api.getNameByHash, nameHash) : tx.hash
    return { ...tx, name }
  }))
  const walletInfo = { data, txHistory: historyWithNames }

  if (!data.error) {
    yield put(setWalletInfo(walletInfo))
  } else {
    console.log('Fetch wallet info error', data.error)
  }
}

const fetchSavedNames = function* () {
  const { savedNames } = yield call(browser.storage.local.get, 'savedNames')
  if (savedNames) {
    yield put(setSavedNames(values(savedNames)))
  }
}

const fetchSetSavedName = function* () {
  const data = yield select(nameInfo)
  let { savedNames } = yield call(browser.storage.local.get, 'savedNames')
  savedNames = savedNames || {}
  savedNames[data._fbName] = data
  savedNames[data._fbName]._fbName = data._fbName
  yield call(browser.storage.local.set, { savedNames })
}

const logout = function* () {
  try {
    yield call(browser.storage.local.remove, 'nodeData')
    yield put(removeHSNodeInfo())
  } catch (e) {
    return console.log('Could not log out', e)
  }
}

const bootstrap = function* () {
  const { nodeData } = yield call(browser.storage.local.get, 'nodeData')
  if (nodeData) {
    yield put(setHsNodeInfo(nodeData))
    yield put(fetchNodeData())
  }
}

export default function* sagas() {
  yield takeEvery(AT.FETCH_NAME_INFO, fetchNameInfo)
  yield takeEvery(AT.FETCH_NODE_DATA, fetchNodeInfo)
  yield takeEvery(AT.FETCH_WALLET_INFO, fetchWalletInfo)
  yield takeEvery(AT.FETCH_SAVED_NAMES, fetchSavedNames)
  yield takeEvery(AT.FETCH_SET_SAVED_NAME, fetchSetSavedName)
  yield takeEvery(AT.SELECT_NODE_DATA, selectNodeData)
  yield takeEvery(AT.LOGOUT, logout)
  yield call(bootstrap)
}
