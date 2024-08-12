// MapStackNavigator.jsx

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GoogleMaps from './GoogleMaps';
import FilterScreen from './FilterScreen';
import SearchScreen from './SearchScreen';

const Stack = createStackNavigator();

const MapStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerShown:
          route.name === 'FilterScreen' || 'SearchScreen' ? false : true,
      })}>
      <Stack.Screen name="GoogleMaps" component={GoogleMaps} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default MapStackNavigator;
