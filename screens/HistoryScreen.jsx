import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet, Text, TextInput, Modal} from 'react-native';

const HistoryScreen = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const getAPIData = async () => {
    const url = 'http://10.0.2.2:3000/users';
    let result = await fetch(url);
    result = await result.json();
    if (result) {
      setData(result);
    }
  };

  const deleteAPIData = async id => {
    const url = 'http://10.0.2.2:3000/users';
    let result = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    result = await result.json();

    if (result) {
      getAPIData();
    }
  };

  const updateUser = user => {
    setShowModal(true);
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age.toString());
  };

  const handleUpdate = async () => {
    const url = `http://10.0.2.2:3000/users/${selectedUser.id}`;
    const result = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, age: parseInt(age, 10)}),
    });
    if (result.ok) {
      setShowModal(false);
      getAPIData();
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.dataWrapper}>
        <View style={{flex: 1.2}}>
          <Text style={{fontSize: 18, fontStyle: 'italic'}}>Name</Text>
        </View>
        <View style={{flex: 2.9}}>
          <Text style={{fontSize: 18, fontStyle: 'italic'}}>Age</Text>
        </View>
      </View>

      {data.length
        ? data.map(item => (
            <View key={item.id} style={styles.dataWrapper}>
              <View style={{flex: 1}}>
                <Text>{item.name}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>{item.age}</Text>
              </View>
              <View style={{flex: 1, marginRight: 2}}>
                <Button
                  title="Update"
                  onPress={() => updateUser(item)}></Button>
              </View>
              <View style={{flex: 1}}>
                <Button
                  title="Delete"
                  onPress={() => deleteAPIData(item.id)}></Button>
              </View>
            </View>
          ))
        : null}

      <Modal visible={showModal} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              value={name}
              onChangeText={text => setName(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Age"
              value={age}
              keyboardType="numeric"
              onChangeText={text => setAge(text)}
            />
            <Button
              title="Update"
              onPress={handleUpdate}
              style={{marginBottom: 15}}
            />
            <Button title="Close" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5,
    padding: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 40,
    borderColor: 'black',
    borderWidth: 0.5,
    shadowColor: 'black',
    elevation: 5,
  },
  textInput: {
    borderColor: 'black',
    width: 300,
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
});

export default HistoryScreen;
