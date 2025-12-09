import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

// Recebendo a propriedade { navigation }
export default function Login({ navigation }) {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    // Aqui você pode manter o Alert para teste, ou tirar depois
    // Alert.alert("Login", `Nome: ${nome}\nSenha: ${senha}`);
    
    // COMANDO PARA MUDAR DE TELA:
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Atenção: Se a imagem não aparecer, verifique se o caminho ../../ está certo para sua estrutura de pastas */}
      <Image 
        style={styles.logo} 
        source={require("../assets/gaviaologo.webp")} 
      />

      <TextInput 
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput 
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      
      {/* Botão ENTROU -> Vai para Home */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      {/* Botão ESQUECI -> Vai para EsqueciSenha */}
      <TouchableOpacity 
        style={[styles.button, styles.buttonSecondary]}
        onPress={() => navigation.navigate('EsqueciSenha')}
      >
        <Text style={styles.buttonTextSecondary}>Esqueci a senha</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 250,
    height: 140,
    resizeMode: "contain",
    marginBottom: 50,
  },
  input: {
    height: 45,
    width: 260,
    padding: 10,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF0000",
    width: 260,
    height: 45,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#D40F0F",
    marginTop: 10, // Adicionei margem aqui também para separar os botões
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonTextSecondary: {
    color: "#D40F0F",
    fontWeight: "bold",
    fontSize: 16,
  },
});