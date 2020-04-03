import * as React from 'react';
import { isNil } from 'ramda'
import { connect } from 'react-redux'
import { fetchWalletInfo, WalletInfoType } from '../../store/actions'
import { GlobalStateType } from '../../store/reducers'
import styled from 'styled-components'

interface WalletOverviewStateType {
  fetchWalletInfo: () => void;
}

interface MapStateTypes {
  walletInfo: WalletInfoType;
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
