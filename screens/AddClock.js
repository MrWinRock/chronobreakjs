import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Text, View, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';

export default function AddClock({ navigation, closeModal, route }) {
  const [addedCities, setAddedCities] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('city'); // 'city' หรือ 'country'
  const { fromScreen } = route.params;

  useEffect(() => {
    const loadAddedCities = async () => {
      const storedCities = await AsyncStorage.getItem("addedCities");
      if (storedCities) {
        setAddedCities(JSON.parse(storedCities));
      }
    };
    loadAddedCities();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://10.0.2.2/chronobreak-backend/api.php');
        const data = response.data;
        setAvailableCities(data.filter(
          (city) => !addedCities.some((addedCity) => addedCity.city === city.city)
        ));
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, [addedCities]);

  const addCity = async (city, country) => {
    const newCities = [...addedCities, { city, country }];
    await AsyncStorage.setItem("addedCities", JSON.stringify(newCities));
    closeModal();
    navigation.navigate(fromScreen, { city, country });
  };

  // กรองรายการเมืองตามคำค้นหาและประเภทการค้นหา
  const filteredCities = availableCities.filter(city => {
    if (!searchQuery) return true;
    
    if (searchType === 'city') {
      return city.city.toLowerCase().includes(searchQuery.toLowerCase());
    } else { // searchType === 'country'
      return city.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  return (
    <ScrollView
      style={[
        styles.amcontainer,
        {
          backgroundColor: "#4A628A",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          paddingTop: 30,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: "transparent" }}
          onPress={closeModal}
        >
          <Text
            style={{
              fontSize: 36,
              color: "#fff",
              fontWeight: 500,
              textAlign: "right",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>

      {/* SearchBar และ Toggle Button */}
      <View style={searchStyles.searchContainer}>
        <View style={searchStyles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#777" style={searchStyles.searchIcon} />
          <TextInput
            style={searchStyles.searchInput}
            placeholder={`Search by ${searchType === 'city' ? 'city' : 'country'}...`}
            placeholderTextColor="#777"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#777" />
            </TouchableOpacity>
          ) : null}
        </View>
        
        <View style={searchStyles.toggleContainer}>
          <TouchableOpacity
            style={[searchStyles.toggleButton, searchType === 'city' && searchStyles.activeToggle]}
            onPress={() => setSearchType('city')}
          >
            <Text style={[searchStyles.toggleText, searchType === 'city' && searchStyles.activeToggleText]}>
              City
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[searchStyles.toggleButton, searchType === 'country' && searchStyles.activeToggle]}
            onPress={() => setSearchType('country')}
          >
            <Text style={[searchStyles.toggleText, searchType === 'country' && searchStyles.activeToggleText]}>
              Country
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginBottom: 100 }}>
        {filteredCities.map((city, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cityItem}
            onPress={() => addCity(city.city, city.country)}
          >
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
                padding: 5,
                color: "#fff",
              }}
            >
              {city.city}, {city.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// สไตล์สำหรับ SearchBar และ Toggle Button
const searchStyles = {
  searchContainer: {
    padding: 16,
    marginBottom: 10,
  },
  searchInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a3c5c',
    borderRadius: 8,
    marginVertical: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  toggleText: {
    color: '#ddd',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeToggleText: {
    color: '#2a3c5c',
  }
};