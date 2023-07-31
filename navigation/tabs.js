import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabIcon } from '../components';
import { Home, Portfolio, Market, Profile, Order } from '../screens';
import { COLORS, icons } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  setIsTradeModalVisible,

  selectIsTradeModalVisible,
} from '../Src/redux/market/coinSlice';
import Watchlist from '../screens/Watchlist';
import Watchlist2 from '../screens/Watchlist2';
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PandingTrade from '../Src/PandingScreen/PandingTrade';
import HoldingTrade from '../Src/PandingScreen/HoldingTrade';

const Tab = createBottomTabNavigator();
const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};
const Tabs = () => {
  const navigation = useNavigation();
  const isTradeModalVisible = useSelector(selectIsTradeModalVisible);
  const dispatch = useDispatch();

  const handleTradeButtonPress = () => {
    dispatch(setIsTradeModalVisible(!isTradeModalVisible));
  };

  const checkLoggedInStatus = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      navigation.replace('Login'); // Redirect the user to the Login Screen if not logged in
    }
  };

  useEffect(() => {
    checkLoggedInStatus(); // Call the function to check the login status when the component mounts
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: responsiveWidth(16),
          backgroundColor: '#eeaeca',
          borderTopColor: 'transparent',
        },
        tabBarShowLabel: false,

      }}>
      
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          headerTitle: "Home",
          headerTintColor: COLORS.BottomTab,
          headerStyle: {
            backgroundColor: COLORS.bgColor, // Set the desired background color here
          },
          // headerLeft: () => (
          //   <TouchableOpacity
          //     style={{ marginLeft: 10 }}
          //     onPress={() => navigation.goBack()}
          //   >
          //     <Text style={{color:'#fff'}}>Back</Text>
          //   </TouchableOpacity>
          // ),
          // headerRight: () => (
          //   <TouchableOpacity
          //     style={{ marginRight: 10 }}
          //     onPress={() => console.log("Watch")}
          //   >
          //     <Text style={{color:'#fff'}}>My lists</Text>
          //   </TouchableOpacity>
          // ),
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} icon={icons.home} label="Home" />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />

      <Tab.Screen
        name="Watchlist2"
        component={Watchlist2}
        options={{
          headerShown: false,
          headerTintColor: "#EEF5DB",
          headerStyle: {
            backgroundColor: "#2E538C", // Set the desired background color here
          },
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} icon={icons.watchlist} label="Watchlist" />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />

      <Tab.Screen
        name="Orders"
        component={Order}
        options={{
          headerShown: true,
          headerTintColor: "#000",
          headerStyle: {

            backgroundColor: "#eeaeca", // Set the desired background color here
          },
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.plus}
                  label="PandingTrade"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      


      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          headerShown: false,
          headerTintColor: "#a0aab5",
          headerStyle: {
            backgroundColor: "#2E538C", // Set the desired background color here
          },
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.briefcase}
                  label="LiveTrade"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />







      {/* <Tab.Screen
        name="Orders"
        component={Home}
        options={{
          headerShown: true,
          headerTintColor: "#EEF5DB",
          headerStyle: {
            backgroundColor: "#2E538C", // Set the desired background color here
          },
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon
                focused={focused}
                icon={!isTradeModalVisible ? icons.orders : icons.close}
                iconStyle={
                  isTradeModalVisible
                    ? {
                        width: 15,
                        height: 15,
                      }
                    : null
                }
                isTrade={true}
                label="Orders"
              />
            );
          },
          tabBarButton: props => (
            <TabBarCustomButton
              {...props}
              onPress={() => handleTradeButtonPress()} // Dispatch the action
            />
          ),
        }}
      />

 */}






      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          headerTintColor: "#EEF5DB",
          headerStyle: {
            backgroundColor: "#2E538C", // Set the desired background color here
          },
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.profile}
                  label="Account"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
