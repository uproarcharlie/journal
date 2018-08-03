import React, { Component } from 'react';
import {  View, Text, StyleSheet, Button } from 'react-native';

import CreateUser from './CreateUser';
import LoginUser from './LoginUser';


export default class Login extends Component {
state = {
    register: true
};

  render() {
    return (
      <View style={styles.container}>
      {this.state.register ?  <CreateUser /> : <LoginUser />}
      <Button
      onPress={() => this.setState ({
          register: !this.state.register
      })}
      title={this.state.register ? 'Login' : 'Register'}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});
