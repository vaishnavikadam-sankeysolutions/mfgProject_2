import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Circle,
  Polyline,
  Polygon,
} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from '../config/constants';
import GetLocation from 'react-native-get-location';
import {useNavigation} from '@react-navigation/native';
import SearchScreen from './SearchScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

const GoogleMaps = () => {
  const navigation = useNavigation();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Location Permission',
          message:
            'Cool Photo App needs access to your location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionGranted(true);
        _getCurrentLocation();
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  function _getCurrentLocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        console.log('My current location is ==>', location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }

  const [markerList, setMarkerList] = useState([
    {
      id: 1,
      latitude: 19.198072781263868,
      longitude: 72.94743882207652,
      title: 'Location A is here',
      description: 'this is first location',
    },
    {
      id: 2,
      latitude: 19.193357451505797,
      longitude: 72.96717049137905,
      title: 'Location B is here',
      description: 'this is second location',
    },
    {
      id: 3,
      latitude: 19.19522480471644,
      longitude: 72.96781575451979,
      title: 'Location C is here',
      description: 'this is third location',
    },
    {
      id: 4,
      latitude: 19.211446712228447,
      longitude: 72.96859608531221,
      title: 'J K Gram',
      description: 'Thane West',
    },
    {
      id: 5,
      latitude: 19.059588886413565,
      longitude: 72.8300831364641,
      title: 'Bandra West',
      description: 'Mumbai, Maharashtra',
    },
    {
      id: 6,
      latitude: 19.208746639475205,
      longitude: 73.0978290751019,
      title: 'Dombivli',
      description: 'located on the banks of Ulhas River',
    },
    {
      id: 7,
      latitude: 16.852963883437056,
      longitude: 74.58015070640423,
      title: 'Sangli',
      description: 'Sangli Miraj Kupwad, Maharashtra',
    },
  ]);

  const MyCustomMarkerView = () => {
    return (
      <Image
        style={{width: 50, height: 50}}
        source={require('../assets/carMarker.png')}
      />
    );
  };

  const MyCustomCalloutView = () => {
    return (
      <View>
        <Text>MyCustomCalloutView</Text>
      </View>
    );
  };

  const handleMarkerPress = marker => {
    setSelectedMarker(marker);
  };

  const handleClosePress = () => {
    setSelectedMarker(null);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    searchContainer: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 40 : 20,
      left: 10,
      right: 10,
      backgroundColor: 'white',
      borderRadius: 5,
      elevation: 5,
      zIndex: 1,
    },
    searchInput: {
      padding: 5,
    },
    listView: {
      backgroundColor: 'white',
    },
    filterButton: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 40 : 20,
      right: 10,
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 10,
      elevation: 5,
      zIndex: 1,
    },
    filterButtonText: {
      color: 'blue',
    },
    filterIcon: {
      width: 30,
      height: 30,
    },
    bottomSheet: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 10,
      zIndex: 2,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Enter location, address, charger"
          style={styles.searchBox}
          onPress={() => navigation.navigate('SearchScreen')}
        />
      </View>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => navigation.navigate('FilterScreen')}>
        <Image
          source={require('../assets/filter-icon.png')}
          style={styles.filterIcon}
        />
      </TouchableOpacity>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 19.198072781263868,
          longitude: 72.94743882207652,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}>
        <Marker
          coordinate={{
            latitude: 19.210592828013596,
            longitude: 72.97260469705492,
          }}>
          <MyCustomMarkerView />
          <Callout style={{width: 400, height: 90}}>
            <MyCustomCalloutView />
          </Callout>
        </Marker>
        {markerList.map(marker => {
          return (
            <Marker
              draggable
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
              onDragEnd={e => console.log({x: e.nativeEvent.coordinate})}
              onPress={() => handleMarkerPress(marker)} // Add onPress to Marker
            />
          );
        })}
        <Circle
          center={{latitude: 19.203564002466557, longitude: 72.96223046670265}}
          radius={200}
          fillColor="#bbdefb"
          strokeColor="blue"
        />
        <Polyline
          strokeColor="red"
          strokeWidth={2}
          coordinates={[
            {
              latitude: 19.199958055220424,
              longitude: 72.95189374726651,
            },
            {
              latitude: 19.196401705634205,
              longitude: 72.96428450440415,
            },
          ]}
        />
        <Polygon
          coordinates={[
            {
              latitude: 19.19665442682184,
              longitude: 72.95049649927044,
            },
            {
              latitude: 19.19168024173307,
              longitude: 72.96545448147583,
            },
            {
              latitude: 19.194472943811188,
              longitude: 72.95093547281747,
            },
          ]}
          fillColor="rgba(255, 0, 0, 0.5)"
          strokeColor="blue"
          strokeWidth={2}
        />
      </MapView>

      {selectedMarker && (
        <Animatable.View
          animation="slideInUp"
          duration={500}
          style={styles.bottomSheet}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClosePress}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {selectedMarker.title}
          </Text>
          <Text style={{marginTop: 10}}>{selectedMarker.description}</Text>
          <Text style={{marginTop: 10}}>
            Latitude: {selectedMarker.latitude}
          </Text>
          <Text style={{marginTop: 10}}>
            Longitude: {selectedMarker.longitude}
          </Text>
        </Animatable.View>
      )}
    </KeyboardAvoidingView>
  );
};

export default GoogleMaps;
