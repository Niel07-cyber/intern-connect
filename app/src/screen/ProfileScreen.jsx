import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { colors } from '../utils/colors';

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Implement your logout logic here
    navigation.navigate('SIGNINNEW');
  };

  return (
    // <ImageBackground
    //   source={require('../assets/newbkkkkk3.jpg')} // Replace with your background image
    //   style={styles.backgroundImage}
    // >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.profileContent}>
          <Image
            source={require("../assets/otpic.jpeg")} // Replace with your profile image
            style={styles.profileImage}
          />
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>First Name:</Text>
            <Text style={styles.profileValue}>Othniel</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Last Name ID:</Text>
            <Text style={styles.profileValue}>Aryee</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Email:</Text>
            <Text style={styles.profileValue}>aryeeothniel@gmail.com</Text>
          </View>
          {/* <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Phone Number:</Text>
            <Text style={styles.profileValue}>0203823354</Text>
          </View> */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  profileImage: {
    width: 180, // Adjust dimensions as needed
    height: 180, // Adjust dimensions as needed
    borderRadius: 200,
    marginTop: 15,
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
    marginTop: 10,
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
    marginTop: 30,
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;
