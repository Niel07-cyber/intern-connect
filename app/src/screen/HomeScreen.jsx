import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const colors = {
  white: '#FFFFFF',
  primary: '#0000FF', // Example primary color
  secondary: '#808080', // Example secondary color
  orange: '#FFA500', // Example orange color for the button
  lightBlue: '#ADD8E6', // Light blue color for the notification border
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
    <View style={styles.container}>
      <View style={styles.overlay} />

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image
              source={require("../assets/otpic.jpeg")} // Replace with your profile image
              style={styles.profileImage}
            />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeText}>Welcome Back 👋</Text>
              <Text style={styles.nameText}>Othniel Aryee</Text>
            </View>
          </View>
          <View style={styles.notificationWrapper}>
            <TouchableOpacity style={styles.notificationButton}>
              <FontAwesome name="bell" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        
        <Image source={require("../assets/icc.jpg")} style={styles.logo} />
        <Text style={styles.title}>{titleWords}</Text>
        <Text style={styles.subTitle}>{subTitleWords}</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    backgroundColor: 'rgba(0, 0, 0, 0)', // Adjust opacity here
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50, // Adjust dimensions as needed
    height: 50, // Adjust dimensions as needed
    borderRadius: 25,
    marginRight: 10,
  },
  welcomeTextContainer: {
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontSize: 18, // Adjust font size
    fontFamily: fonts.Medium,
    color: 'black',
  },
  nameText: {
    fontSize: 23, // Adjust font size
    fontFamily: fonts.SemiBold,
    color: 'black',
  },
  notificationWrapper: {
    position: 'absolute',
    right: -25,
    top: 17,
  },
  notificationButton: {
    padding: 10,
    borderRadius: 100, // For round border
    borderWidth: 2,
    borderColor: colors.lightBlue,
    backgroundColor: colors.lightBlue,
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
