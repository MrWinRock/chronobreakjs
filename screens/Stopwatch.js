import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import styles from "../styles/styles";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  const startStop = () => {
    if (isRunning) {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    } else {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const recordLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(centiseconds).padStart(2, "0")}`;
  };

  return (
    <View style={styles.stopwatchContainer}>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(time)}</Text>
      </View>
      <View style={styles.buttonRow}>
        {isRunning ? (
          <TouchableOpacity
            style={[styles.stopwatchButton, styles.lapButton]}
            onPress={recordLap}
          >
            <Text style={styles.buttonLap}>Lap</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.stopwatchButton, styles.resetButton]}
            onPress={reset}
          >
            <Text style={styles.buttonLap}>Reset</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.stopwatchButton,
            isRunning ? styles.stopButton : styles.startButton,
          ]}
          onPress={startStop}
        >
          <Text style={styles.buttonStart}>{isRunning ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={laps}
        renderItem={({ item, index }) => (
          <View style={styles.flatListContainer}>
            <View style={styles.lapContainer}>
              <Text style={styles.lapText}>Lap {index + 1}</Text>
              <Text style={styles.lapText}>{formatTime(item)}</Text>
            </View>
            <View style={styles.separatorContainer}>
              <View style={styles.separator} />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
