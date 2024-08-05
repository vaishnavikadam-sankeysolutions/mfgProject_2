import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, PermissionsAndroid} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';

const CustomMarkers = () => {
  useEffect(() => {
    requestLocationPermission();
  }, []);

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
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

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

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });

  return (
    <View style={styles.container}>
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
          {/* <MyCustomMarkerView {...marker} /> */}
        </Marker>
        ;
        {markerList.map(marker => {
          return (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export default CustomMarkers;
