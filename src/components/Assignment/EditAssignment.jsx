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
import AccordionSetScoreTable from "../Accordion/AccordionSetScoreTable"
import FilesService from "../../service/FilesService"
import ValidateService from "../../service/ValidateService"
import AssignmentService from "../../service/AssignmentService"
import useSWR, { useSWRConfig } from 'swr'
import API from "../../service/API"


function EditAssignment(props) {
    let assignment = props.props.route.params
    const { mutate } = useSWRConfig()
    let [files, setFiles] = React.useState([]);
    let [codeFiles, setCodeFiles] = React.useState([]);
    let [tags, setTags] = React.useState(assignment.tags);
    let [title, setTitle] = React.useState(assignment.title);
    let [description, setDescription] = React.useState(assignment.description);
    let [newFiles, setNewFiles] = React.useState(false);
    let [newCodefiles, setNewCodeFiles] = React.useState([])
    let [newPdfFiles, setNewPdfFiles] = React.useState([])
    const styles = StyleSheet.create({
        Layout: {
            marginTop: 10,
            width: "93%",
            alignSelf: "center",
        },
        container: {
            height: "100%",
            backgroundColor: "snow",
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
            marginTop: 10,
            fontWeight: 'bold',
            color: "snow",
        },
        button: {
            borderRadius: 10,
            marginTop: 20,
            height: 40,
            marginBottom: 10,
            backgroundColor: "#031B88",
        },
        newFilesButton: {
            borderRadius: 10,
            marginTop: 20,
            height: 40,
            marginBottom: 10,
            width: "90%",
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
    useEffect(() => {
        getCodeFilesName()
        getPdfFilesName()
    }, [assignment])
    useEffect(() => {

    }, [codeFiles])
    const getCodeFilesName = async () => {
        let result = await Promise.all(assignment.javaCode.map(async (code) => {
            let file = await FilesService.getCodeDetail(code.id)
            return { id: code.id, name: file.data.filename }
        }))
        setCodeFiles(result)
    }
    const getPdfFilesName = async () => {
        let result = await Promise.all(assignment.files.map(async (file) => {
            let pdf = await FilesService.getPdfDetail(file.id)
            return { id: file.id, name: pdf.data.filename }
        }))
        setFiles(result)
    }
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (result.type === "success") {
            setNewPdfFiles([...newPdfFiles, result])
        } else if (result.type === "cancel") {
            console.log("cancel")
        }
    };
    const pickCode = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (result.type === "success") {
            setNewCodeFiles([...newCodefiles, result])
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
    const deleteNewFile = (index) => {
        let allFiles = newPdfFiles
        allFiles.splice(index, 1)
        setNewPdfFiles([...allFiles])
    }
    const deleteCodeFile = (index) => {
        let allCodeFiles = newCodefiles
        allCodeFiles.splice(index, 1)
        setNewCodeFiles([...allCodeFiles])
    }
    const editAssignment = async () => {
        try {
            // let veson = veSON
            // veson.jaSon = jaSon
            // veson.reSon = reSon
            // console.log(veson, "veeeeee")
            let veson = ""
            let form = new FormData()
            form.append('id', assignment.id)
            form.append('lessonId', assignment.lessonId)
            form.append('title', title)
            form.append('description', description)
            form.append('type', assignment.type)
            if (tags) {
                if (tags.length) {
                    tags.map((tag) => {
                        form.append('tags', tag)
                    })
                } else {
                    form.append('tags', "")
                }
            } else {
                form.append('tags', "")
            }
            if (newFiles) {
                let form2 = new FormData()
                newCodefiles.map((file) => {
                    let filename = file.name;
                    let type = file.name.split('.').reverse()[0];
                    form2.append('files[]', { uri: file.uri, name: filename, size: file.size, type })
                    form.append('newCodeFiles', { uri: file.uri, name: filename, size: file.size, type })
                })
                form.append('javaCode', "")
                let result = await ValidateService.getPreview(form2)
                form.append('VeSON', JSON.stringify(result.data))
                veson = result.data
            } else {
                assignment.javaCode.map((code) => {
                    form.append('javaCode', code.id)
                })
                form.append('VeSON', JSON.stringify(assignment.veSON))
            }
            if(files.length){
                files.map((file) => {
                    form.append('files', file.id)
                })
            }else{
                form.append('files', "")
            }

            newPdfFiles.map((file)=>{
                let filename = file.name;
                let type = file.name.split('.').reverse()[0];
                form.append('newPdfFiles', { uri: file.uri, name: filename, size:file.size, type })
            })
            await AssignmentService.updateAssignment(form)
            let assign = await AssignmentService.getAssignmentById(assignment.id)
            mutate(API.Lesson.getLessonById + assignment.lessonId, [] )
            mutate(API.Lesson.getLessonById + assignment.lessonId )
            props.props.navigation.pop(2)
            props.props.navigation.navigate("SetAssignmentScoreScreen", assign.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Navbar back={true} header={"Edit Assignment"} props={props.props}></Navbar>
            <ScrollView>
                <View style={styles.Layout}>
                    {/* <Text style={styles.text}>title</Text> */}
                    <TextInput
                        label="Assignment Name"
                        mode="outlined"
                        style={styles.textinput}
                        value={title}
                        onChangeText={title => setTitle(title)}
                    />
                    {/* <Text style={styles.text}>Description</Text> */}
                    <TextInput
                        label="Description"
                        mode="outlined"
                        style={styles.textinput}
                        value={description}
                        onChangeText={description => setDescription(description)}
                    />

                    {
                        newFiles ? (
                            <Box style={styles.box}>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, marginLeft: 5 }}>
                                    {newCodefiles.length ? newCodefiles.map((file, index) => {
                                        return <Chip onPress={() => console.log('Pressed')} onClose={() => deleteCodeFile(index)} style={styles.chip} key={index}>{file.name}</Chip>
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
                        ) : (
                            <Box style={styles.box}>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, marginLeft: 5 }}>
                                    {codeFiles.length ? codeFiles.map((file, index) => {
                                        return <Chip onPress={() => console.log('Pressed')} style={styles.chip} key={index}>{file.name}</Chip>
                                    })
                                        : <Text style={styles.text_upload}>No Uploaded Code Files</Text>}
                                </View>
                                <TouchableOpacity style={[styles.uploadFilebutton, { backgroundColor: "grey" }]} disabled onPress={() => {
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
                        )

                    }
                    <Stack direction="row">
                        <Stack direction="column" style={{ flex: 1 }}>
                            <TouchableOpacity style={[styles.newFilesButton, { backgroundColor: newFiles ? "grey" : "#2D82B5" }]} disabled={newFiles} onPress={() => {
                                setNewFiles(true)
                            }}>
                                <Text style={styles.text_button}>Use New Code Files</Text>
                            </TouchableOpacity>
                        </Stack>
                        <Stack direction="column" style={{ flex: 1 }}>
                            <TouchableOpacity style={[styles.newFilesButton, { backgroundColor: !newFiles ? "grey" : "#2D82B5" }]} disabled={!newFiles} onPress={() => {
                                setNewFiles(false)
                            }}>
                                <Text style={styles.text_button}>Use Old Code Files</Text>
                            </TouchableOpacity>
                        </Stack>
                    </Stack>

                    <Box style={styles.box}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, marginLeft: 5 }}>
                            {files.length ?
                                files.map((file, index) => {
                                    return <Chip onPress={() => console.log('Pressed')} onClose={() => deleteFile(index)} style={styles.chip} key={index}>{file.name}</Chip>
                                })
                                : null
                            }
                            {newPdfFiles.length ?
                                newPdfFiles.map((file, index) => {
                                    return <Chip onPress={() => console.log('Pressed')} onClose={() => deleteNewFile(index)} style={styles.chip} key={index}>{file.name}</Chip>
                                })
                                : null
                            }

                            {(!files.length && !newPdfFiles.length) ?
                                <Text style={styles.text_upload}>No Uploaded PDF Files</Text> : null
                            }
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
                        autoFocus={true}
                        initialInput={tags}
                        onAdd={(value) => value !== null ? setTags([...tags, value]) : null}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        editAssignment()
                    }}>
                        <Text style={styles.text_button}>Confirm Edit and Set Score</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        </SafeAreaView >
    );
}

export default EditAssignment;
