import React, { useEffect } from "react";
import { Text } from "@ui-kitten/components";

import { Box, Stack } from 'native-base';
// import { Icon } from 'react-native-eva-icons';
import { Avatar } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import API from "../../service/API"
import useSWR from 'swr'
import Fetcher from "../../service/Fetcher"

function Navbar(props) {
  const url = API.User.getUser
  const { data, error } = useSWR(url, Fetcher)
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [picture, setPicture] = React.useState(null);
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
        source={{
          uri:
            data ? data.picture : null,
        }}
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
  useEffect(() => {
    if (data !== undefined) {
      console.log(Platform.OS)
      setPicture(data.picture)
    }
  }, [data])
  const styles = StyleSheet.create({
    text: {
      fontWeight: 'bold',
      fontFamily: (Platform.OS === "ios") ? "Georgia" : "serif"
    }

  });
  return (
    <Box height='100' borderBottomRadius='20' bg='#FFB284' width="100%" style={{ flexDirection: 'column' }} >
      <Stack direction="row" style={{ marginRight: 20, marginTop: 40, alignItems: "center", justifyContent: "center" }}>
        <Stack direction="column" style={{ flex: 1, height: 35 }}>
          {props.back ?
            <Icon name="arrow-ios-back-outline" fill='snow' onPress={() => back()} />
            : null}
        </Stack>
        <Stack direction="column" style={{ flex: 5, alignItems: "center", marginLeft:30 }}>
          <Text style={styles.text}>{props.header}</Text>
        </Stack>
        <Stack direction="column" style={{ flex: 1, height: 35 }}>
          <OverflowMenu
            anchor={renderMenuAction}
            visible={menuVisible}
            onBackdropPress={toggleMenu}>
            <MenuItem accessoryLeft={ProfileIcon} title='Profile' />
            <MenuItem accessoryLeft={LogoutIcon} title='Logout' onPress={logout} />
          </OverflowMenu>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Navbar;
