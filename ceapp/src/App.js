import React from 'react';
import './App.css';

//import Routes from './routes';
import Nav from './components/nav'


import Store from './store/store'
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Nav />
    
      </div>
    </Provider>
  );
}

export default App;
