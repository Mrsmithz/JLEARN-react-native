import React, { Component } from "react";
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

// import store, { persistor } from '../src/store/index';
// import LoadingView from './base_components/LoadingView';
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { configureFonts, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Router from "./src/routes/router";
import { NativeBaseProvider } from "native-base";
import { createStore, combineReducers } from "redux";
import { Provider as ReduxProvider } from "react-redux";

import tokenReducer from "./src/store/reducers/tokenReducer";

const rootReducer = combineReducers({
  tokenReducer: tokenReducer,
});
// const fontConfig = {
//   web: {
//     regular: {
//       fontFamily: 'sans-serif',
//       fontWeight: 'normal',
//     },
//     medium: {
//       fontFamily: 'sans-serif-medium',
//       fontWeight: 'normal',
//     },
//     light: {
//       fontFamily: 'sans-serif-light',
//       fontWeight: 'normal',
//     },
//     thin: {
//       fontFamily: 'sans-serif-thin',
//       fontWeight: 'normal',
//     },
//   },
//   ios: {
//     regular: {
//       fontFamily: 'sans-serif',
//       fontWeight: 'normal',
//     },
//     medium: {
//       fontFamily: 'sans-serif-medium',
//       fontWeight: 'normal',
//     },
//     light: {
//       fontFamily: 'sans-serif-light',
//       fontWeight: 'normal',
//     },
//     thin: {
//       fontFamily: 'sans-serif-thin',
//       fontWeight: 'normal',
//     },
//   },
//   android: {
//     regular: {
//       fontFamily: 'sans-serif',
//       fontWeight: 'normal',
//     },
//     medium: {
//       fontFamily: 'sans-serif-medium',
//       fontWeight: 'normal',
//     },
//     light: {
//       fontFamily: 'sans-serif-light',
//       fontWeight: 'normal',
//     },
//     thin: {
//       fontFamily: 'sans-serif-thin',
//       fontWeight: 'normal',
//     },
//   }
// };
const store = createStore(rootReducer);
// const theme = {
//   ...DefaultTheme,
//   fonts: configureFonts(fontConfig),
// };
export default class App extends Component {
  render() {
    return (
        <ReduxProvider store={store}>
          <NativeBaseProvider>
            <PaperProvider>
              <IconRegistry icons={EvaIconsPack} />
              <ApplicationProvider {...eva} theme={eva.light}>
                <Router></Router>
              </ApplicationProvider>
            </PaperProvider>
          </NativeBaseProvider>
        </ReduxProvider>
    );
  }
}
