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
                expanded={expanded}
                onPress={handlePress}>
                <Box style={[styles.Box, { backgroundColor: color }]}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Source</DataTable.Title>
                            <DataTable.Title>Target</DataTable.Title>
                            <DataTable.Title>Type</DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Score</DataTable.Title>

                        </DataTable.Header>

                        {reSon.map((reson, index) => {
                            return (<LinkTable reSon={reSon} index={index} key={index} changeScore={(reSon, index) => onChangeRelationScore(reSon, index)}></LinkTable>)
                        })}
                    </DataTable>
                </Box>
            </List.Accordion>
        </List.Section>
    );
};

function LinkTable(props){
    let index = props.index
    let reson1 = props.reSon
    let reson = props.reSon[index]
    const [score, setScore] = React.useState(reson.score)
    const setLinkScore = (score) => {
        reson.score = score
        setScore(score)

        reson1[index] = reson
        props.changeScore(reson1, index)
    }
    return (
        <DataTable.Row>
            <DataTable.Cell>
                {reson.source}
            </DataTable.Cell>
            <DataTable.Cell>
                {reson.target}
            </DataTable.Cell>
            <DataTable.Cell>
                {reson.type}
            </DataTable.Cell>

            <TextInput
                style={styles.input}
                onChangeText={score => {
                    if (parseInt(score) >= 0) {
                        setLinkScore(parseInt(score))
                    }
                }}
                value={score.toString()}
                keyboardType="numeric"
            />

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
});

export default AccordionRelation;