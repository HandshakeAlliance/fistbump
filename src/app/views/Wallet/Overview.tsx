import * as React from 'react'
import { isNil, isEmpty, path, prop, defaultTo } from 'ramda'
import { Link } from 'react-router-dom'
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

interface IconMapType {
  REDEEM: () => React.ReactElement;
  OPEN: () => React.ReactElement;
  REVEAL: () => React.ReactElement;
  NONE: () => React.ReactElement;
  BID: () => React.ReactElement;
  CATCHALL: () => React.ReactElement;
}

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
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const TxIcon = styled.div`
  color: rgba(255, 255, 255, .3);
`

const TxInfo = styled.div`
  padding-left: 1rem;
  flex: 1;
  max-width: 154px;
`
const TxName = styled.div`
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
`
const StyledDate = styled.div`
  font-size: .8em;

  & a {
    color: rgba(255, 255, 255, 0.3);
    text-decoration: none;

    &:hover {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`
const StyledAmount = styled.div`
  flex: 1;
  text-align: right;

  & span {
    font-size: .8em;
    color: rgba(255, 255, 255, 0.3);
  }
`

const IconMap: IconMapType = {
  REDEEM: () => <RefreshCcw title="Redeemed your bid" size={35} />,
  OPEN: () => <Play title="Opened a new auction" size={35} />,
  REVEAL: () => <Unlock title="Revealed your bid" size={35} />,
  NONE: () => <CornerLeftDown title="Received HNS" size={35} />,
  BID: () => <CornerUpRight title="Bid on a name" size={35} />,
  CATCHALL: () => <CornerUpRight title="Bid on a name" size={35} />,
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
              <TxIcon>
                {prop(path(['outputs', 0, 'covenant', 'action'], tx) || 'CATCHALL', IconMap)()}{' '}
              </TxIcon>
              <TxInfo>
                <TxName>{tx.name}</TxName>
                <StyledDate>
                  <a target="_blank" href={`https://hnscan.com/tx/${tx.hash}`}>
                    {format(new Date(tx.date), 'MMM d, h:mm aaaa')}{' '}
                  </a>
                </StyledDate>
              </TxInfo>
              <StyledAmount>
                {(tx.outputs[0].value / 1000000)}<span>{' hns'}</span>
              </StyledAmount>
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
