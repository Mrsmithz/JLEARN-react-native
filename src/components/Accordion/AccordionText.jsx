import * as React from 'react';
import { List } from 'react-native-paper';
import { Box, NativeBaseProvider, Center, Stack, HStack, Text } from 'native-base';
import {
  StyleSheet,
  View
} from "react-native";
const AccordionText = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);
  const icon = props.icon
  const color = props.color
  const text = props.text
  return (
    <List.Section >
      <List.Accordion
        style={[styles.card, !expanded ? { borderRadius: 10 } : null, { backgroundColor: color }]}
        title={props.title}
        titleStyle={{ fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif", marginTop:2 }}
        expanded={expanded}
        onPress={handlePress}
        theme={{ colors: { background: 'transparent', primary: '#0C7B93' } }}
        left={props => <List.Icon {...props} icon={icon} />}>
        <Box style={[styles.Box, { backgroundColor: color }]}>
          <Text style={styles.text}>{text}</Text>
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
    justifyContent: 'center',
    borderBottomColor: 'red',
  },
  Box: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    marginBottom: 10,
    fontFamily: (Platform.OS === "ios") ? "Palatino" : "serif",
  }
});

export default AccordionText;