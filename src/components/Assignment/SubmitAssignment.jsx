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
import AssignmentService from "../../service/AssignmentService"

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function SubmitAssignment(props) {
    let assignment = props.props.route.params
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
            backgroundColor: "snow",
            flex: 1
        },
        button: {
            borderRadius: 10,
            marginTop: 20,
            height: 40,
            marginBottom: 10,
            backgroundColor: "#031B88",
        },
        text_button: {
            alignSelf: 'center',
            marginTop: 10,
            fontWeight: 'bold',
            color: "snow"
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
            marginLeft: 2
        },
        text_upload: {
            fontSize: 18,
            textAlign: 'center',
            color: 'snow',
            flex: 1
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

        let form = new FormData()
        files.map((file) => {
            let filename = file.name;
            let type = file.name.split('.').reverse()[0];
            form.append('codeFiles', { uri: file.uri, name: filename, size:file.size, type })
        })
        form.append('assignmentId', assignment.id)
        let result = await AssignmentService.validateAssignment(form)
        props.props.navigation.navigate("ResultScreen", result.data)
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Navbar back={true} header={"Submit Assignment"} props={props.props}></Navbar>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                } >
                <View style={styles.cardLayout}>
                    <AccordionText title={"Description"} icon={"clipboard"} color={"#B4B4F5"} text={assignment.description}></AccordionText>
                    <AccordionFiles title={"Files"} icon={"folder"} color={"#B4B4F5"} files={assignment.files}></AccordionFiles>
                    <TouchableOpacity style={styles.upload} onPress={() => {
                        pickDocument()
                    }}>

                        <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>Upload your code files here</Text>
                        <Icon name="cloud-upload" fill='black' style={{ height: 100 }} />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {files.length ? files.map((file, index) => {
                                return <Chip onPress={() => console.log('Pressed')} onClose={() => deleteFile(index)} style={styles.chip} key={index}>{file.name}</Chip>
                            })
                                : <Text style={styles.text_upload}>No Uploaded Code Files</Text>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        submitAssignment()
                    }}>
                        <Text style={styles.text_button}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
            {true ?
                <>
                    <EditIcon props={props} goto={() => {
                        props.props.navigation.navigate("EditAssignmentScreen", assignment)
                    }}></EditIcon>
                </>
                : null
            }
        </SafeAreaView>
    );
}

export default SubmitAssignment;
