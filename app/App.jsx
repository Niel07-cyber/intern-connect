import React, {useState, useEffect, initializing} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from './src/screen/HomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SingUpScreen';
import InputScreen from './src/screen/InputScreen';
import SignInScreen from './src/screen/SignInScreennew';
import SplashScreen from './src/screen/SplashScreen';
import LoginScreenAdmin from './src/screen/LoginScreenAdmin';
import SignupScreenAdmin from './src/screen/SingUpScreenAdmin';
import Toast from "react-native-toast-message";
import StatusScreen from './src/screen/StatusScreen';
import NewScreen from './src/screen/NewScreen';
import InputScreenAdmin from './src/screen/InputScreenAdmin'
import GetStarted from './src/screen/GetStarted';
import HomeScreenAdmin from './src/screen/HomeScreenAdmin';
import { auth } from '../config'; // Ensure this path is correct
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './src/screen/ProfileScreen';




const Stack = createNativeStackNavigator();


const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SPLASH" component={SplashScreen} />
        <Stack.Screen name="SIGNINNEW" component={SignInScreen} />
        <Stack.Screen name="GETSTARTED" component={GetStarted} />
        <Stack.Screen name="LOGIN" component={LoginScreen} />
        <Stack.Screen name="LOGINA" component={LoginScreenAdmin} />
        <Stack.Screen name="SIGNUP" component={SignupScreen} />
        <Stack.Screen name="SIGNUPA" component={SignupScreenAdmin} />
        <Stack.Screen name="HOME" component={HomeScreen} />
        <Stack.Screen name="HOMEA" component={HomeScreenAdmin} />
        <Stack.Screen name="INPUTA" component={InputScreenAdmin} />
        <Stack.Screen name="STATUS" component={StatusScreen} />
        <Stack.Screen name="PROGRESS" component={NewScreen} />
        <Stack.Screen name="PROFILE" component={ProfileScreen} />
      </Stack.Navigator>

  );
}
return(

  <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="INPUT"component={InputScreen} />
        <Stack.Screen name="LOGIN" component={LoginScreen} />
        <Stack.Screen name="SIGNUP" component={SignupScreen} />
        <Stack.Screen name="HOME" component={HomeScreen} />
        <Stack.Screen name="SIGNINNEW" component={SignInScreen} />
        <Stack.Screen name="LOGINA" component={LoginScreenAdmin} />
        <Stack.Screen name="SIGNUPA" component={SignupScreenAdmin} />
        <Stack.Screen name="INPUTA" component={InputScreenAdmin} />
        <Stack.Screen name="STATUS" component={StatusScreen} />
        <Stack.Screen name="PROGRESS" component={NewScreen} />
        <Stack.Screen name="PROFILE" component={ProfileScreen} />
         
        </Stack.Navigator>
     
)
    }
  



  

export default App;
