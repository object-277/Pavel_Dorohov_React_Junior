import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './route';
import "./index.css";

class App extends Component {
  render() {
    return (
        <AppRouter />
    );
  }
    
}

ReactDOM.render(<App />, document.getElementById('root'));