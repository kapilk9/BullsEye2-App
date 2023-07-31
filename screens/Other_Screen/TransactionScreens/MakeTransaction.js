import React, {useEffect, useState} from "react";
import {
    Alert, AsyncStorage,
    Button,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import {Card} from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const MakeTransaction = props =>{
    const [documentTitle, setDocumentTitle] = useState('Select Document');
    const [documentUri, setDocumentUri] = useState('');
    const [document, setDocument] = useState('');
    const [amountDeposit, setAmountDeposit] = useState('0');
    const [successMessage , setSuccessMessage] = useState('');
    const [errorMessage , setErrorMessage] = useState('');
    const [accessToken , setAccessToken] = useState('');
    const [bankDetails , setBankDetails] = useState({});

    async function getKind() {
        AsyncStorage.getItem('userSession').then(userData => {
            //Get assets
            let userObject = JSON.parse(userData);
            let token = userObject.access_token;
            setAccessToken(token);
            getBankDetails(token);
        });
    }
    useEffect(() => {
        getKind().then(r => {

        });
    }, []);

    const pickDocument = async() =>{
        let result = await DocumentPicker.getDocumentAsync({
            type:"image/*"
        });
        if(result.type!="cancel") {
            setDocument(result);
            setDocumentTitle(result.name);
            setDocumentUri(result.uri);
        }
    };
    const getBankDetails = (token) => {
        let config = {
            method: 'get',
            url: 'http://api.skytradres.co/api/bank_details',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
            .then(function (response) {
                console.log(response.data.Data);
                setBankDetails(response.data.Data);
            })
            .catch(function (error) {
                if(error.response.status==401)
                {
                }
                if (error.response.data && error.response.data.Message == "Unauthorised") {
                    props.navigation.navigate('SignIn');
                }
            });
    };
    async function submitRequest() {
        if (documentUri!="")
        {

            const formData = new FormData();
            formData.append('amount', amountDeposit);
            formData.append('image_files',
                {
                    uri: document.uri, // your file path string
                    name: document.name,
                    type: 'image/'+document.uri.substr(document.uri.lastIndexOf('.') + 1)
                });
            axios.post('http://api.skytradres.co/api/deposit', formData,
                {
                    headers:
                        {'Authorization': 'Bearer ' + accessToken,
                            'Content-Type': 'multipart/form-data'}
                })
                .then((response) => {
                    setSuccessMessage('Deposit request submitted, it will reflect soon in your account.');
                    setDocumentTitle('Select Document');
                    setAmountDeposit('0');
                    setDocumentUri('');
                    setDocument('');
                    let transactionTimeout = setTimeout(function(){
                        setSuccessMessage('');
                    },5000);
                    SecureStore.setItemAsync('transactionTimeout', transactionTimeout.toString()).then(r => {

                    });
                })
                .catch((err) => {
                    setErrorMessage("Something went wrong, please contact admin");
                });
        }
        else
        {
            createTwoButtonAlert('Please select file to upload.' , 'Oops');
        }
    };
    const createTwoButtonAlert = (message , title) =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    return (
            <SafeAreaView style={{flex: 1, paddingTop:30, paddingBottom:50}}>
                <ScrollView>
                    <Card
                        title={"New Deposit"}
                        containerStyle={{ padding: 0, width: '90%', paddingBottom:10 }}
                    >
                        <View style={styles.titleView}>
                            <Text>New Deposit</Text>
                        </View>
                        <View style={styles.bodyView}>
                            <TextInput
                                placeholder={'Transaction Amount'}
                                style={{borderBottomWidth:1, borderTopWidth:1, borderRightWidth:1, borderLeftWidth:1, padding:10, width:"100%", borderRadius:5, borderColor:"gray"}}
                                keyboardType={ Platform.OS=="android"?"number-pad":"numbers-and-punctuation"}
                                value={amountDeposit}
                                onChangeText={(amountDeposit)=>setAmountDeposit(amountDeposit)}
                            />
                        </View>
                        <View style={styles.bodyView}>
                            <Button
                                title={documentTitle}
                                onPress={pickDocument}
                            />
                        </View>
                        <View style={{alignItems:"center"}}>
                            <Button
                                title={'Submit'}
                                onPress={submitRequest}
                            />
                        </View>
                        <Text style={[(successMessage!="") ? styles.successMessage : '']}>{successMessage}</Text>
                        <Text style={[(errorMessage!="") ? styles.errorMessage : '']}>{errorMessage}</Text>
                    </Card>


                    <Card
                        title={"Add Via UPI"}
                        containerStyle={{ padding: 0, width: '90%', paddingBottom:10 }}
                    >
                        <View style={styles.titleView}>
                            <Text>Add Via UPI</Text>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <Image source={{uri:'https://panel.bulleyetrade.com/QR_Code.jpg'}} style={{width: '100%', height: 400}} />
                        </View>
                    </Card>



                    <Card
                        title={"Bank Details"}
                        containerStyle={{ padding: 0, width: '90%', paddingBottom:10, marginBottom:50 }}
                    >
                        <Card.Title style={styles.cartTitle}>
                            Bank Details for Deposit
                        </Card.Title>
                        <Card.Divider></Card.Divider>
                        <View style={{alignItems:"center", flex:1, flexDirection:"row", padding:10, width:"100%"}}>
                            <Card.Divider></Card.Divider>
                            <Text style={{width:'50%', fontWeight:"bold"}}>Name on Account</Text>
                            <Text style={{width:'50%'}}>{(bankDetails.hasOwnProperty('account_name'))?bankDetails.account_name:""}</Text>
                        </View>
                        <Card.Divider></Card.Divider>
                        <View style={{alignItems:"center", flex:1, flexDirection:"row", padding:10, width:"100%"}}>
                            <Text style={{width:'50%', fontWeight:"bold"}}>Account Number</Text>
                            <Text style={{width:'50%'}}>{(bankDetails.hasOwnProperty('account_number'))?bankDetails.account_number:""}</Text>
                        </View>
                        <Card.Divider></Card.Divider>
                        <View style={{alignItems:"center", flex:1, flexDirection:"row", padding:10, width:"100%"}}>
                            <Text style={{width:'50%', fontWeight:"bold"}}>Bank Name</Text>
                            <Text style={{width:'50%'}}>{(bankDetails.hasOwnProperty('bank_name'))?bankDetails.bank_name:""}</Text>
                        </View>
                        <Card.Divider></Card.Divider>
                        <View style={{alignItems:"center", flex:1, flexDirection:"row", padding:10, width:"100%"}}>
                            <Text style={{width:'50%', fontWeight:"bold"}}>IFSC CODE</Text>
                            <Text style={{width:'50%'}}>{(bankDetails.hasOwnProperty('ifsc_code'))?bankDetails.ifsc_code:""}</Text>
                        </View>
                        <Card.Divider></Card.Divider>
                        <View style={{alignItems:"center", flex:1, flexDirection:"row", padding:10, width:"100%"}}>
                            <Text style={{width:'50%', fontWeight:"bold"}}>Branch Address</Text>
                            <Text style={{width:'50%'}}>{(bankDetails.hasOwnProperty('branch_address'))?bankDetails.branch_address:""}</Text>
                        </View>
                    </Card>
                </ScrollView>
            </SafeAreaView>
    );
}

export default MakeTransaction;

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
});