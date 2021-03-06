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


const AccordionClassScore = (props) => {
    const [expandedClass, setExpandedClass] = React.useState(false);
    const handlePressClass = () => setExpandedClass(!expandedClass);
    const [jaSon, setJaSon] = React.useState(props.jaSon)
    const color = props.color
    useEffect(() => {
        console.log("change score")
    })
    return (
        <List.Section >
            <List.Accordion
                style={[styles.card, !expandedClass ? { borderRadius: 10 } : null, { backgroundColor: color }]}
                title={props.title}
                titleStyle={{ fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif", }}
                expanded={expandedClass}
                theme={{ colors: { background: 'transparent', primary: '#810034' }}}
                onPress={handlePressClass}>
                <Box style={[styles.Box, { backgroundColor: color }]}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>
                                <Text style={styles.text}>
                                    Name
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title>
                                <Text style={styles.text}>
                                    Found Class
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>
                                <Text style={styles.text}>
                                    Score
                                </Text>
                            </DataTable.Title>

                        </DataTable.Header>

                        {jaSon.map((jason, index) => {
                            return (<ClassTable jaSon={jason} key={index}></ClassTable>)
                        })}
                    </DataTable>
                </Box>
            </List.Accordion>

        </List.Section>
    );
};

function ClassTable(props) {
    let jason = props.jaSon
    return (
        <DataTable.Row>
            <DataTable.Cell>
                <Text style={styles.text}>
                    {jason.name}
                </Text>
            </DataTable.Cell>
            <DataTable.Cell>
                <Text style={styles.text}>
                    {jason.foundClassName ? "Found" : "Not Found"}
                </Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center' }}>
                <Text style={styles.text}>
                    {jason.allScore}
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

export default AccordionClassScore;