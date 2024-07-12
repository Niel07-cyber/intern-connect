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
  SafeAreaView,
  ScrollView, // Import ScrollView
  Linking
} from "react-native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { firebase } from "../../../config";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')

  registerUser = async (email, password, firstName, lastName) => {
  await firebase.auth().createUserWithEmailAndPassword(Email, Password)
  .then(() => {
      firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url:'https://internconnect-c39a4.firebaseapp.com',
      })
      .then(() => {
        alert('Verification email sent')     
       }).catch((error) => {
        alert(error.message)
       })
       .then(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          FirstName,
          LastName,
          Email,
        })
       })
       .catch((error) => {
        alert(error.message)
       })
  })
.catch((error => {
  alert(error.message)
}))

  }
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Check your email to verify your account',
      });
    }, 2000);
  };

  const handleOpenLink = () => {
    Linking.openURL("https://apps.knust.edu.gh/students"); // Replace with your desired URL
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/wallpapermain.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.innerContainer}>
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
              <SimpleLineIcons name="user" size={30} color={colors.primary} />
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
              <SimpleLineIcons name="user" size={30} color={colors.primary} />
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
              <SimpleLineIcons name="envelope" size={30} color={colors.primary} />
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
                onPress={() =>registerUser(Email, Password, FirstName, LastName)}
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
                <Text style={styles.googleText}>Student Portal</Text>
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
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white, // Set background color as needed
  },
  innerContainer: {
    flex: 1,
    padding: 20, // Adjust padding as needed
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
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
    color: '#471710',
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 15,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
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
  forgotPasswordText: {
    textAlign: "right",
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    marginVertical: 10,
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
    fontWeight: 'bold',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
