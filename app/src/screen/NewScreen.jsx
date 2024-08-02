import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from '../../../config'; // Adjust the path as necessary

const NewScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null; // Get current user's ID

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUserId) {
        console.error("No user is logged in");
        setLoading(false);
        return;
      }

      try {
        // Query to fetch only documents where `userId` field matches the current user ID
        const q = query(collection(db, "messages"), where("userId", "==", currentUserId));
        const querySnapshot = await getDocs(q);

        const messages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Log the fetched data for debugging
        console.log("Fetched messages:", messages);

        // Set the fetched data to state
        setData(messages);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserId]);

  const renderItems = () => {
    return data.map((item) => (
      <View style={styles.itemContainer} key={item.id}>
        <Text style={[styles.item, styles.name]}>{item.name}</Text>
        <Text style={[styles.item, styles.studentId]}>{item.studentId}</Text>
        <Text style={[styles.item, styles.level]}>{item.level}</Text>
        <Text style={[styles.item, styles.indexNo]}>{item.indexNo}</Text>
        <Text style={[styles.item, styles.email]}>{item.email}</Text>
        <Text style={[styles.item, styles.createdAt]}>{new Date(item.createdAt.seconds * 1000).toLocaleDateString()}</Text>
        <Text style={[styles.item, styles.course]}>{item.course}</Text>
        <Text style={[styles.item, styles.companyName]}>{item.companyName}</Text>
        <Text style={[styles.item, styles.companyAddress]}>{item.companyAddress}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Data</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      ) : (
        <ScrollView horizontal>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerText, styles.name]}>Name</Text>
              <Text style={[styles.headerText, styles.studentId]}>Student ID</Text>
              <Text style={[styles.headerText, styles.level]}>Level</Text>
              <Text style={[styles.headerText, styles.indexNo]}>Index No</Text>
              <Text style={[styles.headerText, styles.email]}>Email</Text>
              <Text style={[styles.headerText, styles.createdAt]}>Date of Request</Text>
              <Text style={[styles.headerText, styles.course]}>Course</Text>
              <Text style={[styles.headerText, styles.companyName]}>Company Name</Text>
              <Text style={[styles.headerText, styles.companyAddress]}>Company Address</Text>
            </View>
            {renderItems()}
          </ScrollView>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#F5F5F5', // Light gray background
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "black", // Blue color for the header
  },
  scrollContent: {
    paddingBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#E6F2FF", // Light blue background for header
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#007BFF", // Blue border bottom
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007BFF", // Blue color for header text
    paddingHorizontal: 5,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FFFFFF", // White background for items
    paddingVertical: 15,
    paddingHorizontal: 4,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6", // Light gray bottom border
  },
  item: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 5,
  },
  name: {
    width: 150,
  },
  studentId: {
    width: 150,
  },
  level: {
    width: 100,
  },
  indexNo: {
    width: 150,
  },
  email: {
    width: 250,
  },
  createdAt: {
    width: 150,
  },
  course: {
    width: 200,
  },
  companyName: {
    width: 250,
  },
  companyAddress: {
    width: 300,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewScreen;
