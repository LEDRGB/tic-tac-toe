import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from '../tic-tac-toe/components/home';



export default function App() {
  return (
    <View style={styles.container}>
      <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
