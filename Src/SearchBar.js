import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { GestureHandlerRootView, } from 'react-native-gesture-handler';
import BottomSheet from './BottomSheet';
import React, {useState,useRef,useCallback} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const SearchBar = () => {

  // BootomSheet Modal  start ---------------------------------------
  const ref = useRef(null);
  const onPress = useCallback(() => {
    const isActive = ref.current?.isActive();
    if (isActive) {
      ref.current?.scrollTo(0);
    } else {
      ref.current?.scrollTo(-500);
    }
  }, []);
  // BootomSheet Modal  end  ---------------------------------------



  const animation = useSharedValue(0);
  const [Value, setValue] = useState(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width:
        animation.value == 1
          ? withTiming(300, {duration: 500})
          : withTiming(0, {duration: 500}),
    };
  });
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
    <GestureHandlerRootView >
    <View
      style={{
        // flex: 1,
        display:'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={onPress} style={{paddingHorizontal:17,paddingTop:10}}>
        <Image
          source={require('../assets/Image/Filter.png')}
          style={{width: 25, height: 25}}
        />
      </TouchableOpacity>

      <Animated.View
        style={[
          {
            width: '100%',
            height: 40,
            backgroundColor: '#2E538C',
            flexDirection: 'row',
            justifyContent: 'center',
            borderRadius: 10,
            alignItems: 'center',
          },
          animatedStyle,
        ]}>
        <TextInput style={{width: '90%'}} placeholder="search here" placeholderTextColor={'#fff'} />
        <TouchableOpacity
          onPress={() => {
            if (animation.value == 1) {
              animation.value = 0;
              setValue(0);
            } else {
              animation.value = 1;
              setValue(1);
            }
          }}>
          <Image
            source={
              Value == 1
                ? require('../assets/Image/Close.png')
                : require('../assets/Image/search.png')
            }
            style={{width: Value == 1 ? 25 : 25, height: Value == 1 ? 25 : 25}}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
    <BottomSheet ref={ref}/>
    </GestureHandlerRootView>
    </KeyboardAvoidingView>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
