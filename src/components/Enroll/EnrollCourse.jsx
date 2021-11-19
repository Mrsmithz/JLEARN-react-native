import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { TextInput, Text } from "react-native-paper";
import UserService from "../../service/UserService"
import useSWR, { useSWRConfig } from 'swr'
import API from "../../service/API"

function EnrollCourse(props) {
  let course = props.course;
  const { mutate } = useSWRConfig()
  const [password, setPassword] = React.useState("");
  const styles = StyleSheet.create({
    textinput: {
      marginTop: 7,
      height: 45,
      width: "93%",
      alignSelf: "center",
    },
    textEnroll: {
      fontWeight: "bold",
      alignSelf: "center",
    },
    courseName: {
      marginLeft: 25,
      marginTop: 10,
    },
    button: {
      borderRadius: 10,
      marginTop: 20,
      height: 40,
      marginBottom: 10,
      backgroundColor: "#8B4C70",
      width: "30%",
      alignSelf: "center",
    },
    text_button: {
      alignSelf: "center",
      marginTop: 10,
      fontWeight: "bold",
      color: "snow",
    },
    disabledButton: {
      borderRadius: 10,
      marginTop: 20,
      height: 40,
      marginBottom: 10,
      backgroundColor: "grey",
      width: "30%",
      alignSelf: "center",
    },
  });
  const enrollCourse = async() => {
    let Obj = {
      "courseId": course.id,
      "password": password
    }
    try{
      await UserService.userJoinCourse(Obj)
      mutate(API.User.getUser)
      mutate(API.Course.getAllCourse)
      props.close()
      props.navigation.navigate("LessonScreen", props.course)
    }catch(err){
      console.log(err)
    }
  };
  return (
    <View>
      <Text style={styles.textEnroll}>Enroll Your Course</Text>
      <Text style={styles.courseName}>{course.title}</Text>
      <TextInput
        label={
          course.password ? "Enroll Password" : "This Courses has no password"
        }
        style={styles.textinput}
        disabled={course.password ? false : true}
        value={password}
        secureTextEntry={true}
        onChangeText={(pass) => setPassword(pass)}
      />
      <TouchableOpacity
        style={
          !course.password || course.password === "" || password !== ""
            ? styles.button
            : styles.disabledButton
        }
        disabled={(!course.password || course.password === "" || password !== "" ) ? false : true}
        onPress={() => enrollCourse()}
      >
        <Text style={styles.text_button}>Enroll Course</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EnrollCourse;
