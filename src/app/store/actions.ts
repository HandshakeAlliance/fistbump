import AT from './actionTypes'

export interface NetworkType {
  network: 'main' | 'testnet' | 'regtest' | 'simnet';
}

export interface NodeInfoType {
  nodeUrl: string;
  apiKey?: string;
  walletId?: string;
}

export interface NodeDataType extends NetworkType {
  version: string;
  chain: any;
  pool: any;
  mempool: any;
  time: any;
  memory: any;
}

export interface WalletInfoType extends NetworkType {
  wid: number;
  id: string;
  watchOnly: boolean;
  accountDepth: string;
  tokenDepth: number;
  master: {
    encrypted?: boolean;
    until?: number;
    iv?: string;
    algorithm?: string;
    n?: number;
    r?: number;
    p?: number;
  };
  balance: {
    tx: number;
    coin: number;
    unconfirmed: number;
    confirmed: number;
    lockedunconfirmed: number;
    lockedconfirmed: number;
  };
}

export interface NameInfoType {
  _fbName: string;
  id: string | null;
  error: string | null;
  start: {
    reserved: boolean;
    week: number;
    start: number;
  };
  info: {
    name: string;
    nameHash: string;
    state: 'BIDDING' | 'REVEAL' | 'CLOSED' | 'REVOKED' | 'TRANSFER';
    height: number;
    renewal: number;
    owner: {
      hash: string;
      index: number;
    };
    value: number;
    highest: number;
    data: string;
    transfer: number;
    revoked: number;
    claimed: boolean;
    weak: boolean;
    stats: {
      renewalPeriodStart: number;
      renewalPeriodEnd: number;
      blocksUntilExpire: number;
      daysUntilExpire: number;
    };
  };
}

export interface SavedNamesType {

}

const setNodeData = (nodeData: NodeDataType) => ({
  type: AT.SET_NODE_DATA,
  payload: nodeData,
})

const setHsNodeInfo = (nodeInfo: NodeInfoType) => ({
  type: AT.SET_HS_NODE,
  payload: nodeInfo,
})

const setWalletInfo = (walletInfo: WalletInfoType) => ({
  type: AT.SET_WALLET_INFO,
  payload: walletInfo,
})

const setNameInfo = (nameInfo: NameInfoType) => ({
  type: AT.SET_NAME_INFO,
  payload: nameInfo,
})

const setSavedNames = (nameList: SavedNamesType) => ({
  type: AT.SET_SAVED_NAMES,
  payload: nameList,
})

const fetchNameInfo = () => ({
  type: AT.FETCH_NAME_INFO,
})

const fetchNodeData = () => ({
  type: AT.FETCH_NODE_DATA,
})

const fetchSavedNames = () => ({
  type: AT.FETCH_SAVED_NAMES,
})

const fetchSetSavedName = () => ({
  type: AT.FETCH_SET_SAVED_NAME,
})

const fetchWalletInfo = () => ({
  type: AT.FETCH_WALLET_INFO,
})

const selectNodeData = () => ({
  type: AT.SELECT_NODE_DATA,
})

const logout = () => ({
  type: AT.LOGOUT,
})

const removeHSNodeInfo = () => ({
  type: AT.REMOVE_HS_NODE,
})

export {
  fetchNameInfo,
  fetchNodeData,
  fetchSavedNames,
  fetchSetSavedName,
  setHsNodeInfo,
  setNodeData,
  setWalletInfo,
  setNameInfo,
  setSavedNames,
  selectNodeData,
  fetchWalletInfo,
  removeHSNodeInfo,
  logout,
}
