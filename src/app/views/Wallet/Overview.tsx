import * as React from 'react';
import { isNil, isEmpty } from 'ramda'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import {
  fetchWalletInfo,
  WalletDisplayType,
  WalletTxType,
} from '../../store/actions'
import { GlobalStateType } from '../../store/reducers'
import styled from 'styled-components'
import { RefreshCcw, Play, Unlock, CornerUpRight, CornerLeftDown } from 'styled-icons/feather'
interface WalletOverviewStateType {
  fetchWalletInfo: () => void;
}

interface MapStateTypes {
  walletInfo: WalletDisplayType;
}

type OwnProps = WalletOverviewStateType & MapStateTypes

const Amount = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;

  & span {
    font-size: 1rem;
    opacity: 0.5;
  }
`

const TxList = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  transform: translateX(-20px);
  width: 100vw;
`
const TxListItem = styled.div`
  border: solid rgba(255, 255, 255, .1);
  border-width: 0 0 1px;
  padding: 10px 20px;
`

const IconMap: any = {
  REDEEM: () => <RefreshCcw title="Redeemed your bid" size={15} />,
  OPEN: () => <Play title="Opened a new auction" size={15} />,
  REVEAL: () => <Unlock title="Revealed your bid" size={15} />,
  NONE: () => <CornerLeftDown title="Received HNS" size={15} />,
  BID: () => <CornerUpRight title="Bid on a name" size={15} />,
}

const WalletOverview = ({ fetchWalletInfo, walletInfo }: OwnProps) => {
  React.useEffect(() => {
    fetchWalletInfo()
  }, [])
  return (
    <>
      <Amount>
        {
          !isNil(walletInfo.balance) &&
          new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 6
          }).format(walletInfo.balance.confirmed / 1000000)
        }{' '}
        <span>hns</span>
      </Amount>
      <TxList>
        {!isEmpty(walletInfo) &&
          !isEmpty(walletInfo.transactions) &&
          walletInfo.transactions.map((tx: WalletTxType) => (
            <TxListItem key={tx.hash}>
              {IconMap[tx.outputs[0].covenant.action] ? IconMap[tx.outputs[0].covenant.action]() : tx.outputs[0].covenant.action}{' '}
              {format(new Date(tx.date), 'MMM d, h:mm aaaa')}{' '}
              {(tx.outputs[0].value / 1000000)}{' hns'}
            </TxListItem>
        ))}
      </TxList>
    </>
  )
}

const mapStateToProps = (state: GlobalStateType) => ({
  walletInfo: state.walletInfo,
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchWalletInfo: () => {
    dispatch(fetchWalletInfo())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(WalletOverview)
