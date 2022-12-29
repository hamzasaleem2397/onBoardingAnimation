import {StyleSheet, Text, View, useWindowDimensions, Image} from 'react-native';
import React from 'react';

const OnBoardingItem = ({
  image,
  title,
  description,
  titleColor,
  descriptionColor,
  fontSizeTitle,
  fontSizeDescription,
}) => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={[
          styles.image,
          {resizeMode: 'center', width, height: height * 0.6},
        ]}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.title(titleColor, fontSizeTitle)}>{title}</Text>
        <Text
          style={styles.description(
            descriptionColor,
            fontSizeDescription,
            width,
          )}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: (color, fontSize) => ({
    fontFamily: 'arials',
    color,
    fontWeight: 'bold',
    fontSize,
  }),
  description: (color, fontSize, width) => ({
    fontFamily: 'arials',
    fontWeight: 'bold',
    color,
    fontSize,

    width: width * 0.9,
  }),
  image: {
    justifyContent: 'center',
  },
});
