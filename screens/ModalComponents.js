import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal
} from 'react-native';
import React, {useState,useEffect} from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { COLORS } from '../constants';
import { getLiveTrade } from '../Src/redux/market/coinSlice';
import { useSelector, useDispatch } from 'react-redux';
const ModalComponents = ({tradeId,onSave,liveTradedata }) => {
  const [txtEditStopLoss, setTxtEditStopLoss] = useState('');
  const [txtEditTarget, setTxtEditTarget] = useState('');
  const [isDefaultValuesSet, setIsDefaultValuesSet] = useState(false);
  // const [isModalVisible, setIsModalVisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(true);
 
  const handleSave = () => {
    // Validate input values if needed
    const editedValues = {
      txtEditStopLoss,
      txtEditTarget
    };

    onSave(tradeId, editedValues); // Pass tradeId and edited values to the onSave function
    // Close the modal if needed
    toggleModal(); // Close the modal after saving the values
  };

  const toggleModal = () => {
    setIsModalVisible(false); // Set isModalVisible to false to hide the modal
  };



 

  useEffect(() => {
    // Retrieve the trade data using the tradeId and set the default values
    const tradeData = liveTradedata.find(item => item.id === tradeId);
    if (tradeData && !isDefaultValuesSet) {
        setTxtEditStopLoss(tradeData.stop_loss.toString());
        setTxtEditTarget(tradeData.target.toString());
        setIsDefaultValuesSet(true);
      }
  }, [tradeId, liveTradedata,isDefaultValuesSet]);

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{display:'flex',justifyContent:'center',alignItems:'center', backgroundColor: COLORS.TopBox, padding: 20 ,width:responsiveWidth(80),height:responsiveHeight(40),borderRadius:responsiveWidth(2)}}>
      <TouchableOpacity onPress={handleSave} style={{ position: 'absolute', top: responsiveHeight(1), right: responsiveWidth(3) }}>
            <Text style={{ fontSize: responsiveFontSize(3) }}>X</Text>
          </TouchableOpacity>
       
       <View style={{display:'flex',justifyContent:'center',alignItems:'center', flexDirection:'column',gap:responsiveHeight(2)}}>
      
      <Text style={{color:'#000',textAlign:'left',fontSize:responsiveFontSize(2.2)}}>Enter Stop Loss</Text>
       <TextInput
          placeholder="Enter Stop Loss"
          value={txtEditStopLoss}
          onChangeText={setTxtEditStopLoss}
          placeholderTextColor={'gray'}
          style={{color:'#000',backgroundColor:COLORS.bgColor,width:responsiveWidth(60),borderRadius:responsiveWidth(2)}}
        />
        <Text style={{color:'#000',textAlign:'left',fontSize:responsiveFontSize(2.2)}}>Enter Target</Text>
        <TextInput
          placeholder="Enter Target"
          value={txtEditTarget}
          onChangeText={setTxtEditTarget}
          placeholderTextColor={'gray'}
          style={{color:'#000',backgroundColor:COLORS.bgColor,width:responsiveWidth(60),borderRadius:responsiveWidth(2)}}
        />
        <TouchableOpacity onPress={handleSave} style={{width:responsiveWidth(30),backgroundColor:'blue',height:responsiveHeight(5),borderRadius:responsiveWidth(5),display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:'#fff',fontWeight:'700',fontSize:responsiveFontSize(1.5)}}>Update</Text>
        </TouchableOpacity>
       </View>
       
      </View>
    </View>
  </Modal>
  );
};

export default ModalComponents;

const styles = StyleSheet.create({});
