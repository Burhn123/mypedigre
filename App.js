import React from 'react';

import LoginPage from './src/screens/LoginPage'
import SignupPage from './src/screens/SignupPage'
import {NavigationContainer} from '@react-navigation/native';


const App = () => {
  return (
    <NavigationContainer>
      <LoginPage />
      <SignupPage />
      
    </NavigationContainer>
  )
}

export default App;