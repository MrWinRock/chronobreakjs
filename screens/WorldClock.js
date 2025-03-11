import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllCitiesTime } from "../utils/TimeUtils";
import { defaultCity } from "../data/cities";
import ClockCard from "../components/ClockCard";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/styles";
import AddClock from "./AddClock";

export default function WorldClock() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [cityTimes, setCityTimes] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [cities, setCities] = useState(defaultCity);
  const [deletingCity, setDeletingCity] = useState(null);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);

  const loadCityTimes = useCallback(() => {
    const times = getAllCitiesTime(cities);
    setCityTimes(times);
  }, [cities]);

  useEffect(() => {
    const loadCities = async () => {
      const storedCities = await AsyncStorage.getItem("addedCities");
      if (storedCities) {
        setCities([...defaultCity, ...JSON.parse(storedCities)]);
      }
    };
    if (isFocused) {
      loadCities().then(loadCityTimes);
    }
  }, [isFocused, loadCityTimes]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadCityTimes();
    setRefreshing(false);
  }, [loadCityTimes]);

  const toggleDeleteButtons = () => {
    setShowDeleteButtons(!showDeleteButtons);
    setDeletingCity(null);
  };

  const handleDeleteCity = async (city) => {
    const newCities = cities.filter((c) => c.city !== city);
    await AsyncStorage.setItem("addedCities", JSON.stringify(newCities));
    setCities(newCities);
    setDeletingCity(null);
    setShowDeleteButtons(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.headerContainer}>
        <Text style={styles.header}>World Clock</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons
              name="add-outline"
              style={styles.headerButtonText}
            ></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={toggleDeleteButtons}
          >
            <Ionicons
              name="trash-bin-outline"
              style={styles.headerButtonText}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
      {Object.entries(cityTimes).map(([city, time]) => (
        <ClockCard
          key={city}
          city={city}
          time={time}
          deleting={deletingCity === city}
          onConfirmDelete={() => handleDeleteCity(city)}
          showDeleteButton={showDeleteButtons}
        />
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <AddClock
          navigation={navigation}
          closeModal={() => setModalVisible(false)}
          route={{ params: { fromScreen: "WorldClock" } }}
        />
      </Modal>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}