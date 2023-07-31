import React, {useEffect, useRef, useState} from "react";
import {
    Alert, AsyncStorage,
    Button,
    Modal, Picker, Platform, RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from "react-native";
import {Card} from "react-native-elements";
import {AntDesign, FontAwesome, Foundation} from "@expo/vector-icons";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const LiveTrade = props =>{

    const [propsVal] = useState(props);
    const [accessToken , setAccessToken] = useState('');
    const [activeTrades , setActiveTrades] = useState([]);
    const [editTradeData , setEditTradeData] = useState({target:"",stop_loss:""});
    const [editStopLoss , setEditStopLoss] = useState("");
    const [editTarget , setEditTarget] = useState("");
    const [tradeType, setTradeType] = useState("default");
    const [allowToHold, setAllowToHold] = useState(false);
    const ACCESS_TOKEN = useRef('');
    const getToken = () =>
    {
        return SecureStore.getItemAsync('userSession').then(function (response){
            return JSON.parse(response).access_token;
        });
    }
    const getKind = () => {
        AsyncStorage.getItem('userSession').then(userData => {
            let userObject = JSON.parse(userData);
            let token = userObject.access_token;
            setAccessToken(token);
            ACCESS_TOKEN.current = token;
            getTradeData(token);
        });
    };
    useEffect(() => {
        getKind();
    }, []);

    const getTradeData = (token) => {
        let config = {
            method: 'get',
            url: 'http://api.skytradres.co/api/trades?type=active',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
            .then(function (response) {
                let activeData = [];
                setActiveTrades([]);
                activeData.push(response.data.Data.activeTrades.map(function(trades) {
                        let actualPrice = (trades.asset!=null)?trades.asset.price:0;
                        let profitOrLoss = false;
                        if(trades.trade_mode=="buy")
                        {
                            if(actualPrice>trades.limit)
                            {
                                profitOrLoss = true;
                            }
                        }
                        if(trades.trade_mode=="sell")
                        {
                            if(actualPrice<trades.limit)
                            {
                                profitOrLoss = true;
                            }
                        }
                        return <Card
                            title={trades.trade_name}
                            containerStyle={{ padding: 0, width: '90%', paddingBottom:30 }}
                            key={trades.id}
                        >
                            {trades.is_pending==0?(
                            <View style={profitOrLoss ? styles.titleViewSuccess:styles.titleViewFail}>
                                <Text style={styles.titleViewText}>{trades.trade_name}</Text>
                                <Text style={styles.titleViewText}>{trades.trade_mode.toUpperCase()} {trades.max_lot} LOT</Text>
                                <Text style={styles.titleViewText}>{actualPrice}</Text>
                            </View>
                            ):(
                                <View style={styles.titleView}>
                                    <Text style={styles.titleViewText}>{trades.trade_name}</Text>
                                    <Text style={styles.titleViewText}>{trades.trade_mode.toUpperCase()} {trades.max_lot} LOT</Text>
                                    <Text style={styles.titleViewText}>{actualPrice}</Text>
                                </View>
                            )}
                            <View style={styles.bodyView}>
                                {trades.is_pending==0?(
                                <Text style={styles.titleBodyText}>
                                    <FontAwesome name="rupee" size={21} color="black" />
                                    {(trades.trade_mode=="buy")?(((actualPrice-trades.limit)*trades.asset.lot)*trades.max_lot).toFixed(2):(((trades.limit-actualPrice)*trades.asset.lot)*trades.max_lot).toFixed(2)}
                                </Text>):(
                                    <Text style={styles.titleBodyText}>
                                        Trade is Pending
                                    </Text>
                                )}
                                <View style={{width:"50%"}}>
                                    <Text style={{alignContent:"center"}}><Foundation name="graph-trend" size={16} color="black"/>     Limit {trades.limit}</Text>
                                    <Text><AntDesign name="upcircle" size={14} color="black" />     Target {trades.target}</Text>
                                    <Text><AntDesign name="downcircle" size={14} color="black" />     Stop Loss {trades.stop_loss}</Text>
                                </View>
                            </View>
                            <Card.Divider></Card.Divider>
                            <View style={{paddingBottom:0, paddingTop:5, flexDirection:"row", padding:10,}}>

                                <View style={{width:"50%", alignItems:"flex-start"}}>
                                    {(trades.allow_square_off && !trades.allow_to_hold)?(<Button title="Square Off" style={styles.footerViewText} onPress={()=>squareOffTrade(trades)} />):null}
                                    {(trades.allow_to_hold && trades.trade_type=="delivery")?(<Text style={styles.footerViewText} >Trade on Hold</Text>):null}
                                </View>
                                <View style={{width:"50%", alignItems:"center"}}>
                                    <Button title="Edit" style={styles.footerViewText} onPress={()=>editTrade(trades)} />
                                </View>
                            </View>
                        </Card>;
                    })
                )
                setActiveTrades(activeData);

                try {
                    let liveTradeTimeout = setTimeout(function(){
                        getTradeData(token);
                    },10000);
                    SecureStore.setItemAsync('liveTradeTimeout', liveTradeTimeout.toString()).then(r => {

                    });
                }
                catch (e) {
                    console.log(e);
                }
            })
            .catch(function (error) {
                // console.log(error.response);
                // if (error.response.data && error.response.data.Message == "Unauthorised") {
                //     props.navigation.navigate('SignIn');
                // }
            });
    }

    const validateSquareOff = (message , title, data) =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK", onPress: () => {
                        initiateSquareOff(data);
                    }
                }
            ],
            { cancelable: true }
        );
    const editTrade = (tradeData) => {
        setEditTradeData(tradeData);
        setEditTarget(tradeData.target);
        setEditStopLoss(tradeData.stop_loss);
        setAllowToHold(tradeData.allow_to_hold);
        setModalVisible(true);
    }
    const squareOffTrade = (tradeData) => {
        validateSquareOff('Please press "OK" to confirm Square Off', "Are you sure?", tradeData);
    }
    const initiateSquareOff = (tradeData) => {
        // console.log("Access Token Current Val - "+ACCESS_TOKEN.current);
        let config = {
            method: 'get',
            url: 'http://api.skytradres.co/api/square_off/'+tradeData.id,
            headers: {
                'Authorization': 'Bearer ' + ACCESS_TOKEN.current
            }
        };
        axios(config)
            .then(function (response) {
                clearTimeout();
                getTradeData(ACCESS_TOKEN.current);
            })
            .catch(function (error) {
                // console.log(error.response);
                if (error.response.data && error.response.data.Message == "Unauthorised") {
                    createSignInAlert("Please login again to continue.","Unauthorised" );
                }
            });
    };

    const createSignInAlert = (message , title) =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK", onPress: () => {
                    propsVal.navigation.navigate
                        propsVal.navigation.navigate('SignIn');
                    }
                }
            ],
            { cancelable: false }
        );

    const updateTrade = () => {
        Alert.alert(
            "Are you sure?",
            "Do you want to update this trade?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Update", onPress: requestUpdate }
            ],
            { cancelable: false }
        );
    }

    const requestUpdate = () =>{
        let data = {
                    "target":editTarget,
                    "stop_loss": editStopLoss,
                    "trade_type": tradeType
                }
        let config = {
            method: 'put',
            url: 'http://api.skytradres.co/api/trades/'+parseInt(editTradeData.id),
            headers: {
                'Authorization': 'Bearer '+accessToken,
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                getTradeData(accessToken);
            })
            .catch(function (error) {
                if (error.response.data && error.response.data.Message == "Unauthorised") {
                    props.navigation.navigate('SignIn');
                }
            });
        setEditTradeData({target:"",stop_loss:""});
        setModalVisible(false);
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [target  ,setTarget] = useState('');
    const [stopLoss , setStopLoss] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        clearTimeout();
        setRefreshing(true);
        wait(getTradeData(ACCESS_TOKEN.current)).then(() => setRefreshing(false));
    }, []);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    return (
        <SafeAreaView style={{flex: 1, paddingTop:30, paddingBottom:50}}>

            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
            >
                <View style={[styles.centeredView , {width:'100%'}]}>
                    <View style={styles.modalView}>
                        <Card
                            containerStyle={{ padding: 0, width: '90%', paddingBottom:30 }}
                        >
                            <Text style={[styles.modalText,{fontWeight:"bold", padding:10}]}>Edit Trade</Text>
                            <Text style={styles.textStyle} >Target</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={"Target"}
                                // keyboardType={ Platform.OS=="android"?"number-pad":"numbers-and-punctuation"}
                                defaultValue={editTradeData.target.toString()}
                                value={editTarget.toString()}
                                onChangeText={(editTarget)=>setEditTarget(editTarget.toString())}
                            ></TextInput>
                            <Text style={styles.textStyle} >Stop Loss</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={"StopLoss"}
                                // keyboardType={ Platform.OS=="android"?"number-pad":"numbers-and-punctuation"}
                                defaultValue={editTradeData.stop_loss.toString()}
                                value={editStopLoss.toString()}
                                onChangeText={(editStopLoss)=>setEditStopLoss(editStopLoss.toString())}
                            ></TextInput>

                            {allowToHold?(<Text style={styles.textStyle} >Trade Type</Text>):null}
                            {allowToHold?(<Picker
                                    style={styles.pickerStyle}
                                    selectedValue={tradeType}
                                    onValueChange={(value) => {setTradeType(value)}}
                                >
                                    <Picker.Item label="Select Trade Type" value="default" />
                                    <Picker.Item label="INTRA-DAY" value="intraday" />
                                    <Picker.Item label="DELIVERY" value="delivery" />
                                </Picker>)
                                :null}

                            <View style={[styles.footerView , {paddingBottom:0, paddingTop:5}]}>
                                <View style={{width:"50%", alignItems:"flex-start"}}>
                                    <Button title={"Cancel"} style={styles.footerViewText} onPress={() => {setModalVisible(!modalVisible);}}/>
                                </View>
                                <View style={{width:"50%", alignItems:"flex-end"}}>
                                    <Button title={"Update"} style={styles.footerViewText} onPress={updateTrade}/>
                                </View>
                            </View>
                        </Card>
                    </View>
                </View>
            </Modal>

            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {activeTrades}
            </ScrollView>
        </SafeAreaView>
    );
}

export default LiveTrade;

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
        // flex:1,
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width:"100%"
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft:10
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
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
});