import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import {Button} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

class DrawerContent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button  title="2">Back</Button>
        {/* <Button onPress={Actions.main_home}>Switch to Home</Button>
        <Button onPress={Actions.main_links}>Switch to Links</Button>
        <Button onPress={Actions.main_settings}>Switch to Settings</Button> */}
      </View>
    );
  }
}

export default DrawerContent;