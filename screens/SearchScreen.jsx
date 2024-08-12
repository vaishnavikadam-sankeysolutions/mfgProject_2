import React from 'react';
import {FlatList, Text, View, StyleSheet, TextInput} from 'react-native';

const SearchScreen = () => {
  const locations = [
    {
      id: 1,
      latitude: 19.211446712228447,
      longitude: 72.96859608531221,
      title: 'J K Gram',
      description: 'Thane West',
    },
    {
      id: 2,
      latitude: 19.059588886413565,
      longitude: 72.8300831364641,
      title: 'Bandra West',
      description: 'Mumbai, Maharashtra',
    },
    {
      id: 3,
      latitude: 19.208746639475205,
      longitude: 73.0978290751019,
      title: 'Dombivli',
      description: 'located on the banks of Ulhas River',
    },
    {
      id: 4,
      latitude: 16.852963883437056,
      longitude: 74.58015070640423,
      title: 'Sangli',
      description: 'Sangli Miraj Kupwad, Maharashtra',
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Enter location, address, charger"
          style={styles.searchBox}
        />
      </View>
      <Text>Recent Searches</Text>
      <FlatList
        data={locations}
        renderItem={({item}) => (
          <View style={styles.locationItem}>
            <Text style={styles.locationName}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    fontSize: 24,
    padding: 10,
    margin: 10,
    color: '#fff',
    backgroundColor: 'blue',
    borderColor: 'black',
    borderWidth: 1,
  },
  locationItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchBox: {
    fontSize: 20,
    borderColor: 'black',
    borderWidth: 1,
    margin: 15,
    padding: 10,
    borderRadius: 5,
  },
});

export default SearchScreen;
