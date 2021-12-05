/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
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
    RefreshControl,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { TextInput, RadioButton } from 'react-native-paper';
import { Button, Card, Layout, Text, Tab, TabBar } from "@ui-kitten/components";
import { Box, NativeBaseProvider, Center, Stack, HStack, Radio, Checkbox } from 'native-base';
import Logo from "../../assets/j-learn.png";
import Navbar from '../Navbar/Navbar'
import { Icon } from 'react-native-eva-icons';
import * as DocumentPicker from 'expo-document-picker';
import { Chip } from 'react-native-paper';
import ReactNativeChipInput from '../ChipInput/ChipInput';
import Accordion from "../Accordion/Accordion"
import AccordionTable from "../Accordion/AcoordionTable"
import AssignmentService from "../../service/AssignmentService"
import useSWR, { useSWRConfig } from 'swr'
import API from "../../service/API"


function CreateAssignment(props) {
    props = props.props
    const { mutate } = useSWRConfig()
    const lessonId = props.route.params.lessonId
    const courseId = props.route.params.courseId
    let [files, setFiles] = React.useState([]);
    let [codeFiles, setCodeFiles] = React.useState([]);
    let [tags, setTags] = React.useState([]);
    let [title, setTitle] = React.useState("");
    let [description, setDescription] = React.useState("");
    const styles = StyleSheet.create({
        Layout: {
            marginTop: 10,
            width: "93%",
            alignSelf: "center",
        },
        container: {
            height: "100%",
            backgroundColor: "#F3E1E1",
            flex: 1
        },
        textinput: {
            marginTop: 10,
            height: 45
        },
        checkbox: {
            marginTop: 11,
        },
        text: {
            marginTop: 9,
            fontSize: 18,
            marginRight: 10,
            marginLeft: 5
        },
        text_button: {
            alignSelf: 'center',
            marginTop: 13,
            fontWeight: 'bold',
            color: "snow",
            fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"
        },
        button: {
            borderRadius: 10,
            marginTop: 20,
            height: 40,
            marginBottom: 10,
            backgroundColor: "#031B88",
        },
        uploadFilebutton: {
            borderRadius: 10,
            height: 40,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: "#2D82B5",
            alignSelf: "center",
            width: "95%"
        },
        logo: {
            width: 370,
            height: 180,
            marginBottom: 10,
            alignSelf: "center"
        },
        chip: {
            height: 30,
            alignItems: "center",
            marginBottom: 3,
        },
        text_upload: {
            fontSize: 18,
            marginLeft: 5,
            marginTop: 5,
            alignContent: 'center',
            color: 'snow',
            fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"
        },
        box: {
            backgroundColor: "#6F5F90",
            borderRadius: 10,
            marginTop: 10,
        },
    });
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (result.type === "success") {
            setFiles([...files, result])
        } else if (result.type === "cancel") {
            console.log("cancel")
        }
    };
    const pickCode = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (result.type === "success") {
            setCodeFiles([...codeFiles, result])
        } else if (result.type === "cancel") {
            console.log("cancel")
        }
    };
    const remove = (value) => {
        const filterInputValues = tags.filter(tag => tag !== value);
        setTags([...filterInputValues])
    }
    const deleteFile = (index) => {
        let allFiles = files
        allFiles.splice(index, 1)
        setFiles([...allFiles])
    }
    const deleteCodeFile = (index) => {
        let allCodeFiles = codeFiles
        allCodeFiles.splice(index, 1)
        setCodeFiles([...allCodeFiles])
    }
    const createAssignment = async () => {
        try {
            let form = new FormData()
            tags.map((tag) => {
                form.append('tags', tag)
            })
            files.map((file) => {
                let filename = file.name;
                let type = file.name.split('.').reverse()[0];
                form.append('files', { uri: file.uri, name: filename, size: file.size, type })
            })
            codeFiles.map((file) => {
                let filename = file.name;
                let type = file.name.split('.').reverse()[0];
                form.append('javaCode', { uri: file.uri, name: filename, size: file.size, type })
            })
            form.append('title', title)
            form.append('description', description)
            form.append('type', 'ASSIGNMENT')
            form.append('lessonId', lessonId)
            let result = await AssignmentService.createAssignment(form)
            mutate(API.Lesson.getLessonById + lessonId)
            // mutate(API.Course.getCourseById + courseId, test.data)
            props.navigation.goBack()
            props.navigation.navigate("SetAssignmentScoreScreen", result.data)
        } catch (err) {
            console.log(err.response.data)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Navbar back={true} header={"Create Assignment"} props={props}></Navbar>
                <ScrollView>
                    <View style={styles.Layout}>
                        {/* <Text style={styles.text}>title</Text> */}
                        <TextInput
                            label="Assignment Name"
                            mode="outlined"
                            style={styles.textinput}
                            value={title}
                            theme={
                                {
                                    fonts: {
                                        regular: {
                                            fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"
                                        }
                                    }
                                }
                            }
                            onChangeText={title => setTitle(title)}
                        />
                        {/* <Text style={styles.text}>Description</Text> */}
                        <TextInput
                            label="Description"
                            mode="outlined"
                            style={styles.textinput}
                            value={description}
                            theme={
                                {
                                    fonts: {
                                        regular: {
                                            fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"
                                        }
                                    }
                                }
                            }
                            onChangeText={description => setDescription(description)}
                        />
                        <AccordionTable title={"Class"} color={'#E79796'} files={codeFiles}></AccordionTable>
                        <Box style={styles.box}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, marginLeft: 5 }}>
                                {codeFiles.length ? codeFiles.map((file, index) => {
                                    return <Chip onPress={() => console.log('Pressed')} onClose={() => deleteCodeFile(index)} style={styles.chip} textStyle={{ fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif" }} key={index}>{file.name}</Chip>
                                })
                                    : <Text style={styles.text_upload}>No Uploaded Code Files</Text>}
                            </View>
                            <TouchableOpacity style={styles.uploadFilebutton} onPress={() => {
                                pickCode()
                            }}>
                                <Stack direction="row">
                                    <Stack direction="column" style={{ flex: 1 }}>
                                        <Icon name="cloud-upload" fill='#E4DFD9' style={{ height: 30, marginTop: 4 }} />
                                    </Stack>
                                    <Stack direction="column" style={{ flex: 7, marginRight: "12%" }}>
                                        <Text style={styles.text_button}>Upload Code Files</Text>
                                    </Stack>
                                </Stack>
                            </TouchableOpacity>
                        </Box>
                        <Box style={styles.box}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, marginLeft: 5 }}>
                                {files.length ? files.map((file, index) => {
                                    return <Chip onPress={() => console.log('Pressed')} onClose={() => deleteFile(index)} style={styles.chip} textStyle={{ fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif" }} key={index}>{file.name}</Chip>
                                })
                                    : <Text style={styles.text_upload}>No Uploaded PDF Files</Text>}
                            </View>
                            <TouchableOpacity style={styles.uploadFilebutton} onPress={() => {
                                pickDocument()
                            }}>
                                <Stack direction="row">
                                    <Stack direction="column" style={{ flex: 1 }}>
                                        <Icon name="cloud-upload" fill='#E4DFD9' style={{ height: 30, marginTop: 4 }} />
                                    </Stack>
                                    <Stack direction="column" style={{ flex: 7, marginRight: "12%" }}>
                                        <Text style={styles.text_button}>Upload PDF Files</Text>
                                    </Stack>
                                </Stack>
                            </TouchableOpacity>
                        </Box>
                        <ReactNativeChipInput
                            variant="contained"
                            inputVarint="outlined"
                            showChipIcon={true}
                            onDelete={e => remove(e)}
                            label="Add Tag Here"
                            placeholder="Add Tag Here"
                            primaryColor="#1976d2"
                            secondaryColor="#ffffff"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onAdd={(value) => value !== null ? setTags([...tags, value]) : null}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => {
                            createAssignment()
                        }}>
                            <Text style={styles.text_button}>Create Assignment</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView >
            </View>
        </KeyboardAvoidingView>
    );
}

export default CreateAssignment;
