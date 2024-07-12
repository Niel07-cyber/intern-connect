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
} from "react-native";
import React, { useState } from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../../../config";

const LoginScreenAdmin = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [Email, setEmail] = useState('') 
  const [Password, setPassword] = useState('')
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignup = () => {
    navigation.navigate("SIGNUPA");
  };

  const loginUser = async (Email, Password) => {
    setLoading(true); // Start loading
    try {
      await firebase.auth().signInWithEmailAndPassword(Email, Password);
      setLoading(false); // Stop loading upon success
      navigation.navigate('INPUTA');
    } catch (error) {
      setLoading(false); // Stop loading upon error
      alert(error.message);
    }}

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('INPUTA');
    }, 2000); // 2 seconds delay
  };

  
  const handleOpenLink = () => {
    Linking.openURL("https://apps.knust.edu.gh/Staff/Account/LogOn?ReturnUrl=%2FStaffs"); // Replace with your desired URL
  };
  return (
    <ImageBackground
      source={require("../assets/wallpapertemp.jpg")} // Replace with your actual background image
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
          <Ionicons
            name={"arrow-back-outline"}
            color={colors.primary}
            size={25}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Welcome,</Text>
          <Text style={styles.headingText}>Back</Text>
          <Text style={styles.headingText}>Admin</Text>
        </View>
        {/* form  */}
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
            <SimpleLineIcons name="envelope" size={30} color={colors.primary} />
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                onChangeText={(Email) => setEmail(Email)}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={colors.secondary}
                keyboardType="email-address"
              />
            </View>
          
            <View style={styles.inputContainer}>
              <SimpleLineIcons name={"lock"} size={30} color={colors.primary} />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
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
                <SimpleLineIcons name={"eye"} size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.loginButtonWrapper}
            onPress={() => loginUser(Email, Password)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.loginText}>Login</Text>
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
         
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreenAdmin;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
   // backgroundColor: 'rgba(255, 255, 255, 0.4)', // Optional: semi-transparent background for better visibility
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
    marginTop: 20,
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
  forgotPasswordText: {
    textAlign: "right",
    color: '#471710',
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
    color: '#471710',
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.primary,
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
    color: '#471710',
    fontFamily: fonts.Regular,
  },
  signupText: {
    color: '#471710',
    fontFamily: fonts.Bold,
    fontWeight: 'bold',
  },
});
