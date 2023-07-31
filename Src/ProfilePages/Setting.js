import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { SIZES, icons, COLORS } from '../../constants';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

//  ALL pages responsive

const Setting = () => {
    const [isClicked, SetIsClicked] = useState(false)
    const [clicked, SetClicked] = useState(false)
    const UserRow = ({ title, value, }) => {
        return (
            <View style={{
                flexDirection: 'row', marginTop: SIZES.radius,
                height: responsiveWidth(15), justifyContent: 'space-between',
                backgroundColor: COLORS.mainBgColor, alignItems: 'center', marginTop: responsiveHeight(2)
            }}>
                <Text style={{ marginLeft: responsiveWidth(5) }}>{title}</Text>
                <TouchableOpacity>
                    <Text style={{ fontSize: responsiveFontSize(2), color: 'blue', marginRight: responsiveWidth(5) }}>{value} </Text>
                </TouchableOpacity>

            </View>



        )
    }
    const SectionTitle = ({ title }) => {

        return (
            <View style={{ marginTop: responsiveHeight(3), marginLeft: responsiveWidth(3) }}>
                <Text style={{
                    color: "#989FA5", fontSize: responsiveFontSize(3), fontWeight: '400'
                }}>{title}</Text>
            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: COLORS.mainBgColor, }}>
            {/* <UserRow title={'Passward'} value={"Change"} />
            <UserRow title={'M-PIN'} value={"Change"} />

            <UserRow title={'Dark Mode'} value={"Change"} /> */}
            {/* <View>
                <TouchableOpacity style={styles.dropdown}
                    onPress={() => {
                        SetIsClicked(!isClicked);
                    }}>
                    <Text>App setting</Text>
                    {isClicked ? (<Image source={icons.arrowup} style={styles.icon} />) :
                        (<Image source={icons.arrowDown} style={styles.icon} />)}
                </TouchableOpacity>
                {isClicked ? <View style={styles.dropdown2}>
                    <Text style={styles.droptext}>Quick Buy/Sell from watchlist</Text>
                </View> : null}
            </View> */}

            {/* <View style={{marginTop:20}}>
                <TouchableOpacity style={styles.dropdown}
                    onPress={() => {
                        SetClicked(!clicked);
                    }}>
                    <Text>Registered devices</Text>
                    {clicked ? (<Image source={icons.arrowup} style={styles.icon} />) :
                        (<Image source={icons.arrowDown} style={styles.icon} />)}
                </TouchableOpacity>
                <View>
                    {clicked ? <View style={styles.dropdown2}>
                        <Text style={{ marginLeft: 30, color: 'blue' }}>Remove all devices</Text>
                    </View> : null}
                </View>

            </View> */}
            <View style={{ marginTop: responsiveHeight(2), marginLeft: responsiveWidth(3) }}>
                <Text style={{ fontSize: responsiveFontSize(3), color: "#000" }}>Support portal</Text>
            </View>
            <SectionTitle title="Details" />
            <View>
                <View style={{
                    flex: 1,
                    marginLeft: responsiveWidth(5),
                    flexDirection: 'row',
                    marginTop: responsiveHeight(3)

                }}>
                    <Image
                        source={icons.customersupport}
                        style={{ width: responsiveWidth(13), height: responsiveWidth(13), }}
                    />
                </View>
                <Text
                    style={{
                        color: COLORS.black, fontSize: responsiveFontSize(2.5), marginTop: responsiveHeight(2)
                        , marginLeft: responsiveWidth(25)
                    }}>
                    Chat to us</Text>
                <Text style={{
                    marginTop: responsiveHeight(2), marginLeft: responsiveWidth(25)
                    , fontSize: responsiveFontSize(2),color:'#000'
                }}>Our friendly team is here to help</Text>
            </View>
            <View>
                <View style={{
                    flex: 1,
                    marginLeft: responsiveWidth(5),
                    flexDirection: 'row',
                    marginTop: responsiveHeight(8)

                }}>
                    <Image
                        source={icons.telephone}
                        style={{ width: responsiveWidth(13), height: responsiveWidth(13), }}
                    />
                </View>
                <Text
                    style={{
                        color: COLORS.black, fontSize: responsiveFontSize(2.5), marginTop: responsiveHeight(2)
                        , marginLeft: responsiveWidth(25)
                    }}> Email us

                </Text>
                <Text style={{
                    marginTop: responsiveHeight(2), marginLeft: responsiveWidth(25)
                    , fontSize: responsiveFontSize(2),color:'#000'
                }}>mail: bullseyebroking68@gmail.com</Text>
                {/* <Text style={{
                    marginTop: responsiveHeight(2), marginLeft: responsiveWidth(25)
                    , fontSize: responsiveFontSize(2),color:'#000'
                }}>+183000180000</Text> */}
            </View>
            <View>
                <View style={{
                    flex: 1,
                    marginLeft: responsiveWidth(5),
                    flexDirection: 'row',
                    marginTop: responsiveHeight(8)

                }}>
                    <Image
                        source={icons.Adduser}
                        style={{ width: responsiveWidth(13), height: responsiveWidth(13), }}
                    />
                </View>
                <Text
                    style={{
                        color: COLORS.black, fontSize: responsiveFontSize(2.5), marginTop: responsiveHeight(2)
                        , marginLeft: responsiveWidth(25)
                    }}>
                    Visit wedsite</Text>
                    <Text style={{
                    marginTop: responsiveHeight(2), marginLeft: responsiveWidth(25)
                    , fontSize: responsiveFontSize(2),color:'#000'
                }}> https://bulleyetrade.com/</Text>
            </View>

        </View>

    )
}

export default Setting

// const styles = StyleSheet.create({
//     dropdown: {
//         width: responsiveWidth(100),
//         height: responsiveWidth(15), backgroundColor: COLORS.mainBgColor ,
//         alignSelf: 'center', marginTop: responsiveHeight(20),
//         flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
//         paddingLeft: responsiveHeight(2), paddingRight: responsiveHeight(2),

//     },
//     icon: {
//         width: 20, height: 20
//     },
//     dropdown2: {
//         width: '100%', height: 40, alignSelf: 'center', backgroundColor: COLORS.mainBgColor
//     },
//     droptext: {
//         marginLeft: 20, marginTop: 10,
//     }
// })