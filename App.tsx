import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { config } from './config';
import {initializeApp} from "firebase/app";
import { getDatabase, ref, onValue, Database } from "firebase/database";
import { useEffect } from 'react';

initializeApp(config);


export default function App() {
  const courseListener = async () => {
    const db = getDatabase();
    console.log("Hello World")
    const reference = ref(db, "course");
    //console.log(reference)
    await onValue(reference, (snapshot) => {
      console.log(snapshot)
      console.log(snapshot.val());
    });
  };


  useEffect(() => {
    courseListener();
  }, [])
  
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
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
