import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  Button,
} from 'react-native';
import Slider from '@react-native-community/slider';

const brands = [
  {name: 'Londis', image: require('../assets/londis.png')},
  {name: 'Budgens', image: require('../assets/budgens.png')},
  {name: 'Greggs', image: require('../assets/greggs.png')},
  {name: 'BurgerKing', image: require('../assets/burgerKing.png')},
  {name: 'KFC', image: require('../assets/kfc.png')},
  {name: 'OLA', image: require('../assets/ola.png')},
  {name: 'Waffles', image: require('../assets/waffles.png')},
];

const connectorTypes = ['CCS', 'CHAdeMO'];

const FilterScreen = () => {
  const [nonEvLocations, setNonEvLocations] = useState(false);
  const [chargerPower, setChargerPower] = useState([50, 400]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedConnectors, setSelectedConnectors] = useState([]);

  const toggleBrand = brand => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand],
    );
  };

  const toggleConnector = connector => {
    setSelectedConnectors(prev =>
      prev.includes(connector)
        ? prev.filter(c => c !== connector)
        : [...prev, connector],
    );
  };

  const resetFilters = () => {
    setNonEvLocations(false);
    setChargerPower([50, 400]);
    setSelectedBrands([]);
    setSelectedConnectors([]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select Filters</Text>

      {/* Toggle Switch */}
      <View style={styles.filterContainer1}>
        <Text style={styles.textHeaders}>Show non-EV locations</Text>
        <Switch value={nonEvLocations} onValueChange={setNonEvLocations} />
      </View>

      {/* Range Slider */}
      <View style={styles.filterContainer2}>
        <Text style={styles.textHeaders}>Charger Power</Text>
        <Slider
          style={{width: 300, height: 40}}
          minimumValue={50}
          maximumValue={400}
          step={1}
          value={chargerPower[0]}
          onValueChange={value => setChargerPower([value, chargerPower[1]])}
        />
        <Text>
          {chargerPower[0]} - {chargerPower[1]} kW
        </Text>
      </View>

      {/* Connector Types */}
      <View style={styles.filterContainer3}>
        <Text style={styles.textHeaders}>Connector Type</Text>
        <View style={styles.connectorContainer}>
          {connectorTypes.map(connector => (
            <TouchableOpacity
              key={connector}
              onPress={() => toggleConnector(connector)}
              style={[
                styles.connector,
                selectedConnectors.includes(connector) &&
                  styles.connectorSelected,
              ]}>
              <Text
                style={[
                  styles.connectorText,
                  selectedConnectors.includes(connector) &&
                    styles.connectorTextSelected,
                ]}>
                {connector}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Selectable Brands */}
      <View style={styles.filterContainer4}>
        <Text style={styles.textHeaders}>Brands</Text>
        <View style={styles.brandContainer}>
          {brands.map(brand => (
            <TouchableOpacity
              key={brand.name}
              onPress={() => toggleBrand(brand.name)}>
              <View style={styles.brand}>
                <Image source={brand.image} style={styles.brandImage} />
                {selectedBrands.includes(brand.name) && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.checkmark}>✓ </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Reset and Apply Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Reset Filters" onPress={resetFilters} />
        <Button title="Apply" onPress={() => alert('Filters applied')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    position: 'fixed',
  },
  filterContainer1: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 30,
  },
  filterContainer2: {
    marginBottom: 20,
    padding: 30,
    backgroundColor: '#fff',
    flex: 1,
  },
  filterContainer3: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    marginBottom: 10,
  },
  filterContainer4: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 30,
  },
  connectorContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
    margin: 10,
  },
  connector: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    height: 50,
  },
  connectorSelected: {
    backgroundColor: 'blue',
  },
  connectorText: {
    color: 'black',
  },
  connectorTextSelected: {
    color: 'white',
  },
  brandContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  brand: {
    margin: 5,
    position: 'relative',
  },
  brandImage: {
    width: 110,
    height: 70,
  },
  checkmarkContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'blue',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    position: 'fixed',
  },
  textHeaders: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default FilterScreen;
