import React, {useState} from 'react';

import {View, TextInput, Platform, StyleSheet} from 'react-native';

import Colors from '../../res/color';
const CoinsSearch = ({onChange}) => {
  const [query, setQuery] = useState();

  function handleText(query) {
    setQuery(query);
    if (onChange) {
      onChange(query);
    }
  }
  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS == 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        onChangeText={handleText}
        value={query}
        placeholder="Search coin"
        placeholderTextColor="white"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    color: Colors.white,
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 16,
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});
export default CoinsSearch;
