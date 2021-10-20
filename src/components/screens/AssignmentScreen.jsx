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
 import Assignment from '../Assignment/Assignment'
 
 function AssignmentScreen(props) {
   return (
     <Assignment props={props}></Assignment>
   );
 }
 
 export default AssignmentScreen;
 