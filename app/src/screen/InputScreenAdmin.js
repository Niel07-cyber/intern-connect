import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesome, FontAwesome5, AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreenAdmin from "./HomeScreenAdmin";
import StatusScreen from "./StatusScreen";

const InputScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [course, setCourse] = useState("");
  const [indexNo, setIndexNo] = useState("");
  const [level, setLevel] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleProceed = () => {
    // Simulate letter generation logic
    const letter = `
      [Kwame Nkrumah University Of Science and Technology]
      
      Date: ${new Date().toLocaleDateString()}
      
      To whom it may concern,
      
      This is to certify that ${name}, a student of ${course} with Student ID ${studentId} and Index No ${indexNo}, 
      is currently in ${level} level at our institution.
      
      A requested for an internship letter to be issued for ${companyName}, 
      located at ${companyAddress}.
      
      Sincerely,
      Hayfron Acquah
      HOD
    `;
    
    setGeneratedLetter(letter);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    Alert.alert("Success!", "Letter Sent to mail.");
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setStudentId("");
    setCourse("");
    setIndexNo("");
    setLevel("");
    setCompanyName("");
    setCompanyAddress("");
  };

  const handleProfilePress = () => {
    setProfileModalVisible(true);
  };

  const handleCloseProfileModal = () => {
    setProfileModalVisible(false);
  };

  const handleLogout = () => {
    setProfileModalVisible(false);
    navigation.navigate('LOGINA');
  };

  return (
<ImageBackground source={require('../assets/newbkkkkk3.jpg')} style={styles.backgroundImage}>

      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
          <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} />
        </TouchableOpacity>
      
        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Intern Letter</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.formContainer}>
            
          <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.largeButton1} onPress={handleProceed}>
    <View style={styles.buttonContent}>
      <View style={styles.iconContainer}>
      <FontAwesome5 name="file-signature" size={25} color="#33CC33" />

      </View>
    </View>
    <Text style={styles.buttonText}>Generate</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.largeButton2} onPress={handleProceed}>
    <View style={styles.buttonContent}>
      <View style={styles.iconContainer2}>
      <FontAwesome5 name="pen" size={25} color="#FF6666" />

      </View>
    </View>
    <Text style={styles.buttonText}>Edit</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.largeButton3} onPress={handleProceed}>
    <View style={styles.buttonContent}>
      <View style={styles.iconContainer3}>
      <FontAwesome5 name="file-pdf" size={30} color="#1E90FF" />



      </View>
    </View>
    <Text style={styles.buttonText}>Review</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.largeButton4} onPress={handleProceed}>
    <View style={styles.buttonContent}>
      <View style={styles.iconContainer4}>
        <FontAwesome name="file-text" size={30} color="#B57EDC" />
      </View>
    </View>
    <Text style={styles.buttonText}>Preview</Text>
  </TouchableOpacity>
</View>


          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Generated Letter</Text>
              <ScrollView style={styles.letterScrollView}>
                <Text style={styles.generatedLetterText}>{generatedLetter}</Text>
              </ScrollView>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      
      </KeyboardAvoidingView>
 </ImageBackground>
  );
};

const Tab = createBottomTabNavigator();

const InputScreenWithTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#fff', // White background for the tabs
          borderTopColor: 'transparent', // Remove the top border
          //borderRadius: 25, // Rounded corners for the tab bar
          paddingBottom: 5, // Adjust padding at the bottom
          marginBottom: 0, // Move the tab bar up
          height: 80, // Increase the height to fit the U-shape
        },
        tabBarActiveTintColor: '#000', // Color of the active tab icon and label
        tabBarInactiveTintColor: 'gray', // Color of inactive tab icons and labels
        tabBarShowLabel: false, // Hide labels
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent;
          
          if (route.name === 'Home') {
            iconName = 'home';
            IconComponent = AntDesign;
          } else if (route.name === 'New Request') {
            iconName = "file-document" ;
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === 'Progress') {
            iconName = "database";
            IconComponent = MaterialCommunityIcons;
          }

          return (
            <View style={[styles.tabIcon, focused && styles.activeTab]}>
              <IconComponent name={iconName} size={35} color={color} style={styles.iconN} />
            </View>
          );
        },
      })}
      
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenAdmin}
        options={{
          headerShown: false,
          tabBarLabel: '', // Label for the tab
        }}
      />
      <Tab.Screen
        name="New Request"
        component={InputScreen}
        options={{
          headerShown: false,
          tabBarLabel: '', // Label for the tab
        }}
      />
      <Tab.Screen
        name="Progress"
        component={StatusScreen}
        options={{
          headerShown: false,
          tabBarLabel: '', // Label for the tab
        }}
      />
    </Tab.Navigator>

  

  );
};

 
export default InputScreenWithTabs; 


const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  largeButton1: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5, // Reduced padding
    width: 80, // Fixed width
    height: 80, // Fixed height
    backgroundColor: '#CCFFCC',
    borderColor: '#CCFFCC',
    alignItems: 'center', // Center content horizontally
  },
  largeButton2: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5, // Reduced padding
    width: 80, // Fixed width
    height: 80, // Fixed height
    backgroundColor: '#FFCCCC',
    borderColor: '#FFCCCC',
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
  },
  largeButton3: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5, // Reduced padding
    width: 80, // Fixed width
    height: 80, // Fixed height
    backgroundColor: '#E6F7FF',
    borderColor: '#E6F7FF',
    alignItems: 'center', // Center content horizontally
  },
  largeButton4: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5, // Reduced padding
    width: 80, // Fixed width
    height: 80, // Fixed height
    backgroundColor: '#F3E5FF',
    borderColor: '#F3E5FF',
    alignItems: 'center', // Center content horizontally
  },
  adminText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary, // Example color
    padding: 10,
    //backgroundColor: '#000', // Background color
    borderRadius: 5, // Rounded corners
    textAlign: 'center', // Centered text
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
 
  
  },
  iconContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCFFCC',
    borderRadius: 100, // Circle shape for the icon container
    backgroundColor: '#CCFFCC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconContainer2: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFCCCC',
    borderRadius: 100, // Circle shape for the icon container
    backgroundColor: '#FFCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconContainer3: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#E6F7FF',
    borderRadius: 100, // Circle shape for the icon container
    backgroundColor: '#E6F7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer4: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#F3E5FF',
    borderRadius: 100, // Circle shape for the icon container
    backgroundColor: '#F3E5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },


  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'green',
    marginRight: 10,
    marginTop: -8,
  },

buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    marginTop: 20,
  },
  smallButton: {
    backgroundColor: 'cyan', // Button background color
    height: 60, // Height of the button
    width: 60, // Width of the button
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Square corners
  },
  buttonText: {
    fontSize: 12, // Smaller font size
    textAlign: 'center',
    marginTop: -5,
    color: '#000', // Text color
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon1: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius:200,
    backgroundColor: 'white',
    
    
    
  },
  
  closeProfileModal: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  profileContent: {
    alignItems: 'center',

  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    paddingVertical: 10,
    marginTop:10,
   
  },
  profileLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  profileValue: {
    fontSize: 16,
    color: colors.darkGray,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'stretch', // Ensure the button stretches to fit its container
  },
  logoutText: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },


  multilineInput: {
    height: 140, // Adjust the height as needed for multiline input
    textAlignVertical: "top", // Ensure text starts from the top
  },

  multilineInput1: {
    height: 80, // Adjust the height as needed for multiline input
    textAlignVertical: "top", // Ensure text starts from the top
  },

 
  tabIcon: {
    width: 50, // Adjust as needed
    height: 50, // Adjust as needed
    //backgroundColor: 'black', // Background color for icon container
    borderRadius: 100, // Half of the width and height to make it circular
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    
  },
  activeTab: {

    backgroundColor: '#00BFFF', // Background color for the active tab
    borderColor: '#00BFFF', // Border color for the active tab
    borderWidth: 1, // Border width for the active tab
  },
  icon: {
   fontSize: 24,
   //marginRight: 5,
  // marginLeft: 5,
  },
  
  iconN: {
    fontSize: 30,
    marginTop: -5,
    marginBottom: -5,
    //marginRight: 5,
   // marginLeft: 5,
   }, 
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
 
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop:15,
    marginLeft: 15,
  },
  profileButton: {
    position: 'absolute',
    top: 40,
    right: 10,
    padding: 10,
    zIndex: 10, // Ensure it's above other components
  },
  textContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  headingText: {
    fontSize: 30,
    color: '#471710',
    // fontFamily: fonts.SemiBold,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    marginTop: 18,
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    marginBottom: 18,
    marginLeft: 25,
    marginRight:25,
    
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
    color: 'black',
    // fontFamily: fonts.regular,
    fontWeight:'bold',
  },
  proceedButtonWrapper: {
    backgroundColor: '#FF6232',
    borderRadius: 100,
    marginTop: 5,
    width: "50%",
    alignItems: "center",
    marginLeft: 180,
    marginBottom: 12,
  },
  proceedText: {
    color: colors.white,
    fontSize: 20,
    // fontFamily: fonts.SemiBold,
    textAlign: "center",
    padding: 10,
  },
  modalView: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "25%",
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    // fontFamily: fonts.SemiBold,
    marginBottom: 15,
  },
  modalContent: {
    width: "100%",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    // fontFamily: fonts.Medium,
    marginBottom: 10,
  },
  confirmButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: "70%",
  },
  confirmText: {
    color: "white",
    // fontFamily: fonts.SemiBold,
    fontSize: 18,
    textAlign: "center",
  },
  profileModalView: {
    position: 'absolute',
    top: 100,
    right: 10,
    left: 10,
    width: 395,
   // backgroundColor: 'white',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensure it's above other components
  },

  profileContent: {
    alignItems: "center",
  },
  profileText: {
    // fontFamily: fonts.regular,
    fontSize: 20,
    marginTop: 10,
  },
 
  logoutButton: {
    marginTop: 70,
    backgroundColor: '#FF6232',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom:66,
  },
  logoutText: {
    // fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.white,
  },
  footerContainer: {
    // Styles for footer if needed
  },
});
