import {
  Animated,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';

const Pagination = ({data, scrollX}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={styles.container}>
      {data.map((item, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i.toString()}
            style={[styles.dot, {width: dotWidth, opacity}]}></Animated.View>
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 64,
  },
  dot: {
    height: 20,
    marginHorizontal: 8,
    width: 20,
    backgroundColor: 'blue',
  },
});
