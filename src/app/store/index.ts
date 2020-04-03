import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'remote-redux-devtools';
import { createLogger } from 'redux-logger'
import reducers from './reducers';
import sagas from '../data/sagas';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger()

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, logger),
)

sagaMiddleware.run(sagas)

export { store }
