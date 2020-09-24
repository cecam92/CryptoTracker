import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  SectionList,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import Colors from '../../res/color';
import Http from '../../libs/http';
import Storage from '../../libs/storage';
import CoinMarketItem from '../CoinDetail/CoinMarketItem';

const CoinDetailScreen = ({route, navigation}) => {
  const {coin} = route.params;
  const [markets, setMarkets] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const key = `favorite-${coin.id}`;
  const jsonCoin = JSON.stringify(coin);
  function getSymbolIcon(coinNameId) {
    if (coinNameId) {
      return `https://c1.coinlore.com/img/25x25/${coinNameId}.png`;
    }
  }
  useEffect(() => {
    navigation.setOptions({title: coin.symbol});
    getMarket(coin.id);
    getFavorite();

    return () => {};
  }, []);
  function getSection(coin) {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24',
        data: [coin.percent_change_24h],
      },
    ];
    return sections;
  }
  async function getMarket(coinId) {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    setMarkets(markets);
  }

  async function addFavorite() {
    const stored = await Storage.instance.store(key, jsonCoin);
    console.log('Strored', stored);
    if (stored) {
      setIsFavorite(true);
    }
  }
  async function removeFavorite() {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          await Storage.instance.remove(key);
          setIsFavorite(false);
        },
        style: 'destructive',
      },
    ]);
  }

  async function getFavorite() {
    try {
      const favStr = await Storage.instance.get(key);
      if (favStr != null) {
        setIsFavorite(true);
      }
    } catch (error) {
      throw Error('getFavorite error', error);
    }
  }

  const toogleFavorite = () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.coinImage}
            source={{uri: getSymbolIcon(coin.nameid)}}
          />
          <Text style={styles.nameText}>{coin.name}</Text>
        </View>
        <Pressable
          onPress={toogleFavorite}
          style={[
            styles.btnFavorite,
            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}>
          <Text style={styles.btnFavoriteText}>
            {isFavorite ? 'Remove favorite' : 'Add favorite'}
          </Text>
        </Pressable>
      </View>
      <SectionList
        style={styles.section}
        keyExtractor={({item}) => item}
        sections={getSection(coin)}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={styles.marketsTitle}>Markets</Text>
      <FlatList
        keyExtractor={(markets) => markets.length}
        style={styles.list}
        horizontal
        data={markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coinImage: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  nameText: {
    color: Colors.white,
  },
  sectionHeader: {
    backgroundColor: ' rgba(0, 0, 0, 0.2),',
    padding: 8,
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketsTitle: {
    color: Colors.white,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 16,
    fontSize: 16,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
});
export default CoinDetailScreen;
