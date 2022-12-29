import {
  Animated,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';

const Pagination = ({data, scrollX, paginationColor}) => {
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
            style={[
              styles.dot(paginationColor),
              {width: dotWidth, opacity},
            ]}></Animated.View>
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dot: paginationColor => ({
    height: 10,
    marginHorizontal: 3,
    width: 20,
    backgroundColor: paginationColor,
    borderRadius: 100,
  }),
});
