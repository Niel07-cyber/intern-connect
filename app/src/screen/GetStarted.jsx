import { Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the arrow

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

const GetStarted = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    // Show loading indicator
    setIsLoading(true);

    // Simulate loading for 2 seconds
    setTimeout(() => {
      // Hide loading indicator
      setIsLoading(false);

      // Navigate to "SIGNINNEW" screen
      navigation.navigate("SIGNINNEW"); // Replace with your actual screen name
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  return (
    <ImageBackground 
      source={require("../assets/wallpapermain.jpg")} // Replace with your actual background image
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require("../assets/intern.jpg")} style={styles.bannerImage} />
        <Text style={styles.title}>Intern Connect</Text>
        <Text style={styles.subTitle}>
          Welcome to InternConnect, Access to internship letters made fast, simple, and easy. Connect with HOD now!
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#FF6232" style={styles.loadingIndicator} />
        ) : (
          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <Text style={styles.getStartedButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Ensure content is centered
    paddingHorizontal: 20, // Add some padding to prevent overflow
  },
  bannerImage: {
    marginVertical: 20,
    height: 200,
    width: 200,
  },
  title: {
    fontSize: 40,
    fontFamily: fonts.SemiBold,
    paddingHorizontal: 20,
    textAlign: "center",
    color: '#471710',
    marginTop: 10,
  },
  title1: {
    fontSize: 50,
    fontFamily: fonts.SemiBold,
    paddingHorizontal: 20,
    textAlign: "center",
    color: 'teal',
    marginTop: 27,
  },
  subTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
    color: '#471710',
    fontFamily: fonts.Medium,
    marginVertical: 20,
  },
  getStartedButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensure spacing between text and icon
    backgroundColor: '#FF6232', // Use your orange color here
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 30, // Adjusted bottom position to be above the tabs
    left: 20, // Adjusted left position
    zIndex: 1, // Ensure the button is above other elements
  },
  getStartedButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: fonts.Medium,
    marginRight: 80,
    // Take up remaining space
    textAlign: 'left', // Align text to the left
  },
  loadingIndicator: {
    marginTop: 10,
  },
});
