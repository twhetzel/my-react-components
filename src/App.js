import React from 'react';
import './App.css';
import SearchBar from './SearchBar';
// import PrimarySearchAppBar from './PrimarySearchAppBar';
import Submissions from './Submissions';

function App() {
  return (
    <React.Fragment>
      <SearchBar />
      {/* <PrimarySearchAppBar /> */}
      <Submissions />
    </React.Fragment>
  );
}

export default App;
