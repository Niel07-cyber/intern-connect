import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions, ImageBackground } from 'react-native';
import Logo from '../assets/logo.png';
import CustomButton from '../CustomButton/CustomButton';
import { FontAwesome5 } from "@expo/vector-icons";

const SignInScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [userPressed, setUserPressed] = useState(false);
  const [adminPressed, setAdminPressed] = useState(false);

  const onUserSignInPressed = () => {
    setUserPressed(true);
    setTimeout(() => {
      setUserPressed(false);
      navigation.navigate('LOGIN', { presentation: 'modal' });
    }, 500); // Delay navigation for 500ms (adjust as needed)
  };

  const onAdminSignInPressed = () => {
    setAdminPressed(true);
    setTimeout(() => {
      setAdminPressed(false);
      navigation.navigate('LOGINA', { presentation: 'modal' });
    }, 300); // Delay navigation for 500ms (adjust as needed)
  };

  return (
    <ImageBackground
      source={require("../assets/wallpapermain.jpg")}
      style={styles.background}
    >
      <View style={styles.root}>
        <Image
          source={Logo}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.profileContainer}>
          <View style={[styles.profile, userPressed && styles.profilePressed]}>
            <View style={[styles.profileIcon, userPressed && styles.profileIconPressed]}>
              <FontAwesome5 name={"users"} size={80} color="#471710" />
            </View>
            <CustomButton
              text="User"
              onPress={onUserSignInPressed}
              type="PRIMARY"
              style={styles.button}
            />
          </View>
          <View style={[styles.profile, adminPressed && styles.profilePressed]}>
            <View style={[styles.profileIcon, adminPressed && styles.profileIconPressed]}>
              <FontAwesome5 name={"user-shield"} size={70} color="#471710" />
            </View>
            <CustomButton
              text="Admin"
              onPress={onAdminSignInPressed}
              type="PRIMARY"
              style={styles.button}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically and horizontally
    padding: 20,
  },
  logo: {
    width: '50%',
    maxWidth: 100,
    maxHeight: 50,
    marginTop: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center', // Align profiles vertically
    width: '100%',
    marginTop: 20,
  },
  profile: {
    alignItems: 'center', // Center items horizontally
  },
  profilePressed: {
    opacity: 0.7,
  },
  profileIcon: {
    width: 140,
    height: 140,
    borderRadius: 100, // Make it circular
    borderWidth: 6,
    borderColor: '#471710',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Space between profile icon and button
  },
  profileIconPressed: {
    opacity: 0.7,
  },
  button: {
    marginTop: 10, // Space between button and profile icon
  },
});

export default SignInScreen;
