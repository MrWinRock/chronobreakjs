import React from "react";
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import WorldClock from "../screens/WorldClock";
import AddClock from "../screens/AddClock";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="WorldClock"
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
        name="WorldClock"
        component={WorldClock}
        options={{ title: "World Clock" }}
      />
      <Stack.Screen
        name="AddClock"
        component={AddClock}
        options={{ title: "Add Clock" }}
      />
    </Stack.Navigator>
  );
}
