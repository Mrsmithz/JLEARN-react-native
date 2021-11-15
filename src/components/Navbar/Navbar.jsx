import React from "react";
import { Text } from "@ui-kitten/components";

import { Box, Stack } from 'native-base';
// import { Icon } from 'react-native-eva-icons';
import { Avatar } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';
import { TouchableOpacity } from "react-native";
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

function Navbar(props) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const backPreviousScreen = () => {
    props.props.navigation.dispatch(StackActions.pop(1))
  }
  const back = () => {
    backPreviousScreen()
  }
  const ProfileIcon = (props) => (
    <Icon {...props} name='people-outline' />
  );
  const LogoutIcon = (props) => (
    <Icon {...props} name='log-out' />
  );
  const MenuIcon = (props) => (
    <TouchableOpacity onPress={toggleMenu}>
      <Avatar
        rounded
        title="MD"
        overlayContainerStyle={{ backgroundColor: 'grey' }}
      />
    </TouchableOpacity>

  );
  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} />
  );
  const logout = () => {
    props.props.navigation.navigate("LoginScreen")
  }
  return (
    <Box height='119' borderBottomRadius='20' bg='#FFB284' width="100%" style={{ flexDirection: 'column' }} >
      <Stack direction="row" style={{ marginRight: 20, marginTop: 35, alignItems: "center", justifyContent: "center" }}>
        <Stack direction="column" style={{ flex: 1, height: 35 }}>
          {props.back ?
            <Icon name="arrow-ios-back-outline" fill='snow' onPress={() => back()} />
            : null}
        </Stack>
        <Stack direction="column" style={{ flex: 5, alignItems: "center" }}>
          <Text style={{ fontWeight: 'bold' }}>{props.header}</Text>
        </Stack>
        <Stack direction="column" style={{ flex: 1, height: 35 }}>
          <OverflowMenu
            anchor={renderMenuAction}
            visible={menuVisible}
            onBackdropPress={toggleMenu}>
            <MenuItem accessoryLeft={ProfileIcon} title='Profile' />
            <MenuItem accessoryLeft={LogoutIcon} title='Logout' onPress={logout}/>
          </OverflowMenu>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Navbar;
