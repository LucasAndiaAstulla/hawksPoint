import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home!</Text>
      <Text style={styles.subtitle}>Você conseguiu logar.</Text>
      
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111111' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#FFFFFF' },
  subtitle: { fontSize: 16, color: '#C7C7C7', marginBottom: 20 },
  button: { backgroundColor: '#d40f0f', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});