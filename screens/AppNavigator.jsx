import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import GoogleMaps from './GoogleMaps';
import FilterScreen from './FilterScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GoogleMaps">
        <Stack.Screen name="GoogleMaps" component={GoogleMaps} />
        <Stack.Screen name="FilterScreen" component={FilterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
