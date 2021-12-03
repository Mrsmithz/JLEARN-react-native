/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import { Icon } from 'react-native-eva-icons';
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import CourseService from "../../service/CourseService"
import LessonService from "../../service/LessonService"
import AssignmentService from "../../service/AssignmentService"
import useSWR, { useSWRConfig } from 'swr'
import API from "../../service/API"
import UserService from "../../service/UserService"

function DeleteIcon(props) {
    const [visible, setVisible] = React.useState(false);
    const { mutate } = useSWRConfig()
    const styles = StyleSheet.create({
        iconContainer: {
            bottom: 170,
            marginBottom: -50,
            marginLeft: "85%",
            marginTop: 20,
            width: 50,
            height: 50,
            justifyContent: 'center',
            borderRadius: 100,
            backgroundColor: '#DDDDDA',
        },
        backdrop: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        button: {
            borderRadius: 10,
            marginTop: 20,
            height: 40,
            marginBottom: 10,
            backgroundColor: "#031B88",
            marginLeft: 15,
            width: "40%"
        },
        text: {
            alignSelf: 'center',
            marginTop: 12,
            fontWeight: 'bold',
            color: "snow",
            fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"
        }
    });
    const deleteObject = async (type, id) => {
        try {
            if (type === 'course') {
                let result = await CourseService.deleteCourse(id)
                let myCourse = await UserService.getUser()
                setVisible(false)
                mutate(API.Course.getAllCourse)
                mutate(API.User.getUser, myCourse.data)
                props.props.props.navigation.navigate("CourseScreen")
            } else if (type === 'lesson') {
                let result = await LessonService.deleteLesson(id)
                setVisible(false)
                mutate(API.Course.getCourseById + props.courseId)
                props.props.props.navigation.navigate("LessonScreen", {id:props.courseId})
            } else if (type === 'assignment') {
                let result = await AssignmentService.deleteAssignment(id)
                let myLesson = await LessonService.getLessonById(props.lessonId)
                setVisible(false)
                mutate(API.Lesson.getLessonById + props.lessonId)
                props.props.props.navigation.navigate("AssignmentScreen", { lesson: myLesson.data})
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <View>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                style={{ width: "70%" }}
            >
                <Card disabled={true} style={{ width: "100%", borderRadius: 7 }}>
                    <Text style={{ justifyContent: 'center', textAlign: 'center', fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif" }}>Are You Sure To Delete {props.title}</Text>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <TouchableOpacity onPress={() => setVisible(false)} style={styles.button}>
                            <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteObject(props.type, props.id)} style={[styles.button, , { backgroundColor: 'red' }]}>
                            <Text style={styles.text}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </Card>
            </Modal>
            <TouchableOpacity style={styles.iconContainer} onPress={() => setVisible(true)}>
                <Icon name="trash-2-outline" fill='#3B5284' style={{ height: 30 }} />
            </TouchableOpacity>
        </View>
    );
}

export default DeleteIcon;
