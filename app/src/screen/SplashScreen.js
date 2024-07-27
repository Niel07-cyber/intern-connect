import React, { useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('GETSTARTED');
    }, 3000); // 2000 ms = 2 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
   
      <View style={styles.container}>
        <Image
          source={require('../assets/b.png')}
          style={styles.logo}
        />
      </View>
   
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
   
  },
  
  logo: {
    width: 400,
    height: 400,
    resizeMode: 'cover',
  },
});

export default SplashScreen;
