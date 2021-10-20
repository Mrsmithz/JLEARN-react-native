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
import { Button, Card, Layout, Text, Tab, TabBar } from "@ui-kitten/components";
import { Link } from 'native-base';
import Navbar from '../Navbar/Navbar'
import Carousel from '../Carousel/AssignmentCarousel'
import { Icon } from 'react-native-eva-icons';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function Lesson(props) {
    const styles = StyleSheet.create({
        cardLayout: {
            width: "90%",
            alignSelf: "center",
        },
        card: {
            borderRadius: 10,
            marginTop: 5,
            marginBottom: 2,
            backgroundColor: "#F9E2AE",
            flex: 1
        },
        container: {
            height: "100%",
            backgroundColor: "snow",
            flex: 1
        },
        image: {
            flex: 2, height: 120
        },
        assignmentLayout: {
            width: "100%",
            justifyContent: "flex-start",
            marginTop: 20
        }
    });
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Navbar back={true} header={"Lesson name"} props={props.props}></Navbar>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                } >
                <View style={styles.cardLayout}>
                    <Text style={{ marginTop: 20, marginLeft: 6 }}>Description</Text>
                    <Card style={styles.card}>
                        <Text>Aj. John Smithzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz</Text>
                    </Card>
                </View>
                <View style={styles.cardLayout}>
                    <Text style={{ marginTop: 20, marginLeft: 6 }}>Material</Text>
                    <Card style={styles.card}>
                        <Link
                            _text={{
                                color: "blue.400",
                            }}>Materail1.pdf</Link>
                        <Link
                            _text={{
                                color: "blue.400",
                            }}>Materail1.pdf</Link>
                        <Link
                            _text={{
                                color: "blue.400",
                            }}>Materail1.pdf</Link>

                    </Card>
                </View>
                <View style={styles.assignmentLayout}>
                    <View style={{ flexDirection: "row", flex: 1, marginLeft: 25 }}>
                        <View style={{ flexDirection: "column", flex: 1, marginTop: 7 }}>
                            <Text>Assignment</Text>
                        </View>
                        <TouchableOpacity
                            style={{ flexDirection: "column", flex: 3 }}
                            onPress={() => props.props.navigation.navigate("CreateAssignmentScreen")}>
                            <Icon name="plus-circle" fill='#478BA2' style={{ height: 35, marginRight: 255 }} />
                        </TouchableOpacity>
                    </View>
                    <Carousel props={props.props}></Carousel>
                </View>
            </ScrollView >

        </SafeAreaView>
    );
}

export default Lesson;
