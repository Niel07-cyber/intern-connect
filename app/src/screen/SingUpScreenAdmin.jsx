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

const SignupScreenAdmin = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    console.log("Navigating to LOGINA screen");
    navigation.navigate("LOGINA");
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

      await addDoc(collection(db, "admin"), { // Using 'admin' collection
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
      navigation.navigate("LOGINA");
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.message);
      console.log('error', error.message);
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
            <View style={styles.textContainer}>
              <Text style={styles.headingText}>Let's get</Text>
              <Text style={styles.headingText}>started Admin</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <SimpleLineIcons name="user" size={30} color={colors.primary} />
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
                <SimpleLineIcons name="user" size={30} color={colors.primary} />
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
                <SimpleLineIcons name="envelope" size={30} color={colors.primary} />
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
                <SimpleLineIcons name={"lock"} size={30} color={colors.primary} />
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
                  <SimpleLineIcons name={secureEntry ? "eye-off" : "eye"} size={20} color={colors.secondary} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.loginButtonWrapper}
                onPress={handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={colors.secondary} />
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
  
    </SafeAreaView>
  );
};

export default SignupScreenAdmin;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
   
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    padding: 20, // Adjust padding as needed
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
    backgroundColor: 'red',
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