import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { 
  NativeRouter, 
  Switch, 
  Route, 
} from 'react-router-native'
import Auth from './components/Auth'
import { Provider } from 'react-redux'
import store from './store'
import { initMiddleware } from 'devise-axios'
import Coins from './components/Coins'
import ProtectedRoute from './components/ProtectedRoute'
import FetchUser from './components/FetchUser'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    initMiddleware({ storage: AsyncStorage })
  }

  render() {
    return (
      <Provider store={store}>
        <FetchUser>
          <NativeRouter>
            <View style={styles.container}>
              <Switch>
                <ProtectedRoute 
                  exact 
                  path="/"
                  component={Coins}
                />
                <Route
                  exact
                  path="/"
                  render={ (props) => <Auth {...props} type="Login" /> }
                />
                <Route
                  exact
                  path="/login"
                  render={ (props) => <Auth {...props} type="Login" /> }
                />
                <Route
                  exact
                  path="/register"
                  render={ (props) => <Auth {...props} type="Register" /> }
                />
              </Switch>
            </View>
          </NativeRouter>
        </FetchUser>
      </Provider>
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
