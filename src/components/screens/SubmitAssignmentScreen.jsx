/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Button,
   TouchableOpacity
 } from 'react-native';
 import SubmitAssignment from '../Assignment/SubmitAssignment';
 import BottomAssignmentTab from '../Tab/BottomAssignmentTab';
 
 function SubmitAssignmentScreen(props) {
   return (
     <BottomAssignmentTab props={props}></BottomAssignmentTab>
   );
 }
 
 export default SubmitAssignmentScreen;
 