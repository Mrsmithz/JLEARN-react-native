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
import { Icon } from 'react-native-eva-icons';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function SubmitAssignment(props) {
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
                    <Accordion title={"Description"} icon={"clipboard"} color={"#B4B4F5"}></Accordion>
                    <Accordion title={"Files"} icon={"folder"} color={"#B4B4F5"}></Accordion>
                    <Accordion title={"Diagram"} icon={"chart-tree"} color={"#B4B4F5"}></Accordion>
                    <Accordion title={"Your Diagram"} icon={"chart-tree"} color={"#B4B4F5"}></Accordion>
                    <TouchableOpacity style={styles.upload} onPress={() => {
                        console.log("click")
                    }}>

                        <Text style={{ alignSelf: 'center', marginTop: 10 }}>Upload your code files here</Text>
                        <Icon name="cloud-upload" fill='black' style={{ height: 100 }} />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Chip onPress={() => console.log('Pressed')} onClose={() => console.log('Closed')} style={styles.chip}>Examp</Chip>
                            <Chip onPress={() => console.log('Pressed')} onClose={() => console.log('Closed')} style={styles.chip}>Example Chipaaaaaa</Chip>
                            <Chip onPress={() => console.log('Pressed')} onClose={() => console.log('Closed')} style={styles.chip}>Examplzzz</Chip>
                            <Chip onPress={() => console.log('Pressed')} onClose={() => console.log('Closed')} style={styles.chip}>Example Chip</Chip>
                            <Chip onPress={() => console.log('Pressed')} onClose={() => console.log('Closed')} style={styles.chip}>Example Chipzzzz</Chip>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        props.props.navigation.navigate("ResultScreen");
                    }}>
                        <Text style={styles.text_button}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >

        </SafeAreaView>
    );
}

export default SubmitAssignment;
