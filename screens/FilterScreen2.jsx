import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

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

  const applyFilters = () => {
    alert('Filters applied');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Filters</Text>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Toggle Switch */}
        <View style={styles.filterContainer}>
          <Text style={styles.textHeaders}>Show non-EV locations</Text>
          <Switch value={nonEvLocations} onValueChange={setNonEvLocations} />
        </View>

        {/* Range Slider */}
        <View style={styles.filterContainer}>
          <Text style={styles.textHeaders}>Charger Power</Text>
          <MultiSlider
            values={chargerPower}
            sliderLength={300}
            onValuesChange={setChargerPower}
            min={50}
            max={400}
            step={1}
            selectedStyle={{backgroundColor: 'blue'}}
            markerStyle={{backgroundColor: 'blue'}}
            containerStyle={{alignSelf: 'center'}}
          />
          <View style={styles.sliderMarkers}>
            {[50, 125, 200, 275, 350, 400].map((marker, index) => (
              <Text key={index} style={styles.sliderMarker}>
                {marker}
              </Text>
            ))}
          </View>
          <Text>
            {chargerPower[0]} - {chargerPower[1]} kW
          </Text>
        </View>

        {/* Connector Types */}
        <View style={styles.filterContainer}>
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
        <View style={styles.filterContainer}>
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
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Reset and Apply Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
          <Text style={styles.buttonText}>Reset Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100, // space for fixed buttons
  },
  filterContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  textHeaders: {
    fontSize: 16,
    marginBottom: 10,
  },
  connectorContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  connector: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
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
    borderRadius: 5,
  },
  checkmarkContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
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
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  resetButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  applyButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  sliderMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginTop: 10,
  },
  sliderMarker: {
    fontSize: 12,
    color: '#000',
  },
});

export default FilterScreen;
