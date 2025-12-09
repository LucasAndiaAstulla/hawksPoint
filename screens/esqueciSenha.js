import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function EsqueciSenha({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.text}>Digite seu e-mail para receber o link.</Text>
      
      {/* Botão Voltar */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 20 },
  button: { backgroundColor: '#1a73e8', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff' }
});