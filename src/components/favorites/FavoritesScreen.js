import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import CoinsItem from '../coins/CoinsItem';
import Colors from '../../res/color';
import Storage from '../../libs/storage';

const favoritesScreen = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);

  async function getFavorites() {
    try {
      const allKeys = await Storage.instance.getAllkeys();
      const keys = allKeys.filter((key) => key.includes('favorite-'));
      const favs = await Storage.instance.multiGet(keys);
      setFavorites(favs.map((fav) => JSON.parse(fav[1])));
    } catch (error) {
      console.log('GetFavorites error', error);
    }
  }
  console.log('favs', favorites);

  const handlePress = (coin) => {
    navigation.navigate('CoinDetail', {coin});
  };
  useEffect(() => {
    getFavorites();
    navigation.addListener('focus', getFavorites);
    return () => {
      navigation.removeListener('focus', getFavorites);
    };
  }, []);

  return (
    <View style={styles.container}>
      {favorites.length == 0 ? (
        <FavoritesEmptyState />
      ) : (
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
});
export default favoritesScreen;
