import React, { useState, useEffect, useRef, useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "../styles/styles";

const ITEM_HEIGHT = 60;
const BUFFER_MULTIPLIER = 5;
const TOTAL_HOURS = 24 * BUFFER_MULTIPLIER;
const TOTAL_MINUTES = 60 * BUFFER_MULTIPLIER;
const CENTER_OFFSET_HOURS = Math.floor(TOTAL_HOURS / 2);
const CENTER_OFFSET_MINUTES = Math.floor(TOTAL_MINUTES / 2);

const TimeSelector = ({ initialHour = 0, initialMinute = 0, onTimeChange }) => {
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);

  const hourScrollRef = useRef(null);
  const minuteScrollRef = useRef(null);

  useEffect(() => {
    onTimeChange(hour, minute);
  }, [hour, minute]);

  useEffect(() => {
    hourScrollRef.current?.scrollTo({
      y: (CENTER_OFFSET_HOURS + initialHour) * ITEM_HEIGHT,
      animated: false,
    });
    minuteScrollRef.current?.scrollTo({
      y: (CENTER_OFFSET_MINUTES + initialMinute) * ITEM_HEIGHT,
      animated: false,
    });
  }, [initialHour, initialMinute]);

  const handleScrollEnd = (event, type) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.round(contentOffset.y / ITEM_HEIGHT);

    if (type === "hour") {
      const adjustedHour = index % 24;
      setHour(adjustedHour);

      if (index < 12 || index > TOTAL_HOURS - 12) {
        hourScrollRef.current?.scrollTo({
          y: CENTER_OFFSET_HOURS * ITEM_HEIGHT,
          animated: false,
        });
      }
    } else {
      const adjustedMinute = index % 60;
      setMinute(adjustedMinute);

      if (index < 30 || index > TOTAL_MINUTES - 30) {
        minuteScrollRef.current?.scrollTo({
          y: CENTER_OFFSET_MINUTES * ITEM_HEIGHT,
          animated: false,
        });
      }
    }
  };

  const generateLoopedArray = useMemo(
    () => ({
      hours: Array.from({ length: TOTAL_HOURS }, (_, i) => i % 24),
      minutes: Array.from({ length: TOTAL_MINUTES }, (_, i) => i % 60),
    }),
    []
  );

  return (
    <View style={styles.timeSelectorContainer}>
      <View style={styles.wheelContainer}>
        <ScrollView
          ref={hourScrollRef}
          style={styles.scrollView}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={(event) => handleScrollEnd(event, "hour")}
          contentContainerStyle={styles.scrollViewContent}
        >
          {generateLoopedArray.hours.map((h, index) => (
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
        <View style={styles.colonContainer}>
          <Text style={styles.colon}>:</Text>
        </View>
        <ScrollView
          ref={minuteScrollRef}
          style={styles.scrollView}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={(event) => handleScrollEnd(event, "minute")}
          contentContainerStyle={styles.scrollViewContent}
        >
          {generateLoopedArray.minutes.map((m, index) => (
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
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default TimeSelector;
