import React, { useState, useEffect, useRef } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import SelectTimer from "../components/SelectTimer";
import styles from "../styles/styles";
import { Audio } from "expo-av";

export default function Timer() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleTimeChange = (h, m, s) => {
    setHour(h);
    setMinute(m);
    setSecond(s);
    setRemainingTime(h * 3600 + m * 60 + s);
  };

  const startTimer = async () => {
    if (remainingTime > 0) {
      setIsRunning(true);
      setIsPaused(false);
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            playSound();
            Alert.alert("Time is up!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
    startTimer();
  };

  const deleteTimer = () => {
    pauseTimer();
    setRemainingTime(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/notification.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const formatTime = (time) => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Timer</Text>
      </View>
      <View style={styles.timerDisplayContainer}>
        {isRunning ? (
          <Text style={styles.timerDisplay}>{formatTime(remainingTime)}</Text>
        ) : (
          <SelectTimer onTimeChange={handleTimeChange} />
        )}
      </View>
      <View style={styles.timerButtonContainer}>
        {isRunning ? (
          <View style={styles.timerRunningButtonContainer}>
            <TouchableOpacity
              style={styles.timerButtonDelete}
              onPress={deleteTimer}
            >
              <Text style={styles.timerButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timerButton}
              onPress={isPaused ? resumeTimer : pauseTimer}
            >
              <Text style={styles.timerButtonText}>
                {isPaused ? "Resume" : "Pause"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.timerButton} onPress={startTimer}>
            <Text style={styles.timerButtonText}>Start</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
