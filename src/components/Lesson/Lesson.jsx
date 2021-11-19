/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef } from "react";
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
import { Avatar } from 'react-native-elements';
import Navbar from '../Navbar/Navbar'
import AddIcon from '../Icon/AddIcon'
import EditIcon from '../Icon/EditIcon'
import API from "../../service/API"
import useSWR from 'swr'
import Fetcher from "../../service/Fetcher"
import axios from "axios"
import LessonService from "../../service/LessonService"
import UserService from "../../service/UserService"
import { getMediaLibraryPermissionsAsync } from "expo-image-picker";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function Lesson(props) {
  let courseId = props.props.route.params.id
  const url = API.Course.getCourseById + courseId
  const fetcher = url => axios.get(url).then(res => res.data)
  const { data, error } = useSWR(url, fetcher)
  const [lessonList, setLessonList] = useState([])
  const [userRole, setUserRole] = useState("")


  const getLesson = async () => {
    try {
      let result = await Promise.all(data.lessons.map(async (lesson) => {
        let lessonResult = (await LessonService.getLessonById(lesson.id)).data
        let creatorId = lessonResult.creatorId
        let creator = (await UserService.getUserById(creatorId)).data
        lessonResult.creator = creator
        return lessonResult
      }))
      let myUserId = await UserService.getUser()
      let userRole = (data.users.filter((user) => user.id === myUserId.data.id))[0].role
      setLessonList(result)
      setUserRole(userRole)
      console.log(userRole)
    } catch (err) {
      console.log("no lesson")
    }
  }

  // if (data) {
  //   getLesson()
  // }
  useEffect(() => {
    if (data) {
      getLesson()
    }
  }, [data])
  const styles = StyleSheet.create({
    cardLayout: {
      width: "93%",
      alignSelf: "center",
    },
    card: {
      borderRadius: 10,
      marginTop: 20,
      height: 140,
      marginBottom: 2,
      backgroundColor: "#B4B4F5",
    },
    container: {
      height: "100%",
      backgroundColor: "snow",
      flex: 1
    },
    card_col: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "flex-start"
    },
    image: {
      flex: 2, height: 120
    },
    text: {
      flex: 6,
    }
  });
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Navbar back={true} header={data !== undefined ? data.title : ""} props={props.props}></Navbar>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        } >
        <View style={styles.cardLayout}>
          {lessonList ? lessonList.map((lesson, index) => (
            <TouchableOpacity style={styles.card} key={index} onPress={() => {
              props.props.navigation.navigate("AssignmentScreen", {lesson:lesson, userRole: userRole});
            }}>
              <Stack direction="row" style={{ flex: 1 }}>
                <Stack direction="column" style={{ flex: 1, marginTop: 10, marginLeft: 5, alignItems: "center" }}>
                  <Avatar
                    rounded
                    size={30}
                    // title="MD"
                    // overlayContainerStyle={{ backgroundColor: 'grey' }}
                    source={{
                      uri:
                        lesson.creator.picture,
                    }}
                  />
                </Stack>
                <Stack direction="column" style={styles.text}>
                  <Text style={{ flex: 1, marginTop: 13 }}>{`${lesson.creator.firstName} ${lesson.creator.lastName}`}</Text>
                  <Text style={{ flex: 1, fontWeight: 'bold' }} numberOfLines={4}>{lesson.title}</Text>
                  <Text style={{ flex: 3 }} numberOfLines={3}>{lesson.description}</Text>
                </Stack>
              </Stack>
            </TouchableOpacity>
          )) : null}
        </View>
      </ScrollView >
      {userRole === "LECTURER" &&
        <>
          <AddIcon props={props.props} goto={() => {
            props.props.navigation.navigate("CreateLessonScreen", courseId)
          }}></AddIcon>
          <EditIcon props={props} goto={() => {
            props.props.navigation.navigate("EditCourseScreen", data)
          }}></EditIcon>
        </>
      }
    </SafeAreaView>
  );
}

export default Lesson;
