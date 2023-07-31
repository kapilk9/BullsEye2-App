// import { View, Text, TouchableOpacity, Image } from 'react-native'
// import React from 'react'
// import { COLORS, SIZES, icons } from '../../constants'

// const Equity = (onPress) => {
//     const EquityRow = ({ title, value }) => {
//         return (
//             <View style={{
//                 marginLeft: SIZES.radius, flexDirection: 'row',
//                 height: 30, justifyContent: 'space-between', backgroundColor: '#DEEEEE', alignItems: 'center'
//             }}>
//                 <Text>{title}</Text>
//                 <Text style={{ marginRight: SIZES.radius }}>{value}</Text>

//             </View>



//         )
//     }
//     const EquityRow1 = ({ title }) => {
//         return (
//             <View style={{
//                 marginLeft: SIZES.radius, flexDirection: 'row',
//                 height: 30, justifyContent: 'space-between', alignItems: 'center'
//             }}>
//                 <Text>{title}</Text>
//                 <Text style={{ marginRight: SIZES.radius }}>00.00</Text>

//             </View>



//         )
//     }
//     return (

//         <View
//             style={{
//                 width: "100%", height: "100%", position: 'absolute', marginTop: 80,
//                 backgroundColor: "#E7ECEA",
//                 borderRadius: SIZES.radius
//             }}>
//             <View style={{
//                 position: 'absolute',
//                 width: '94%', height: 120, backgroundColor: "#fff", marginTop: -70,
//                 marginLeft: SIZES.radius, borderRadius: SIZES.radius
//             }}>
//                 <View style={{ marginTop: SIZES.radius, alignItems: 'center' }}>
//                     <Text>Available margin (Cash + Collateral)</Text>
//                     <Text style={{ fontSize: 30, color: 'blue' }}>₹ 1,00,000.00</Text>
//                     <TouchableOpacity
//                         onPress={() => console.log("hello")} >
//                         <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginTop: SIZES.radius }}>

//                             <Image source={icons.download} style={{ width: 15, height: 15 }} />

//                             <Text style={{ color: 'blue' }}> View statement</Text>
//                         </View>
//                     </TouchableOpacity>

//                 </View>
//             </View >
//             <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 70 }}>
//                 <View style={{
//                     width: 150, height: 50, backgroundColor: '#52AD2D', borderRadius: 8,
//                     alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginRight: 20,
//                 }}>
//                     <Image source={icons.plus} style={{ width: 20, height: 20, tintColor: '#fff' }} />
//                     <Text style={{ marginLeft: 10, color: COLORS.white }}>Add funds</Text>

//                 </View>
//                 <View style={{
//                     width: 150, height: 50, backgroundColor: '#4D6BD5', borderRadius: 8,
//                     alignItems: 'center', justifyContent: 'center', flexDirection: 'row'
//                 }}>
//                     <Image source={icons.withdraw} style={{ width: 20, height: 20, tintColor: '#fff' }} />
//                     <Text style={{ marginLeft: 10, color: COLORS.white }}>withdraw</Text>

//                 </View>

//             </View>
//             <View style={{
//                 flexDirection: 'row', justifyContent: 'space-between', marginTop: SIZES.radius,
//                 borderBottomColor: COLORS.lightGray3, borderBottomWidth: 0.3, height: 80
//             }}>
//                 <View style={{ marginTop: SIZES.radius, alignItems: 'center', marginLeft: 40 }}>
//                     <Text>Available cash</Text>
//                     <Text style={{ fontSize: 20, fontWeight: '800', color: COLORS.black }}>1,00,000.00</Text>
//                 </View>
//                 <View style={{ marginTop: SIZES.radius, alignItems: 'center', marginRight: 60 }}>
//                     <Text>Used margin</Text>
//                     <Text style={{ fontSize: 20, fontWeight: '800', color: COLORS.black }}>00.00</Text>
//                 </View>

//             </View>
//             <View style={{ marginTop: 20, borderBottomColor: COLORS.lightGray3, borderBottomWidth: 0.3, height: 230 }}>
//                 <EquityRow title={"Opening balence"} value={"100000.00"} />
//                 <EquityRow1 title={'Payin'} />
//                 <EquityRow title={"Payout"} value={"00.00"} />
//                 <EquityRow1 title={'SPAN'} />
//                 <EquityRow title={"Delivery"} value={"00.00"} />
//                 <EquityRow1 title={'Exposure'} />
//                 <EquityRow title={"Option premium"} value={"00.00"} />

//             </View>
//             <View style={{ marginTop: 20, borderBottomColor: COLORS.lightGray3, borderBottomWidth: 0.3, height: 230 }}>
//                 <EquityRow title={"Collateral (Liquid funds)"} value={"00.00"} />
//                 <EquityRow1 title={'collateral (Equity)'} />
//                 <EquityRow title={"Total collateral"} value={"00.00"} />

//             </View>



//         </View>
//     )
// }

// export default Equity;