import * as React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store'
import styled, { ThemeProvider } from 'styled-components'
import { Header, Theme } from './components'
import Splash from './views/Splash'
import Search from './views/Tld/Search'
import Watching from './views/Tld/Watch'
import Settings from './views/Settings'
import Default from './views/Default'
import NodeSetup from './views/NodeSetup'
import WalletOverview from './views/Wallet/Overview'

const Container = styled.div`
  background-color: #3c4043;
  color: rgba(255, 255, 255, .8);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 0.9rem;
  height: 500px;
`

const Content = styled.div`
  padding: 0 20px;
  background: rgba(255, 255, 255, 0.1);
  height: 86%;
  display: flex;
  flex-direction: column;
`

const App = () => (
  <Provider store={store}>
    <MemoryRouter>
      <ThemeProvider theme={Theme}>
        <Container>
          <Header />
          <Content>
              <Switch>
                <Route path='/node-setup'><NodeSetup /></Route>
                <Route path='/settings'><Settings /></Route>
                <Route path='/splash'><Splash /></Route>
                <Route path='/wallet/overview'><WalletOverview /></Route>
                <Route path='/wallet/send'><Splash /></Route>
                <Route path='/wallet/receive'><Splash /></Route>
                <Route path='/tld/search'><Search /></Route>
                <Route path='/tld/watch'><Watching /></Route>
                <Route path='/tld/bid'><Splash /></Route>
                <Route path='/'><Default /></Route>
              </Switch>
          </Content>
        </Container>
      </ThemeProvider>
    </MemoryRouter>
  </Provider>
)

export default App
