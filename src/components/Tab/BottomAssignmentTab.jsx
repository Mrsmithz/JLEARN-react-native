import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SubmitAssignment from "../Assignment/SubmitAssignment";
import LeaderBoard from "../Assignment/LeaderBoard";

const Tab = createMaterialBottomTabNavigator();
function BottomAssignmentTab(props) {
  return (
    <Tab.Navigator
      initialRouteName="SubmitAssignment"
      shifting={true}
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name="SubmitAssignment"
        component={SubmitAssignment}
        initialParams={props.props.route.params}
        options={{
          tabBarIcon: "clipboard-text",
          tabBarColor: "#FFB284",
        }}
      />
      <Tab.Screen
        name="LeaderBoard"
        component={LeaderBoard}
        initialParams={props.props.route.params}
        options={{
          tabBarIcon: "crown-outline",
          tabBarColor: "#0E49B5",
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomAssignmentTab;
