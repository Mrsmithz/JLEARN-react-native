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
import AccordionCodeFiles from '../Accordion/AccordionCodeFiles'
import AccordionRelationScore from '../Accordion/AccordionRelationScore'
import AccordionClassScore from '../Accordion/AccordionClassScore'
import { Icon } from 'react-native-eva-icons';
import { Button, Card, Layout, Tab, TabBar } from "@ui-kitten/components";
import * as Progress from 'react-native-progress';
import { Box, NativeBaseProvider, Center, Stack, HStack } from 'native-base';
import UserService from "../../service/UserService"
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function Result(props) {
    const assignmentHistory = props.props.route.params
    const [sender, setSender] = React.useState("")
    const getSender = async() =>{
        let result = await UserService.getUser()
        setSender(`${result.data.firstName} ${result.data.lastName}`)
    }
    getSender()
    const styles = StyleSheet.create({
        cardLayout: {
            width: "95%",
            alignSelf: "center",
        },
        card: {
            borderRadius: 10,
            marginTop: 20,
            height: 170,
            marginBottom: 2,
            backgroundColor: "#F9E2AE",
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
            marginBottom: 10,
            marginLeft: 2,
        },
        text: {
            marginTop: 15,
            fontWeight: 'bold',
            fontSize: 13,
            flexWrap: 'wrap',
        },
        subtext: {
            marginTop: 8.5,
            flexWrap: 'nowrap',
            flex: 1
        },
        stack: {
            marginBottom: 10,
            flex: 1
        },
        score: {
            marginBottom: 25
        },
        icon: {
            height: 30,
            marginRight: "70%",
            marginTop: 5
        }
    });
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    return (
        <View style={styles.container}>
            <Navbar back={true} header={"Result"} props={props.props}></Navbar>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                } >
                <View style={styles.cardLayout}>
                    <Card style={styles.card}>
                        <Stack direction="row">
                            <Stack direction="column" style={{ flex: 1, marginTop: 10 }}>
                                <Text style={styles.text}>Approve : </Text>
                                <Text style={styles.text}>Send By : </Text>
                                <Text style={styles.text}>Score : </Text>
                            </Stack>
                            <Stack direction="column" style={{ flex: 2, marginTop: 10 }}>
                                <Icon name={false ? "checkmark-circle-2" : "close-circle"} fill={false ? '#94B447' : '#ff3333'} style={styles.icon} />
                                <Text style={styles.subtext} numberOfLines={1} >{sender}</Text>
                                <Text style={styles.score} >{`${assignmentHistory.assignmentScore}/${assignmentHistory.fullAssignmentScore}`}</Text>
                            </Stack>
                            <Stack direction="column" style={{ flex: 2 }}>
                                <Progress.Circle
                                    size={130}
                                    progress={assignmentHistory.assignmentScore/assignmentHistory.fullAssignmentScore}
                                    showsText
                                    color={(assignmentHistory.assignmentScore/assignmentHistory.fullAssignmentScore) >= 0.5 ? '#CBE54E' : '#E06C78'}
                                    textStyle={{ 
                                        color: (assignmentHistory.assignmentScore/assignmentHistory.fullAssignmentScore) >= 0.5 ? "#94B447" : '#E06C78'
                                    }}
                                    formatText={() => {
                                        return `${assignmentHistory.assignmentScore}/${assignmentHistory.fullAssignmentScore}`
                                    }} />
                            </Stack>
                        </Stack>
                    </Card>
                    <AccordionClassScore title={"Class"} icon={"clipboard"} color={'#B4B4F5'} jaSon={assignmentHistory.scSON.jaSon}></AccordionClassScore>
                    <AccordionRelationScore title={"Relations"} icon={"folder"} color={'#B4B4F5'} reSon={assignmentHistory.scSON.reSon}></AccordionRelationScore>
                    <AccordionCodeFiles title={"Files"} icon={"folder"} color={"#B4B4F5"} files={assignmentHistory.code}></AccordionCodeFiles>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        props.props.navigation.pop(2)
                    }}>
                        <Text style={styles.text_button}>Return to lesson</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >

        </View>
    );
}

export default Result;
