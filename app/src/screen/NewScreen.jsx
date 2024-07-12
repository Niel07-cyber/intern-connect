import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";

const NewScreen = () => {
  // Sample data for internship orders, student names, company names, dates, and progress
  const data = [
    {
      orderNo: "REQ 001",
      studentName: "John Doe",
      companyName: "Volta River Authority MIS DEPARTMENT HEAD OFFICE",
      date: "2024-07-03",
      progress: 0.5,
    },
    {
      orderNo: "REQ 002",
      studentName: "Otis Perry",
      companyName: "Byron Company Limited Cperate",
      date: "2024-05-28",
      progress: 0.8,
    },
    // Add more data entries as needed
  ];

  // Function to render each item
  const renderItems = () => {
    return data.map((item, index) => (
      <View style={styles.itemContainer} key={index}>
        <Text style={[styles.item, styles.orderNo]}>{item.orderNo}</Text>
        <Text style={[styles.item, styles.studentName]}>{item.studentName}</Text>
        <Text style={[styles.item, styles.companyName]}>{item.companyName}</Text>
        <Text style={[styles.item, styles.date]}>{item.date}</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${item.progress * 100}%` },
            ]}
          />
        </View>
      </View>
    ));
  };

  return (
    <ImageBackground
      source={require("../assets/wallpapertemp.jpg")} // Replace with your background image path
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>Internship Status</Text>

        {/* ScrollView for scrollable content */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Table header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, styles.orderNo]}>Request No</Text>
            <Text style={[styles.headerText, styles.studentName]}>Student Name</Text>
            <Text style={[styles.headerText, styles.companyName]}>Company Name</Text>
            <Text style={[styles.headerText, styles.date]}>Date of Request</Text>
            <Text style={[styles.headerText, styles.progress]}>Progress</Text>
          </View>

          {/* Render items */}
          {renderItems()}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    //backgroundColor: "rgba(255, 255, 255, 0.3)", // Optional: semi-transparent background for better visibility
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "#FEDEAF", // Header background color
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#471410", // Header text color
    borderRightWidth: 1, // Vertical line between columns
    borderRightColor: "#fff", // Color of the vertical line
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // Align items to the top
    marginBottom: 10,
    backgroundColor: "#FFE7C8", // Item background color
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    elevation: 3, // Android shadow depth
    shadowColor: "#000", // iOS shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderBottomWidth: 1, // Faint line between rows
    borderBottomColor: "#ddd", // Color of the faint line
  },
  
  item: {
    fontSize: 16,
    flex: 1,
    color: "#333",
    flexWrap: "wrap", // Allow text to wrap to the next line
    borderRightWidth: 1, // Vertical line between columns
    borderRightColor: "#ddd", // Color of the vertical line
  },
  orderNo: {
    flex: 1.2,
  },
  studentName: {
    flex: 2,
  },
  companyName: {
    flex: 2,
  },
  date: {
    flex: 1.3,
  },
  progress: {
    flex: 1,
  },
  progressBar: {
    backgroundColor: "#ddd",
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
    width: "10%", // Ensure full width
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFD700", // Default color (yellow) for pending
  },
});

export default NewScreen;