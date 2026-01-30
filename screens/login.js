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

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const emailLucas = "vivita333"
  const senhaLucas = "vivita333" 

  const handleLogin = async () => {
    if (email != emailLucas || senhaLucas != emailLucas) {
      Alert.alert("Atenção", "Por favor, preencha o email e a senha.");
      return;
    }

    try {
      console.log("Tentando logar com:", email);
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro",
        "Falha ao realizar login. Verifique suas credenciais."
      );
    }
  };

  const handleAdmLogin = () => {
    Alert.alert("ADM", "Você está na tela de login ADM!");
    navigation.navigate("AdmLogin");
  };

  return (
    
    <View style={styles.mainContainer}>
      
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.formContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/gaviaologo.webp")}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.admButton} onPress={handleAdmLogin}>
        <Image style={styles.admIcon} source={require("../assets/adm.png")} />
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardView: {
    flex: 1, 
    width: "100%",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
    backgroundColor: "#FAFAFA",
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  admButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    padding: 10,
    zIndex: 10, 
  },
  admIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});