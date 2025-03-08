import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styles";
import { citiesData } from "../data/cities";

export default function AddClock({ navigation, closeModal, route }) {
  const [addedCities, setAddedCities] = useState([]);
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

  const availableCities = citiesData.filter(
    (city) => !addedCities.some((addedCity) => addedCity.city === city.city)
  );

  const addCity = async (city, country) => {
    const newCities = [...addedCities, { city, country }];
    await AsyncStorage.setItem("addedCities", JSON.stringify(newCities));
    closeModal();
    navigation.navigate(fromScreen, { city, country });
  };

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
      <View style={{ marginBottom: 100 }}>
        {availableCities.map((city, index) => (
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
