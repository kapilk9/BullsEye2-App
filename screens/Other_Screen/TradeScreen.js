import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View, ScrollView, Button, TextInput, Picker, Text, Platform, AsyncStorage, Alert
} from 'react-native';
import {CheckBox} from "react-native-elements";
import { Card } from 'react-native-elements';
import axios from "axios";

const TradeScreen = (props) => {
    const [maxLot , setMaxLot] = useState('');
    const [limitValue , setLimitValue] = useState("");
    const [target  ,setTarget] = useState("");
    const [stopLoss , setStopLoss] = useState("");
    const [walletPin , setWalletPin] = useState('');
    const [selectedValue, setSelectedValue] = useState("default");
    const [selectedAsset, setSelectedAsset] = useState(((props.navigation.state.params!=undefined) ? props.navigation.state.params.tradeData.title : 'default'));
    const [tradeType, setTradeType] = useState("default");
    const [isSelected, setSelection] = useState(false);
    const [assetPickerData , setAssetPickerData] = useState([]);
    const [accessToken , setAccessToken] = useState('');
    const [validationErrors , setValidationErrors] = useState([]);
    const [assetData , setAssetData] = useState({});
    const [isEditable , setIsEditable] = useState(true);
    const createAlert = (message , title) =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK", onPress: () => {

                    }
                }
            ],
            { cancelable: false }
        );
    const addTrade = () => {
        // console.log(accessToken);
        // console.log({
        //     trade_mode:selectedValue,
        //     trade_name:selectedAsset,
        //     max_lot:maxLot,
        //     limit:limitValue,
        //     target:target,
        //     stop_loss:stopLoss,
        //     trade_type:tradeType,
        //     wallet_pin:walletPin,
        //     market_price:(isSelected)?"SET_TRADE":"SET_PENDING",
        // });
        if(selectedValue=="default")
        {
            createAlert("Please select trade type.","Validation Error");
            return false;
        }
        if(selectedAsset=="default")
        {
            createAlert("Please select asset.","Validation Error");
            return false;
        }
        if(maxLot=="")
        {
            createAlert("Please enter max lot.","Validation Error");
            return false;
        }
        if(limitValue=="")
        {
            createAlert("Please enter limit value.","Validation Error");
            return false;
        }
        if(stopLoss=="")
        {
            createAlert("Please enter stop loss value.","Validation Error");
            return false;
        }
        if(target=="")
        {
            createAlert("Please enter target value.","Validation Error");
            return false;
        }
        if(tradeType=="default")
        {
            createAlert("Please select trade type.","Validation Error");
            return false;
        }
        if(walletPin=="")
        {
            createAlert("Please enter wallet pin.","Validation Error");
            return false;
        }
        axios.post(
            'http://api.skytradres.co/api/trades',
             {
                        trade_mode:selectedValue,
                        trade_name:selectedAsset,
                        max_lot:maxLot,
                        limit:limitValue,
                        target:target,
                        stop_loss:stopLoss,
                        trade_type:tradeType,
                        wallet_pin:walletPin,
                        market_price:(isSelected)?"SET_TRADE":"SET_PENDING",
                    },
            {
                        headers:
                            {'Authorization': 'Bearer ' + accessToken}
                }
        )
        .then(res => {
            try {
                if(res.data.Status===200)
                {
                    props.navigation.replace("MyTrades");
                }
            } catch (e) {
                console.log(e.response);
            }
        }).catch(function (error) {
        if (error.response) {
            if(error.response.data.Status===422)
            {
                let responseData = error.response.data.Data;
                const errorDataResp = [];
                Object.keys(responseData).map(function (index, value) {
                    errorDataResp.push(<Text style={styles.errorMessage} key={responseData[index]}>{responseData[index][0]}</Text>);
                });
                setValidationErrors(errorDataResp);
            }
            if(error.response.data.Message=="Unauthorised")
            {
                props.navigation.navigate('SignIn');
            }
        } else {
            console.log('Error', error.message);
        }
        });
    };
    const changeSelection = () => {
        setSelection(!isSelected);
        getSelectedAsset(selectedAsset, true);
    };
    async function getKind() {
        AsyncStorage.getItem('userSession').then(userData => {
            //Get assets
            let userObject = JSON.parse(userData);
            let token = userObject.access_token;
            setAccessToken(token);
            let config = {
                method: 'get',
                url: 'http://api.skytradres.co/api/assets',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };
            axios(config)
                .then(function (response) {
                    let dataArray = [];
                    Object.keys(response.data.Data).map(function (index, value) {
                        let dataObject = {};
                        let assetData = response.data.Data[index].trades;
                        setAssetData(assetData);
                        dataArray.push(<Picker.Item label={assetData.trade_name} key={assetData.id}
                                                    value={assetData.trade_name}/>);
                    });
                    setAssetPickerData(dataArray);
                })
                .catch(function (error) {
                    if (error.response.data && error.response.data.Message == "Unauthorised") {
                        props.navigation.navigate('SignIn');
                    }
                });
        });
    }
    useEffect(() => {
        getKind().then(r => {
            console.log("Function called in TradeScreen.js");

        });
    }, []);
    const getSelectedAsset = (assetKey, onCheck=false) =>{
        setSelectedAsset(assetKey);
        let config = {
            method: 'get',
            url: 'http://api.skytradres.co/api/asset/'+encodeURI(assetKey),
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        };
        axios(config)
            .then(function (response) {
                let responseData = response.data.Data;
                setAssetData(responseData);
                if(!isSelected && onCheck) {
                    setLimitValue(responseData.price);
                    setStopLoss("0");
                    setTarget("0");
                    setIsEditable(false);
                }
                else {
                    setLimitValue("");
                    setStopLoss("");
                    setTarget("");
                    setIsEditable(true);
                    setSelection(false);
                }
            })
            .catch(function (error) {
                if (error.response.data && error.response.data.Message == "Unauthorised") {
                    props.navigation.navigate('SignIn');
                }
            });
    }
    return (
        <SafeAreaView style={{flex: 1, paddingTop:30, paddingBottom:50}}>
            <ScrollView>
                <Card
                    title={"Place Trade"}
                    containerStyle={{ padding: 0, width: '90%', paddingBottom:30 }}
                >
                    <Card.Title style={styles.cartTitle}>
                        Place Trade
                    </Card.Title>
                    <Card.Divider></Card.Divider>
                    <Text style={styles.textStyle} >Select Trade Type</Text>
                    <Picker
                            style={styles.pickerStyle}
                            selectedValue={selectedValue}
                            onValueChange={(value) => {setSelectedValue(value)}}
                    >
                        <Picker.Item label="Select Trade Type" value="default" />
                        <Picker.Item label="Buy" value="buy" />
                        <Picker.Item label="Sell" value="sell" />
                    </Picker>
                    <Text style={styles.textStyle} >Select Asset</Text>
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={selectedAsset}
                        // onValueChange={(value) => {setSelectedAsset(value)}}
                        onValueChange={(value) => getSelectedAsset(value)}
                    >
                        <Picker.Item label="Select Asset" value="default" />
                        {assetPickerData}
                    </Picker>
                    <Text style={styles.textStyle} >Max Lot</Text>
                    <TextInput
                            style={styles.textInput}
                            placeholder={"Max Lot"}
                            keyboardType={ Platform.OS=="android"?"number-pad":"numbers-and-punctuation"}
                            value={maxLot}
                            onChangeText={(maxLot)=>setMaxLot(maxLot)}
                    ></TextInput>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected}
                            onPress={changeSelection}
                            style={styles.checkbox}
                            checked={isSelected}
                        />
                        <Text style={styles.label}>Market Rate</Text>
                    </View>
                    <Text style={styles.textStyle} >Limit</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Limit"}
                        keyboardType={ Platform.OS=="android"?"number-pad":"numbers-and-punctuation"}
                        value={limitValue}
                        onChangeText={(limitValue)=>setLimitValue(limitValue)}
                        editable={isEditable}
                    ></TextInput>
                    <Text style={styles.textStyle} >Target</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Target"}
                        keyboardType={ Platform.OS=="android"?"number-pad":"numbers-and-punctuation"}
                        value={target}
                        onChangeText={(target)=>setTarget(target)}
                    ></TextInput>
                    <Text style={styles.textStyle} >Stop Loss</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder={"StopLoss"}
                        keyboardType={ Platform.OS=="android"?"number-pad":"numbers-and-punctuation"}
                        value={stopLoss}
                        onChangeText={(stopLoss)=>setStopLoss(stopLoss)}
                    ></TextInput>
                    <Text style={styles.textStyle} >Trade Type</Text>
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={tradeType}
                        onValueChange={(value) => {setTradeType(value)}}
                    >
                        <Picker.Item label="Select Trade Type" value="default" />
                        <Picker.Item label="INTRA-DAY" value="intraday" />
                        {/*<Picker.Item label="DELIVERY" value="delivery" />*/}
                    </Picker>
                    <Text style={styles.textStyle} >Wallet PIN</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Wallet PIN"}
                        keyboardType={ Platform.OS=="android"?"number-pad":"numbers-and-punctuation"}
                        value={walletPin}
                        onChangeText={(walletPin)=>setWalletPin(walletPin)}
                    ></TextInput>
                    {validationErrors}
                    <Button title={"Add Trade"} onPress={addTrade} />
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
};
export default TradeScreen;

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
    tableContainer:{
        flex: 1,
        alignItems: "center"
    },
    pickerStyle:{
        width: "100%",
        color: '#344953',
        justifyContent: 'center',
    },
    textInput:{
        width: "100%",
        color: '#344953',
        justifyContent: 'center',
        padding:10,
        borderBottomWidth:1,
        borderRadius:10,
        marginBottom:30
    },
    textStyle:{
        paddingRight: 10,
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
        paddingTop:10,
        fontWeight:"bold"
    },
    errorMessage: {
        margin: 8,
        paddingTop:10,
        fontWeight:"bold",
        color: "red"
    }
});