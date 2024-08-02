import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesome5, FontAwesome, MaterialCommunityIcons, } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config"; // Adjust the path as necessary
import axios from 'axios';

import HomeScreenAdmin from "./HomeScreenAdmin";
import StatusScreen from "./StatusScreen";

const PDFCO_API_KEY = 'aryeeothniel@gmail.com_wZ1Ww5fKO5MDC9zRFTEAqYqYIwNZJtBZJ8HrfkYop5EhtFWYv6BfOqOrNPcJI8by'; // Replace with your PDF.co API key

const InputScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
const [email, setEmail] = useState('');
const [pdfUrl, setPdfUrl] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "messages", "IkWesJof9uSaPw7dFD4euyAtv0L2"); // Replace "documentId" with the actual document ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const messageData = docSnap.data();
          setData(messageData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document from Firestore:", error);
      }
    };

    fetchData();
  }, []);
  const handleProceed = async () => {
    const imageUrl = 'https://th.bing.com/th/id/R.d6b7eeb68cc5706c6834c7a8e728e907?rik=x1zgW0k9qfD4yw&pid=ImgRaw&r=0'; // Replace with your actual image URL
    const letter = `
      <html>
      <head>
        <style>
          @page {
            margin: 0.5in;
          }
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .container {
            width: 100%;
            min-height: 100%;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            position: relative;
            display: flex;
            flex-direction: column;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header img {
            width: 100px; /* Set the desired width */
            height: auto; /* Maintain aspect ratio */
          }
          .address {
            margin-bottom: 20px;
            text-align: right;
          }
          .address p {
            margin: 0;
          }
          .recipient {
            margin-bottom: 20px;
          }
          .recipient p {
            margin: 0;
          }
          .content {
            flex: 1; /* Allows the content area to expand */
            margin-bottom: 20px;
          }
          .signature {
            margin-top: 40px;
            text-align: right;
          }
          .signature img {
            width: 100px; /* Set the desired width */
            height: auto; /* Maintain aspect ratio */
          }
          .footer {
            text-align: center;
            margin-top: 20px;
          }
          .footer {
            position: absolute;
            bottom: 20px;
            left: 0;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
           <img src="${imageUrl}" alt="Institution Logo" />
            <h2>Kwame Nkrumah University of Science and Technology</h2>
          </div>
          <div class="address">
            <p>Date: ${new Date().toLocaleDateString()}</p>
            <p>Address Line 1</p>
            <p>Address Line 2</p>
            <p>Kumasi, SG 573</p>
            <p>0203823354</p>
            <p>knustcos@yahoo.com</p>
          </div>
          <div class="recipient">
            <p>${data.companyName}</p>
            <p>Recipient's Position</p>
            <p>${data.companyName}</p>
            <p>${data.companyAddress}</p>
            <p>Company Address Line 2</p>
            <p>City, Postal Code</p>
          </div>
          <div class="content">
            <p>Dear Sir/Madam,</p>
            <p>This is to certify that ${data.name}, a student of ${data.course} with Student ID ${data.studentId} and Index No ${data.indexNo}, 
            is currently in ${data.level} level at our institution.</p>
            <p>A request has been made for an internship letter to be issued for ${data.companyName}, 
            located at ${data.companyAddress}.</p>
            <p>I hereby authorize ${data.name} to have an internship experience with your company to be able to build skills and get equipped.</p>
            <p>Sincerely,</p>
          </div>
          <div class="signature">
            <img src="https://th.bing.com/th/id/R.938942ebf592b4ffd367e29aa7412466?rik=ZSuqBkY0R24v5Q&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2f9iz%2fLEd%2f9izLEdR4T.jpg&ehk=C0ojxdfIONA2Tb%2fZ48eteAgg2Z37AYwpSj%2fNG7cCkqM%3d&risl=&pid=ImgRaw&r=0" alt="Signature" />
            <p>Hayfron Acquah</p>
            <p>Head of Department (HOD)</p>
            <p>Kwame Nkrumah University of Science and Technology</p>
          </div>
        </div>
      </body>
      </html>
    `;
  
    try {
      const response = await axios.post(
        'https://api.pdf.co/v1/pdf/convert/from/html', 
        { name: 'internship_letter.pdf', html: letter }, 
        { headers: { 'x-api-key': PDFCO_API_KEY, 'Content-Type': 'application/json' } }
      );
  
      const { url } = response.data;
      if (url) {
        setPdfUrl(url);
        Linking.openURL(url);
      } else {
        Alert.alert("Error", "Failed to generate PDF.");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      Alert.alert("Error", "Failed to generate PDF.");
    }
  };
  
  
  
  
 const previewLetter = async () => {
    const letter = `
      [Kwame Nkrumah University Of Science and Technology]
      
      Date: ${new Date().toLocaleDateString()}
      
      To whom it may concern,
      
      This is to certify that ${data.name}, a student of ${data.course} with Student ID ${data.studentId} and Index No ${data.indexNo}, 
      is currently in ${data.level} level at our institution.
      
      A requested for an internship letter to be issued for ${data.companyName}, 
      located at ${data.companyAddress}.
      
      Sincerely,
      Hayfron Acquah
      HOD
    `;

 
  };
  const sendEmailAsPdf = () => {
    if (!email) {
      Alert.alert("Error", "Please enter an email address.");
      return;
    }
  
    // Add email sending logic here
    Alert.alert("Success", "PDF sent to " + email);
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={"arrow-back-outline"} color={"#000"} size={25} />
      </TouchableOpacity>
      
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Intern Letter</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <View style={styles.buttonContainer}>
            {/* Existing Buttons */}
            <TouchableOpacity style={styles.largeButton1} onPress={showModal}>
              <View style={styles.buttonContent}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="file-signature" size={25} color="#33CC33" />
                </View>
              </View>
              <Text style={styles.buttonText}>Generate</Text>
            </TouchableOpacity>
            {/* Other buttons */}
          </View>
        </View>
      </ScrollView>
  
      {modalVisible && (
  <View style={styles.modalView}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Letter Preview</Text>
      <ScrollView style={styles.letterScrollView}>
        <Text style={styles.generatedLetterText}>
          {`
            [Kwame Nkrumah University Of Science and Technology]
            
            Date: ${new Date().toLocaleDateString()}
            
            To whom it may concern,
            
            This is to certify that ${data.name}, a student of ${data.course} with Student ID ${data.studentId} and Index No ${data.indexNo}, 
            is currently in ${data.level} level at our institution.
            
            A request has been made for an internship letter to be issued for ${data.companyName}, 
            located at ${data.companyAddress}.
            
            Sincerely,
            Hayfron Acquah
            HOD
          `}
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.confirmButton} onPress={handleProceed}>
        <Text style={styles.confirmButtonText}>Preview Letter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.confirmButton} onPress={() => sendEmailAsPdf()}>
        <Text style={styles.confirmButtonText}>Send Email as PDF</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.confirmButton} onPress={() => {/* Select Students Logic */}}>
        <Text style={styles.confirmButtonText}>Select Students</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.confirmButton} onPress={hideModal}>
        <Text style={styles.confirmButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
)}

    </KeyboardAvoidingView>
  );
  
};

const Tab = createBottomTabNavigator();

const InputScreenWithTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: 'transparent',
          paddingBottom: 5,
          marginBottom: 0,
          height: 80,
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent;
          
          if (route.name === 'Home') {
            iconName = 'home';
            IconComponent = FontAwesome;
          } else if (route.name === 'New Request') {
            iconName = "file-document";
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === 'Progress') {
            iconName = "database";
            IconComponent = MaterialCommunityIcons;
          }

          return (
            <View style={[styles.tabIcon, focused && styles.activeTab]}>
              <IconComponent name={iconName} size={35} color={color} />
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
        }}
      />
      <Tab.Screen
        name="New Request"
        component={InputScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Progress"
        component={StatusScreen}
        options={{
          headerShown: false,
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
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: "#ddd",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 15,
  },
  textContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  headingText: {
    fontSize: 30,
    color: '#471710',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    marginTop: 18,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    marginTop: 20,
  },
  largeButton1: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    width: 80,
    height: 80,
    backgroundColor: '#CCFFCC',
    borderColor: '#CCFFCC',
    alignItems: 'center',
  },
  largeButton2: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    width: 80,
    height: 80,
    backgroundColor: '#FFCCCC',
    borderColor: '#FFCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeButton3: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    width: 80,
    height: 80,
    backgroundColor: '#E6F7FF',
    borderColor: '#E6F7FF',
    alignItems: 'center',
  },
  largeButton4: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    width: 80,
    height: 80,
    backgroundColor: '#F3E5FF',
    borderColor: '#F3E5FF',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },
  iconContainer2: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },
  iconContainer3: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },
  iconContainer4: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },
  modalView: {
    flex: 800,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
    paddingHorizontal: 20, // Add horizontal padding to ensure modal is centered
  },
  modalContent: {
    width: "100%", // Full width of the screen
    maxHeight: "100%", // Ensure it doesn't exceed screen height
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center", // Center content vertically
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  letterScrollView: {
    marginBottom: 20,
    maxHeight: 300,
  },
  generatedLetterText: {
    fontSize: 16,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    width: '100%', // Ensure button takes full width inside modal
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
