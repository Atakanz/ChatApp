import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import styles from './SectionHeader.style';
import {useSelector} from 'react-redux';

const SectionHeader = props => {
  const theme = useSelector(state => state.theme.theme);
  return (
    <SafeAreaView>
      <View style={styles.headerView}>
        <Text style={[styles.header, styles[`header${theme}`]]}>
          {props.header}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SectionHeader;
