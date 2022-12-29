import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Svg, {G, Circle} from 'react-native-svg';
const NextButton = ({
  percentage,
  scrollTo,
  buttonColor,
  circleOutline,
  circleFilledOutline,
  nextIconColor,
}) => {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);
  const animation = toValue => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    animation(percentage);
  }, [percentage]);
  useEffect(() => {
    progressAnimation.addListener(
      value => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage],
    );
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);
  console.log('object', progressRef);
  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation={'-90'} origin={center}>
          <Circle
            stroke={circleOutline}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke={circleFilledOutline}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth + 0.6}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button(buttonColor)}
        activeOpacity={0.6}>
        <Image
          tintColor={nextIconColor}
          style={{height: 40, width: 40}}
          resizeMode="cover"
          source={require('../assests/forward.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    // backgroundColor: 'pink',
  },
  button: buttonColor => ({
    position: 'absolute',
    backgroundColor: buttonColor,
    borderRadius: 100,
    padding: 20,
    alignSelf: 'center',
  }),
});
