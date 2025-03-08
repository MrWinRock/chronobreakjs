import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";

const AlarmCard = ({
  time,
  name,
  sound,
  vibration,
  deleting,
  onConfirmDelete,
  showDeleteButton,
  isEnabled,
  toggleSwitch,
}) => {
  return (
    <View style={[styles.card, deleting && styles.deletingCard]}>
      <View>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>
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
        <Switch
          trackColor={{ false: "#868B8F", true: "#0166EF" }}
          thumbColor={"#DCF5FC"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#C8E8FB",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deletingCard: {
    borderColor: "red",
    borderWidth: 2,
  },
  timeText: {
    fontSize: 30,
    color: "#000",
  },
  nameText: {
    fontSize: 16,
    color: "#666",
  },
  detailText: {
    fontSize: 14,
    color: "#999",
  },
  deleteButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  deletingContainer: {
    width: "40%",
    backgroundColor: "#db001f",
    borderTopEndRadius: 10,
    borderEndEndRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
});

export default AlarmCard;
