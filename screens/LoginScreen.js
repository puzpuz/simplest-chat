import React, { Component } from 'react';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Header } from 'react-native-elements'

import { FormItem, ButtonCustom } from '../components';
import { Colors } from '../constants';

import { login } from '../actions';
import styles from './styles/LoginScreenStyles';
import firebaseService from '../services/firebaseService';

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state=({
      emailLogin: '',
      passwordLogin: '',
      emailRegister: '',
      passwordRegister: '',
      name: '',
      loginError: '',
      registerError: '',
      loadingLogin: false,
      loadingRegister: false,
      selectedMenu: 0,
      avatar: ''
    })
    this.onLoginPressed = this.onLoginPressed.bind(this);
    this.onRegisterPressed = this.onRegisterPressed.bind(this);
    this.onChangeEmailLogin = this.onChangeEmailLogin.bind(this);
    this.onChangePasswordLogin = this.onChangePasswordLogin.bind(this);
    this.onChangeEmailRegister = this.onChangeEmailRegister.bind(this);
    this.onChangePasswordRegister = this.onChangePasswordRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.renderRegister = this.renderRegister.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.toggleMenuLogin = this.toggleMenuLogin.bind(this);
    this.toggleMenuRegister = this.toggleMenuRegister.bind(this);
  }

  toggleMenuRegister() {
    this.setState({
      selectedMenu: 1,
      emailRegister: '',
      passwordRegister: '',
      registerError: '',
    })
  }
  toggleMenuLogin() {
    this.setState({
      selectedMenu: 0,
      emailLogin: '',
      passwordLogin: '',
      loginError: '',
    })
  }

  async onRegisterPressed() {
    const { name, emailRegister, passwordRegister, avatar } = this.state
    if( name === '' || emailRegister === '' || passwordRegister === '') {
      this.setState({
        registerError: 'Please fill all input'
      })
    } else {
      this.setState({
        loadingRegister: true,
        registerError: ''
      })
      const user= {
        name: name,
        email: emailRegister,
        password: passwordRegister,
        avatar: avatar,
      }
      firebaseService.register(
        user,
        this.registerSuccess,
        this.registerFailed
      )
  
    }
  }
  registerSuccess = (data) => {
    console.log(data);
    this.setState({
      loadingRegister: false,
      loginError: ''
    })
    this.props.login({
      name: this.state.name,
      email: this.state.emailRegister,
      id: firebaseService.uid,
    })
    this.props.navigation.navigate('Chat', {
      name: this.state.name,
      email: this.state.emailRegister,
    });
  };

  registerFailed = ({code, message}) => {
    console.log(`Error register ${code}:${message}`);
    this.setState({
      loadingRegister: false,
      registerError: message
    })
  };
  async onLoginPressed() {
    const { emailLogin, passwordLogin } = this.state
    if( emailLogin === '' || passwordLogin ==='') {
      this.setState({
        loginError: 'Please fill all input'
      })
    } else {
      this.setState({
        loadingLogin: true,
        loginError: ''
      })
      const user= {
        email: emailLogin,
        password: passwordLogin,
      }
      console.log(user);
      firebaseService.login(
        user,
        this.loginSuccess,
        this.loginFailed
      )
  
    }
  }

  loginSuccess = (data) => {
    const { name, emailLogin } = this.state;
    console.log(data);
    this.setState({
      loadingLogin: false,
      loginError: ''
    })
    this.props.login({
      name: name,
      email: emailLogin,
      id: firebaseService.uid,
    })
    this.props.navigation.navigate('Chat', {
      name: name,
      email: emailLogin,
    });
  };

  loginFailed = ({code, message}) => {
    this.setState({
      loadingLogin: false,
      loginError: 'Login Failed'
    })
  };

  onChangeName(value) {
    this.setState({name: value});
  }

  onChangeEmailLogin(value) {
    this.setState({emailLogin: value});
  }

  onChangePasswordLogin(value) {
    this.setState({passwordLogin: value});
  }
  onChangeEmailRegister(value) {
    this.setState({emailRegister: value});
  }

  onChangePasswordRegister(value) {
    this.setState({passwordRegister: value});
  }
  componentDidMount() {
    if(this.props.user.id) {
      this.props.navigation.navigate('Chat', {
        name: this.props.user.name,
        email: this.props.user.email,
      });
    }
  }

  
  renderRegister() {
    const { emailRegister, passwordRegister, name, loadingRegister, registerError} = this.state;
    return(
      <View>
        <FormItem 
          placeholder={'Name'} 
          containerStyles={{}}
          onChangeText={this.onChangeName}
          value={name}
        />
        <FormItem 
          placeholder={'Email Address'} 
          textContentType={'emailAddress'}
          containerStyles={{}}
          keyboardType={'email-address'}
          onChangeText={this.onChangeEmailRegister}
          value={emailRegister}
        />
        <FormItem 
          placeholder={'Password'}
          secureTextEntry
          textContentType={'password'}
          containerStyles={{}}
          onChangeText={this.onChangePasswordRegister}
          value={passwordRegister}
        />
        <ButtonCustom 
          title={'REGISTER'}
          loading={loadingRegister}
          onPress={this.onRegisterPressed}
          containerStyles={{paddingTop: 48}}
        />

        <Text style={styles.errorMessage}>{registerError}</Text>
      </View>
    )
  }

  renderLogin() {
    const { emailLogin, passwordLogin, loadingLogin, loginError} = this.state;
    return(
      <View>
        <FormItem 
          placeholder={'Email Address'} 
          textContentType={'emailAddress'}
          containerStyles={{}}
          keyboardType={'email-address'}
          onChangeText={this.onChangeEmailLogin}
          value={emailLogin}
        />
        <FormItem 
          placeholder={'Password'}
          secureTextEntry
          textContentType={'password'}
          containerStyles={{}}
          onChangeText={this.onChangePasswordLogin}
          value={passwordLogin}
        />
        <ButtonCustom 
          title={'LOGIN'}
          loading={loadingLogin}
          onPress={this.onLoginPressed}
          containerStyles={styles.buttonContainer}
        />
        <Text style={styles.errorMessage}>{loginError}</Text>
      </View>
      
    )
  }

  render(){
    const { selectedMenu } = this.state;
    return(
      <View style={styles.container}>
        <Header 
          containerStyle={styles.header} 
          centerComponent={{ text: 'LOGIN', style: styles.headerTitle  }}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tabItem, { borderBottomColor: selectedMenu === 0 ? Colors.mediumGrey : Colors.transparent }]}
              onPress={this.toggleMenuLogin}
            >
              <Text style={styles.tabTitle}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabItem, { borderBottomColor: selectedMenu === 1 ? Colors.mediumGrey : Colors.transparent }]}
              onPress={this.toggleMenuRegister}
            >
            <Text style={styles.tabTitle}>Register</Text>
            </TouchableOpacity>
          </View>
          {selectedMenu === 1 ? this.renderRegister() : this.renderLogin()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.AuthenticationReducers;
  return { user };
};

export default connect(mapStateToProps, {login})(LoginScreen)