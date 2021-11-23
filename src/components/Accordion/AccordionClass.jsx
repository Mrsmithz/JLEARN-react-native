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


const AccordionClass = (props) => {
    const [expandedClass, setExpandedClass] = React.useState(false);
    const handlePressClass = () => setExpandedClass(!expandedClass);
    const [expandedAttr, setExpandedAttr] = React.useState(false);
    const handlePressAttr = () => setExpandedAttr(!expandedAttr);
    const [expandedMethods, setExpandedMethods] = React.useState(false);
    const handlePressMethods = () => setExpandedMethods(!expandedMethods);
    const [jaSon, setJaSon] = React.useState(props.jaSon)
    const color = props.color
    useEffect(() => {
        console.log("change score")
    })
    const onChangeTypeScore = (jason, index) => {
        let j = jaSon
        j[index].stereotype = jason[index].stereotype
        setJaSon(j)
        j.map((jason) => {
            let allScore = 0
            jason.attributes.map((attr) => {
                allScore += attr.score
            })
            jason.methods.map((method) => {
                allScore += method.score
            })
            allScore += jason.stereotype.score
            jason.allScore = allScore
        })

        setJaSon(j)
        props.onChange(jaSon)
    }
    const onChangeAttrScore = (jason, index) => {
        let j = jaSon
        j[index].attributes = jason[index].attributes
        setJaSon(j)
        j.map((jason) => {
            let allScore = 0
            jason.attributes.map((attr) => {
                allScore += attr.score
            })
            jason.methods.map((method) => {
                allScore += method.score
            })
            allScore += jason.stereotype.score
            jason.allScore = allScore
        })

        setJaSon(j)
        props.onChange(jaSon)
    }
    const onChangeMethodScore = (jason, index) => {
        let j = jaSon
        j[index].methods = jason[index].methods
        setJaSon(j)
        j.map((jason) => {
            let allScore = 0
            jason.attributes.map((attr) => {
                allScore += attr.score
            })
            jason.methods.map((method) => {
                allScore += method.score
            })
            allScore += jason.stereotype.score
            jason.allScore = allScore
        })
        setJaSon(j)
        props.onChange(jaSon)
    }
    return (
        <List.Section >
            <List.Accordion
                style={[styles.card, !expandedClass ? { borderRadius: 10 } : null, { backgroundColor: color }]}
                title={props.title}
                expanded={expandedClass}
                theme={{colors:{background:'transparent', primary:'#D06224'}}}
                onPress={handlePressClass}>
                <Box style={[styles.Box, { backgroundColor: color }]}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Name</DataTable.Title>
                            <DataTable.Title>Stereotype</DataTable.Title>
                            <DataTable.Title style={{ justifyContent: 'center' }}>Score</DataTable.Title>

                        </DataTable.Header>

                        {jaSon.map((jason, index) => {
                            return (<ClassTable jaSon={jaSon} index={index} key={index} changeScore={(jaSon, index) => onChangeTypeScore(jaSon, index)}></ClassTable>)
                        })}
                    </DataTable>
                </Box>
            </List.Accordion>

            <List.Accordion
                style={[styles.card, !expandedAttr ? { borderRadius: 10 } : null, { backgroundColor: color }]}
                title={"Attributes"}
                expanded={expandedAttr}
                theme={{colors:{background:'transparent', primary:'#892CDC'}}}
                onPress={handlePressAttr}>
                <Box style={[styles.Box, { backgroundColor: color }]}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Class</DataTable.Title>
                            <DataTable.Title>Name</DataTable.Title>
                            <DataTable.Title>accessModifier</DataTable.Title>
                            <DataTable.Title>Type</DataTable.Title>
                            <DataTable.Title>Score</DataTable.Title>
                        </DataTable.Header>

                        {jaSon.map((jason, index) => {
                            return (<AttributesTable jaSon={jaSon} index={index} key={index} changeScore={(jaSon, index) => onChangeAttrScore(jaSon, index)}></AttributesTable>)
                        })}
                    </DataTable>
                </Box>
            </List.Accordion>

            <List.Accordion
                style={[styles.card, !expandedMethods ? { borderRadius: 10 } : null, { backgroundColor: color }]}
                title={"Methods"}
                expanded={expandedMethods}
                theme={{colors:{background:'transparent', primary:'#0C7B93'}}}
                onPress={handlePressMethods}>
                <Box style={[styles.Box, { backgroundColor: color }]}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Class</DataTable.Title>
                            <DataTable.Title>Name</DataTable.Title>
                            <DataTable.Title>accessModifier</DataTable.Title>
                            <DataTable.Title>returnType</DataTable.Title>
                            <DataTable.Title>Score</DataTable.Title>
                        </DataTable.Header>

                        {jaSon.map((jason, index) => {
                            return (<MethodsTable jaSon={jaSon} index={index} key={index} changeScore={(jaSon, index) => onChangeMethodScore(jaSon, index)}></MethodsTable>)
                        })}
                    </DataTable>
                </Box>
            </List.Accordion>
        </List.Section>
    );
};

function ClassTable(props) {
    let index = props.index
    let jason1 = props.jaSon
    let jason = props.jaSon[index]
    const [score, setScore] = React.useState(jason.stereotype.score)
    const setClassScore = (score) => {
        jason.stereotype.score = score
        setScore(score)

        jason1[index] = jason
        props.changeScore(jason1, index)
    }
    return (
        <DataTable.Row>
            <DataTable.Cell>
                {jason.name}
            </DataTable.Cell>
            <DataTable.Cell>
                {jason.stereotype.value}
            </DataTable.Cell>


            <TextInput
                style={styles.input}
                onChangeText={score => {
                    if (parseInt(score) >= 0) {
                        setClassScore(parseInt(score))
                    }
                }}
                value={score.toString()}
                keyboardType="numeric"
            />

        </DataTable.Row>
    )
}
function AttributesTable(props) {
    let index = props.index
    let jason1 = props.jaSon
    let jason = props.jaSon[index]
    let name = jason.name
    const setClassAttrScore = (jason, index) => {
        jason1[index] = jason[index]

        props.changeScore(jason1, index)
    }
    return (
        <View>
            {jason.attributes.map((attr, aindex) => {
                return (
                    <Attribute attr={attr} class={name} index={aindex} jindex={index} jason={jason1} key={aindex + "0"} changeScore={(jason, jindex) => setClassAttrScore(jason, jindex)}></Attribute>
                )

            })}
        </View>
    )

}

function Attribute(props) {
    let index = props.index
    let jindex = props.jindex
    let jason1 = props.jason
    let attr = props.attr
    const [score, setScore] = React.useState(attr.score)
    const setAttrScore = (score) => {
        attr.score = score
        setScore(score)
        jason1[jindex].attributes[index] = attr
        props.changeScore(jason1, jindex)
    }
    return (
        <DataTable.Row>
            <DataTable.Cell>
                {props.class}
            </DataTable.Cell>
            <DataTable.Cell>
                {attr.attributeName}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center' }}>
                {attr.accessModifier}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center' }}>
                {attr.type}
            </DataTable.Cell>


            <TextInput
                style={styles.input}
                onChangeText={score => {
                    if (parseInt(score) >= 0) {
                        setAttrScore(parseInt(score))
                    }
                }}
                value={score.toString()}
                keyboardType="numeric"
            />

        </DataTable.Row>
    )
}
function MethodsTable(props) {
    let index = props.index
    let jason1 = props.jaSon
    let jason = props.jaSon[index]
    let name = jason.name
    const setClassMethodScore = (jason, index) => {
        jason1[index] = jason[index]
        props.changeScore(jason1, index)
    }
    return (
        <View>
            {jason.methods.map((method, mindex) => {
                return (
                    <Method method={method} class={name} index={mindex} jindex={index} jason={jason1} key={mindex + "1"} changeScore={(jason, jindex) => setClassMethodScore(jason, jindex)}></Method>
                )

            })}
        </View>
    )

}

function Method(props) {
    let index = props.index
    let jindex = props.jindex
    let jason1 = props.jason
    let method = props.method
    const [score, setScore] = React.useState(method.score)
    const setMethodScore = (score) => {
        method.score = score
        setScore(score)
        jason1[jindex].methods[index] = method
        props.changeScore(jason1, jindex)
    }
    return (
        <DataTable.Row>
            <DataTable.Cell>
                {props.class}
            </DataTable.Cell>
            <DataTable.Cell>
                {method.methodName}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center' }}>
                {method.accessModifier}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center' }}>
                {method.returnType}
            </DataTable.Cell>


            <TextInput
                style={styles.input}
                onChangeText={score => {
                    if (parseInt(score) >= 0) {
                        setMethodScore(parseInt(score))
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
        marginTop: 20,
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
        marginRight: "7.5%",
        justifyContent: 'center'
    },
});

export default AccordionClass;