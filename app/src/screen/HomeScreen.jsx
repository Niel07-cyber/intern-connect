import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const colors = {
  white: '#FFFFFF',
  primary: '#0000FF', // Example primary color
  secondary: '#808080', // Example secondary color
  orange: '#FFA500', // Example orange color for the button
};

const fonts = {
  SemiBold: 'Arial-BoldMT', // Example font family
  Medium: 'ArialMT', // Example font family
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [titleWords, setTitleWords] = useState([]);
  const [subTitleWords, setSubTitleWords] = useState([]);

  useEffect(() => {
    animateText("Intern Connect", setTitleWords);
    animateText("Welcome to InternConnect, Access to internship letters made fast, simple, and easy. Connect with HOD now!", setSubTitleWords);
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
    }, 100); // Adjust the interval duration as needed
  };

  return (
    <ImageBackground source={require("../assets/wallpapertemp.jpg")} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>{titleWords}</Text>
        <Text style={styles.subTitle}>{subTitleWords}</Text>
        <View style={styles.logosContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logoImage} />
          <Image source={require("../assets/logo.png")} style={styles.logoImage} />
          <Image source={require("../assets/logo.png")} style={styles.logoImage} />
          <Image source={require("../assets/logo.png")} style={styles.logoImage} />
          <Image source={require("../assets/logo.png")} style={styles.logoImage} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 200, // Adjust dimensions as needed
    height: 100, // Adjust dimensions as needed
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontFamily: fonts.SemiBold,
    paddingHorizontal: 20,
    textAlign: "center",
    color: '#471710',
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
  logosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  logoImage: {
    width: 50, // Adjust dimensions as needed
    height: 50, // Adjust dimensions as needed
    resizeMode: 'contain',
  },
});
