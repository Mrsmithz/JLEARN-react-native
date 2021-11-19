import React , { useEffect } from 'react';
import { Box, NativeBaseProvider, Center, Stack, HStack, Text } from 'native-base';
import {
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import ValidateService from "../../service/ValidateService"
import { DataTable, TextInput, List } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

const SetAssgnmentScore = (props) => {
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

    }
    useEffect(() => {
        generateTable(files)
    }, [files])
    return (
        <List.Section >
            <List.Accordion
                style={[styles.card, !expanded ? { borderRadius: 10 } : null, { backgroundColor: color }]}
                title={props.title}
                expanded={expanded}
                onPress={handlePress}>
                <Box style={[styles.Box, { backgroundColor: color }]}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Name</DataTable.Title>
                            <DataTable.Title>Stereotype</DataTable.Title>
                            {/* <DataTable.Title>Score</DataTable.Title> */}
                        </DataTable.Header>

                        {jaSon.map((jason, index) => {
                            return (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell>
                                        {jason.name}
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        {jason.stereotype.value}
                                    </DataTable.Cell>
                                    {/* <DataTable.Cell>
                                        {jason.allScore}
                                    </DataTable.Cell> */}
                                </DataTable.Row>
                            )
                        })}

                        {/* <DataTable.Pagination
                            page={page}
                            numberOfPages={3}
                            onPageChange={(page) => setPage(page)}
                            label={`${page + 1} of 3`}
                            optionsPerPage={optionsPerPage}
                            itemsPerPage={itemsPerPage}
                            setItemsPerPage={setItemsPerPage}

                            optionsLabel={'Rows per page'}
                        /> */}
                    </DataTable>
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

export default SetAssgnmentScore;