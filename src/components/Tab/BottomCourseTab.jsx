import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MyCourse from "../Course/MyCourse";
import AllCourse from "../Course/AllCourse";

const Tab = createMaterialBottomTabNavigator();
function BottomCourseTab(props) {
  return (
    <Tab.Navigator
      initialRouteName="MyCourse"
      shifting={true}
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name="MyCourse"
        component={MyCourse}
        options={{
          tabBarIcon: "account",
          tabBarColor: "#694fad",
        }}
      />
      <Tab.Screen
        name="Allcourse"
        component={AllCourse}
        options={{
          tabBarIcon: "google-classroom",
          tabBarColor: "#3B52B4",
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomCourseTab;
