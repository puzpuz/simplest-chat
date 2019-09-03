import { StyleSheet } from 'react-native';
import {Colors,Layout} from '../../constants';

export default StyleSheet.create({
  buttonContainer: { marginBottom: Layout.paddingComponent },
  buttonSolid: { backgroundColor: Colors.pitchBlack, height: 50 },
  buttonTitle: { color: Colors.pureWhite, fontSize: Layout.fontContentSmall },
});
