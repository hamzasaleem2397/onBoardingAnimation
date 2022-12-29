import {
  Animated,
  FlatList,
  SliderBase,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {Data} from '../dummydata/Data';
import OnBoardingItem from './OnBoardingItem';
import Pagination from './Pagination';
import NextButton from './NextButton';

const OnBoarding = ({
  paginationColor = '#fcc419',
  titleColor = '#fcc419',
  descriptionColor = '#fcc419',
  buttonColor = '#fcc419',
  circleOutline = '#fcc419',
  circleFilledOutline = '#e67700',
  nextIconColor = '#e67700',
  fontSizeTitle = 22,
  fontSizeDescription = 18,
  onEnd,
  data,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChange = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const [backgroundColor, setbackgroundColor] = useState(
    Data[0].backgroundColor,
  );
  const sliderRef = useRef();
  const scrollTo = () => {
    if (currentIndex < Data.length - 1) {
      sliderRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      onEnd;
    }
  };
  useEffect(() => {
    setbackgroundColor(Data[currentIndex].backgroundColor);
  }, [currentIndex]);

  // const ViewConfig = useRef({itemVisiblePercentThreshold: 50}).current;
  const ViewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  return (
    <View style={styles.container(backgroundColor)}>
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
                fontSizeTitle={fontSizeTitle}
                fontSizeDescription={fontSizeDescription}
                image={item.image}
                title={item.title}
                description={item.desc}
                titleColor={titleColor}
                descriptionColor={descriptionColor}
              />
            );
          }}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Pagination
          data={Data}
          scrollX={scrollX}
          paginationColor={paginationColor}
        />
        <NextButton
          nextIconColor={nextIconColor}
          circleOutline={circleOutline}
          circleFilledOutline={circleFilledOutline}
          buttonColor={buttonColor}
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / Data.length)}
        />
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor,
  }),
});
