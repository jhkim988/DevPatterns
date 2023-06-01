import React from 'react';
import { ForwardRefParent } from './forwardRef/ForwardRefParent';
import { ImperativeHandleParent } from './useImperativeHandle/ImperativeHandleParent';

function App() {
  return (
    <>
      <ForwardRefParent />
      <ImperativeHandleParent />
    </>
  );
}

export default App;
