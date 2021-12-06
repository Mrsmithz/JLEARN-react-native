import React, { useEffect } from 'react';
import { Box, NativeBaseProvider, Center, Stack, HStack, Text } from 'native-base';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
} from "react-native";
import ValidateService from "../../service/ValidateService"
import { DataTable, List } from 'react-native-paper';


const AccordionRelation = (props) => {
    const [expanded, setExpanded] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);
    const [reSon, setReSon] = React.useState(props.reSon)
    const color = props.color
    useEffect(() => {
        console.log("change score")
    })
    const onChangeRelationScore = (reson, index) => {
        let r = reSon
        r[index] = reson[index]
        setReSon(r)

        props.onChange(reSon)
    }
    return (
        <List.Section >
            <List.Accordion
                style={[styles.card, !expanded ? { borderRadius: 10 } : null, { backgroundColor: color }]}
                title={props.title}
                titleStyle={{ fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif" }}
                expanded={expanded}
                theme={{ colors: { background: 'transparent', primary: '#810034' } }}
                onPress={handlePress}>
                <Box style={[styles.Box, { backgroundColor: color }]}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>
                                <Text style={styles.text}>
                                    Source
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title>
                                <Text style={styles.text}>
                                    Target
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title>
                                <Text style={styles.text}>
                                    Type
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>
                                <Text style={styles.text}>
                                    Score
                                </Text>
                            </DataTable.Title>

                        </DataTable.Header>

                        {reSon.map((reson, index) => {
                            return (<LinkTable reSon={reson} key={index} ></LinkTable>)
                        })}
                    </DataTable>
                </Box>
            </List.Accordion>
        </List.Section>
    );
};

function LinkTable(props) {
    let reson = props.reSon
    return (
        <DataTable.Row>
            <DataTable.Cell>
                <Text style={styles.text}>
                    {reson.source}
                </Text>
            </DataTable.Cell>
            <DataTable.Cell>
                <Text style={styles.text}>
                    {reson.target}
                </Text>
            </DataTable.Cell>
            <DataTable.Cell>
                <Text style={styles.text}>
                    {reson.type}
                </Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center' }}>
                <Text style={styles.text}>
                    {reson.score}
                </Text>
            </DataTable.Cell>

        </DataTable.Row>
    )
}

const styles = StyleSheet.create({
    card: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 5,
        flex: 1,
        height: 50,
        justifyContent: 'center'
    },
    Box: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    container: {
        height: "100%",
        backgroundColor: "snow",
        flex: 1
    },
    text_button: {
        alignSelf: 'center',
        alignContent: 'center',
        marginTop: 7,
        fontWeight: 'bold',
        color: "snow",
    },
    button: {
        borderRadius: 10,
        height: 35,
        width: 70,
        backgroundColor: "#478BA2",
        marginLeft: 20,
        alignItems: "center"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
        backgroundColor: "snow",
        width: "15%",
        borderRadius: 5,
        textAlign: "center",
        marginRight: "7.5%"
    },
    text: {
        fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif",
        marginTop: 2
    }
});

export default AccordionRelation;