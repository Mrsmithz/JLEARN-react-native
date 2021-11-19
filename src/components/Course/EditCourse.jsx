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
 import CourseService from "../../service/CourseService"
 import useSWR, { useSWRConfig } from 'swr'
 import API from "../../service/API"
 
 function EditCourse(props) {
     props = props.props
     let data = props.route.params
     console.log(data)
     const { mutate } = useSWRConfig()
     let [image, setImage] = React.useState(API.File.getImage+data.image);
     let [title, setTitle] = React.useState(data.title);
     let [description, setDescription] = React.useState(data.description);
     let [enroll, setEnroll] = React.useState(data.password);
     let [isHide, setIsHide] = React.useState(data.isHide);
     let [changeImage, setChangeImage] = React.useState(false);
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
         setImage(pickerResult.uri);
         setChangeImage(true)
     }
     const updateCourse = async () => {
         // if (title === '') {
         //     this.setState({ errorName: true, dialogError: true })
         //     return 0
         // }
         try {
             let form = new FormData()
             if(image && changeImage){
                 let localUri = image;
                 let filename = localUri.split('/').pop();
                 let match = /\.(\w+)$/.exec(filename);
                 let type = match ? `image/${match[1]}` : `image`;
                 form.append('newImage',{ uri: localUri, name: filename, type })
             }else{
                 form.append('image', data.image)
             }
             form.append('id', data.id)
             form.append('title', title)
             form.append('description', description)
             form.append('password', enroll)
             form.append('isHide', isHide)
             let result = await CourseService.updateCourse(form)
            //  mutate(API.User.getUser, result.data)
            //  mutate(API.Course.getAllCourse)
             console.log(result.data)
            //  mutate(API.Course.getCourseById + data.id, data.lessons)
            //  props.navigation.navigate("CourseScreen")
            props.navigation.goBack()
         } catch (err) {
             console.log(err)
         }
     }
     return (
         <SafeAreaView style={styles.container}>
             <KeyboardAvoidingView style={{ flex: 1 }}>
                 <Navbar back={true} header={"Edit Courses"} props={props}></Navbar>
                 <ScrollView>
                     <View style={styles.Layout}>
                         {/* <Text style={styles.text}>title</Text> */}
                         <TextInput
                             label="Title"
                             mode="outlined"
                             style={styles.textinput}
                             value={title}
                             onChangeText={title => setTitle(title)}
                         />
                         {/* <Text style={styles.text}>Description</Text> */}
                         <TextInput
                             label="Description"
                             mode="outlined"
                             style={styles.textinput}
                             value={description}
                             onChangeText={description => setDescription(description)}
                         />
                         <TextInput
                             label="Enroll Key"
                             mode="outlined"
                             style={styles.textinput}
                             secureTextEntry={true}
                             value={enroll}
                             onChangeText={enroll => setEnroll(enroll)}
                         />
                         <Stack direction="row" style={{ marginTop: 5 }}>
                             <Text style={styles.text}>Hide</Text>
                             <Checkbox value="danger" colorScheme="info" style={styles.checkbox} accessibilityLabel="empty" onPress={() => setIsHide(!isHide)} />
                         </Stack>
                         <Text style={styles.text}>Course Image</Text>
                         <Image source={{ uri: image }} style={styles.logo} />
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
                             updateCourse()
                         }}>
                             <Text style={styles.text_button}>Confirm</Text>
                         </TouchableOpacity>
                     </View>
                 </ScrollView >
             </KeyboardAvoidingView>
         </SafeAreaView>
     );
 }
 
 export default EditCourse;
 