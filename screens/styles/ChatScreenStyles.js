import { StyleSheet } from 'react-native';
import {Colors,Layout} from '../../constants';
import {
  CommonStyles
} from './CommonStyles';

export default StyleSheet.create({
  ...CommonStyles,
  wrapper: {flex: 1},
  bubbleRight: { backgroundColor: Colors.pitchBlack},
  sendButton: { color: Colors.pitchBlack }
});