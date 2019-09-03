import { StyleSheet } from 'react-native';
import {Colors, Layout} from '../../constants';

export default StyleSheet.create({
  container: { flexDirection: 'column', marginBottom: 16, width: '100%', },
  title: {
    color: Colors.buttonTextColor, fontSize: Layout.fontContentSmall
  },
  input: { 
    borderBottomColor:Colors.mediumGrey, 
    borderBottomWidth:1, 
    fontSize:Layout.fontContentMedium, 
    width: '100%', 
    color:Colors.mediumGrey,
    lineHeight: Layout.fontContentMedium + 4
  },
  errorMessage: {
    color: '#ff0000',
    fontSize: Layout.fontContentSmall
  }
});