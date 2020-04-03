import { getFormValues } from 'redux-form'
import { createSelector } from 'reselect'
import { path, defaultTo } from 'ramda'

export const getNodeInfo = (state: any) => getFormValues('NodeForm')(state)
export const getNameSearch = (state: any) => getFormValues('NameSearch')(state)
export const getNodeData = (state: any) => state.nodeData
export const getSettings = (state: any) => state.settings
export const nameInfo = (state: any) => state.nameInfo

export const auctionState = createSelector(
  nameInfo,
  ni => defaultTo(undefined)(path(['info', 'state'], ni)),
)
