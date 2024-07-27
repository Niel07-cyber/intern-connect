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
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/icc.jpg")} style={styles.logo} />
        <Text style={styles.title}>InternConnect</Text>
      </View>
      <Image source={require("../assets/blog-illustrations1.png.webp")} style={styles.bannerImage} />
      <Text style={styles.subTitle}>
        Welcome to InternConnect, Access to internship letters made fast, simple, and easy. Connect with HOD now!
      </Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00BFFF" style={styles.loadingIndicator} />
      ) : (
        <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
          <Text style={styles.getStartedButtonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    top: 50, // Adjust as needed to position the header at the top
  },
  logo: {
    width: 40, // Adjust size as needed
    height: 40,
    marginRight: 10,
  },
  bannerImage: {
    marginVertical: 20,
    height: 320,
    width: 400,
    marginTop: -200,
  },
  title: {
    fontSize: 30,
    fontFamily: fonts.SemiBold,
    textAlign: "center",
    color: '#471710',
  },
  subTitle: {
    fontSize: 22,
    paddingHorizontal: 20,
    textAlign: "center",
    color: '#471710',
    fontFamily: fonts.Medium,
    marginVertical: 20,
    marginBottom: -100,
  },
  getStartedButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: '#00BFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 30,
    left: 20,
    zIndex: 1,
    marginTop: -340,
  },
  getStartedButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: fonts.Medium,
    marginRight: 80,
    textAlign: 'left',
  },
  loadingIndicator: {
    marginTop: 100,
  },
});
