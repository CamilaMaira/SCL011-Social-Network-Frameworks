import React from 'react';
import './App.css';

//import Routes from './routes';
import Nav from './components/Nav'

import Store from './store/store'
import { Provider } from 'react-redux';
import Routes from './routes';

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Nav />
        <Routes />
    
      </div>
    </Provider>
  );
}

export default App;
