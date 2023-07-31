import React, {useState} from 'react';

import {
    SafeAreaView, StyleSheet, ScrollView, View, Dimensions, Text
} from 'react-native';
import { Card } from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import {AntDesign, FontAwesome, Foundation} from "@expo/vector-icons";
import LiveTrade from "./TradeScreens/LiveTrade";
import PastTrade from "./TradeScreens/PastTrade";




const initialLayout = { width: Dimensions.get('window').width };

const MyTradesScreen = (props) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Live Trades' },
        { key: 'second', title: 'Past Trades' },
    ]);

    const renderScene = SceneMap({
        first: LiveTrade,
        second: PastTrade,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}

        />
    );
};
export default MyTradesScreen;