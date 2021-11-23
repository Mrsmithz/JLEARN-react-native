import React, { useEffect } from 'react';
import { List } from 'react-native-paper';
import { Box, NativeBaseProvider, Center, Stack, HStack, Text } from 'native-base';
import {
    StyleSheet,
} from "react-native";
import FilesService from "../../service/FilesService"
import { Link } from 'native-base';
const AccordionCodeFiles = (props) => {
    const [expanded, setExpanded] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);
    const icon = props.icon
    const color = props.color
    const [files, setFiles] = React.useState([])
    const getFiles = async () => {
        let result = await Promise.all(props.files.map(async (file) => {
            let pdf = await FilesService.getCodeDetail(file.id)
            return { id: file.id, name: pdf.data.filename }
        }))
        setFiles(result)
    }
    useEffect(() => {
        if (props.files) {
            getFiles()
        }
    }, [props.files])
    return (
        <List.Section >
            <List.Accordion
                style={[styles.card, !expanded ? { borderRadius: 10 } : null, { backgroundColor: color }]}
                title={props.title}
                expanded={expanded}
                onPress={handlePress}
                theme={{colors:{background:'transparent', primary:'#AE4CCF'}}}
                left={props => <List.Icon {...props} icon={icon} />}>
                <Box style={[styles.Box, { backgroundColor: color }]}>
                    {files.map((file, index) => {
                        return (<Link
                            _text={{
                                color: "blue.400",
                            }}
                            key={index}
                            style={styles.files}
                        >
                            {file.name}
                        </Link>
                        )
                    })}
                </Box>
            </List.Accordion>

        </List.Section>
    );
};
const styles = StyleSheet.create({
    cardLayout: {
        width: "90%",
        alignSelf: "center",
    },
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
    image: {
        flex: 2, height: 120
    },
    assignmentLayout: {
        width: "100%",
        alignSelf: "center",
    },
    files: {
        marginBottom: 10
    }
});

export default AccordionCodeFiles;