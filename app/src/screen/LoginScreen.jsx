import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Image,
  Alert,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";




const LoginScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  };

  const handleLogin = async () => {
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        const user = userCredential.user;
        // Navigate to the next screen
        navigation.navigate('INPUT');
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Login Error", errorMessage);
      });
  };

  const handleOpenLink = () => {
    Linking.openURL("https://apps.knust.edu.gh/students");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <ImageBackground source={require('../assets/newbkkkkk.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
            <Ionicons
              name={"arrow-back-outline"}
              color={colors.primary}
              size={25}
            />
          </TouchableOpacity>
          <Image
            source={require("../assets/loginphoto.jpg")}
            style={styles.logo1}
          />
          <Image
            source={require("../assets/userlogin.jpeg")}
            style={styles.logo}
          />
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <SimpleLineIcons name="envelope" size={25} color={'gray'} />
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={colors.secondary}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <SimpleLineIcons name={"lock"} size={25} color={'gray'} />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={colors.secondary}
                secureTextEntry={secureEntry}
              />
            <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
        <Ionicons
          name={secureEntry ? "eye" : "eye-off"} // Toggle icon based on secureEntry state
          size={20}
          color={'gray'}
        />
      </TouchableOpacity>
    

            </View>
            <View style={styles.optionsContainer}>
  <View style={styles.keepSignedInContainer}>
    <TouchableOpacity
      style={styles.radioButton}
      onPress={() => setKeepSignedIn(!keepSignedIn)}
    >
      {keepSignedIn && <View style={styles.radioButtonSelected} />}
    </TouchableOpacity>
    <Text style={styles.keepSignedInText}>Keep me signed in</Text>
  </View>
  <TouchableOpacity>
    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
  </TouchableOpacity>
</View>

            <TouchableOpacity 
              style={styles.loginButtonWrapper}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Text style={styles.loginText}>Login</Text>
              )}
            </TouchableOpacity>
            <View style={styles.continueContainer}>
              <View style={styles.line} />
              <Text style={styles.continueText}>or continue with</Text>
              <View style={styles.line} />
            </View>
            <TouchableOpacity style={styles.googleButtonContainer} onPress={handleOpenLink}>
              <Image
                source={require("../assets/KNUST.jpeg")}
                style={styles.googleImage}
              />
              <Text style={styles.googleText}>Student Portal</Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
              <Text style={styles.accountText}>Don’t have an account?</Text>
              <TouchableOpacity onPress={handleSignup}>
                <Text style={styles.signupText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </ImageBackground>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
   
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: "#E3F2FD",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 10,
    alignItems: 'flex-start', // Align text to the left
  },
  headingText: {
    fontSize: 24, // Reduced font size
    color: '#471710',
    fontFamily: fonts.Bold, // Made the text bold
    fontWeight: 'bold',
    textAlign: 'left',
  },
  logo: {
    width: 200,
    height: 210,
    alignSelf: 'center',
    marginVertical: 10,
    marginTop: -10,
  },

  logo1: {
    width: 150,
    height: 60,
    alignSelf: 'center',
    marginVertical: 10,
    marginTop: -10,
    marginBottom: 30,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1.5,
    borderColor: '#E3F2FD',
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
    height: 55,
    backgroundColor: '#E3F2FD', // Very light blue background
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  keepSignedInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#006699', // Use the color you want for selected state
  },
  keepSignedInText: {
    color: 'black',
    fontFamily: fonts.Regular,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: '#006699',
    fontFamily: fonts.SemiBold,
    fontWeight: 'bold',
  },
  
  loginButtonWrapper: {
    backgroundColor: '#006699',
    borderRadius: 100,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 55,
  },
  loginText: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: "center",
  },
  continueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  continueText: {
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: 'gray',
    marginHorizontal: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: '#006699',
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 7.5,
    gap: 10,
  },
  googleImage: {
    height: 30,
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
    color: 'gray',
    fontFamily: fonts.Regular,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#006699',
    fontFamily: fonts.Bold,
    fontWeight: 'bold',
  },
});
