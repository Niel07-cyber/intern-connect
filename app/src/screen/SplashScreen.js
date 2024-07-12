import React, { useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('GETSTARTED');
    }, 2000); // 2000 ms = 2 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground source={require('../assets/wallpapertemp.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image
          source={require('../assets/intern.jpg')}
          style={styles.logo}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
});

export default SplashScreen;
