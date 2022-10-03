import React from 'react';
import {SafeAreaView, TouchableOpacity, Image, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './UserCards.style';

const UserCards = props => {
  const theme = useSelector(state => state.theme.theme);
  return (
    <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
      <TouchableOpacity onPress={props.task}>
        <View style={styles.enabledDirection}>
          <View style={styles.viewImg}>
            <Image source={{uri: props.link}} style={styles.img} />
          </View>
          <View style={[styles.textView, styles[`textView${theme}`]]}>
            <Text style={[styles.textInfo, styles[`text${theme}`]]}>
              {props.name} {props.surname}
            </Text>
            {props.lastMessage && (
              <Text style={[styles.lastMessage, styles[`text${theme}`]]}>
                {props.lastMessage}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserCards;
