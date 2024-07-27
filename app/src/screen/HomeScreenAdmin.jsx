import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const colors = {
  white: '#FFFFFF',
  primary: '#0000FF',
  secondary: '#808080',
  orange: '#FFA500',
};

const fonts = {
  SemiBold: 'Arial-BoldMT',
  Medium: 'ArialMT',
};

const { height } = Dimensions.get('window');

const HomeScreenAdmin = () => {
  const navigation = useNavigation();
  const [subTitleWords, setSubTitleWords] = useState("");

  useEffect(() => {
    animateText(
      "Welcome to InternConnect, Send letters to Students fast and simple. Connect with your Students now!",
      setSubTitleWords
    );
  }, []);

  const animateText = (text, setTextWords) => {
    const words = text.split(" ");
    let index = 0;
    const interval = setInterval(() => {
      if (index <= words.length) {
        setTextWords(words.slice(0, index).join(" "));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <ImageBackground source={require("../assets/adminwallpae.webp")} style={styles.backgroundImage}>
          {/* Additional components can be added here */}
        </ImageBackground>
      </View>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Image source={require("../assets/icc.jpg")} style={styles.logo} />
          <Image source={require("../assets/a.png")} style={styles.titleImage} />
          <Text style={styles.subTitle}>{subTitleWords}</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreenAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    height: height / 2.4,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height / 2.2,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  titleImage: {
    width: 250,
    height: 50,
    resizeMode: 'contain',
    marginTop: 10,
  },
  subTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
    color: '#471710',
    fontFamily: fonts.Medium,
    marginVertical: 20,
  },
});
