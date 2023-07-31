// import * as React from 'react';
// import {
//   View,
//   useWindowDimensions,
//   Dimensions,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import {Text} from 'react-native-elements';
// import {TabView, SceneMap} from 'react-native-tab-view';
// import MainLayout from './MainLayout';
// import SearchBar from '../Src/SearchBar';
// import {useNavigation} from '@react-navigation/native';
// import {
//   setIsTradeModalVisible,
//   selectIsTradeModalVisible,
// } from '../Src/redux/market/coinSlice';
// import {useSelector, useDispatch} from 'react-redux';

// const {height, width} = Dimensions.get('window');

// function Open_Order(props) {
//     const {qty, time, percentage, stockName, invested, ltp, ltpPercentage} = props; 
//     return (
//       <View
//         style={[
//           styles.searchEluation,
//           {
//             paddingVertical: 15,
//           },
//         ]}>
       
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               paddingHorizontal: 20,
//               justifyContent: 'space-between',
//             }}>
//             <View style={{display: 'flex', flexDirection: 'row',alignItems:'center'}}>
//                 <View style={{backgroundColor:'#b5cde2',paddingHorizontal:10,paddingVertical:3,borderRadius:1}}>
//                 <Text style={{color: '#4683b7'}}>BUY</Text>
//                 </View>
//               <Text style={{color: 'black',paddingLeft:5}}>{qty}</Text>
//             </View>
  
//             <View
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 paddingHorizontal: 20,
//               }}>
//                  <Text style={{color: 'black',paddingRight:5}}>{time}</Text>
//                  <View style={{backgroundColor:'#cccccc',paddingHorizontal:10,paddingVertical:3,borderRadius:1}}>
//                 <Text style={{color: '#808080'}}>OPEN</Text>
//                 </View>
             
//             </View>
//           </View>
       
    
  
//         <View
//           style={{
//             display: 'flex',
//             flexDirection: 'row',
//             padding: 10,
//             justifyContent: 'space-between',
//           }}>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               paddingHorizontal: 20,
//             }}>
//             <View style={{display: 'flex', flexDirection: 'row'}}>
//               <Text style={{color: 'black', fontWeight: '700'}}>{stockName}</Text>
//             </View>
//           </View>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               paddingHorizontal: 20,
//             }}>
//             <View style={{display: 'flex', flexDirection: 'row'}}>
//               <Text style={{color: 'green'}}>{ltpPercentage}</Text>
//             </View>
//           </View>
//         </View>
  
//         <View
//           style={{
//             display: 'flex',
//             flexDirection: 'row',
//             paddingHorizontal: 10,
//             justifyContent: 'space-between',
//           }}>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               paddingHorizontal: 20,
//             }}>
//             <View style={{display: 'flex', flexDirection: 'row'}}>
//               <Text style={{color: 'gray', paddingRight: 5}}>Invested</Text>
//               <Text style={{color: 'black'}}>{invested}</Text>
//             </View>
//           </View>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               paddingHorizontal: 20,
//             }}>
//             <View style={{display: 'flex', flexDirection: 'row'}}>
//               <Text style={{color: 'gray'}}>LTP </Text>
//               <Text style={{color: 'black'}}>{ltp}</Text>
//               <Text style={{color: 'red'}}> ({ltpPercentage})</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   }



// const FirstRoute = () => {
   
//     const data = {
//         qty: "1/2",
//         time: "13:36:12",
//         percentage: '+5.30%',
//         stockName: 'INFY',
//         invested: 2781.85,
//         ltp: 90.0,
//         ltpPercentage: '-0.48%',
//       };
//   return (
//     <MainLayout>
//       <View style={{flex: 1, backgroundColor: '#E1D7E0'}}>
//         <View
//           style={[
//             styles.searchEluation,
//             {
//               paddingVertical: 5,
//             },
//           ]}>
//           <SearchBar />
//         </View>
      





//         <TouchableOpacity  >
          
//         <Open_Order {...data} />
//         </TouchableOpacity>

//         <TouchableOpacity>
//         <Open_Order {...data} />
//         </TouchableOpacity>

//         <TouchableOpacity>
//         <Open_Order {...data} />
//         </TouchableOpacity>
//       </View>
//     </MainLayout>
//   );
// };

// const SecondRoute = () => (
//   <View style={{flex: 1, backgroundColor: '#E1D7E0'}} />
// );
// const ThirdRoute = () => <View style={{flex: 1, backgroundColor: '#E1D7E0'}} />;

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
//   third: ThirdRoute,
// });

// export default function Order() {
//   const layout = useWindowDimensions();

//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     {key: 'first', title: 'Open'},
//     {key: 'second', title: 'Panding Order'},
//     {key: 'third', title: 'Holding Order'},
//   ]);

//   return (
//     <TabView
//       navigationState={{index, routes}}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={{width: layout.width}}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: width,
//     height: height - 200,
//     marginTop: 80,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     backgroundColor: '#ffff',
//   },
//   sub_container_holdings: {
//     width: '90%',
//     height: height - 600,
//     marginTop: 100,
//     borderRadius: 7,
//     backgroundColor: '#fff',
//     position: 'absolute',
//     display: 'flex',
//     alignSelf: 'center',

//     // alignItems: 'center',
//     top: -150,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     // Add other styles as needed
//   },
//   sub_container_position: {
//     width: '90%',
//     height: height - 620,
//     marginTop: 100,
//     borderRadius: 7,
//     backgroundColor: '#fff',
//     position: 'absolute',
//     display: 'flex',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     top: -150,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     // Add other styles as needed
//   },

//   searchEluation: {
//     borderBottomWidth: 0.1,
//     shadowColor: '#b3b3b3',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 2,
//   },
// });


import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const TopTab = createMaterialTopTabNavigator();

const Order = () => {
  return (
    <View>
      <Text>Open_Order fdh</Text>
    </View>
  )
}

export default Order