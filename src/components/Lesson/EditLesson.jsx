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
import LessonService from "../../service/LessonService"
import API from "../../service/API"
import useSWR, { useSWRConfig } from 'swr'
import FilesService from '../../service/FilesService'

function EditLesson(props) {
    props = props.props
    let data = props.route.params
    const { mutate } = useSWRConfig()
    let [files, setFiles] = React.useState(data.files ? data.files : []);
    let [type, setType] = React.useState(data.type);
    let [tags, setTags] = React.useState(data.tags ? data.tags : []);
    let [title, setTitle] = React.useState(data.title);
    let [description, setDescription] = React.useState(data.description);
    let [isHide, setIsHide] = React.useState(data.isHide)
    console.log(isHide)
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
            marginTop: 12,
            fontSize: 18,
            marginRight: 10,
            marginLeft: 5,
            fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"
        },
        text_button: {
            alignSelf: 'center',
            marginTop: 13,
            fontWeight: 'bold',
            fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif",
            color: "snow",
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
            marginTop: 2,
            alignContent: 'center',
            color: 'snow'
        },
        box: {
            backgroundColor: "#6F5F90",
            borderRadius: 10,
            marginTop: 10,
        },
    });
    const getPdfFiles = async () => {
        let result = await Promise.all(files.map(async (file) => {
            let detail = await FilesService.getPdfDetail(file.id)
            return { id: file.id, name: detail.data.filename }
        }))
        setFiles(result)
    }
    useEffect(() => {
        getPdfFiles()
    }, [data])
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (result.type === "success") {
            setFiles([...files, result])
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

    const editLesson = async () => {
        try {
            let form = new FormData()
            form.append('id', data.id)
            form.append('title', title)
            form.append('description', description)
            form.append('isHide', isHide)
            form.append('courseId', props.route.params.courseId)
            form.append('type', type)
            if (data.assignmentList) {
                data.assignmentList.map((assignment) => {
                    form.append("assignmentList", assignment.id)
                })
            }
            if (tags.length) {
                tags.map((tag) => {
                    form.append('tags', tag)
                })
            } else {
                form.append('tags', "")
            }
            files.map((file) => {
                if (file.id === undefined) {
                    let filename = file.name;
                    let type = file.name.split('.').reverse()[0];
                    form.append('newFilesUpload', { uri: file.uri, name: filename, size: file.size, type })
                } else {
                    form.append('files', file.id)
                }
            })
            let result = await LessonService.updateLesson(form)
            let les = await LessonService.getLessonById(data.id)
            // mutate(API.Course.getCourseById + props.route.params.courseId, [])
            mutate(API.Course.getCourseById + props.route.params.courseId, result.data)
            // mutate(API.Course.getCourseById + props.route.params.courseId, les.data)
            mutate(API.Lesson.getLessonById + data.id, [])
            mutate(API.Lesson.getLessonById + data.id)
            props.navigation.goBack()
            // props.navigation.navigate("AssignmentScreen", result.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Navbar back={true} header={"Edit Lesson"} props={props}></Navbar>
                <ScrollView>
                    <View style={styles.Layout}>
                        {/* <Text style={styles.text}>title</Text> */}
                        <TextInput
                            label="Lesson Name"
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
                        <Box style={styles.box}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, marginLeft: 5 }}>
                                {files.length ? files.map((file, index) => {
                                    return <Chip onPress={() => console.log('Pressed')} onClose={() => deleteFile(index)} style={styles.chip} textStyle={{ fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif" }} key={index}>{file.name}</Chip>
                                })
                                    : <Text style={styles.text_upload}>No Uploaded Files</Text>}
                            </View>
                            <TouchableOpacity style={styles.uploadFilebutton} onPress={() => {
                                pickDocument()
                            }}>
                                <Stack direction="row">
                                    <Stack direction="column" style={{ flex: 1 }}>
                                        <Icon name="cloud-upload" fill='#E4DFD9' style={{ height: 30, marginTop: 4 }} />
                                    </Stack>
                                    <Stack direction="column" style={{ flex: 7, marginRight: "12%" }}>
                                        <Text style={styles.text_button}>Upload Files</Text>
                                    </Stack>
                                </Stack>
                            </TouchableOpacity>
                        </Box>
                        <Stack direction="row">
                            <Text style={styles.text}>Hide</Text>
                            <Checkbox value="danger" colorScheme="info" style={styles.checkbox} accessibilityLabel="empty" isChecked={isHide} onPress={() => setIsHide(!isHide)} />
                        </Stack>
                        <RadioButton.Group onValueChange={value => setType(value)} value={type}>
                            <Stack direction="row">
                                <Text style={{ marginTop: 15, fontSize: 18, marginLeft: 4, fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif" }}>Type : </Text>
                                <RadioButton.Item label="Lesson" value="LESSON" color={'#E2D36B'} labelStyle={{ fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif" }} />
                                <RadioButton.Item label="Quiz" value="QUIZ" color={'#E2D36B'} labelStyle={{ fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif" }} />
                            </Stack>
                        </RadioButton.Group>
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
                            initialInput={tags}
                            onAdd={(value) => value !== null ? setTags([...tags, value]) : null}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => {
                            editLesson()
                        }}>
                            <Text style={styles.text_button}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView >
            </View>
        </KeyboardAvoidingView>
    );
}

export default EditLesson;
