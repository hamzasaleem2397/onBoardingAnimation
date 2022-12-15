import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Data} from '../dummydata/Data';
import OnBoardingItem from './OnBoardingItem';
import Pagination from './Pagination';

const OnBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChange = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const sliderRef = useRef();
  // const ViewConfig = useRef({itemVisiblePercentThreshold: 50}).current;
  const ViewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  return (
    <View style={styles.container}>
      <View style={{flex: 3, backgroundColor: 'red'}}>
        <FlatList
          data={Data}
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
      <Pagination data={Data} scrollX={scrollX} />
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
