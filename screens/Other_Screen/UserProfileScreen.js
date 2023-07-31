import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    AsyncStorage, Button, Alert, RefreshControl
} from 'react-native';
import {Card} from "react-native-elements";
import axios from "axios";
import {FontAwesome} from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

const UserProfileScreen = props => {
    const [accessToken , setAccessToken] = useState('');
    const [userProfile , setUserProfile] = useState({});
    const [userAadharFront , setUserAadharFront] = useState('');
    const [userAadharBack , setUserAadharBack] = useState('');
    const [userPan , setUserPan] = useState('');
    const [userBalance , setUserBalance] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(getUserProfile(accessToken)).then(() => setRefreshing(false));
    }, []);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    async function getKind() {
        AsyncStorage.getItem('userSession').then(userData => {
            //Get assets
            let userObject = JSON.parse(userData);
            setUserProfile({});
            setUserAadharFront('');
            setUserAadharBack('');
            setUserPan('');
            let token = userObject.access_token;
            setAccessToken(token);
            getUserProfile(token);
        });
    }
    const logoutAction =() =>{
        createTwoButtonAlert("Are you sure to logout", "Confirm");
    };
    const createTwoButtonAlert = (message , title) =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK", onPress: () => removeAsyncStorage() }
            ],
            { cancelable: false }
        );
    const removeAsyncStorage = () => {
        AsyncStorage.clear();
        SecureStore.getItemAsync('chartTimeout').then(function (response){
            clearTimeout(parseInt(response));
        });
        SecureStore.getItemAsync('liveTradeTimeout').then(function (response){
            clearTimeout(parseInt(response));
        });
        SecureStore.getItemAsync('withdrawalTimeout').then(function (response){
            clearTimeout(parseInt(response));
        });
        SecureStore.getItemAsync('transactionTimeout').then(function (response){
            clearTimeout(parseInt(response));
        });
        SecureStore.getItemAsync('pastTradeTimeout').then(function (response){
            clearTimeout(parseInt(response));
        });
        props.navigation.navigate("SignIn");
    };
    useEffect(() => {
        getKind().then(r => {

        });
    }, []);
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
                setUserProfile(userProfile);
                setUserAadharFront('http://panel.skytradres.co/storage/'+userProfile.aadhar_front_url);
                setUserAadharBack('http://panel.skytradres.co/storage/'+userProfile.aadhar_back_url);
                setUserPan('http://panel.skytradres.co/storage/'+userProfile.pan_card_url);
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
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Image style={styles.avatar}
                               source={require('../assets/avatars/avatar1.png')}/>

                        <Text style={styles.name}>Name : {userProfile.first_name} {userProfile.last_name}</Text>
                        <Text style={styles.userInfo}>Email : {userProfile.email} </Text>
                        <Text style={styles.userInfo}>Balance : INR {userBalance} </Text>
                    </View>
                </View>

                <Card

                >
                    <View style={{alignItems:"center"}}>
                        <Button title={"Logout"} onPress={logoutAction}></Button>
                    </View>
                </Card>


                <Card
                    title={"Aadhar Card"}
                    containerStyle={{ padding: 0, width: '90%', paddingBottom:10 }}
                >
                    <Card.Title style={styles.cartTitle}>
                        Aadhar Card
                    </Card.Title>
                    <Card.Divider></Card.Divider>
                    <View style={{alignItems:"center"}}>
                        <Image source={{uri:'http://panel.skytradres.co/storage/'+userProfile.aadhar_front_url}} style={{width: '90%', height: 400}} />
                    </View>
                    <Card.Divider style={{margin:10}}></Card.Divider>
                    <View style={{alignItems:"center"}}>
                        <Image source={{uri:'http://panel.skytradres.co/storage/'+userProfile.aadhar_back_url}} style={{width: '90%', height: 400}} />
                    </View>
                </Card>

                <Card
                    title={"PAN Card"}
                    containerStyle={{ padding: 0, width: '90%', paddingBottom:10 }}
                >
                    <Card.Title style={styles.cartTitle}>
                        PAN Card
                    </Card.Title>
                    <Card.Divider></Card.Divider>
                    <View style={{alignItems:"center"}}>
                        <Image source={{uri:'http://panel.skytradres.co/storage/'+userProfile.pan_card_url}} style={{width: '90%', height: 400}} />
                    </View>
                </Card>

                <Card
                    title={"Bank Details"}
                    containerStyle={{ padding: 0, width: '90%', paddingBottom:10 }}
                >
                    <Card.Title style={styles.cartTitle}>
                        Bank Details
                    </Card.Title>
                    <Card.Divider></Card.Divider>
                    <View style={{alignItems:"center", flex:1, flexDirection:"row", padding:10, width:"100%"}}>
                        <Card.Divider></Card.Divider>
                        <Text style={{width:'50%', fontWeight:"bold"}}>Name on Account</Text>
                        <Text style={{width:'50%'}}>{userProfile.account_name}</Text>
                    </View>
                    <Card.Divider></Card.Divider>
                    <View style={{alignItems:"center", flex:1, flexDirection:"row", padding:10, width:"100%"}}>
                        <Text style={{width:'50%', fontWeight:"bold"}}>Account Number</Text>
                        <Text style={{width:'50%'}}>{userProfile.account_number}</Text>
                    </View>
                    <Card.Divider></Card.Divider>
                    <View style={{alignItems:"center", flex:1, flexDirection:"row", padding:10, width:"100%"}}>
                        <Text style={{width:'50%', fontWeight:"bold"}}>Bank Name</Text>
                        <Text style={{width:'50%'}}>{userProfile.bank_name}</Text>
                    </View>
                    <Card.Divider></Card.Divider>
                    <View style={{alignItems:"center", flex:1, flexDirection:"row", padding:10, width:"100%"}}>
                        <Text style={{width:'50%', fontWeight:"bold"}}>IFSC CODE</Text>
                        <Text style={{width:'50%'}}>{userProfile.ifsc_code}</Text>
                    </View>
                    <Card.Divider></Card.Divider>
                    <View style={{alignItems:"center", flex:1, flexDirection:"row", padding:10, width:"100%"}}>
                        <Text style={{width:'50%', fontWeight:"bold"}}>Branch Address</Text>
                        <Text style={{width:'50%'}}>{userProfile.branch_address}</Text>
                    </View>
                </Card>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#DCDCDC",
    },
    headerContent:{
        padding:30,
        alignItems: 'center',
    },
    bodyContent:{
        backgroundColor: "#ffffff",
        alignItems:'center',
        marginTop:10,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
    },
    bannerImage:{
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10
    },
    name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'600',
    },
    userInfo:{
        fontSize:16,
        color:"#778899",
        fontWeight:'600',
    },
    body:{
        backgroundColor: "#778899",
        height:500,
        alignItems:'center',
    },
    item:{
        flexDirection : 'row',
    },
    infoContent:{
        flex:1,
        alignItems:'flex-start',
        paddingLeft:5
    },
    iconContent:{
        flex:1,
        alignItems:'center',
    },
    icon:{
        width:30,
        height:30,
        marginTop:20,
    },
    info:{
        fontSize:18,
        marginTop:20,
        color: "#FFFFFF",
    },
    cartTitle:{
        paddingTop:10,
    },
});

export default UserProfileScreen;