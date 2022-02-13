import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store  from "./redux/store"; 
import AppRouter from './route';
import "./index.css";

class App extends Component {

  render() {
    return (
        <AppRouter />
    );
  }
}

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root'));