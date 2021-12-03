/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";
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
import { TextInput } from 'react-native-paper';
import { Button, Card, Layout, Text, Tab, TabBar } from "@ui-kitten/components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Box, NativeBaseProvider, Center, Stack, HStack, Radio, Checkbox } from 'native-base';
import Logo from "../../assets/j-learn.png";
import back from "../../assets/back2.png";
import Navbar from '../Navbar/Navbar'
import { Icon } from 'react-native-eva-icons';
import * as ImagePicker from 'expo-image-picker'
import CourseService from "../../service/CourseService"
import useSWR, { useSWRConfig } from 'swr'
import API from "../../service/API"

function CreateCourse(props) {
    props = props.props
    const { mutate } = useSWRConfig()
    let [image, setImage] = React.useState(null);
    let [title, setTitle] = React.useState("");
    let [description, setDescription] = React.useState("");
    let [enroll, setEnroll] = React.useState("");
    let [isHide, setIsHide] = React.useState(false);
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
            height: 45,
        },
        checkbox: {
            marginTop: 11,
        },
        text: {
            marginTop: 11,
            fontSize: 18,
            marginRight: 10,
            marginLeft: 5,
            fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"
        },
        text_button: {
            alignSelf: 'center',
            marginTop: 12,
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
        uploadimagebutton: {
            borderRadius: 10,
            height: 40,
            marginBottom: 10,
            backgroundColor: "#522157",
            alignSelf: "center",
            width: "95%"
        },
        logo: {
            width: '100%',
            height: 250,
            marginBottom: 10,
            alignSelf: "center"
        },
    });
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        setImage({ localUri: pickerResult.uri });

    }
    const createCourse = async () => {
        // if (title === '') {
        //     this.setState({ errorName: true, dialogError: true })
        //     return 0
        // }
        try {
            let form = new FormData()
            if (image) {
                let localUri = image.localUri;
                let filename = localUri.split('/').pop();
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;
                form.append('image', { uri: localUri, name: filename, type })
            }
            form.append('title', title)
            form.append('description', description)
            form.append('password', enroll)
            form.append('isHide', isHide)
            await CourseService.createCourse(form)
            console.log('ee')
            mutate(API.Course.getAllCourse)
            props.navigation.navigate("CourseScreen")
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
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <Navbar back={true} header={"Create Courses"} props={props}></Navbar>
                    <ScrollView>
                        <View style={styles.Layout}>
                            {/* <Text style={styles.text}>title</Text> */}
                            <TextInput
                                label="Title"
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
                            <TextInput
                                label="Enroll Key"
                                mode="outlined"
                                style={styles.textinput}
                                secureTextEntry={true}
                                value={enroll}
                                theme={
                                    {
                                      fonts: {
                                        regular: {
                                          fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif"
                                        }
                                      }
                                    }
                                  }
                                onChangeText={enroll => setEnroll(enroll)}
                            />
                            <Stack direction="row" style={{ marginTop: 5 }}>
                                <Text style={styles.text}>Hide</Text>
                                <Checkbox value="danger" colorScheme="info" style={styles.checkbox} accessibilityLabel="empty" onPress={() => setIsHide(!isHide)} />
                            </Stack>
                            <Text style={styles.text}>Course Image</Text>
                            <Image source={image !== null ? { uri: image.localUri } : Logo} style={styles.logo} />
                            <TouchableOpacity style={styles.uploadimagebutton} onPress={() => {
                                openImagePickerAsync()
                            }}>
                                <Stack direction="row">
                                    <Stack direction="column" style={{ flex: 1 }}>
                                        <Icon name="cloud-upload" fill='#E4DFD9' style={{ height: 30, marginTop: 4 }} />
                                    </Stack>
                                    <Stack direction="column" style={{ flex: 7, marginRight: "12%" }}>
                                        <Text style={styles.text_button}>Upload Image</Text>
                                    </Stack>
                                </Stack>

                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={() => {
                                createCourse()
                            }}>
                                <Text style={styles.text_button}>Create Course</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView >
                </KeyboardAvoidingView>
            </View>
        </KeyboardAvoidingView>
    );
}

export default CreateCourse;
