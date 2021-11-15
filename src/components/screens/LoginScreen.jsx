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
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  ImageBackground,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import Logo from "../../assets/j-learn.png";
import back from "../../assets/back2.png";
import { BackgroundImage } from "react-native-elements/dist/config";
import { BoxShadow } from "react-native-shadow";
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { addToken } from "../../store/actions/tokenAction"
import useSWR from 'swr'
import AuthService from "../../service/AuthService"



function LoginScreen(props) {
  const dispatch = useDispatch() 
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    logo: {
      width: 50,
      position: "absolute",
      backgroundColor: "#ffb380",
    },
    shadow: {
      position: "absolute",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowRadius: 20,
      shadowOpacity: 1,
      shadowColor: "#ffb380",
      elevation: 1,
      // borderBottomWidth: 0,
      // borderTopWidth: 0,
      borderColor: "#000",
      borderWidth: 2,
      // backgroundColor: "snow",
      borderRadius: Math.round(288) / 2,
    },
  });
  // Somewhere in your code

  signInAsync = async () => {
    const config = {
      clientId: "1078651650648-hi0rvrcbhb6geg8aogb1um3kbc8di1pl.apps.googleusercontent.com",
    }
    try {
      const result = await Google.logInAsync(
        config
      );
      if (result.type === 'success') {
        const accessToken = await AuthService.getAccessToken(result.idToken)
        dispatch(addToken(accessToken.data.accessToken));
        console.log(result.idToken)
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken.data.accessToken}`
        props.navigation.navigate("CourseScreen")
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e)
      return { error: true };
    }
  };
  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        <ImageBackground
          source={back}
          style={{ width: "100%", height: "100%" }}
        ></ImageBackground>
        <TouchableOpacity
          style={styles.shadow}
          onPress={() => {
            signInAsync()
          }}
        >
          <View style={{ elevation: 10 }}>
            <Image
              style={{
                borderRadius:
                  Math.round(
                    Dimensions.get("window").width +
                    Dimensions.get("window").height
                  ) / 2,
                // borderColor: '#bbb111',
                // borderWidth: 100,
                width: Dimensions.get("window").width * 0.7,
                height: Dimensions.get("window").width * 0.7,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffb380",
                shadowOffset: {
                  width: -100,
                  height: 50,
                },
                shadowRadius: 10,
                shadowOpacity: 0.5,
                shadowColor: "black",
              }}
              source={Logo}
              width={300}
            ></Image>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
