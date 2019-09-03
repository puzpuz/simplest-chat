import { Platform, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Layout = {
  topBarHeight: Platform.OS === 'ios' ? 0 : 27,
  window: {
    width,
    height,
  },
  fontTitleBig: 48,
  fontTitleSmall: 24,
  fontContentMedium: 16,
  fontContentSmall: 12
};

export { Layout }
