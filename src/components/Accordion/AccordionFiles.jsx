import * as React from 'react';
import { List } from 'react-native-paper';
import { Box, NativeBaseProvider, Center, Stack, HStack, Text } from 'native-base';
import {
    StyleSheet,
} from "react-native";
import { Link } from 'native-base';
const AccordionFiles = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handlePress = () => setExpanded(!expanded);
    const icon = props.icon
    const color = props.color
    const files = props.files
    return (
        <List.Section >
            <List.Accordion
                style={[styles.card, !expanded ? { borderRadius: 10 } : null, { backgroundColor: color }]}
                title={props.title}
                expanded={expanded}
                onPress={handlePress}
                left={props => <List.Icon {...props} icon={icon} />}>
                <Box style={[styles.Box, { backgroundColor: color }]}>
                    {files.map((file, index) => {
                        return (<Link
                            _text={{
                                color: "blue.400",
                            }}
                            key={index}
                        >
                            Materail1.pdf
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
    }
});

export default AccordionFiles;