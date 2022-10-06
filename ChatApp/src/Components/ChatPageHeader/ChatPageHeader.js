import React from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './ChatPageHeader.style';

const TopBar = ({src, name, icon2, icon3}) => {
  const theme = useSelector(state => state.theme.theme);
  return (
    <SafeAreaView
      style={[styles.enabledDirection, styles[`enabledDirection${theme}`]]}>
      <View style={styles.directionRow}>
        <View style={styles.textImage}>
          {src ? (
            <Image source={{uri: src}} style={styles.img} />
          ) : (
            <Image
              source={require('../../Assets/noProfilePhoto.jpg')}
              style={styles.img}
            />
          )}

          <Text style={[styles.text, styles[`text${theme}`]]}>{name}</Text>
        </View>
        <View style={styles.rightIcon}>
          <View>{icon2}</View>
          <View style={styles.secondIcon}>{icon3}</View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default TopBar;
