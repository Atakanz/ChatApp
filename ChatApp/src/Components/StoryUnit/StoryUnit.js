import React from 'react';
import {SafeAreaView, Text, Image} from 'react-native';
import styles from './StoryUnit.style';

const StoryUnit = props => {
  const time = props.date.slice(4, 11) + props.date.slice(16, 21);
  return (
    <SafeAreaView style={styles.container}>
      <Image source={{uri: props.status}} style={styles.status} />
      <Text style={styles.dateText}>{time}</Text>
    </SafeAreaView>
  );
};

export default StoryUnit;
