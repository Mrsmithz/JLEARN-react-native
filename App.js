import React, { Component } from "react";
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

// import store, { persistor } from '../src/store/index';
// import LoadingView from './base_components/LoadingView';
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
} from "@ui-kitten/components";
import { Provider as PaperProvider } from "react-native-paper";
import Router from "./src/routes/router";
import { NativeBaseProvider} from 'native-base';


export default class App extends Component {
  render() {
    return (
      <NativeBaseProvider>
        <PaperProvider>
          <ApplicationProvider {...eva} theme={eva.light}>
            <Router></Router>
          </ApplicationProvider>
        </PaperProvider>
      </NativeBaseProvider>
    );
  }
}
