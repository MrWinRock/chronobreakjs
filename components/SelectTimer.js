import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "../styles/styles";

const ITEM_HEIGHT = 60;
const BUFFER_COUNT_HOURS = 24 * 3;
const BUFFER_COUNT_MINUTES_SECONDS = 60 * 3;
const CENTER_OFFSET_HOURS = 24;
const CENTER_OFFSET_MINUTES_SECONDS = 60;

const SelectTimer = ({ onTimeChange }) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(10);
  const [second, setSecond] = useState(0);

  const hourScrollRef = useRef(null);
  const minuteScrollRef = useRef(null);
  const secondScrollRef = useRef(null);

  useEffect(() => {
    onTimeChange(hour, minute, second);
  }, [hour, minute, second]);

  useEffect(() => {
    hourScrollRef.current?.scrollTo({
      y: (CENTER_OFFSET_HOURS + hour) * ITEM_HEIGHT,
      animated: false,
    });
    minuteScrollRef.current?.scrollTo({
      y: (CENTER_OFFSET_MINUTES_SECONDS + minute) * ITEM_HEIGHT,
      animated: false,
    });
    secondScrollRef.current?.scrollTo({
      y: (CENTER_OFFSET_MINUTES_SECONDS + second) * ITEM_HEIGHT,
      animated: false,
    });
  }, []); // Ensures initial scroll position is set when component mounts

  const handleScroll = useCallback(
    (event, type) => {
      const { contentOffset } = event.nativeEvent;
      const index = Math.round(contentOffset.y / ITEM_HEIGHT);

      if (type === "hour") {
        const adjustedIndex = ((index % 24) + 24) % 24;
        if (adjustedIndex !== hour) setHour(adjustedIndex);

        if (
          index < CENTER_OFFSET_HOURS - 12 ||
          index > CENTER_OFFSET_HOURS + 12
        ) {
          hourScrollRef.current?.scrollTo({
            y: (CENTER_OFFSET_HOURS + adjustedIndex) * ITEM_HEIGHT,
            animated: false,
          });
        }
      } else if (type === "minute") {
        const adjustedIndex = ((index % 60) + 60) % 60;
        if (adjustedIndex !== minute) setMinute(adjustedIndex);

        if (
          index < CENTER_OFFSET_MINUTES_SECONDS - 30 ||
          index > CENTER_OFFSET_MINUTES_SECONDS + 30
        ) {
          minuteScrollRef.current?.scrollTo({
            y: (CENTER_OFFSET_MINUTES_SECONDS + adjustedIndex) * ITEM_HEIGHT,
            animated: false,
          });
        }
      } else {
        const adjustedIndex = ((index % 60) + 60) % 60;
        if (adjustedIndex !== second) setSecond(adjustedIndex);

        if (
          index < CENTER_OFFSET_MINUTES_SECONDS - 30 ||
          index > CENTER_OFFSET_MINUTES_SECONDS + 30
        ) {
          secondScrollRef.current?.scrollTo({
            y: (CENTER_OFFSET_MINUTES_SECONDS + adjustedIndex) * ITEM_HEIGHT,
            animated: false,
          });
        }
      }
    },
    [hour, minute, second]
  ); // Dependency array ensures no unnecessary state changes

  const generateLoopedArray = (max, bufferCount) => {
    return Array.from({ length: bufferCount }, (_, i) => i % max);
  };

  return (
    <View style={styles.timeSelectorContainer}>
      <View style={styles.hmsContainer}>
        <Text style={styles.hmsText}>Hours</Text>
        <Text style={styles.hmsText}>Minutes</Text>
        <Text style={styles.hmsText}>Seconds</Text>
      </View>
      <View style={styles.wheelContainer}>
        <ScrollView
          ref={hourScrollRef}
          style={styles.scrollView}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onScroll={(event) => handleScroll(event, "hour")}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollViewContent}
        >
          {generateLoopedArray(24, BUFFER_COUNT_HOURS).map((h, index) => (
            <View key={index} style={styles.scrollItem}>
              <Text
                style={
                  index % 24 === hour
                    ? styles.selectedItemText
                    : styles.itemText
                }
              >
                {h.toString().padStart(2, "0")}
              </Text>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.colon}>:</Text>
        <ScrollView
          ref={minuteScrollRef}
          style={styles.scrollView}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onScroll={(event) => handleScroll(event, "minute")}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollViewContent}
        >
          {generateLoopedArray(60, BUFFER_COUNT_MINUTES_SECONDS).map(
            (m, index) => (
              <View key={index} style={styles.scrollItem}>
                <Text
                  style={
                    index % 60 === minute
                      ? styles.selectedItemText
                      : styles.itemText
                  }
                >
                  {m.toString().padStart(2, "0")}
                </Text>
              </View>
            )
          )}
        </ScrollView>
        <Text style={styles.colon}>:</Text>
        <ScrollView
          ref={secondScrollRef}
          style={styles.scrollView}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onScroll={(event) => handleScroll(event, "second")}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollViewContent}
        >
          {generateLoopedArray(60, BUFFER_COUNT_MINUTES_SECONDS).map(
            (s, index) => (
              <View key={index} style={styles.scrollItem}>
                <Text
                  style={
                    index % 60 === second
                      ? styles.selectedItemText
                      : styles.itemText
                  }
                >
                  {s.toString().padStart(2, "0")}
                </Text>
              </View>
            )
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default SelectTimer;
