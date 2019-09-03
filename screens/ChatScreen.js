import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import firebaseService from '../services/firebaseService';

import {
  View,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';
import { 
  Header
} from 'react-native-elements'

import { logout } from '../actions';
import { Colors } from '../constants';
import styles from './styles/ChatScreenStyles';

class ChatScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state=({
      messages: [],
    })
    this.logout = this.logout.bind(this);
  }

  logout() {
    firebaseService.onLogout();
    this.props.logout();
    this.props.navigation.navigate('Login');
  }

  componentDidMount() {
    firebaseService.refOn(message => {
      this.setState(prevState => ({
        messages: GiftedChat.append(prevState.messages, message)
      }))
    })
  }
  componentWillMount() {
    firebaseService.refOff();
  }

  renderSend(props) {
    return(
      <Send
        {...props}
        textStyle={styles.sendButton}
      />
    )
  }
  
  renderBubble(props) {
    return(
      <View>
        <Bubble 
          {...props}
          wrapperStyle={
            { right: styles.bubbleRight}
          }
        />
      </View>
    )
  }

  render(){
    const { navigation } = this.props;
    const { messages } = this.state;
    const params = navigation.state.params;
    const user = {
      name: params.name,
      email: params.email,
      id: firebaseService.uid,
      _id: firebaseService.uid,
    }
    const chatComponent = (
      <GiftedChat 
        messages={messages}
        onSend={firebaseService.send}
        user={user}
        renderBubble={this.renderBubble}
        renderSend={this.renderSend}
      />
    )
    return(
      <View style={styles.container}>
        <Header 
          containerStyle={styles.header} 
          centerComponent={{ text: 'CHAT ROOM', style: styles.headerTitle  }}
          rightComponent={
            <TouchableWithoutFeedback onPress={this.logout}>
              <Ionicons size={18} color={Colors.pitchBlack} name='ios-log-out' style={styles.headerIcon}/>
            </TouchableWithoutFeedback>}
        />
        {
          Platform.OS === 'android' ? 
          <KeyboardAvoidingView style={styles.wrapper} behavior='padding' enabled>
            {chatComponent}
          </KeyboardAvoidingView>:
          <SafeAreaView style={styles.wrapper}>
            {chatComponent}
          </SafeAreaView>
        }
      </View>
    );
  }
}



const mapStateToProps = state => {
  const { user } = state.AuthenticationReducers;
  return { user };
};

export default connect(mapStateToProps, {logout})(ChatScreen)