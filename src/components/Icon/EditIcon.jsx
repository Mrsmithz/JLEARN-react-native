/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import {
     StyleSheet,
     TouchableOpacity,
 } from "react-native";
 import { Icon } from 'react-native-eva-icons';
 
 function EditIcon(props) {
     const styles = StyleSheet.create({
         iconContainer: {
             bottom: 130,
             marginBottom: -50,
             marginLeft: 350,
             marginTop: 20,
             width: 50,
             height: 50,
             justifyContent: 'center',
             borderRadius: 100,
             backgroundColor: '#DDDDDA',
         },
     });
     return (
         <TouchableOpacity style={styles.iconContainer} onPress={() => props.goto()}>
             <Icon name="edit-2-outline" fill='#3B5284' style={{ height: 30 }} />
         </TouchableOpacity>
     );
 }
 
 export default EditIcon;
 