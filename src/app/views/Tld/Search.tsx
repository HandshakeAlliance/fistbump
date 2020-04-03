import * as React from 'react';
import { connect } from 'react-redux'
import { NameInfoType, fetchSetSavedName } from '../../store/actions'
import { auctionState } from '../../data/selectors'
import { GlobalStateType } from '../../store/reducers'
import { Button } from '../../components'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;

  & > form {
    margin-bottom: 1rem;
  }

  & ul {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;

    & li {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 10px 0px;
    }

    & li span:first-child {
      text-align: left;
    }
    & li span:last-child {
      text-align: right;
    }
  }
`

interface MapStateTypes {
  auctionState: string | undefined | null;
  nameInfo: NameInfoType;
}

interface MapDispatchTypes {
  fetchSetSavedName: () => void;
}

type OwnProps = MapDispatchTypes & MapStateTypes

const SearchNames = ({
  auctionState,
  nameInfo,
  fetchSetSavedName,
}: OwnProps) => {
  return (
    <Container>
      <div>
        {auctionState
        ? (
          <ul>
            <li>
              <span>State</span>
              <span>{auctionState}</span>
            </li>
            <li>
              <span>Opened</span>
              <span>Week {nameInfo.start.week}</span>
            </li>
            <li>
              <span>Highest Bid</span>
              <span>{nameInfo.info.highest}</span>
            </li>
            <li>
              <span>Claimed</span>
              <span>{nameInfo.info.claimed ? 'Yes' : 'No'}</span>
            </li>
          </ul>
        )
        : (
          <ul>
            <li>
              <span>State</span>
              <span>{
                (nameInfo.start &&
                  nameInfo.start.reserved) ? 'RESERVED' : 'PREMATURE'}</span>
            </li>
            <li>
              <span>Opening</span>
              <span>Week {nameInfo.start && nameInfo.start.week}</span>
            </li>
            <li>
              <span>Start Block</span>
              <span>{nameInfo.start && nameInfo.start.start}</span>
            </li>
          </ul>
        )
      }
      </div>
      <Button onClick={fetchSetSavedName} bt="primary">Watch</Button>
    </Container>
  )
}

const mapStateToProps = (state: GlobalStateType) => ({
  nameInfo: state.nameInfo,
  auctionState: auctionState(state),
})

const mapDispatchtoProps = (dispatch: any) => ({
  fetchSetSavedName: () => {
    dispatch(fetchSetSavedName())
  },
})

export default connect(mapStateToProps, mapDispatchtoProps)(SearchNames)
