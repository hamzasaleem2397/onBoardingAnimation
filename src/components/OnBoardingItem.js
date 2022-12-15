import {StyleSheet, Text, View, useWindowDimensions, Image} from 'react-native';
import React from 'react';

const OnBoardingItem = ({image, title, description}) => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image
        source={{uri: image}}
        style={[
          styles.image,
          {resizeMode: 'cover', width, height: height * 0.7},
        ]}
      />
      <View style={{flex: 0.3}}>
        <Text>{title}</Text>
        <Text>{description}</Text>
      </View>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
  },
});
