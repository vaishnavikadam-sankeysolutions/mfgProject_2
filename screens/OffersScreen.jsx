import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

const OffersScreen = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        Offers
      </Text>
      <Animatable.Image source={require('../assets/discount.png')} style={{width:150, height:150, marginLeft: -60}} animation={'zoomIn'} duration={200}></Animatable.Image>
    </View>
  );
};

export default OffersScreen;
