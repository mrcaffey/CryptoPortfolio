import React from 'react';
import { StyleSheet, View } from 'react-native';
import Auth from './components/Auth'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Auth type="Login" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
