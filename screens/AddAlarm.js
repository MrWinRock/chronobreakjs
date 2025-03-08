import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Switch,
} from "react-native";
import TimeSelector from "../components/TimeSelector";
import styles from "../styles/styles";

export default function AddAlarm({ closeModal, saveAlarm }) {
  const [time, setTime] = useState({ hour: 0, minute: 0 });
  const [alarmName, setAlarmName] = useState("");
  const [alarmSound, setAlarmSound] = useState(true);
  const [vibration, setVibration] = useState(true);

  const handleSave = () => {
    const formattedTime = `${time.hour
      .toString()
      .padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
    saveAlarm(formattedTime, alarmName, alarmSound, vibration);
    closeModal();
  };

  const handleTimeChange = (hour, minute) => {
    setTime({ hour, minute });
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
          justifyContent: "space-between",
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
              textAlign: "left",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "transparent" }}
          onPress={handleSave}
        >
          <Text
            style={{
              fontSize: 36,
              color: "#fff",
              fontWeight: 500,
              textAlign: "right",
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 25 }}>
        <TimeSelector onTimeChange={handleTimeChange} />
        <View style={{ marginBottom: 50 }} />
        <View style={styles.settingsContainer}>
          <TextInput
            style={styles.aminputTransparent}
            placeholder="Alarm name"
            placeholderTextColor="#B9B9B9"
            value={alarmName}
            onChangeText={setAlarmName}
          />
          <View style={styles.amseparator} />
          <View style={styles.settingContainer}>
            <Text style={[styles.settingText, { marginLeft: 10 }]}>
              Alarm sound
            </Text>
            <Switch
              value={alarmSound}
              onValueChange={setAlarmSound}
              thumbColor={alarmSound ? "#DCF5FC" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#0166EF" }}
            />
          </View>
          <View style={styles.amseparator} />
          <View style={styles.settingContainer}>
            <Text style={[styles.settingText, { marginLeft: 10 }]}>
              Vibration
            </Text>
            <Switch
              value={vibration}
              onValueChange={setVibration}
              thumbColor={vibration ? "#DCF5FC" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#0166EF" }}
            />
          </View>
          <View style={styles.amseparator} />
          <View style={{ marginBottom: 15 }} />
        </View>
      </View>
    </ScrollView>
  );
}
