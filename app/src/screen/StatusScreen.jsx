import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput, // Add this import
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config"; // Adjust the path as necessary
import { FontAwesome } from '@expo/vector-icons';

const StatusScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedItem, setExpandedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "messages"));
        const messages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(messages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on search query
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItems = () => {
    return filteredData.map((item) => (
      <TouchableOpacity
        style={styles.itemContainer}
        key={item.id}
        onPress={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
      >
        <View style={styles.profileSummary}>
          <Image
            source={{ uri: item.profilePicture || 'https://via.placeholder.com/50' }}
            style={styles.profileImage}
          />
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDetail}>Student ID: {item.studentId}</Text>
          <Text style={styles.itemDetail}>Level: {item.level}</Text>
        </View>
        {expandedItem === item.id && (
          <View style={styles.profileDetails}>
            <Text style={styles.itemDetail}>Index No: {item.indexNo}</Text>
            <Text style={styles.itemDetail}>Email: {item.email}</Text>
            <Text style={styles.itemDetail}>
              Created At: {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
            </Text>
            <Text style={styles.itemDetail}>Course: {item.course}</Text>
            <Text style={styles.itemDetail}>Company Name: {item.companyName}</Text>
            <Text style={styles.itemDetail}>Company Address: {item.companyAddress}</Text>
          </View>
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Database</Text>
     

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FontAwesome name="search" size={20} color="#888" style={styles.searchIcon} />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {renderItems()}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },

  
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "black",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    height: 40,
    width: '80%', // Adjust width as needed
  
  },
  searchBar: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize:  16,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },

  itemContainer: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
    padding: 10,
  },
  profileSummary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1, // Use flex to manage space distribution
    marginRight: 5,
  },
  itemDetail: {
    fontSize: 14,
    color: "#555",
    marginVertical: 2,
    flex: 1, // Use flex to manage space distribution
    textAlign: "left",
  },
  profileDetails: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StatusScreen;
