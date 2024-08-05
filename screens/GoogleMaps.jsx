import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Image,
  KeyboardAvoidingView,
  Platform,
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
import MapViewDirections from 'react-native-maps-directions';
import GetLocation from 'react-native-get-location';

const GoogleMaps = () => {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [permissionGranted, setPermissionGranted] = useState(false);

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
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          onFail={error => console.log(error)}
          styles={{
            textInput: styles.searchInput,
            listView: styles.listView,
          }}
        />
      </View>
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
              longitude: 72.96415070450443,
            },
            {
              latitude: 19.189957178945843,
              longitude: 72.96419530466774,
            },
            {
              latitude: 19.189578081294787,
              longitude: 72.97869035774266,
            },
            {
              latitude: 19.197538948620153,
              longitude: 72.98141096770443,
            },
          ]}
        />

        {origin != undefined && destination != undefined ? (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
          />
        ) : null}
      </MapView>
    </KeyboardAvoidingView>
  );
};

export default GoogleMaps;
