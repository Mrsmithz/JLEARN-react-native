import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../components/screens/LoginScreen";
import CourseScreen from "../components/screens/CourseScreen";
import LessonScreen from "../components/screens/LessonScreen";
import AssignmentScreen from "../components/screens/AssignmentScreen";
import SubmitAssignmentScreen from "../components/screens/SubmitAssignmentScreen";
import ResultScreen from "../components/screens/ResultScreen";
import CreateAssignmentScreen from "../components/screens/CreateAssignmentScreen";
import EditAssignmentScreen from "../components/screens/EditAssignmentScreen";
import CreateCourseScreen from "../components/screens/CreateCourseScreen";
import CreateLessonScreen from "../components/screens/CreateLessonScreen";
import { NavigationContainer } from "@react-navigation/native";
import EditCourseScreen from "../components/screens/EditCourseScreen";
import EditLessonScreen from "../components/screens/EditLessonScreen";
import SetAssignmentScoreScreen from "../components/screens/SetAssignmentScoreScreen";

const Stack = createNativeStackNavigator();

function Router(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CourseScreen"
          component={CourseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LessonScreen"
          component={LessonScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AssignmentScreen"
          component={AssignmentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SubmitAssignmentScreen"
          component={SubmitAssignmentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateAssignmentScreen"
          component={CreateAssignmentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateCourseScreen"
          component={CreateCourseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateLessonScreen"
          component={CreateLessonScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditAssignmentScreen"
          component={EditAssignmentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditCourseScreen"
          component={EditCourseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditLessonScreen"
          component={EditLessonScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SetAssignmentScoreScreen"
          component={SetAssignmentScoreScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
