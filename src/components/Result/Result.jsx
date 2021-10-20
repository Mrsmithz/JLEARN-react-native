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
import According from '../According/According'
import { Icon } from 'react-native-eva-icons';
import { Button, Card, Layout, Tab, TabBar } from "@ui-kitten/components";
import * as Progress from 'react-native-progress';
import { Box, NativeBaseProvider, Center, Stack, HStack } from 'native-base';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function Result(props) {
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
            marginTop: 13,
            flexWrap: 'nowrap',
            flex: 1
        },
        stack: {
            marginBottom: 10,
            flex: 1
        },
        score: {
            marginBottom: 20
        },
        icon: {
            height: 30,
            marginRight: 100,
            marginTop: 5
        }
    });
    const [refreshing, setRefreshing] = React.useState(false);

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
                    <Card style={styles.card}>
                        <Stack direction="row">
                            <Stack direction="column" style={{ flex: 1, marginTop: 10 }}>
                                <Text style={styles.text}>Approve : </Text>
                                <Text style={styles.text}>Send By : </Text>
                                <Text style={styles.text}>Score : </Text>
                            </Stack>
                            <Stack direction="column" style={{ flex: 2, marginTop: 10 }}>
                                <Icon name={false ? "checkmark-circle-2" : "close-circle"} fill={false ? '#94B447' : '#ff3333'} style={styles.icon} />
                                <Text style={styles.subtext} numberOfLines={1} >นาย กขค วย</Text>
                                <Text style={styles.score} >15/20</Text>
                            </Stack>
                            <Stack direction="column" style={{ flex: 2 }}>
                                <Progress.Circle
                                    size={130}
                                    progress={0.75}
                                    showsText
                                    color={true ? '#CBE54E' : '#E06C78'}
                                    textStyle={{ 
                                        color: true ? "#94B447" : '#E06C78'
                                    }}
                                    formatText={() => {
                                        return `15/20`
                                    }} />
                            </Stack>
                        </Stack>
                    </Card>
                    <According title={"Class"} icon={"clipboard"} color={'#E79796'}></According>
                    <According title={"Relations"} icon={"folder"} color={'#E79796'}></According>
                    <According title={"Test Case"} icon={"chart-tree"} color={'#E79796'}></According>
                    <According title={"Diagram"} icon={"chart-tree"} color={'#E79796'}></According>
                    <According title={"Code"} icon={"chart-tree"} color={'#E79796'}></According>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        props.props.navigation.navigate("AssignmentScreen");
                    }}>
                        <Text style={styles.text_button}>Return to lesson</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >

        </SafeAreaView>
    );
}

export default Result;
