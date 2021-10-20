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
 import Result from '../Result/Result';
 
 function ResultScreen(props) {
   return (
     <Result props={props}></Result>
   );
 }
 
 export default ResultScreen;
 