import React from "react";
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import TimeZoneConverter from "../screens/TimeZoneConverter";
import AddClock from "../screens/AddClock";

const Stack = createStackNavigator();

export default function TimeZoneNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="TimeZoneConverter"
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
    >
      <Stack.Screen
        name="TimeZoneConverter"
        component={TimeZoneConverter}
        options={{ title: "Time Zone Converter" }}
      />
      <Stack.Screen
        name="AddClock"
        component={AddClock}
        options={{ title: "Add Clock" }}
      />
    </Stack.Navigator>
  );
}
