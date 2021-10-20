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

function AddIcon(props) {
    const styles = StyleSheet.create({
        iconContainer: {
            bottom: 90,
            marginBottom: -80,
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
            <Icon name="plus-outline" fill='#3B5284' style={{ height: 30 }} />
        </TouchableOpacity>
    );
}

export default AddIcon;
