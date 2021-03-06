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
import { Chip } from 'react-native-paper';
const SLIDER_WIDTH = Dimensions.get('window').width;

const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.5);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const color = ['#86E3CE', '#FFDD94', '#D0E6A5', '#FA897B', '#CCABD8']
const DATA = [];
for (let i = 0; i < 5; i++) {
    DATA.push(i)
}

function AssingmentCarousel(props) {
    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={[styles.card, {
                backgroundColor: color[index % 5], shadowOffset: {
                    width: 1,
                    height: 1,
                },
                shadowRadius: 3,
                shadowOpacity: 0.5,
                shadowColor: "#6D8299",
            }]} onPress={() => {
                props.props.navigation.navigate("SubmitAssignmentScreen", item);
            }}>
                <View style={styles.cardLayout}>
                    <Text style={{ fontWeight: 'bold', marginTop: 5, flex: 1, fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif" }}>{item.title}</Text>
                    <Text style={{ fontSize: 11, flex: 3, fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif" }} numberOfLines={4}>{item.description}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                        {item.tags && item.tags.map((tag, index) => {
                            return (<Chip onPress={() => console.log('Pressed')} style={styles.chip} key={index} textStyle={{ fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif" }}>{tag}</Chip>)
                        })}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <View style={{ width: '100%' }}>
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
        flexDirection: "column",
        flex: 1
    },
    card: {
        borderRadius: 10,
        marginTop: 11,
        height: 120,
        marginBottom: 2,
    },
    chip: {
        height: 30,
        alignItems: "center",
        backgroundColor: "#CAB8FF",
        marginRight:3

    },
});

export default AssingmentCarousel;