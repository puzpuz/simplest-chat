import React, { PureComponent } from 'react';
import { Button } from 'react-native-elements';

import styles from './styles/ButtonCustomStyles';

export default class ButtonCustom extends PureComponent {
  render() {
    const { title, onPress, loading, containerStyles, buttonStyles,disabled, icon} = this.props;
    return(
      <Button 
        icon={icon}
        disabled={disabled}
        title={title}
        onPress={onPress}
        large
        containerStyle={[styles.buttonContainer, containerStyles]}
        buttonStyle={[styles.buttonSolid, buttonStyles]}
        titleStyle={styles.buttonTitle}
        loading={loading}
        type='solid'
      />
    );
  }
}