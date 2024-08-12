import React, {useState} from 'react';
import {View, Button, Text, StyleSheet, TextInput} from 'react-native';

const AccountScreen = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const SaveData = async () => {
    let isValid = true;

    if (!name) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (!age || isNaN(age)) {
      setAgeError(true);
      isValid = false;
    } else {
      setAgeError(false);
    }

    if (!email || !email.includes('@')) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!isValid) {
      return;
    }

    const url = 'http://10.0.2.2:3000/users';
    let result = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id, name, age: parseInt(age), email}),
    });

    result = await result.json();
    if (result) {
      console.warn('Data added');
      setId('');
      setName('');
      setAge('');
      setEmail('');
    }
  };

  return (
    <View>
      <Text style={{fontSize: 30, textAlign: 'center'}}>Create Users</Text>

      <TextInput
        style={styles.textBox}
        value={id}
        onChangeText={text => setId(text)}
        placeholder="Enter user ID"></TextInput>

      <TextInput
        style={styles.textBox}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Enter name"></TextInput>

      {nameError && (
        <Text style={{color: 'red'}}>Please enter a valid name</Text>
      )}

      <TextInput
        style={styles.textBox}
        placeholder="Enter age"
        value={age}
        onChangeText={text => setAge(text)}></TextInput>

      {ageError && <Text style={{color: 'red'}}>Please enter a valid age</Text>}

      <TextInput
        style={styles.textBox}
        placeholder="Enter email"
        value={email}
        onChangeText={text => setEmail(text)}></TextInput>

      {emailError && (
        <Text style={{color: 'red'}}>Please enter a valid email</Text>
      )}
      <View
        style={{
          // padding: 30,
          margin: 30,
          borderRadius: 1,
          shadowColor: 'black',
          shadowOpacity: 0.5,
          elevation: 0.5,
        }}>
        <Button title="Submit" onPress={SaveData}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  textBox: {
    borderColor: 'skyblue',
    fontSize: 20,
    borderWidth: 1,
    margin: 25,
    padding: 10,
  },
});

export default AccountScreen;
