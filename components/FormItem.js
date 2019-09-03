import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';
import styles from './styles/FormItemStyles';
export default class FormItem extends PureComponent {
  render() {
    const { placeholder, errorMessage, secureTextEntry, textContentType,onChangeText,value, containerStyles, keyboardType, title } = this.props;
    return (
      <View style={[styles.container, containerStyles]}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}             
          style={styles.input}
          textContentType={textContentType}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
        />
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
    );    
  }
}