import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, Image} from 'react-native';

const SearchLocations = () => {
  const [searchText, setSearchText] = useState('');
  const [locations, setLocations] = useState([]);

  const searchUser = async text => {
    setSearchText(text);
    const url = `https://jsonplaceholder.typicode.com/users?q=${text}`;
    // const url = `http://10.0.2.2:3000/users?q=${text}`;
    // console.warn(url);
    try {
      let result = await fetch(url);
      if (result.ok) {
        let data = await result.json();
        // console.warn(data);
        setLocations(data);
      } else {
        console.warn('Error fetching data');
      }
    } catch (error) {
      console.warn('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Enter location, address, charger"
          style={styles.searchBox}
          value={searchText}
          onChangeText={text => searchUser(text)}
          
        />
      </View>
      <FlatList
        data={locations}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.locationItem}>
            <Text style={styles.locationName}>{item.name}</Text>
            <Text>{item.country}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  locationItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SearchLocations;
