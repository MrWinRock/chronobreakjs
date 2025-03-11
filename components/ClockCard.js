import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

const ClockCard = ({
  city,
  time = "N/A",
  onConfirmDelete,
  showDeleteButton,
}) => {
  return (
    <View style={styles.timeContainer}>
      <Text style={styles.cityName}>{city}</Text>
      {showDeleteButton ? (
        <View style={styles.deletingContainer}>
          <TouchableOpacity
            onPress={onConfirmDelete}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.timeDisplay}>{time}</Text>
      )}
    </View>
  );
};

export default ClockCard;