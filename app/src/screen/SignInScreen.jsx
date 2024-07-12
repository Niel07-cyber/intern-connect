// SignInScreen.js
import { StyleSheet, Text, View, Image, useWindowDimensions, ImageBackground } from 'react-native';
import Logo from '../assets/virtual.png';
import React from 'react';
import { AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

const SignInScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();

  const onUserSignInPressed = () => {
    // Navigate to the 'Home' screen
    navigation.navigate('Login');
  };

  const onAdminSignInPressed = () => {
    // Navigate to the 'Login' screen
    navigation.navigate('LoginA');
  };

  return (
    <ImageBackground
      source={require('../assets/wallpapermain.jpg')}
      style={styles.background}
    >
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <View style={styles.profileContainer}>
          <View style={styles.profile}>
            <Image
              source={require('../assets/admin.png')} // Add the correct path for user profile image
              style={styles.profileImage}
            />
           
          </View>
          <View style={styles.profile}>
            <Image
              source={require('../assets/user.jpg')} // Add the correct path for admin profile image
              style={styles.profileImage}
            />
          
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '100%',
    maxWidth: 200,
    maxHeight: 150,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  profile: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
  },
});

export default SignInScreen;
