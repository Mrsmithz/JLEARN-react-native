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
import { Link } from 'native-base';
import Navbar from '../Navbar/Navbar'
import Carousel from '../Carousel/AssignmentCarousel'
import { Icon } from 'react-native-eva-icons';
import EditIcon from '../Icon/EditIcon'
import DeleteIcon from "../Icon/DeleteIcon"
import useSWR from 'swr'
import API from "../../service/API"
import { Fetcher } from "../../service/Fetcher";
import AssignmentService from "../../service/AssignmentService"
import Lesson from "../Lesson/Lesson";
import FilesService from "../../service/FilesService";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function Assignment(props) {
    let id = props.props.route.params.lesson.id
    let courseid = props.props.route.params.lesson.courseId

    const url = API.Lesson.getLessonById + id
    const { data, error } = useSWR(url, Fetcher)
    const [assignmentList, setAssignmentList] = React.useState([])
    const [userRole, setUserRole] = React.useState(props.props.route.params.userRole)
    const [files, setFiles] = React.useState([])
    const getFiles = async() =>{
        let result = await Promise.all(data.files.map(async (file) => {
            let pdf = await FilesService.getPdfDetail(file.id)
            return {id:file.id, name:pdf.data.filename}
        }))
        setFiles(result)
    }
    const getLesson = async () => {
        try {
            let result = await Promise.all(data.assignmentList.map(async (assignment) => {
                let assignmentResult = (await AssignmentService.getAssignmentById(assignment.id)).data
                return assignmentResult
            }))
            setAssignmentList(result)
        } catch (err) {
            console.log("no assignment")
        }
    }

    // if (data) {
    //   getLesson()
    // }
    useEffect(() => {
        if (data) {
            getLesson()
            if(data.files) {
                getFiles()
            }else{
                setFiles([])
            }
        }
    }, [data])

    const styles = StyleSheet.create({
        cardLayout: {
            width: "90%",
            alignSelf: "center",
        },
        card: {
            borderRadius: 10,
            marginTop: 5,
            marginBottom: 2,
            backgroundColor: "#F9E2AE",
            flex: 1,
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
        image: {
            flex: 2, height: 120
        },
        assignmentLayout: {
            width: "100%",
            justifyContent: "flex-start",
            marginTop: 20
        }
    });
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    if (data) {
        return (
            <View style={styles.container}>
                <Navbar back={true} header={data.title} props={props.props}></Navbar>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    } >
                    <View style={styles.cardLayout}>
                        <Text style={{ marginTop: 20, marginLeft: 6, fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"  }}>Description</Text>
                        <Card style={styles.card}>
                            <Text style={{fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"}}>{data.description}</Text>
                        </Card>
                    </View>
                    <View style={styles.cardLayout}>
                        <Text style={{ marginTop: 20, marginLeft: 6, fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif" }}>Material</Text>
                        <Card style={styles.card}>
                            {files && files.map((file, index) => {
                                return (
                                    <Link
                                        _text={{
                                            color: "blue.400",
                                            fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"
                                        }}
                                        key={index}>
                                        {file.name}
                                    </Link>
                                )
                            })}

                        </Card>
                    </View>
                    <View style={styles.assignmentLayout}>
                        <View style={{ flexDirection: "row", flex: 1, marginLeft: 25 }}>
                            <View style={{ flexDirection: "column", flex: 1, marginTop: 7 }}>
                                <Text style={{marginTop:3, fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"}}>Assignment</Text>
                            </View>
                            {userRole !== "LEARNER" &&
                                <TouchableOpacity
                                    style={{ flexDirection: "column", flex: 3 }}
                                    onPress={() => props.props.navigation.navigate("CreateAssignmentScreen", { lessonId: data.id, courseId: data.courseId })}>
                                    <Icon name="plus-circle" fill='#478BA2' style={{ height: 35, marginRight: "87%" }} />
                                </TouchableOpacity>
                            }
                        </View>
                        <Carousel props={props.props} assignment={assignmentList}></Carousel>
                    </View>
                    {/* <View style={styles.assignmentLayout}>
                        <View style={{ flexDirection: "row", flex: 1, marginLeft: 25 }}>
                            <View style={{ flexDirection: "column", flex: 1, marginTop: 7 }}>
                                <Text>Quiz</Text>
                            </View>
                            {userRole !== "LEARNER" &&
                                <TouchableOpacity
                                    style={{ flexDirection: "column", flex: 7 }}
                                    onPress={() => props.props.navigation.navigate("CreateAssignmentScreen", { lessonId: data.id, courseId: data.courseId })}>
                                    <Icon name="plus-circle" fill='#478BA2' style={{ height: 35, marginRight: "87%" }} />
                                </TouchableOpacity>
                            }
                        </View>
                        <Carousel props={props.props} assignment={assignmentList}></Carousel>
                    </View> */}
                </ScrollView >
                {userRole !== "LEARNER" &&
                    <>
                        <DeleteIcon props={props} type={'lesson'} id={id} courseId={courseid} title={data.title} goto={() => {
                            console.log("Delete")
                            // props.props.navigation.navigate("EditLessonScreen", data)
                        }}></DeleteIcon>
                        <EditIcon props={props} goto={() => {
                            props.props.navigation.navigate("EditLessonScreen", data)
                        }}></EditIcon>
                    </>
                }
            </View>
        );
    } else {
        return <View></View>
    }

}

export default Assignment;
