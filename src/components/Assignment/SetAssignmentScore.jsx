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
import AccordionSetScoreTable from "../Accordion/AccordionSetScoreTable"
import FilesService from "../../service/FilesService"
import AccordionClass from "../Accordion/AccordionClass"
import AssignmentService from "../../service/AssignmentService"
import AccordionRelation from "../Accordion/AccordionRelation"


function SetAssignmentScore(props) {
    props = props.props
    const [veSON, setVeSON] = React.useState(props.route.params.veSON)
    const [jaSon, setJaSon] = React.useState(props.route.params.veSON.jaSon)
    const [reSon, setReSon] = React.useState(props.route.params.veSON.reSon)
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
            width: "93%",
            alignSelf: "center",
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
    useEffect(() => {

    }, [jaSon])
    const setAssignmentScore = async () => {
        try {
            let assign = props.route.params
            let veson = veSON
            veson.jaSon = jaSon
            veson.reSon = reSon
            let form = new FormData()
            form.append('id', assign.id)
            form.append('lessonId', assign.lessonId)
            form.append('title', assign.title)
            form.append('description', assign.description)
            form.append('type', assign.type)
            if (assign.tags) {
                if (assign.tags.length) {
                    assign.tags.map((tag) => {
                        form.append('tags', tag)
                    })
                } else {
                    form.append('tags', "")
                }
            } else {
                form.append('tags', "")
            }
            assign.javaCode.map((code) => {
                form.append('javaCode', code.id)
            })
            assign.files.map((file) => {
                form.append('files', file.id)
            })
            form.append('VeSON', JSON.stringify(veson))
            // console.log(assign.id, assign.lessonId, assign.title, assign.description, assign.type, assign.tags, assign.javaCode, assign.files, veson)
            let result = await AssignmentService.updateAssignment(form)
            props.navigation.goBack()
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <Navbar back={true} header={"Set Score"} props={props}></Navbar>
                <ScrollView>
                    <View style={styles.Layout}>
                        <AccordionClass title={"Class"} color={'#E79796'} jaSon={veSON.jaSon} onChange={(jaSon) => setJaSon(jaSon)}></AccordionClass>
                        <AccordionRelation title={"Relations"} color={'#E79796'} reSon={veSON.reSon} onChange={(reSon) => setReSon(reSon)}></AccordionRelation>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        setAssignmentScore()
                    }}>
                        <Text style={styles.text_button}>Confirm</Text>
                    </TouchableOpacity>
                </ScrollView >
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default SetAssignmentScore;
