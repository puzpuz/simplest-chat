import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';

const switchNavigator = createSwitchNavigator({
  Login:LoginScreen,
  Chat: ChatScreen,
})

export default createAppContainer(switchNavigator);