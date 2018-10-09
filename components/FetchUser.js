import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../reducers/user';
import axios from 'axios'

class FetchUser extends Component {
  state = { loaded: false };

  componentDidMount = async () => {
    const { isAuthenticated, dispatch } = this.props;
    if (isAuthenticated) {
      this.loaded()
    } else {
      const hasToken = await this.checkLocalToken()
      if (hasToken) {
        axios.get('http://localhost:3001/api/auth/validate_token')
          .then( async res => {
            await dispatch(login(res.data.data))
            this.loaded()
          }).catch( (err) => { 
            this.loaded() } )
      } else {
        this.loaded()
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.loaded) this.loaded();
  }

  checkLocalToken = async () => {
    const token = await AsyncStorage.getItem('access-token')
    return token
  }

  loaded = () => {
    this.setState({ loaded: true });
  }

  render() {
    return this.state.loaded ? this.props.children : <View><Text>Not loaded</Text></View>;
  }
}

const mapStateToProps = state => {
  return { isAuthenticated: state.user.id };
};

export default connect(mapStateToProps)(FetchUser);