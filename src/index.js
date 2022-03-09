import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import AppRouter from './route';
import "./index.css";

class App extends Component {

  render() {
    return (
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    );
  }
}

ReactDOM.render( <App />, document.getElementById('root'));