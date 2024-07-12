import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";

const NewScreen = () => {
  // Sample data for internship orders
  const data = [
    {
      orderNo: "REQ 001",
      studentName: "John Doe",
      companyName: "Volta River Authority MIS DEPARTMENT HEAD OFFICE",
      dateOfLetter: "2024-07-03",
      region: "Greater Accra Region ",
      duration: "3 months",
    },
    {
      orderNo: "REQ 002",
      studentName: "Otis Perry",
      companyName: "Byron Company Limited Corporate",
      dateOfLetter: "2024-05-28",
      region: "Ashanti Region ",
      duration: "6 months",
    },

    {
      orderNo: "REQ 002",
      studentName: "Otis Perry",
      companyName: "Byron Company Limited Corporate",
      dateOfLetter: "2024-05-28",
      region: "Central",
      duration: "6 months",
    },

    {
      orderNo: "REQ 002",
      studentName: "Otis Perry",
      companyName: "Byron Company Limited Corporate",
      dateOfLetter: "2024-05-28",
      region: "Upper East",
      duration: "6 months",
    },
    {
      orderNo: "REQ 002",
      studentName: "Otis Perry",
      companyName: "Byron Company Limited Corporate",
      dateOfLetter: "2024-05-28",
      region: "Northern Region",
      duration: "6 months",
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
        <Text style={[styles.item, styles.dateOfLetter]}>{item.dateOfLetter}</Text>
        <Text style={[styles.item, styles.region]}>{item.region}</Text>
        <Text style={[styles.item, styles.duration]}>{item.duration}</Text>
      </View>
    ));
  };

  return (
    <ImageBackground
      source={require("../assets/wallpapertemp.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>Student Data</Text>

        {/* ScrollView for scrollable content */}
        <ScrollView horizontal>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Table header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.headerText, styles.orderNo]}>Request No</Text>
              <Text style={[styles.headerText, styles.studentName]}>Student Name</Text>
              <Text style={[styles.headerText, styles.companyName]}>Company Name</Text>
              <Text style={[styles.headerText, styles.dateOfLetter]}>Date of Letter</Text>
              <Text style={[styles.headerText, styles.region]}>Region</Text>
              <Text style={[styles.headerText, styles.duration]}>Duration</Text>
            </View>

            {/* Render items */}
            {renderItems()}
          </ScrollView>
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
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FEDEAF",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#471410",
    paddingHorizontal: 5,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FFE7C8",
    paddingVertical: 15,
    paddingHorizontal: 4,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  item: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 5,
  },
  orderNo: {
    width: 120,
  },
  studentName: {
    width: 170,
  },
  companyName: {
    width: 250,
  },
  dateOfLetter: {
    width: 150,
  },
  region: {
    width: 150,
  },
  duration: {
    width: 150,
  },
});

export default NewScreen;
