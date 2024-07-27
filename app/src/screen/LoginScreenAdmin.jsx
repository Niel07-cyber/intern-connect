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
  Alert,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, query, where, getDocs,
  collection, 
   } from "firebase/firestore";
import { auth, db } from "../../../config"; // Ensure this path is correct

const LoginScreenAdmin = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignup = () => {
    navigation.navigate("SIGNUPA");
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    console.log('email, password', email, password);

    try {
      // Check Firestore for admin credentials
      const adminQuery = query(
        collection(db, 'admin'),
        where('email', '==', email),
        where('password', '==', password)
      );
      
      const querySnapshot = await getDocs(adminQuery);

      if (!querySnapshot.empty) {
        setLoading(false);
        navigation.navigate('INPUTA'); // Navigate to admin screen
      } else {
        console.log('No matching admin credentials found!');
        Alert.alert("Login Error", "You are not authorized as an admin.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoading(false);
      Alert.alert("Login Error", error.message || "An unknown error occurred.");
    }
  };

  const handleLogin = () => {
    loginUser(email, password);
  };

  const handleOpenLink = () => {
    Linking.openURL("https://apps.knust.edu.gh/Staff/Account/LogOn?ReturnUrl=%2FStaffs"); // Replace with your desired URL
  };

  return (
  
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
                placeholder="email"
                onChangeText={(email) => setEmail(email)}
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
                onChangeText={(password) => setPassword(password)}
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
            onPress={() => loginUser(email, password)}
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
              <View style={styles.footerContainer}>
              <Text style={styles.accountText}>Don’t have an account?</Text>
              <TouchableOpacity onPress={handleSignup}>
                <Text style={styles.signupText}>Sign up</Text>
              </TouchableOpacity>
            </View>
         
        </View>
      </View>
  
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
    backgroundColor: 'white',
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
