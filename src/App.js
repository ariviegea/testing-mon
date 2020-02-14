import React from 'react';
import './scss/App.scss';

import Button from './components/Button/Button'

function App() {
  return (
    <>
      <h1>Welcome to the library</h1>
      <Button className='warning' text={'Hello'} />
    </>
  );
}

export default App;
