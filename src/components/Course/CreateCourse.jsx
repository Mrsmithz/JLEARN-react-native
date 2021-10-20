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
    KeyboardAvoidingView
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


function CreateCourse(props) {
    props = props.props
    let [image, setImage] = React.useState(null);
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
        uploadimagebutton: {
            borderRadius: 10,
            height: 40,
            marginBottom: 10,
            backgroundColor: "#522157",
            alignSelf: "center",
            width: "95%"
        },
        logo: {
            width: 370,
            height: 180,
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

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        setImage({ localUri: pickerResult.uri });

    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <Navbar back={true} header={"Create Courses"} props={props}></Navbar>
                <ScrollView>
                    <View style={styles.Layout}>
                        {/* <Text style={styles.text}>title</Text> */}
                        <TextInput
                            label="Title"
                            mode="outlined"
                            style={styles.textinput}
                        />
                        {/* <Text style={styles.text}>Description</Text> */}
                        <TextInput
                            label="Description"
                            mode="outlined"
                            style={styles.textinput}
                        />
                        <TextInput
                            label="Password"
                            mode="outlined"
                            style={styles.textinput}
                        />
                        <Stack direction="row" style={{ marginTop: 5 }}>
                            <Text style={styles.text}>Hide</Text>
                            <Checkbox value="danger" colorScheme="info" style={styles.checkbox} accessibilityLabel="empty" />
                        </Stack>
                        <Text style={styles.text}>Course Image</Text>
                        <Image source={image !== null ? { uri: image.localUri } : Logo} style={styles.logo} />
                        <TouchableOpacity style={styles.uploadimagebutton} onPress={() => {
                            openImagePickerAsync()
                        }}>
                            <Stack direction="row">
                                <Stack direction="column" style={{flex:1}}>
                                    <Icon name="cloud-upload" fill='#E4DFD9' style={{ height: 30, marginTop:4 }} />
                                </Stack>
                                <Stack direction="column" style={{flex:7, marginRight:"12%"}}>
                                    <Text style={styles.text_button}>Upload Image</Text>
                                </Stack>
                            </Stack>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => {
                            props.props.navigation.navigate("ResultScreen");
                        }}>
                            <Text style={styles.text_button}>Create Course</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView >
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default CreateCourse;
