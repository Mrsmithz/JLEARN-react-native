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
import { Icon } from 'react-native-eva-icons';
import { Avatar } from 'react-native-elements';
import Navbar from '../Navbar/Navbar'
import AddIcon from '../Icon/AddIcon'
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function Lesson(props) {
  const styles = StyleSheet.create({
    cardLayout: {
      width: "93%",
      alignSelf: "center",
    },
    card: {
      borderRadius: 10,
      marginTop: 20,
      height: 140,
      marginBottom: 2,
      backgroundColor: "#B4B4F5",
    },
    container: {
      height: "100%",
      backgroundColor: "snow",
      flex: 1
    },
    card_col: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "flex-start"
    },
    image: {
      flex: 2, height: 120
    },
    text: {
      flex: 6,
    }
  });
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Navbar back={true} header={"Course Name"} props={props.props}></Navbar>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        } >
        <View style={styles.cardLayout}>
          <TouchableOpacity style={styles.card} onPress={() => {
            props.props.navigation.navigate("AssignmentScreen");
          }}>
            <Stack direction="row" style={{ flex: 1 }}>
              <Stack direction="column" style={{ flex: 1, marginTop: 10, marginLeft: 5, alignItems: "center" }}>
                <Avatar
                  rounded
                  size={30}
                  title="MD"
                  overlayContainerStyle={{ backgroundColor: 'grey' }}
                />
              </Stack>
              <Stack direction="column" style={styles.text}>
                <Text style={{ flex: 1, marginTop: 13 }}>Aj. John Smith</Text>
                <Text style={{ flex: 1, fontWeight: 'bold' }} numberOfLines={4}>Lesson Name</Text>
                <Text style={{ flex: 3 }} numberOfLines={3}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </Text>
              </Stack>
            </Stack>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => {
            props.props.navigation.navigate("AssignmentScreen");
          }}>
            <Stack direction="row" style={{ flex: 1 }}>
              <Stack direction="column" style={{ flex: 1, marginTop: 10, marginLeft: 5, alignItems: "center" }}>
                <Avatar
                  rounded
                  size={30}
                  title="MD"
                  overlayContainerStyle={{ backgroundColor: 'grey' }}
                />
              </Stack>
              <Stack direction="column" style={styles.text}>
                <Text style={{ flex: 1, marginTop: 13 }}>Aj. John Smith</Text>
                <Text style={{ flex: 1, fontWeight: 'bold' }} numberOfLines={4}>Lesson Name</Text>
                <Text style={{ flex: 3 }} numberOfLines={3}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </Text>
              </Stack>
            </Stack>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => {
            props.props.navigation.navigate("AssignmentScreen");
          }}>
            <Stack direction="row" style={{ flex: 1 }}>
              <Stack direction="column" style={{ flex: 1, marginTop: 10, marginLeft: 5, alignItems: "center" }}>
                <Avatar
                  rounded
                  size={30}
                  title="MD"
                  overlayContainerStyle={{ backgroundColor: 'grey' }}
                />
              </Stack>
              <Stack direction="column" style={styles.text}>
                <Text style={{ flex: 1, marginTop: 13 }}>Aj. John Smith</Text>
                <Text style={{ flex: 1, fontWeight: 'bold' }} numberOfLines={4}>Lesson Name</Text>
                <Text style={{ flex: 3 }} numberOfLines={3}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </Text>
              </Stack>
            </Stack>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => {
            props.props.navigation.navigate("AssignmentScreen");
          }}>
            <Stack direction="row" style={{ flex: 1 }}>
              <Stack direction="column" style={{ flex: 1, marginTop: 10, marginLeft: 5, alignItems: "center" }}>
                <Avatar
                  rounded
                  size={30}
                  title="MD"
                  overlayContainerStyle={{ backgroundColor: 'grey' }}
                />
              </Stack>
              <Stack direction="column" style={styles.text}>
                <Text style={{ flex: 1, marginTop: 13 }}>Aj. John Smith</Text>
                <Text style={{ flex: 1, fontWeight: 'bold' }} numberOfLines={4}>Lesson Name</Text>
                <Text style={{ flex: 3 }} numberOfLines={3}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </Text>
              </Stack>
            </Stack>
          </TouchableOpacity>
        </View>
      </ScrollView >
      {true ?
        <AddIcon props={props.props} goto={()=>{
          props.props.navigation.navigate("CreateLessonScreen")}}></AddIcon> : null
      }
    </SafeAreaView>
  );
}

export default Lesson;
