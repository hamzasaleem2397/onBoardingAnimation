import React from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';
import OnBoarding from './src/components/OnBoarding';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <OnBoarding paginationColor="blue" /> */}
      <OnBoarding
        titleColor="white"
        descriptionColor="white"
        circleOutline="white"
        paginationColor="white"
        onEnd={() => console.log('asdas')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
