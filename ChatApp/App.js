import React from 'react';
import {Provider} from 'react-redux';
import {MainStack} from './src/Navigation/mainStack';
import {store} from './src/Management/store';

function App() {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
}

export default App;
