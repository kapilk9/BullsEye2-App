import {
    AsyncStorage,
    Button,
    Picker,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import {Card} from "react-native-elements";
import {AntDesign, FontAwesome, Foundation} from "@expo/vector-icons";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";


const PastTrade = props => {
    const [accessToken , setAccessToken] = useState('');
    const [pastTrades , setPastTrades] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const ACCESS_TOKEN = useRef('');

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(getData(accessToken)).then(() => setRefreshing(false));
    }, []);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    async function getKind() {
        AsyncStorage.getItem('userSession').then(userData => {
            //Get assets
            let userObject = JSON.parse(userData);
            let token = userObject.access_token;
            ACCESS_TOKEN.current = token;
            setAccessToken(token);
            getData(token);
        });
    }
    useEffect(() => {
        getKind().then(r => {

        });
    }, []);
    const getData = (token) => {
        console.log("Fetching Recursive Data");
        let config = {
            method: 'get',
            url: 'https://scripts.bulleyetrade.com/api/trades?type=past',
            headers: {
                'Authorization': 'Bearer ' + ACCESS_TOKEN.current
            }
        };
        axios(config)
            .then(function (response) {
                let pastData = [];
                setPastTrades([]);
                pastData.push(response.data.Data.pastTrades.map(function(trades) {
                        return <Card
                            title={trades.trade_name}
                            containerStyle={{ padding: 0, width: '90%', paddingBottom:30 }}
                            key={trades.id}
                        >
                            <View style={trades.trade_outcome>0 ? styles.titleViewSuccess:styles.titleViewFail}>
                                <Text style={styles.titleViewText}>{trades.trade_name}</Text>
                                <Text style={styles.titleViewText}>{trades.trade_mode.toUpperCase()} {trades.max_lot} LOT</Text>
                                <Text style={styles.titleViewText}>{trades.square_off_at}</Text>
                            </View>
                            <View style={styles.bodyView}>
                                <Text style={styles.titleBodyText}>
                                    <FontAwesome name="rupee" size={21} color="black" />   {parseFloat(trades.trade_outcome).toFixed(2)}
                                </Text>
                                <View style={{width:"50%"}}>
                                    <Text style={{alignContent:"center"}}><Foundation name="graph-trend" size={16} color="black"/>     Limit {trades.limit}</Text>
                                    <Text><AntDesign name="upcircle" size={14} color="black" />     Target {trades.target}</Text>
                                    <Text><AntDesign name="downcircle" size={14} color="black" />     Stop Loss {trades.stop_loss}</Text>
                                </View>
                            </View>
                        </Card>;
                    })
                );
                setPastTrades(pastData);
                try {
                    let pastTradeTimeout = setTimeout(function(){
                        getData(token);
                    },10000);
                    SecureStore.setItemAsync('pastTradeTimeout', pastTradeTimeout.toString()).then(r => {

                    });
                }
                catch (e) {
                    console.log(e);
                }
            })
            .catch(function (error) {
                console.log(error);
                // if (error.response.data && error.response.data.Message == "Unauthorised") {
                //     props.navigation.navigate('SignIn');
                // }
            });
    };
    return (
        <SafeAreaView style={{flex: 1, paddingTop:30, paddingBottom:50}}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {pastTrades}
            </ScrollView>
        </SafeAreaView>
    )
}

export default PastTrade;

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#ffffff',
        paddingBottom:100
    },
    titleView:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        padding:10,
        backgroundColor: "#86C1F3"
    },
    titleViewSuccess:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        padding:10,
        backgroundColor: "#70a35a"
    },
    titleViewFail:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        padding:10,
        backgroundColor: "#ef4b58"
    },
    bodyView:{
        flex:1,
        flexDirection:"row",
        padding:10
    },
    footerView:{
        flex:1,
        flexDirection:"row",
        padding:10,
    },
    titleViewText:{
        width:'33%',
        textAlign:"center",
        color:"black",
        fontWeight:"bold",
    },
    titleBodyText:{
        width:'50%',
        color:"black",
        fontWeight:"bold",
        fontSize:24
    },
    footerViewText:{
        width:'50%',
        color:"black"
    }
});