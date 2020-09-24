import React from 'react';
import {View, Text, StyleSheet, Pressable, Image, Platform} from 'react-native';
import Colors from '../../res/color';

const CoinsItem = ({item, onPress}) => {
  const getImgArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('../../assets/arrow_up.png');
    } else {
      return require('../../assets/arrow_down.png');
    }
  };
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symboText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>`${item.price_usd}`</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percenText}>{item.percent_change_1h}</Text>
        <Image style={styles.imageIcon} source={getImgArrow()} />
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
    paddingLeft: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    color: Colors.white,
    fontSize: 14,
    marginRight: 16,
  },
  symboText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  percenText: {
    color: Colors.white,
    marginRight: 8,
  },
  priceText: {
    color: Colors.white,
  },
  imageIcon: {
    width: 22,
    height: 22,
  },
});
export default CoinsItem;
