import * as React from 'react';
import { useHistory, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../components'
import { isNil, isEmpty } from 'ramda'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  & h1 {
    display: flex;
    justify-content: space-between;
    font-size: 3rem;
    text-align: center;
    margin: 50px 0 0;
  }

  & div {
    padding: 0 40px;
  }

  & ul {
    padding-right: 40px;
  }

  & li {
    list-style: none;
    margin-bottom: 15px;
    position: relative;
    padding-left: 15px;
  }

  & li:before {
    color: #d4a418;
    content: '.';
    font-size: 42px;
    position: absolute;
    line-height: 1rem;
    top: -12px;
    left: -2px;
  }

  & button {
    margin-bottom: 1rem;
  }
`

const Splash = ({ settings }: any) => {
  const history = useHistory()

  function handleClick() {
    history.push('/node-setup')
  }

  return (
    <>
    {!isNil(settings) && !isEmpty(settings)
      ? (
        <Redirect push to="/wallet/overview" />
      )
      : (
        <Container>
          <div>
            <h1><span>👊</span> <span>Fistbump</span></h1>
            <p>Connect to your Handshake node for self-soverign, and privacy protecting web experience.</p>
          </div>
          <ul>
            <li>Privately search for TLDs using the extension or address bar.</li>
            <li>Browse the decentralized web. <em>*coming soon</em></li>
            <li>Send and receive HNS to your own node. <em>*coming soon</em></li>
          </ul>
          <Button onClick={handleClick} bt="primary">Get Started</Button>
        </Container>
      )
    }
    </>
  )
}

const mapStateToProps = (state: any) => ({
  settings: state.settings,
})

export default connect(mapStateToProps)(Splash)
