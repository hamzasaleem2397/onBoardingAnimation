import {
  Animated,
  FlatList,
  SliderBase,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Data} from '../dummydata/Data';
import OnBoardingItem from './OnBoardingItem';
import Pagination from './Pagination';
import NextButton from './NextButton';

const OnBoarding = ({
  paginationColor,
  titleColor = 'purple',
  descriptionColor = 'purple',
  fontSize = 22,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChange = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const sliderRef = useRef();
  const scrollTo = () => {
    if (currentIndex < Data.length - 1) {
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
      <View style={{flex: 1, alignItems: 'center'}}>
        <Pagination data={Data} scrollX={scrollX} />
        <NextButton
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / Data.length)}
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
