import * as React from 'react';
import { connect } from 'react-redux'
import { SearchBar, Navigation } from '.'
import { SettingsType } from '../store/reducers'
import styled from 'styled-components'
import { path } from 'ramda'

interface HeaderProps {
  showMe: SettingsType
}

const Header = styled.div<HeaderProps>`
  display: ${props => path(['showMe', 'nodeUrl'], props) ? 'flex' : 'none'};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.darkGrey};
`

const FbLogo = styled.div`
  font-size: 1.5rem;
  height: 25px;
  width: 25px;
  background: rgba(255, 255, 255, .1);
  border-radius: 50%;
  padding: 4px 5px 6px;
  text-align: center;
`

const ConnectedHeader = ({ settings }: any) => (
  <Header showMe={settings}>
    <FbLogo>👊</FbLogo>
    <SearchBar />
    <Navigation />
  </Header>
)

const mapStateToProps = (state: any) => ({
  settings: state.settings,
})

export default connect(mapStateToProps)(ConnectedHeader)
