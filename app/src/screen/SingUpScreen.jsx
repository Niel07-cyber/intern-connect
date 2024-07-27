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
  ScrollView,
  Linking,
  Alert
} from "react-native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { auth, db } from '../../../config';
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { CheckBox } from 'react-native-elements';


const SignupScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  const handleSignUp = async () => {
    if (!email || !password || !firstName || !lastName) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email,
        firstName,
        lastName,
        createdAt: new Date()
      });

      await sendEmailVerification(user);

      Toast.show({
        type: 'success',
        text1: 'Check your email to verify your account',
      });

      setLoading(false);
      navigation.navigate("LOGIN");
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.message);
      console.log('error',error.message)
    }
  };

  const handleOpenLink = () => {
    Linking.openURL("https://apps.knust.edu.gh/students");
  };

  return (
    <SafeAreaView style={styles.container}>
      
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          
          <View style={styles.innerContainer}>
            <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
              <Ionicons
                name={"arrow-back-outline"}
                color={colors.primary}
                size={25}
              />
            </TouchableOpacity>
            <Image
            source={require("../assets/signup-logo-1.webp")}
            style={styles.logo1}
          />
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.googleButtonContainer} onPress={handleOpenLink}>
                <Image
                  source={require("../assets/KNUST.jpeg")}
                  style={styles.googleImage}
                />
                <Text style={styles.googleText}>Student Portal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.googleButtonContainer} onPress={handleOpenLink}>
                <Image
                  source={require("../assets/ggg.jpeg")}
                  style={styles.googleImage1}
                />
                <Text style={styles.googleText}>Google</Text>
              </TouchableOpacity>
              </View>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <SimpleLineIcons name="user" size={25} color={'gray'} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholderTextColor={colors.secondary}
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <SimpleLineIcons name="user" size={25} color={'gray'} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                  placeholderTextColor={colors.secondary}
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <SimpleLineIcons name="envelope" size={25} color={'gray'} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor={colors.secondary}
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <SimpleLineIcons name={"lock"} size={25} color={'gray'} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your password"
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
              {/* <View style={styles.lineWrapper}>
        <View style={styles.line} />
        <Text style={styles.continueText}>or continue with</Text>
        <View style={styles.line} />
      </View> */}
             <View style={styles.checkboxContainer}>
  <CheckBox
    checked={isChecked}
    onPress={() => setIsChecked(!isChecked)}
    checkedColor={colors.primary}
    uncheckedColor={colors.gray}
    containerStyle={styles.checkbox}
  />
  <Text style={styles.checkboxText}>
    By tapping Sign up, you agree to our{' '}
    <Text style={styles.linkText} onPress={() => Linking.openURL('https://your-terms-url.com')}>
      Terms and Conditions
    </Text>
  </Text>
</View>

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
   
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set background color as needed
    
  },
  logo1: {
    width: 180,
    height: 80,
    alignSelf: 'center',
    marginVertical: 10,
    marginTop: -10,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between the buttons
    marginVertical: 20,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  checkbox: {
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxText: {
    flex: 1,
    color: 'gray',
    fontFamily: fonts.Regular,
  },
  linkText: {
    color: '#006699',
    textDecorationLine: 'underline',
  },
  
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: '#E3F2FD',
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
    borderColor: '#E3F2FD',
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 15,
    height: 55,
    backgroundColor: '#E3F2FD', // Very light blue background
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: 'gray',
    fontFamily: fonts.SemiBold,
    marginVertical: 10,
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
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: "center",
  },
  lineWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  continueText: {
    fontSize: 16,
    fontFamily: 'Arial', // Update fontFamily as needed
    marginHorizontal: 10,
    marginTop: 20,
  },
  googleButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#006699',
    borderRadius: 15,
    padding: 10,
    width: '48%', // Reduced width of the buttons
    justifyContent: 'center',
  },
  googleImage: {
    height: 32,
    width: 25,
    marginRight: 10, // Space between the icon and text
    alignSelf: 'flex-start', // Align the icon to the left
  },

  googleImage1: {
    height: 30,
    width: 30,
    marginRight: 10, // Space between the icon and text
    alignSelf: 'flex-start', // Align the icon to the left
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
  },
  signupText: {
    color: '#006699',
    fontFamily: fonts.Bold,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
