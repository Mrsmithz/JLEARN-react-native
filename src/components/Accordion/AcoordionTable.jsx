import React, { useEffect } from 'react';
import { Box, NativeBaseProvider, Center, Stack, HStack, Text } from 'native-base';
import {
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import ValidateService from "../../service/ValidateService"
import { DataTable, TextInput, List } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

const AccordionTable = (props) => {
    const [expanded, setExpanded] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
    const [jaSon, setJaSon] = React.useState([])
    const [reSon, setReSon] = React.useState([])
    const handlePress = () => setExpanded(!expanded);
    const icon = props.icon
    const color = props.color
    const files = props.files
    const generateTable = async (files) => {
        try {
            if (files.length) {
                let form = new FormData()
                files.map((file) => {
                    let filename = file.name;
                    let type = file.name.split('.').reverse()[0];
                    form.append('files[]', { uri: file.uri, name: filename, size: file.size, type })
                })
                let result = await ValidateService.getPreview(form)
                setJaSon(result.data.jaSon)
            } else {
                setJaSon([])
            }

        } catch (err) {
            console.log(err.response.data)
        }
    }
    useEffect(() => {
        generateTable(files)
    }, [files])
    return (
        <List.Section >
            <List.Accordion
                style={[styles.card, !expanded ? { borderRadius: 10 } : null, { backgroundColor: color }]}
                title={props.title}
                titleStyle={{ fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif", marginTop: 2 }}
                expanded={expanded}
                onPress={handlePress}
                theme={{ colors: { background: 'transparent' } }}>
                <Box style={[styles.Box, { backgroundColor: color }]}>
                    {jaSon.length ?
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>
                                    <Text style={styles.table_title}>
                                        Name
                                    </Text>
                                </DataTable.Title>
                                <DataTable.Title>
                                    <Text style={styles.table_title}>
                                        Stereotype
                                    </Text>
                                </DataTable.Title>
                                <DataTable.Title>
                                    <Text style={styles.table_title}>
                                        Score
                                    </Text>
                                </DataTable.Title>
                                {/* <DataTable.Title>Score</DataTable.Title> */}
                            </DataTable.Header>

                            {jaSon.map((jason, index) => {
                                return (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell>
                                            <Text style={styles.table_title}>
                                                {jason.name}
                                            </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.table_info}>
                                            <Text style={styles.table_title}>
                                                {jason.stereotype.value}
                                            </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell >
                                            <Text style={styles.table_title}>
                                                {jason.allScore}
                                            </Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                        : null
                    }
                    {/* <View style={{ flexDirection: "row", marginTop: 15 }}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            generateTable(files)
                        }}>
                            <Text style={styles.text_button}>Generate new Table</Text>
                        </TouchableOpacity>
                        {jaSon.length ? <TouchableOpacity style={styles.button} onPress={() => {
                            console.log("go to set score")
                        }}>
                            <Text style={styles.text_button}>Set Score</Text>
                        </TouchableOpacity>
                            : null}

                    </View> */}


                </Box>
            </List.Accordion>

        </List.Section>
    );
};
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
    table_title: {
        fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif",
        marginTop: 2,
    },
    table_info: {
        marginLeft:25
    },
});

export default AccordionTable;