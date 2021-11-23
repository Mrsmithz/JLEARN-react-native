/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl
} from "react-native";
import { Button, Card, Layout, Text, Tab, TabBar } from "@ui-kitten/components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Box, NativeBaseProvider, Center, Stack, HStack } from 'native-base';
import Logo from "../../assets/j-learn.png";
import back from "../../assets/back2.png";
import { Icon } from 'react-native-eva-icons';
import Navbar from '../Navbar/Navbar'
import useSWR from 'swr'
import API from "../../service/API"
import { Fetcher } from "../../service/Fetcher";
import CourseService from "../../service/CourseService"

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  });
}

function MyCourse(props) {
  const url = API.User.getUser
  const { data, error } = useSWR(url, Fetcher)
  const [courseList, setCourseList] = React.useState([])
  const getCourse = async () => {
    try {
      let result = await Promise.all(data.courseList.map(async (course) => {
        let courseResult = (await CourseService.getCourseById(course.id)).data
        return courseResult
      }))
      setCourseList(result)
    } catch (err) {
      console.log("no course")
    }
  }

  useEffect(() => {
    if (data) {
      getCourse()
    }
  }, [data])
  const styles = StyleSheet.create({
    cardLayout: {
      marginTop: 20,
      width: "93%",
      alignSelf: "center",
      height: "50%"
    },
    card: {
      borderRadius: 10,
      marginTop: 11,
      marginBottom: 2,
      backgroundColor: "#86E3CE",
      shadowOffset: {
        width:7,
        height: 7,
      },
      shadowRadius: 10,
      shadowOpacity: 0.5,
      shadowColor: "#6D8299",
    },
    container: {
      height: "100%",
      backgroundColor: "#F3E1E1",
      flex: 1
    },
    card_col: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "flex-start"
    },
    image: {
      flex: 2, 
      height: 115,
      borderRadius:10,
      margin:2
    },
    text: {
      flex: 3,
      marginLeft: 4
    }
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Navbar back={false} header={"J:LEARN"} props={props}></Navbar>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        } >
        <View style={styles.cardLayout}>
        {courseList && courseList.map((course, index) => (
            <TouchableOpacity style={styles.card} key={index} onPress={() => {
              props.navigation.navigate("LessonScreen", course);
            }}>
              <Stack direction="row" style={{ marginRight: 20 }}>
                <Image source={course.image ? {uri:API.File.getImage+course.image} : Logo} style={styles.image}></Image>
                <Stack direction="column" style={styles.text}>
                  <Text style={{ flex: 1, marginTop: 10, fontWeight: 'bold' }}>{course.title}</Text>
                  <Text style={{ flex: 3, fontSize:12, paddingBottom:30 }} numberOfLines={4}>{course.description}</Text>
                </Stack>
              </Stack>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView >
    </SafeAreaView>
  );
}

export default MyCourse;
