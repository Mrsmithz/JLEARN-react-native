import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
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
} from "react-native";
import { scrollInterpolator, animatedStyles } from '../../utils/animation';
import { Text } from "@ui-kitten/components";
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.5);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const color= ['#86E3CE', '#FFDD94', '#D0E6A5', '#FA897B', '#CCABD8']
const DATA = [];
for (let i = 0; i < 5; i++) {
    DATA.push(i)
}

function AssingmentCarousel(props) {
    // props.assignment.map((assignment) => {

    // })
    const _renderItem = ({ item,  index }) => {
        // console.log(item, index)
        return (
            <TouchableOpacity style={[styles.card, {backgroundColor:color[index%5]}]} onPress={() => {
                props.props.navigation.navigate("SubmitAssignmentScreen");
            }}>
                <View style={styles.cardLayout}>
                    <Text style={{fontWeight:'bold', marginTop:5}}>Assignment</Text>
                    <Text style={{fontSize:11}}numberOfLines={4}>Aj. John Smithzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz</Text>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <View>
            <Carousel
                data={props.assignment ? props.assignment : []}
                renderItem={_renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                containerCustomStyle={styles.carouselContainer}
                // onSnapToItem={}
                scrollInterpolator={scrollInterpolator}
                slideInterpolatedStyle={animatedStyles}
                useScrollView={true}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    carouselContainer: {
        marginBottom: 20
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'dodgerblue'
    },
    itemLabel: {
        color: 'white',
        fontSize: 24
    },
    counter: {
        marginTop: 25,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    image: {
        flex: 2, height: 120
    },
    text: {
        flex: 3,
        marginLeft: 4
    },
    cardLayout: {
        marginBottom: 20,
        width: "95%",
        alignSelf: "center",
    },
    card: {
        borderRadius: 10,
        marginTop: 11,
        height: 120,
        marginBottom: 2,
    },
});

export default AssingmentCarousel;