import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, useWindowDimensions } from 'react-native';
import Logo from '../assets/icc.jpg';
import CustomButton from '../CustomButton/CustomButton';

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
    }, 300); // Delay navigation for 300ms (adjust as needed)
  };

  return (
    <ImageBackground
      source={require('../assets/newbkkkkk.jpg')} // Replace with your background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.root}>
        <Image
          source={Logo}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>Intern Connect</Text>
        <View style={styles.profileContainer}>
          <View style={[styles.profile, userPressed && styles.profilePressed]}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/uuuuu.png")} // Replace with the path to your user profile image
                style={[styles.profileIcon, userPressed && styles.profileIconPressed]}
              />
            </View>
            <CustomButton
              text="User"
              onPress={onUserSignInPressed}
              type="PRIMARY"
              style={styles.button}
            />
          </View>
          <View style={[styles.profile, adminPressed && styles.profilePressed]}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/user.jpg")} // Replace with the path to your admin profile image
                style={[styles.profileIcon, adminPressed && styles.profileIconPressed]}
              />
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
    width: '100%',
    height: '100%',
  },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: '100%',
    maxWidth: 200,
    maxHeight: 100,
    marginTop: -480,
  },
  logoText: {
    fontSize: 24,
    color: '#000', // Adjust color as needed
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: -310,
  },
  profile: {
    alignItems: 'center',
  },
  profilePressed: {
    opacity: 0.7,
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80, // Make it circular
    borderWidth: 6,
    borderColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent', // Set background color to transparent
    overflow: 'hidden', // Ensure image does not overflow
  },
  profileIcon: {
    width: '100%',
    height: '100%',
  },
  profileIconPressed: {
    opacity: 0.7,
  },
  button: {
    marginTop: 10,
    color: 'white',
  },
});

export default SignInScreen;
