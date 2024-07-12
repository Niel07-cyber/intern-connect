import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Modal, Alert, KeyboardAvoidingView, Platform, ImageBackground } from "react-native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreenAdmin from "./HomeScreenAdmin";
import StatusScreen from "./StatusScreen";
import NewScreen from "./NewScreen";

const InputScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry, label, placeholder, value, setValue, secureTextEntry] = useState(true);

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

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleProceed = () => {
    //setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    Alert.alert("Details received", "Letter will be sent to your mail on approval.");
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
    setProfileModalVisible(false); //
    navigation.navigate('LOGINA');
  };

  

  return (
    <ImageBackground source={require('../assets/wallpapertemp.jpg')} style={styles.backgroundImage}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
          <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
          <FontAwesome5 name={"user-circle"} size={40} color={colors.primary} />
          <View style={[styles.onlineIndicator, { backgroundColor: 'green' }]} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Intern Letter</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.formContainer}>
            <View style={[styles.inputContainer, styles.multilineInput]}>
              <FontAwesome name={"address-book-o"} size={30} color={colors.primary} style={styles.icon}  />
        
              <TextInput
                style={styles.textInput}
                placeholder="Company Address"
                placeholderTextColor={colors.secondary}
                keyboardType="default"
                value={companyAddress}
                onChangeText={setCompanyAddress}
                multiline={true}
              />
            </View>
            <TouchableOpacity style={styles.proceedButtonWrapper} >
              <Text style={styles.proceedText}>Proceed</Text>
            </TouchableOpacity>
          </View>

       
        </ScrollView>
       
        <Modal
          animationType="slide"
          transparent={true}
          visible={profileModalVisible}
          onRequestClose={() => {
            setProfileModalVisible(false);
          }}
        >
       <View style={styles.profileModalView}>
      
       <TouchableOpacity style={styles.closeProfileModal} onPress={handleCloseProfileModal}>
              <AntDesign name={"closecircle"} color={colors.primary} size={30} />
            </TouchableOpacity>
     
      <ScrollView contentContainerStyle={styles.profileContent}>
        <FontAwesome5 name={"user-circle"} size={120} color={colors.primary} />
        <Text style={styles.adminText}>Admin</Text>
       
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Surname:</Text>
          <Text style={styles.profileValue}> Aquah</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Other names:</Text>
          <Text style={styles.profileValue}>Hayfron Kofi J.</Text>
        </View>
      
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Region:</Text>
          <Text style={styles.profileValue}>Ashanti</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Status:</Text>
          <Text style={styles.profileValue}>H.O.D</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Staff ID:</Text>
          <Text style={styles.profileValue}>5645648</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Email:</Text>
          <Text style={styles.profileValue}>ahayfronquah@sf.knust.edu.gh</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Phone Number:</Text>
          <Text style={styles.profileValue}>+233 505568677</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
   
    </View>
        </Modal>
       
      </KeyboardAvoidingView>
      </ImageBackground>
   
  );
};

const Tab = createBottomTabNavigator();

const InputScreenWithTabs = () => {
  return (
    <ImageBackground source={require('../assets/wallpapertemp.jpg')} style={styles.backgroundImage}>

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: 'black', // Black background for tabs
          borderRadius: 25, // Rounded corners for the entire tab bar
          paddingBottom: 2, // Adjust padding at the bottom
          marginBottom: 20, // Move the tab bar up
          marginHorizontal: 35, // Add padding to the left and right sides
        },
        tabBarActiveTintColor: '#fff', // Color of the active tab icon and label
        tabBarInactiveTintColor: '#fff', // Color of inactive tab icons and labels
        tabBarShowLabel: true, // Show labels
        tabBarLabelStyle: {
          fontSize: 12, // Adjust font size as needed
          marginBottom: 10, // Adjust margin to align with icons
        },
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
          tabBarLabel: 'Home', // Label for the tab
        }}
      />
      <Tab.Screen
        name="New Request"
        component={InputScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Generate Letter', // Label for the tab
        }}
      />
      <Tab.Screen
        name="Progress"
        component={StatusScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Intern Data', // Label for the tab
        }}
      />
    </Tab.Navigator>

  
    </ImageBackground>
  );
};

 
export default InputScreenWithTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'

  backgroundImage: `url('../assets/wallpapertemp.jpg')`,
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

  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'green',
    marginRight: 10,
    marginTop: -8,
  },
  backgroundImage1: {
    flex: 1,
    width: '100%',
    height: '100%',
   backgroundColor: 'rgba(255, 255, 255, 0.3)', // Optional: semi-transparent background for better visibility
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
    width: 106, // Adjust as needed
    height: 70, // Adjust as needed
    //backgroundColor: 'black', // Background color for icon container
    borderRadius: 22, // Half of the width and height to make it circular
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    
  },
  activeTab: {

    backgroundColor: '#FF6232', // Background color for the active tab
    borderColor: '#FF6232', // Border color for the active tab
    borderWidth: 1, // Border width for the active tab
  },
  icon: {
   fontSize: 24,
   //marginRight: 5,
  // marginLeft: 5,
  },
  
  
  iconN: {
    fontSize: 30,
    marginTop: -20,
    //marginRight: 5,
   // marginLeft: 5,
   }, 
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  
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
    fontFamily: fonts.SemiBold,
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
    fontFamily: fonts.regular,
    //fontWeight:'bold',
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
    fontFamily: fonts.SemiBold,
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
    fontFamily: fonts.SemiBold,
    marginBottom: 15,
  },
  modalContent: {
    width: "100%",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    fontFamily: fonts.Medium,
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
    fontFamily: fonts.SemiBold,
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
    fontFamily: fonts.regular,
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
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.white,
  },
  footerContainer: {
    // Styles for footer if needed
  },
});
