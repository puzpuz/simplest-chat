import React from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import * as Icon from '@expo/vector-icons'
import AppNavigator from './navigation/AppNavigator';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Colors } from './constants';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      console.log('finish');
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
          </PersistGate>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([ ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
      })
    ]);
  };
  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pureWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
