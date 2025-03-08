import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTimeByCity } from "../utils/TimeUtils";
import TimeSelector from "../components/TimeSelector";
import { Ionicons } from "@expo/vector-icons";
import AddClock from "./AddClock";
import styles from "../styles/styles";

export default function TimeZoneConverter({ navigation }) {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Bangkok");
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [convertedTimes, setConvertedTimes] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadCities = async () => {
      const storedCities = await AsyncStorage.getItem("addedCities");
      if (storedCities) {
        setCities(JSON.parse(storedCities));
      }
    };
    loadCities();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedCity) {
        const newConvertedTimes = {};
        cities.forEach((city) => {
          const time = getTimeByCity(city.city, city.country, selectedTime);
          newConvertedTimes[city.city] = time;
        });
        setConvertedTimes(newConvertedTimes);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedCity, selectedTime, cities]);

  const handleTimeChange = (hour, minute) => {
    const updatedTime = new Date(selectedTime);
    updatedTime.setHours(hour);
    updatedTime.setMinutes(minute);
    setSelectedTime(updatedTime);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Time Zone Converter</Text>
      </View>
      <View style={styles.timezoneMain}>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#fff" }}>
          Bangkok
        </Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons
            name="add-outline"
            style={styles.headerButtonText}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.timeSelectorContainer}>
        <TimeSelector onTimeChange={handleTimeChange} />
      </View>
      <View style={styles.timezoneContainer}>
        <ScrollView>
          {Object.entries(convertedTimes).map(([city, time]) => (
            <View key={city} style={styles.convertedTimeContainer}>
              <Text style={styles.convertedText}>{city}</Text>
              <Text style={styles.convertedTime}>{time}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <AddClock
          navigation={navigation}
          closeModal={() => setModalVisible(false)}
          route={{ params: { fromScreen: "TimeZoneConverter" } }}
        />
      </Modal>
    </View>
  );
}
