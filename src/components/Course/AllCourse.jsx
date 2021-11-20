/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef } from "react";
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
import { TextInput } from 'react-native-paper';
import Logo from "../../assets/j-learn.png";
import back from "../../assets/back2.png";
import Navbar from '../Navbar/Navbar'
import { Icon } from 'react-native-eva-icons';
import AddIcon from '../Icon/AddIcon'
import useSWR from 'swr'
import API from "../../service/API"
import { Fetcher } from "../../service/Fetcher";
import RBSheet from "react-native-raw-bottom-sheet";
import EnrollCourse from "../Enroll/EnrollCourse"
import UserService from "../../service/UserService"
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function AllCourse(props) {
  const url = API.Course.getAllCourse
  const { data, error } = useSWR(url, Fetcher)
  const [courseObj, setCourseObj] = React.useState({})
  const [courseList, setCourseList] = React.useState([])
  const [userRole, setUserRole] = React.useState("LEARNER")
  const getCourse = async () => {
    let myCourseList = await UserService.getUser()
    setUserRole(myCourseList.data.role)
    let myCourseListId = []
    if (myCourseList.data.courseList) {
      myCourseList.data.courseList.map((course) => {
        myCourseListId.push(course.id)
      })
    }
    try {
      let result = data.filter(course =>
        !myCourseListId.includes(course.id)
      )
      setCourseList(result)
    } catch (err) {
      console.log("no course")
    }
  }
  useEffect(() => {
    if (data) {
      console.log("all")
      getCourse()
    }
  }, [data])
  const styles = StyleSheet.create({
    cardLayout: {
      marginTop: 10,
      marginBottom: 20,
      width: "93%",
      alignSelf: "center",
    },
    card: {
      borderRadius: 10,
      marginTop: 11,
      height: 120,
      marginBottom: 2,
      backgroundColor: "#86E3CE",
    },
    container: {
      height: "100%",
      backgroundColor: "snow",
      flex: 1
    },
    card_col: {
      flexDirection: "column"
    },
    image: {
      flex: 2,
      height: 115,
      borderRadius: 10,
      margin: 2
    },
    text: {
      flex: 3,
      marginLeft: 4
    },
    textinput: {
      marginTop: 10,
      height: 45,
      width: "93%",
      alignSelf: 'center',
    },
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const refRBSheet = useRef();
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
              setCourseObj(course)
              refRBSheet.current.open()
            }}>
              <Stack direction="row" style={{ marginRight: 20 }}>
                <Image source={course.image ? { uri: API.File.getImage + course.image } : Logo} style={styles.image}  ></Image>
                <Stack direction="column" style={styles.text}>
                  <Text style={{ flex: 1, marginTop: 10, fontWeight: 'bold' }}>{course.title}</Text>
                  <Text style={{ flex: 3 }} numberOfLines={4}>{course.description}</Text>
                </Stack>
              </Stack>
            </TouchableOpacity>
          ))}
        </View>
        {/* <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} /> */}
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          animationType={'fade'}
          customStyles={{
            wrapper: {

            },
            draggableIcon: {
              backgroundColor: "red"
            },
            container: {
              borderRadius: 12,
              height: "50%"
            }
          }}
        >

          <EnrollCourse course={courseObj} navigation={props.navigation} close={() => refRBSheet.current.close()} />

        </RBSheet>
      </ScrollView >
      {userRole === "LECTURER" ?
        <AddIcon props={props} goto={() => {
          props.navigation.navigate("CreateCourseScreen")
        }} ></AddIcon> : null
      }
    </SafeAreaView>
  );
}

export default AllCourse;
