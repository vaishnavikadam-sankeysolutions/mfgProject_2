import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OffersScreen from './screens/OffersScreen';
import AccountScreen from './screens/AccountScreen';
import MapStackNavigator from './screens/MapStackNavigator';
import HistoryScreen from './screens/HistoryScreen';
import SearchScreen from './screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Offers') {
              iconName = focused ? 'pricetag' : 'pricetag-outline';
            } else if (route.name === 'Account') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarActiveBackgroundColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: route.name === 'FilterScreen' ? {display: 'none'} : {},
        })}>
        <Tab.Screen name="Map" component={MapStackNavigator} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Offers" component={OffersScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
