import {
  Animated,
  FlatList,
  SliderBase,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';

import OnBoardingItem from './OnBoardingItem';
import Pagination from './Pagination';
import NextButton from './NextButton';

const OnBoarding = ({data}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChange = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const sliderRef = useRef();
  const scrollTo = () => {
    if (currentIndex < data.length - 1) {
      sliderRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      console.log('last item');
    }
  };
  // const ViewConfig = useRef({itemVisiblePercentThreshold: 50}).current;
  const ViewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          bounces={false}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChange}
          viewabilityConfig={ViewConfig}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          ref={sliderRef}
          renderItem={({item}) => {
            return (
              <OnBoardingItem
                image={item.image}
                title={item.title}
                description={item.desc}
              />
            );
          }}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Pagination data={data} scrollX={scrollX} />
        <NextButton
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / data.length)}
        />
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
