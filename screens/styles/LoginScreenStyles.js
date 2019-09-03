import { StyleSheet } from 'react-native';
import {Colors,Layout} from '../../constants';
import {
  CommonStyles
} from './CommonStyles';

export default StyleSheet.create({
  ...CommonStyles,
  registerFontStyle: { color: Colors.mediumGrey },
  registerButton: { width: '100%', paddingTop: 48, alignItems: 'center' },
  buttonContainer: {paddingTop: 48},
  tabContainer: {flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth:1, borderBottomColor: Colors.mediumGrey, marginBottom: 48},
  tabItem: { flex: 0.5, alignItems: 'flex-start', paddingVertical: 8, borderBottomWidth:3 },
  tabTitle: {fontSize: 20, paddingLeft: 8, color: Colors.mediumGrey}
});