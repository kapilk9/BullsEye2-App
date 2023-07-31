import React, {useEffect, useState} from "react";
import {
    Alert,
    AsyncStorage,
    Button,
    Platform, RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import {Card} from "react-native-elements";
import {DataTable} from "react-native-paper";

import axios from "axios";
import * as SecureStore from "expo-secure-store";


const WithdrawScreen = props => {
    const [successMessage , setSuccessMessage] = useState('');
    const [errorMessage , setErrorMessage] = useState('');
    const [withdrawalData , setWithdrawalData] = useState([]);
    const [accessToken , setAccessToken] = useState('');
    const [amount , setAmount] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [userBalance , setUserBalance] = useState(0);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(getData(accessToken)).then(() => setRefreshing(false));
        wait(getUserProfile(accessToken)).then(() => setRefreshing(false));
    }, []);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }



    async function getKind() {
        AsyncStorage.getItem('userSession').then(userData => {
            //Get assets
            let userObject = JSON.parse(userData);
            let token = userObject.access_token;
            setAccessToken(token);
            getData(token);
            getUserProfile(token);
        });
    }
    useEffect(() => {
        getKind().then(r => {

        });
    }, []);
    const getData = (token) => {
        let config = {
            method: 'get',
            url: 'http://api.skytradres.co/api/withdraw',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
            .then(function (response) {
                let dataArray = [];
                dataArray.push(response.data.Data.map(function(withdrawal) {
                    let currentDate = new Date(withdrawal.created_at);
                    let lastSync = currentDate.getDate() + "/"
                        + (currentDate.getMonth()+1)  + "/"
                        + currentDate.getFullYear();
                    return  <DataTable.Row style={{ paddingTop: 10,}} key={withdrawal.id}>
                                <DataTable.Cell>{lastSync}</DataTable.Cell>
                                <DataTable.Cell numeric>{withdrawal.amount}</DataTable.Cell>
                                <DataTable.Cell numeric>{getStatus(withdrawal.is_approved)}</DataTable.Cell>
                            </DataTable.Row>;
                }));
                setWithdrawalData(dataArray);
            })
            .catch(function (error) {
                if(error.response.status==401)
                {
                    // console.log(error.response.status);
                    // setTimeout(function (){
                    //     // getData(accessToken);
                    // },3000);
                }
                if (error.response.data && error.response.data.Message == "Unauthorised") {
                    // props.navigation.navigate('SignIn');
                }
            });
    };
    const getStatus = (status) => {
        if(status==0)
            return "Pending";
        if(status==1)
            return "Approved";
        if(status==2)
            return "Rejected";
    };
    const requestWithdraw = () => {
        if(amount>0)
        {
            const formData = new FormData();
            formData.append('amount', amount);

            axios.post('http://api.skytradres.co/api/withdraw', formData,
                {
                    headers:
                        {'Authorization': 'Bearer ' + accessToken}
                })
                .then((response) => {
                    setSuccessMessage('Withdrawal request submitted, it will reflect soon in your account.');
                    setAmount('');
                    let withdrawalTimeout = setTimeout(function(){
                        setSuccessMessage('');
                    },5000);
                    SecureStore.setItemAsync('withdrawalTimeout', withdrawalTimeout.toString()).then(r => {

                    });
                    getData(accessToken);
                })
                .catch((err) => {
                    setErrorMessage("Something went wrong, please contact admin");
                })
        }
    };
    const getUserProfile = (token) =>{
        let config = {
            method: 'get',
            url: 'http://api.skytradres.co/api/user/profile',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
            .then(function (response) {
                let userProfile = response.data.Data;
                setUserBalance(userProfile.user_balance);
            })
            .catch(function (error) {
                // console.log(error.response);
                // if (error.response.data && error.response.data.Message == "Unauthorised") {
                //     props.navigation.navigate('SignIn');
                // }
            });
    };
    return (
        <SafeAreaView style={{flex: 1, paddingTop: 30, paddingBottom: 50}}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Card
                    title={"Withdraw"}
                    containerStyle={{padding: 0, width: '90%', paddingBottom: 30}}
                >
                    <View style={styles.titleView}>
                        <Text style={{alignContent: "center"}}>Available Balance : {userBalance}</Text>
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            placeholder={'Amount to Withdraw'}
                            style={{
                                borderBottomWidth: 1,
                                borderTopWidth: 1,
                                borderRightWidth: 1,
                                borderLeftWidth: 1,
                                padding: 10,
                                width: "100%",
                                borderRadius: 5,
                                borderColor: "gray"
                            }}
                            keyboardType={Platform.OS == "android" ? "number-pad" : "numbers-and-punctuation"}
                            value={amount}
                            onChangeText={(amount)=>setAmount(amount)}
                        />
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Button
                            title={'Withdraw'}
                            onPress={requestWithdraw}
                        />
                        <Text style={[(successMessage!="") ? styles.successMessage : '']}>{successMessage}</Text>
                        <Text style={[(errorMessage!="") ? styles.errorMessage : '']}>{errorMessage}</Text>
                    </View>
                </Card>

                <Card
                    title={"Withdrawal History"}
                    containerStyle={{padding: 0, width: '90%', paddingBottom: 30}}
                >
                    <View style={styles.titleView}>
                        <Text style={{alignContent: "center"}}>Withdrawl History</Text>
                    </View>
                    <View style={styles.bodyView}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Date</DataTable.Title>
                                <DataTable.Title numeric>Amount</DataTable.Title>
                                <DataTable.Title numeric>Status</DataTable.Title>
                                <DataTable.Title>Status</DataTable.Title>
                            </DataTable.Header>
                            {withdrawalData}
                            {/*<DataTable.Pagination*/}
                            {/*    page={1}*/}
                            {/*    numberOfPages={3}*/}
                            {/*    onPageChange={(page) => {*/}
                            {/*        console.log(page);*/}
                            {/*    }}*/}
                            {/*    label="1-2 of 3"*/}
                            {/*/>*/}
                        </DataTable>
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

export default WithdrawScreen;

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
    },
    inputStyle:{
        borderBottomWidth:1,
        borderColor: "#FFFFFF",
    },
    cartTitle:{
        paddingTop:10,
    },
    errorMessage: {
        margin: 8,
        paddingTop:10,
        fontWeight:"bold",
        color: "red"
    },
    successMessage:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        padding:10,
        backgroundColor: "#70a35a"
    },
    textCenter:{
        alignContent: "center"
    }
});