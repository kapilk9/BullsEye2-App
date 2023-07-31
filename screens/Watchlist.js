import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../constants';
import {useNavigation} from '@react-navigation/native';
import Tab_View from '../Src/TabScreens/Tab_View';

const Watchlist = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.searchInputContainer}
          onPress={() => navigation.navigate('SearchData')}>
          <Icon2 name="search" size={18} color="#fff" />

          <Text style={styles.searchInput}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View
            style={{
              width: 35,
              height: 35,
              borderRadius: 17,
              backgroundColor: COLORS.bgColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon3 name="user" size={25} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
      <Tab_View />
    </View>
  );
};

export default Watchlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  searchInputContainer: {
    width: 220,
    height: 35,
    backgroundColor: COLORS.bgColor,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  searchInput: {
    width: '90%',
    paddingLeft: 10,
    color: COLORS.white,
  },
  tabBar: {
    backgroundColor: COLORS.bgColor,
  },
  tabLabel: {
    color: '#fff',
  },
  tabIndicator: {
    backgroundColor: '#fff',
  },
});
