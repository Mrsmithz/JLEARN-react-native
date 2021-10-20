import * as React from 'react';
import { List } from 'react-native-paper';
import { Box, NativeBaseProvider, Center, Stack, HStack, Text } from 'native-base';
import {
  StyleSheet,
} from "react-native";
const MyComponent = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);
  const icon = props.icon
  const color = props.color
  return (
    <List.Section >
      <List.Accordion
        style={[styles.card, !expanded ? {borderRadius:10} : null, {backgroundColor:color}]}
        title={props.title}
        expanded={expanded}
        onPress={handlePress}
        left={props => <List.Icon {...props} icon={icon} />}>
        <Box style={[styles.Box, {backgroundColor:color}]}>
          <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Text>
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
    height:50,
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

export default MyComponent;