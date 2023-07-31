import React, {useState} from 'react';

import {
    SafeAreaView, StyleSheet, ScrollView, View, Dimensions, Text, Button, TextInput, Image, Platform
} from 'react-native';
import { Card } from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import {AntDesign, FontAwesome, Foundation} from "@expo/vector-icons";
import {DataTable} from "react-native-paper";
import * as DocumentPicker from 'expo-document-picker';
import MakeTransaction from "./TransactionScreens/MakeTransaction";
import WithdrawScreen from "./TransactionScreens/WithdrawScreen";

const initialLayout = { width: Dimensions.get('window').width };

const TransactionScreen = (props) => {
    const [transactionFile, setTransactionFile] = useState('');
    const [image, setImage] = useState(null);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Deposit' },
        { key: 'second', title: 'Withdrawl' },
    ]);

    const renderScene = SceneMap({
        first: MakeTransaction,
        second: WithdrawScreen,
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
export default TransactionScreen;

