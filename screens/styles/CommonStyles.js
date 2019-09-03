
import {Colors,Layout} from '../../constants';

const CommonStyles = {
  container: {
    // flexDirection: 'column',
    width: '100%',
    flex: 1,
    backgroundColor: Colors.pureWhite,
  },
  scrollContainer: {
    paddingVertical: 24,
    paddingHorizontal: 24
  },
  header: { backgroundColor: Colors.pureWhite,borderBottomWidth:1 },
  headerTitle: { color: Colors.pitchBlack },
  errorMessage: {textAlign:'center', color: Colors.red, fontSize: 18},
  headerIcon: {paddingVertical: 8, paddingHorizontal: 16},
}

export {CommonStyles};
