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
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Box, NativeBaseProvider, Center, Stack, HStack } from 'native-base';
import Logo from "../../assets/j-learn.png";
import back from "../../assets/back2.png";
import Navbar from '../Navbar/Navbar'
import { Icon } from 'react-native-eva-icons';
import AddIcon from '../Icon/AddIcon'


function CreateAssignment(props) {
    props = props.props
    const styles = StyleSheet.create({
        cardLayout: {
            marginTop: 20,
            width: "93%",
            alignSelf: "center",
        },
        card: {
            borderRadius: 10,
            marginTop: 11,
            height: 120,
            marginBottom: 2,
            backgroundColor: "#86E3CE",
        },
        container: {
            height: "100%",
            backgroundColor: "snow",
            flex: 1
        },
        card_col: {
            flexDirection: "column"
        },
        image: {
            flex: 2, height: 120
        },
        text: {
            flex: 3,
            marginLeft: 4
        },
    });
    return (
        <SafeAreaView style={styles.container}>
            <Navbar back={true} header={"Create Assignment"} props={props}></Navbar>
            <ScrollView>
                <View style={styles.cardLayout}>
                    <TouchableOpacity style={styles.card} onPress={() => {
                        props.navigation.navigate("LessonScreen");
                    }}>
                        <Stack direction="row" style={{ marginRight: 20 }}>
                            <Image source={Logo} style={styles.image}  ></Image>
                            <Stack direction="column" style={styles.text}>
                                <Text style={{ flex: 1, marginTop: 10, fontWeight: 'bold' }}>Course name</Text>
                                <Text style={{ flex: 3 }} numberOfLines={4}>Description</Text>
                            </Stack>
                        </Stack>
                    </TouchableOpacity>

                </View>
            </ScrollView >
        </SafeAreaView>
    );
}

export default CreateAssignment;
