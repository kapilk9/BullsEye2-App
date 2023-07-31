import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState,useRef, useEffect} from 'react';
import { COLORS } from './constants';
const {height, width} = Dimensions.get('window');
export default function Screen1() {
  const [data, SetData] = useState([
    {
      id: 1,
      image: require('./assets/Image/LoginBg.jpg'),
      content: ' Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry',
    },
    {
      id: 2,
      image: require('./assets/Image/LoginBg.jpg'),
      content: ` Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.`,
    },
    {
      id: 3,
      image: require('./assets/Image/LoginBg.jpg'),
      content: ' Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been the industry',
    },
              
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);
  const isManuallyScrolling = useRef(false);
  const isReversed = useRef(false);

  useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, []);

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      if (!isManuallyScrolling.current) {
        scrollToNextSlide();
      }
    }, 2000); // Adjust the delay (in milliseconds) as per your requirement
  };

  const scrollToNextSlide = () => {
    if (currentIndex === data.length - 1) {
      isReversed.current = true;
    } else if (currentIndex === 0) {
      isReversed.current = false;
    }

    let nextIndex;
    if (isReversed.current) {
      nextIndex = currentIndex - 1;
    } else {
      nextIndex = currentIndex + 1;
    }

    flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
    setCurrentIndex(nextIndex);
  };


  const handleManualScroll = (e) => {
    isManuallyScrolling.current = true;
    stopAutoSlide();

    const contentOffset = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / width);
    setCurrentIndex(newIndex);
  };
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          height: height / 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
        ref={flatListRef}
          data={data}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          inverted={isReversed.current}
            onScroll={handleManualScroll}
          onScrollBeginDrag={() => {
            isManuallyScrolling.current = true;
            stopAutoSlide();
          }}
          onScrollEndDrag={() => {
            isManuallyScrolling.current = false;
            startAutoSlide();
          }}
          horizontal
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: width - 30,
                  height: height / 6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  disabled={true}
                  style={{
                    width: '90%',
                    height: '90%',
                    backgroundColor: COLORS.bgColor,
                    borderRadius: 10,
                    justifyContent: 'center',
                    padding: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={item.image}
                      style={{width: 70, height: 70, borderRadius: 50}}
                    />
                    <Text
                      style={{
                        color: COLORS.textColor,
                        marginTop: 10,
                        textAlign: 'justify',
                        flex: 1,
                        flexWrap: 'wrap',
                        paddingLeft: 10,
                      }}
                      numberOfLines={3}
                      ellipsizeMode="tail">
                      {item.content}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {data.map((item, index) => {
          return (
            <View
              style={{
                width: currentIndex == index ? 30 : 8,
                height: currentIndex == index ? 10 : 8,
                borderRadius: currentIndex == index ? 5 : 4,
                backgroundColor: currentIndex == index ? COLORS.textColor : COLORS.bgColor,
                marginLeft: 5,
              }}></View>
          );
        })}
      </View>
    </View>
  );
}
