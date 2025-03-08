import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import Stopwatch from "../screens/Stopwatch";
import Alarm from "../screens/Alarm";
import Timer from "../screens/Timer";
import WorldClockNavigator from "./WorldClockNavigator";
import AlarmNavigator from "./AlarmNavigator";
import styles from "../styles/styles";
import TimeZoneNavigator from "./TimeZoneNavigator";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "timer-outline";
          let iconStyle = {};

          if (route.name === "Stopwatch") {
            iconName = "timer-outline";
          } else if (route.name === "Alarm") {
            iconName = "alarm-outline";
          } else if (route.name === "World Clock") {
            iconName = "earth-outline";
            iconStyle = focused
              ? [styles.worldClockIcon, styles.worldClockIconFocused]
              : styles.worldClockIcon;
          } else if (route.name === "Timer") {
            iconName = "hourglass-outline";
          } else if (route.name === "TimeZone Converter") {
            iconName = "swap-horizontal-outline";
          }

          return (
            <View style={route.name === "World Clock" ? iconStyle : {}}>
              <Ionicons
                name={iconName}
                size={route.name === "World Clock" ? size * 2.2 : size * 1.2}
                color={color}
              />
            </View>
          );
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#a9a9a9",
        tabBarStyle: {
          height: 70,
          paddingTop: 7,
        },
        tabBarLabelStyle: {
          width: "100%",
          textAlign: "center",
          fontSize: 12,
          fontFamily: "Poppins_700Bold",
        },
        headerShown: false,
      })}
      initialRouteName="World Clock"
    >
      <Tab.Screen name="Stopwatch" component={Stopwatch} />
      <Tab.Screen name="Alarm" component={AlarmNavigator} />
      <Tab.Screen name="World Clock" component={WorldClockNavigator} />
      <Tab.Screen name="Timer" component={Timer} />
      <Tab.Screen name="TimeZone" component={TimeZoneNavigator} />
    </Tab.Navigator>
  );
}
