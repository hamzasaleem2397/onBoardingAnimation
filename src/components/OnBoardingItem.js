import {StyleSheet, Text, View, useWindowDimensions, Image} from 'react-native';
import React from 'react';

const OnBoardingItem = ({
  image,
  title,
  description,
  titleColor = 'purple',
  descriptionColor = 'purple',
  fontSize = 22,
}) => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={[
          styles.image,
          {resizeMode: 'center', width, height: height * 0.66},
        ]}
      />
      <View style={{flex: 0.3}}>
        <Text style={styles.title(titleColor, fontSize)}>{title}</Text>
        <Text style={styles.description(descriptionColor, fontSize)}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
  },
  title: (color, fontSize) => ({
    fontFamily: 'arials',
    color,
    fontWeight: 'bold',
    fontSize,
  }),
  description: (color, fontSize) => ({
    fontFamily: 'arials',
    fontWeight: 'bold',
    color,
    fontSize,
  }),
  image: {
    justifyContent: 'center',
  },
});
