// React Native Card View for Android and IOS
// https://aboutreact.com/react-native-card-view/

// import React in our code
import React, {useEffect, useState} from 'react';

// import all the components we are going to use
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text, FlatList, ScrollView, Button, AsyncStorage, Alert
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import { Card } from 'react-native-elements';
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const Chart = (props) => {
    const { navigate } = props.navigation;
    const [cardData , setCardData] = useState([]);
    const [timeRefreshed , setTimeRefreshed] = useState('');
    const createTwoButtonAlert = (message , title) =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK", onPress: () => {
                        props.navigation.navigate('SignIn');
                    }
                }
            ],
            { cancelable: false }
        );
    useEffect(() => {
        async function getKind() {
            AsyncStorage.getItem('userSession').then(userData=>{
                //Get assets
                let userObject = JSON.parse(userData);
                let token = userObject.access_token;
                getChartData(token);
            });
        }

        getKind().then(r => {
            console.log("Function called");
            setCardData([]);
        });
        return ()=>{
            console.log("Component un unmounted");
        };
    }, []);
    const getChartData = (token) => {
        let config = {
            method: 'get',
            url: 'http://api.skytradres.co/api/assets',
            headers: {
                'Authorization': 'Bearer '+token
            }
        };

        axios(config)
            .then(function (response) {
                let dataArray = [];
                setCardData([]);
                Object.keys(response.data.Data).map(function(index, value) {
                    let dataObject = {};
                    let assetData = response.data.Data[index].trades;
                    dataObject.id = assetData.id;
                    dataObject.title = assetData.trade_name;
                    dataObject.data = {};
                    dataObject.data.Price = assetData.price;
                    dataObject.data.Chg = assetData.chg;
                    dataObject.data['%Chg'] = assetData.percent_chg;
                    dataObject.data.Open = assetData.open;
                    dataObject.data.High = assetData.high;
                    dataObject.data.Low = assetData.low;
                    dataObject.data.Lot = assetData.lot;
                    dataArray.push(dataObject);
                });
                setCardData(dataArray);
                let currentDate = new Date();
                let lastSync = "Last Sync: " + currentDate.getDate() + "/"
                    + (currentDate.getMonth()+1)  + "/"
                    + currentDate.getFullYear() + " @ "
                    + currentDate.getHours() + ":"
                    + currentDate.getMinutes() + ":"
                    + currentDate.getSeconds();
                setTimeRefreshed(lastSync);
                try {
                    let chartTimeout = setTimeout(function(){
                        getChartData(token);
                    },3000);
                    SecureStore.setItemAsync('chartTimeout', chartTimeout.toString()).then(r => {

                    });
                }
                catch (e) {
                    console.log(e);
                }
            })
            .catch(function (error) {
                if(error.response.data && error.response.data.Message=="Unauthorised")
                {
                    createTwoButtonAlert("Please login again to continue.","Unauthorised" );
                }
            });
    };
    // const getChartData = (token) => {
    //     let config = {
    //         method: 'get',
    //         url: 'http://nimblerest.lisuns.com:4531/GetLastQuoteArray/?accessKey=668dd51c-6a7f-4610-88ab-ec70902ac049&exchange=MCX&instrumentIdentifiers=SILVER-I+GOLD-I',
    //     };

    //     axios(config)
    //         .then(function (response) {
    //             console.log(response.data);
    //             let dataArray = [];
    //             setCardData([]);
                
                
    //             Object.keys(response.data).map(function(index, value) {
    //                 let dataObject = {};
    //                 let assetData = response.data[index];
    //                 console.log(assetData);
    //                 dataObject.id = 1;
    //                 dataObject.title = assetData.INSTRUMENTIDENTIFIER;
    //                 dataObject.data = {};
    //                 dataObject.data.Price = assetData.AVERAGETRADEDPRICE;
    //                 dataObject.data.Chg = assetData.PRICECHANGE;
    //                 dataObject.data['%Chg'] = assetData.PRICECHANGEPERCENTAGE;
    //                 dataObject.data.Open = assetData.OPEN;
    //                 dataObject.data.High = assetData.HIGH;
    //                 dataObject.data.Low = assetData.LOW;
    //                 dataObject.data.Lot = assetData.QUOTATIONLOT;
    //                 dataArray.push(dataObject);
    //             });
                
                
                
    //             // Object.keys(response.data.Data).map(function(index, value) {
    //             //     let dataObject = {};
    //             //     let assetData = response.data.Data[index].trades;
    //             //     dataObject.id = assetData.id;
    //             //     dataObject.title = assetData.trade_name;
    //             //     dataObject.data = {};
    //             //     dataObject.data.Price = assetData.price;
    //             //     dataObject.data.Chg = assetData.chg;
    //             //     dataObject.data['%Chg'] = assetData.percent_chg;
    //             //     dataObject.data.Open = assetData.open;
    //             //     dataObject.data.High = assetData.high;
    //             //     dataObject.data.Low = assetData.low;
    //             //     dataObject.data.Lot = assetData.lot;
    //             //     dataArray.push(dataObject);
    //             // });



    //             setCardData(dataArray);
    //             let currentDate = new Date();
    //             let lastSync = "Last Sync: " + currentDate.getDate() + "/"
    //                 + (currentDate.getMonth()+1)  + "/"
    //                 + currentDate.getFullYear() + " @ "
    //                 + currentDate.getHours() + ":"
    //                 + currentDate.getMinutes() + ":"
    //                 + currentDate.getSeconds();
    //             setTimeRefreshed(lastSync);
    //             try {
    //                 let chartTimeout = setTimeout(function(){
    //                     getChartData(token);
    //                 },3000);
    //                 SecureStore.setItemAsync('chartTimeout', chartTimeout.toString()).then(r => {

    //                 });
    //             }
    //             catch (e) {
    //                 console.log(e);
    //             }
    //         })
    //         .catch(function (error) {
    //             if(error.response.data && error.response.data.Message=="Unauthorised")
    //             {
    //                 createTwoButtonAlert("Please login again to continue.","Unauthorised" );
    //             }
    //         });
    // };
    return (
        <SafeAreaView style={{flex: 1, paddingTop:30}}>
            <Text style={{padding:10, textAlign:"right"}}>{timeRefreshed}</Text>
            <FlatList
                data={cardData}
                renderItem={({ item: rowData }) => {
                    return (
                        <Card
                            title={rowData.title}
                            containerStyle={{ padding: 0, width: '90%' }}
                        >
                            <Card.Title style={styles.cartTitle}>
                                {rowData.title}
                            </Card.Title>
                            <Card.Divider></Card.Divider>
                            <View style={styles.tableContainer}>
                                    <View style={styles.innerCard}>
                                        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                            {
                                                Object.entries(rowData.data).map((rowData, index) => (
                                                    <Row
                                                        key={index}
                                                        data={rowData}
                                                        style={[styles.row]}
                                                        textStyle={styles.text}
                                                    />
                                                ))
                                            }
                                        </Table>
                                        <Card.Divider></Card.Divider>
                                        <Button title={"Trade on "+rowData.title}
                                                onPress={()=>{
                                                    navigate('Trade',{'tradeData':rowData})
                                                }}
                                        />
                                    </View>
                            </View>
                        </Card>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    );
};
export default Chart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 40,
        backgroundColor: '#ffffff',
        paddingBottom:100
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    innerCard:{
        padding:10,
    },
    cartTitle:{
        paddingTop:10,
    },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#fff' },
    tableContainer: { flex: 1, padding: 15, paddingTop: 10, backgroundColor: '#fff' },
});