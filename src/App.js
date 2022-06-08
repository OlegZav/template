import React, { useState } from 'react';
import Aside from './components/aside';
import { Context } from './context';
import Main from './components/main';
import Header from './components/header';

function App() {
  const [searchData, setSearchData]=useState([])
  const [searchString, setSearchString]=useState('')
  return (
    <Context.Provider value={{searchData,setSearchData,searchString,setSearchString}}>
        <div className="app">
          <Header/>
          <Aside/>
          <Main/>
        </div>
    </Context.Provider>
  );
}
export default App;