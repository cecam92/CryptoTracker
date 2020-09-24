import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';
import Colors from '../../res/color';
import CoinsSearch from './CoinsSearch';
const CoinsScreen = ({navigation}) => {
  const [coins, setCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCoins() {
    setLoading(true);
    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    setCoins(res.data);
    setAllCoins(res.data);
    setLoading(false);
  }
  const handlePress = (coin) => {
    navigation.navigate('CoinDetail', {coin});
  };

  useEffect(() => {
    getCoins();
  }, []);

  function handleSearch(query) {
    const coinsFiltered = allCoins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });
    setCoins(coinsFiltered);
  }
  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />
      {loading ? (
        <ActivityIndicator style={styles.loader} color="primary" size="large" />
      ) : null}
      <FlatList
        keyExtractor={(coins) => coins.id}
        data={coins}
        renderItem={({item}) => (
          <CoinsItem item={item} onPress={() => handlePress(item)} />
        )}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blackPearl,
    shadowColor: Colors.blackPearl,
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
