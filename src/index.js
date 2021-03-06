import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App.js';
import * as serviceWorker from './serviceWorker';

//Redux Setup
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../src/reducers/reducers.js';
import ReduxThunk from 'redux-thunk';

//Store is where all data is
const store = createStore(
  reducers,
  compose(
    applyMiddleware(ReduxThunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);


//Hook up react to communicate with redux
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
