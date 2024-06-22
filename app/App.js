import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screen/HomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SingUpScreen';
import InputScreen from './src/screen/InputScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
   
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HOME" component={HomeScreen} />
        <Stack.Screen name="LOGIN" component={LoginScreen} />
        <Stack.Screen name="SIGNUP" component={SignupScreen} />
        <Stack.Screen name="INPUT" component={InputScreen} />
      </Stack.Navigator>
   
  );
}

export default App;
