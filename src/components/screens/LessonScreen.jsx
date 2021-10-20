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
import Lesson from '../Lesson/Lesson'

function LessonScreen(props) {
  return (
    <Lesson props={props}></Lesson>
  );
}

export default LessonScreen;
