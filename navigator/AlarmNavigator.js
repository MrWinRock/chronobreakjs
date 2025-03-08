import React from "react";
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Alarm from "../screens/Alarm";
import AddAlarm from "../screens/AddAlarm";

const Stack = createStackNavigator();

export default function AlarmNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Alarm"
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
        name="Alarm"
        component={Alarm}
        options={{ title: "Alarm" }}
      />
      <Stack.Screen
        name="CreateAlarm"
        component={AddAlarm}
        options={{ title: "Create Alarm" }}
      />
    </Stack.Navigator>
  );
}
