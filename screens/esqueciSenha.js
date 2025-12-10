import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

export default function EsqueciSenha({ navigation }) {
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');

  const handleRecuperar = () => {
    
    if (matricula === '' || email === '') {
      Alert.alert("Erro", "Por favor, preencha a matrícula e o e-mail.");
      return;
    }

    Alert.alert(
      "Solicitação Enviada", 
      `Verificando matrícula: ${matricula}\nEnviaremos o link para: ${email}`
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Recuperar Senha</Text>
      
      <Text style={styles.description}>
        Informe sua matrícula e e-mail cadastrado.
      </Text>

      
      <TextInput 
        style={styles.input}
        placeholder="Nº da Matrícula"
        keyboardType="numeric" 
        value={matricula}
        onChangeText={setMatricula}
      />

      <TextInput 
        style={styles.input}
        placeholder="Seu E-mail"
        keyboardType="email-address" 
        autoCapitalize="none" 
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleRecuperar}>
        <Text style={styles.buttonTextPrimary}>Recuperar Senha</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.buttonSecondary} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonTextSecondary}>Voltar para Login</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff',
    padding: 20, 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10,
    color: '#333'
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    maxWidth: 300
  },
  
  input: {
    height: 45,
    width: 260,
    padding: 10,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    marginBottom: 15, 
  },
  
  buttonPrimary: { 
    backgroundColor: '#000', 
    width: 260,
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonTextPrimary: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 16
  },
  
  buttonSecondary: {
    marginTop: 15,
    padding: 10,
  },
  buttonTextSecondary: { 
    color: '#D40F0F', 
    fontSize: 16 
  }
});