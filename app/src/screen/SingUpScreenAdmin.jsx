import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ImageBackground,
  Linking,
  ScrollView, // Import ScrollView
} from "react-native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";

import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";

const SignupScreenAdmin = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate("LOGINA");
  };

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: "success",
        text1: "Your account has been successfully created",
      });
    }, 3000);
  };

  const handleOpenLink = () => {
    Linking.openURL("https://apps.knust.edu.gh/Staff/Account/LogOn?ReturnUrl=%2FStaffs"); // Replace with your desired URL
  };

  return (
    <ImageBackground
      source={require("../assets/wallpapertemp.jpg")} // Replace with your actual background image source
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
            <Ionicons
              name={"arrow-back-outline"}
              color={colors.primary}
              size={25}
            />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.headingText}>Let's get</Text>
            <Text style={styles.headingText}>started</Text>
          </View>
          <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
              <FontAwesome6 name={"user"} size={30} color={colors.primary} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your First Name"
                  onChangeText={(FirstName) => setFirstName(FirstName)}
                  placeholderTextColor={colors.secondary}
                  autoCorrect={false}
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
              <FontAwesome6 name={"user"} size={30} color={colors.primary} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your Last Name"
                  onChangeText={(LastName) => setLastName(LastName)}
                  placeholderTextColor={colors.secondary}
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <SimpleLineIcons
                  name={"screen-smartphone"}
                  size={30}
                  color={colors.primary}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your Email"
                  onChangeText={(Email) => setEmail(Email)}
                  placeholderTextColor={colors.secondary}
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <SimpleLineIcons name={"lock"} size={30} color={colors.primary} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your password"
                  onChangeText={(Password) => setPassword(Password)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor={colors.secondary}
                  secureTextEntry={secureEntry}
                />
                <TouchableOpacity
                  onPress={() => {
                    setSecureEntry((prev) => !prev);
                  }}
                >
                  <SimpleLineIcons name={"eye"} size={20} color={colors.secondary} />
                </TouchableOpacity>
              </View>
            <TouchableOpacity
              style={styles.loginButtonWrapper}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Text style={styles.loginText}>Sign up</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.continueText}>or continue with</Text>
            <TouchableOpacity style={styles.googleButtonContainer} onPress={handleOpenLink}>
              <Image
                source={require("../assets/KNUST.jpeg")}
                style={styles.googleImage}
              />
              <Text style={styles.googleText}>Staff Portal</Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
              <Text style={styles.accountText}>Already have an account!</Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.signupText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Toast />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignupScreenAdmin;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 15,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
    height: 55,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  loginButtonWrapper: {
    backgroundColor: '#FF6232',
    borderRadius: 100,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 55,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: "center",
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.primary,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.primary,
    fontFamily: fonts.Regular,
  },
  signupText: {
    color: colors.primary,
    fontFamily: fonts.Bold,
    fontWeight: "bold",
  },
});
