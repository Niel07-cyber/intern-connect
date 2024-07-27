import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Modal, Alert, KeyboardAvoidingView, Platform, ImageBackground } from "react-native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from "./ProfileScreen"; // Import the new ProfileScreen
import HomeScreen from "./HomeScreen";
import StatusScreen from "./StatusScreen";
import NewScreen from "./NewScreen";
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'; // Import Firestore
import { auth, db } from '../../../config'; // Ensure correct path


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

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleProceed = () => {
    setModalVisible(true);
  };

  const handleConfirm = async () => { 
    try {
      // Get current user ID
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "No user is logged in.");
        return;
      }

      const userId = user.uid;

      // Create a document in Firestore
      const docRef = doc(collection(db, 'messages'), userId);
      await setDoc(docRef, {
        name,
        email,
        studentId,
        course,
        indexNo,
        level,
        companyName,
        companyAddress,
        createdAt: new Date()
      });

      setModalVisible(false);
      Alert.alert("Details received", "Letter will be sent to your mail on approval.");
      clearForm();
    } catch (error) {
      console.error('Error submitting details:', error);
      Alert.alert("Error", "There was an error submitting your details. Please try again.");
    }
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
    navigation.navigate('SIGNINNEW');
  };
  return (
    <ImageBackground source={require('../assets/newbkkkkkkk2.jpg')} style={styles.backgroundImage}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
          <Ionicons name={"arrow-back-outline"} color={'gray'} size={25} />
        </TouchableOpacity>
      
        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Internship Details</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <FontAwesome5 name={"portrait"} size={30} color={'gray'} style={styles.icon}  />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your Name"
                placeholderTextColor={colors.secondary}
                keyboardType="default"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name={"mail-outline"} size={30} color={'gray'}style={styles.icon}  />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                placeholderTextColor={colors.secondary}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.inputContainer}>
              <AntDesign name={"idcard"} size={30} color={'gray'} style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Student ID"
                placeholderTextColor={colors.secondary}
                keyboardType="phone-pad"
                value={studentId}
                onChangeText={setStudentId}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name={"book-education-outline"} size={30} color={'gray'}style={styles.icon}  />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your Course"
                placeholderTextColor={colors.secondary}
                keyboardType="default"
                value={course}
                onChangeText={setCourse}
              />
            </View>
            <View style={styles.inputContainer}>
              <Octicons name={"number"} size={30} color={'gray'} style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your Index No"
                placeholderTextColor={colors.secondary}
                keyboardType="phone-pad"
                value={indexNo}
                onChangeText={setIndexNo}
              />
            </View>
            <View style={styles.inputContainer}>
              <SimpleLineIcons name={"screen-smartphone"} size={30} color={'gray'} style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your Level"
                placeholderTextColor={colors.secondary}
                keyboardType="phone-pad"
                value={level}
                onChangeText={setLevel}
              />
            </View>
           
            <View style={[styles.inputContainer, styles.multilineInput1]}>
            <FontAwesome5 name={"warehouse"} size={20} color={'gray'} style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Company Name"
                placeholderTextColor='#696969'
                keyboardType="default"
                value={companyName}
                onChangeText={setCompanyName}
                placeholderStyle={styles.placeholder}
                multiline={true}
              />
            </View>
            <View style={[styles.inputContainer, styles.multilineInput]}>
              <FontAwesome name={"address-book-o"} size={20} color={'gray'} style={styles.icon}  />
        
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
            <TouchableOpacity style={styles.proceedButtonWrapper} onPress={handleProceed}>
              <Text style={styles.proceedText}>Proceed</Text>
            </TouchableOpacity>
          </View>

       
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirm Your Details</Text>
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalText}>Name: {name}</Text>
              <Text style={styles.modalText}>Email: {email}</Text>
              <Text style={styles.modalText}>Student ID: {studentId}</Text>
              <Text style={styles.modalText}>Course: {course}</Text>
              <Text style={styles.modalText}>Index No: {indexNo}</Text>
              <Text style={styles.modalText}>Level: {level}</Text>
              <Text style={styles.modalText}>Company Name: {companyName}</Text>
              <Text style={styles.modalText}>Company Address: {companyAddress}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.confirmButtonWrapper} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
              <AntDesign name={"closecircle"} color={'gray'} size={30} />
            </TouchableOpacity>
     
      <ScrollView contentContainerStyle={styles.profileContent}>
        <FontAwesome5 name={"user-circle"} size={120} color={'gray'} />
       
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Surname:</Text>
          <Text style={styles.profileValue}> Aryee</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Other names:</Text>
          <Text style={styles.profileValue}>Othniel Nii Dodou</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Gender:</Text>
          <Text style={styles.profileValue}>Male</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Region:</Text>
          <Text style={styles.profileValue}>Ashanti</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Current Year:</Text>
          <Text style={styles.profileValue}>300</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Student ID:</Text>
          <Text style={styles.profileValue}>20824926</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Email:</Text>
          <Text style={styles.profileValue}>aryeeothniel@gmail.com</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Phone Number:</Text>
          <Text style={styles.profileValue}>+233 203823354</Text>
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
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
              iconName = 'wpforms';
              IconComponent = FontAwesome;
            } else if (route.name === 'Progress') {
              iconName = 'clock-o';
              IconComponent = FontAwesome;
            } else if (route.name === 'Profile') {
              iconName = 'user';
              IconComponent = FontAwesome5;
            }

            return (
              <View style={[styles.tabIcon, focused && styles.activeTab]}>
                <IconComponent name={iconName} size={35} color={color} style={styles.iconN} />
                {route.name === 'New Request' || route.name === 'Progress' ? (
                  <View style={styles.uShape} />
                ) : null}
              </View>
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="New Request"
          component={InputScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Progress"
          component={NewScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
};

 
export default InputScreenWithTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
//backgroundColor: 'white',
  },

  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'green',
    marginRight: 10,
    marginTop: -8,
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
    color: 'gray',
  },
  profileValue: {
    fontSize: 16,
    color: colors.darkGray,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: 'gray',
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
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    marginBottom: 18,
    marginLeft: 30,
    marginRight:30,
    backgroundColor: '#fff', // Very light blue background
    
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
    backgroundColor: '#008ECC',
    borderRadius: 10,
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
    backgroundColor: 'gray',
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
    backgroundColor: '#008ECC',
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
