import React from "react";
import { Text } from "@ui-kitten/components";

import { Box, Stack } from 'native-base';
import { Icon } from 'react-native-eva-icons';
import { Avatar } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';


function Navbar(props) {
  const backPreviousScreen = () => {
    props.props.navigation.dispatch(StackActions.pop(1))
  } 
  const back = () =>{
    backPreviousScreen()
  }
  return (
    <Box height='119' borderBottomRadius='25' bg='#FFB284' width="100%" style={{ flexDirection: 'column' }} >
      <Stack direction="row" style={{ marginRight: 20, marginTop: 35, alignItems: "center", justifyContent: "center" }}>
        <Stack direction="column" style={{ flex: 1, height: 35 }}>
          {props.back ?
            <Icon name="arrow-ios-back-outline" fill='snow' onPress={()=>back()}/>
            : null}
        </Stack>
        <Stack direction="column" style={{ flex: 5, alignItems: "center" }}>
          <Text style={{ fontWeight: 'bold' }}>{props.header}</Text>
        </Stack>
        <Stack direction="column" style={{ flex: 1, height: 35 }}>
          <Avatar
            rounded
            title="MD"
            overlayContainerStyle={{ backgroundColor: 'grey' }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

export default Navbar;
