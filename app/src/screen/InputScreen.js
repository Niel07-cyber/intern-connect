import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";

const InputScreen = () => {
  const navigation = useNavigation();
  const [secureEntery, setSecureEntery] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate("LOGIN");
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
        <Text style={styles.headingText}>Internship </Text>
        <Text style={styles.headingText}>Details</Text>
      </View>
      {/* form  */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <FontAwesome5 name={"portrait"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Name"
            placeholderTextColor={colors.secondary}
            keyboardType="text"
          />
        </View>

        {/* Other input fields */}
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
          />
        </View>
         
        <View style={styles.inputContainer}>
        <AntDesign
          name={"idcard"}
          size={30}
          color={colors.secondary}
        />
        <TextInput
          style={styles.textInput}
          placeholder=" Student ID"
          placeholderTextColor={colors.secondary}
          secureTextEntry={secureEntery}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name={"book-education-outline"}
          size={30}
          color={colors.secondary}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your Course"
          placeholderTextColor={colors.secondary}
          secureTextEntry={secureEntery}
          keyboardType="text"
        />
      </View>

      <View style={styles.inputContainer}>
        <Octicons
          name={"number"}
          size={30}
          color={colors.secondary}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your Index No"
          placeholderTextColor={colors.secondary}
          secureTextEntry={secureEntery}
          keyboardType="phone-pad"
        />
      </View>  

      <View style={styles.inputContainer}>
        <SimpleLineIcons
          name={"screen-smartphone"}
          size={30}
          color={colors.secondary}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your Level"
          placeholderTextColor={colors.secondary}
          secureTextEntry={secureEntery}
          keyboardType="phone-pad"
        />
      </View>  

      <View style={styles.inputContainer}>
        <FontAwesome5
          name={"warehouse"}
          size={30}
          color={colors.secondary}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Company Name"
          placeholderTextColor={colors.secondary}
          secureTextEntry={secureEntery}
          keyboardType="text"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome
          name={"address-book-o"}
          size={30}
          color={colors.secondary}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Company Address"
          placeholderTextColor={colors.secondary}
          secureTextEntry={secureEntery}
          keyboardType="text"
        />
      </View>

         

        <TouchableOpacity style={styles.loginButtonWrapper}>
          <Text style={styles.loginText}>Proceed</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        {/* Footer content */}
      </View>
    </View>
  );
};

// Define your bottom tab navigator
const Tab = createBottomTabNavigator();

const InputScreenWithTabs = () => {
  return (
 
      <Tab.Navigator >
        <Tab.Screen
          name="Home"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ), headerShown: false,
          }}
        />
        <Tab.Screen
          name="New Request"
          component={InputScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="wpforms" size={30} color={color} />
            ),  headerShown: false,
          }}
        />
        <Tab.Screen
          name="Status"
          component={InputScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="info-circle" size={30} color={color} />

            ),  headerShown: false,
          }}
        />
      </Tab.Navigator>
 
  );
};

export default InputScreenWithTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    fontSize: 27,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 1,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 7.5,
    height: 55,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 10,
    width: 200,
    marginLeft: 170,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: "center",
    padding: 10,
  },
  footerContainer: {
    // Styles for footer if needed
  },
});
