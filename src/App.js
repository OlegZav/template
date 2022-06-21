import React, { useState } from 'react';
import Aside from './components/aside';
import { MainContext, Context } from './context';
import Main from './components/main';
import Header from './components/header';

function App() {
  const [searchData, setSearchData]=useState([])
  return (
    <div className="app">
      <Context.Provider value={{ setSearchData }}>
        <Header />
      </Context.Provider>
      <Aside />
      <MainContext.Provider value={{ searchData }}>
        <Main />
      </MainContext.Provider>
    </div>
  );
}
export default App;