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
import { Chip, Text } from 'react-native-paper';
import Navbar from '../Navbar/Navbar'
import Accordion from '../Accordion/Accordion'
import AccordionText from "../Accordion/AccordionText"
import AccordionFiles from "../Accordion/AccordionFiles"
import { Icon } from 'react-native-eva-icons';
import * as DocumentPicker from 'expo-document-picker';
import EditIcon from "../Icon/EditIcon"
import DeleteIcon from "../Icon/DeleteIcon"
import AssignmentService from "../../service/AssignmentService"
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
import UserService from "../../service/UserService";
import useSWR, { useSWRConfig } from 'swr'
import API from "../../service/API"

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function SubmitAssignment(props) {
    let assignment = props.route.params
    const { mutate } = useSWRConfig()
    const [lastSubmitted, setLastSubmitted] = React.useState(null)
    const styles = StyleSheet.create({
        cardLayout: {
            width: "95%",
            alignSelf: "center",
        },
        card: {
            borderRadius: 10,
            marginTop: 20,
            height: 120,
            marginBottom: 2,
            backgroundColor: "#B4B4F5",
        },
        container: {
            height: "100%",
            backgroundColor: "#F3E1E1",
            flex: 1
        },
        button: {
            borderRadius: 10,
            marginTop: 20,
            height: 40,
            backgroundColor: "#031B88",
        },
        text_button: {
            alignSelf: 'center',
            marginTop: 13,
            fontWeight: 'bold',
            color: "snow",
            fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif",
        },
        upload: {
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 2,
            backgroundColor: "#D1D1D1",
            flexDirection: "column",
            flex: 1
        },
        chip: {
            height: 25,
            alignItems: "center",
            marginBottom: 10,
            marginLeft: 2,
        },
        text_upload: {
            fontSize: 18,
            marginTop: 2,
            textAlign: 'center',
            color: 'snow',
            flex: 1,
            fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif",
        },
    });
    const [refreshing, setRefreshing] = React.useState(false);
    let [files, setFiles] = React.useState([]);

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (result.type === "success") {
            setFiles([...files, result])
        } else if (result.type === "cancel") {
            console.log("cancel")
        }
    };
    const deleteFile = (index) => {
        let allFiles = files
        allFiles.splice(index, 1)
        setFiles([...allFiles])
    }
    const submitAssignment = async () => {
        try {
            let form = new FormData()
            files.map((file) => {
                let filename = file.name;
                let type = file.name.split('.').reverse()[0];
                form.append('codeFiles', { uri: file.uri, name: filename, size: file.size, type })
            })
            form.append('assignmentId', assignment.id)
            let result = await AssignmentService.validateAssignment(form)
            let scoreboard = await UserService.getScoreboard(assignment.id)
            // mutate(API.User.getScoreboard + assignment.id, [])
            mutate(API.User.getScoreboard + assignment.id, scoreboard.data)
            props.navigation.navigate("ResultScreen", result.data)
        } catch (err) {
            console.log(err)
        }
    }

    const checkLastSubmitted = async (id) => {
        let result = await UserService.getLastSubmitted(id)
        if (result.data) {
            setLastSubmitted(result.data)
        }
    }

    const lastSubmit = async (id) => {
        console.log(id)

        let result = await UserService.getLastSubmitted(id)
        props.navigation.navigate("ResultScreen", result.data)
    }

    useEffect(() => {
        checkLastSubmitted(assignment.id)
    }, [assignment.id])
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    return (
        <View style={styles.container}>
            <Navbar back={true} header={"Submit Assignment"} props={props}></Navbar>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.cardLayout}>
                    <AccordionText title={"Description"} icon={"clipboard"} color={"#B4B4F5"} text={assignment.description}></AccordionText>
                    <AccordionFiles title={"Files"} icon={"folder"} color={"#B4B4F5"} files={assignment.files}></AccordionFiles>
                    <TouchableOpacity style={styles.upload} onPress={() => {
                        pickDocument()
                    }}>

                        <Text style={{ alignSelf: 'center', marginTop: 12, fontSize: 18, fontWeight: 'bold', fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif", }}>Upload your code files here</Text>
                        <Icon name="cloud-upload" fill='black' style={{ height: 100 }} />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {files.length ? files.map((file, index) => {
                                return <Chip onPress={() => console.log('Pressed')} onClose={() => deleteFile(index)} style={styles.chip} textStyle={{ fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif", marginTop: 3 }} key={index}>{file.name}</Chip>
                            })
                                : <Text style={styles.text_upload}>No Uploaded Code Files</Text>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        submitAssignment()
                    }}>
                        <Text style={styles.text_button}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        borderRadius: 10,
                        width: "25%",
                        marginTop: 20,
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: "flex-end",
                        backgroundColor: lastSubmitted ? "#07689F" : 'grey',
                        flex: 1
                    }}
                        disabled={!lastSubmitted}
                        onPress={() => {
                            lastSubmit(assignment.id)
                        }}>
                        <Text style={[styles.text_button, { marginTop: 1, flex: 3, textAlign: 'center', marginLeft: 10 }]}>Result</Text>
                        <Iconm name="chevron-right" size={30} color="snow" />
                    </TouchableOpacity>
                </View>
            </ScrollView >
            {
                true ?
                    <>
                        < DeleteIcon props={props} type={'assignment'} id={assignment.id} lessonId={assignment.lessonId} title={assignment.title} goto={() => {
                            console.log("Delete")
                            // props.props.navigation.navigate("EditLessonScreen", data)
                        }
                        }></DeleteIcon >
                        <EditIcon props={props} goto={() => {
                            props.navigation.navigate("EditAssignmentScreen", assignment)
                        }}></EditIcon>
                    </>
                    : null
            }
        </View >
    );
}

export default SubmitAssignment;
