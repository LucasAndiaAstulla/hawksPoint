import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as MailComposer from "expo-mail-composer";

export default function Acontecimentos({ navigation }) {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Função para selecionar o arquivo
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", 
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setFile(result.assets[0]);
        Alert.alert("Sucesso", "Arquivo anexado: " + result.assets[0].name);
      }
    } catch (err) {
      Alert.alert("Erro", "Não foi possível selecionar o arquivo.");
    }
  };

  
  const handleSend = async () => {
    if (description.trim() === "") {
      Alert.alert("Atenção", "Por favor, descreva o ocorrido.");
      return;
    }

    
    const isAvailable = await MailComposer.isAvailableAsync();

    if (isAvailable) {
      await MailComposer.composeAsync({
        recipients: ["lucas.andia.a@gmail.com"], // Colocar email para ser enviado
        subject: `Novo Ocorrido - Lucas - 10/12`,
        body: `Descrição do ocorrido:\n\n${description}`,
        attachments: file ? [file.uri] : [],
      });

      
      setSubmitted(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }).start();
    } else {
      Alert.alert(
        "Erro",
        "O envio de e-mail não está disponível neste dispositivo.",
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.headerText}>Vamos te ajudar Lucas</Text>
      <Text style={styles.subHeaderText}>Pontos referentes ao dia 10/12</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Atestado ou outros</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Descreva aqui o ocorrido"
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TouchableOpacity style={styles.attachButton} onPress={pickDocument}>
            <Text style={styles.attachButtonText}>
              {file
                ? `Arquivo: ${file.name.substring(0, 20)}...`
                : "Anexe aqui o atestado ou qualquer arquivo"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {submitted && (
        <Animated.View style={[styles.successContainer, { opacity: fadeAnim }]}>
          <Text style={styles.successText}>
            Muito obrigado pela sua descrição, bom descanso!
          </Text>
        </Animated.View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    paddingTop: 60,
  },
  headerText: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF" },
  subHeaderText: { fontSize: 16, color: "#FFFFFF", marginBottom: 40 },
  card: {
    width: "90%",
    backgroundColor: "#1C1C1E",
    borderRadius: 15,
    padding: 20,
  },
  cardTitle: {
    color: "#FF0000",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#2C2C2E",
    borderRadius: 10,
    padding: 10,
  },
  input: {
    color: "#FFFFFF",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    marginBottom: 15,
    paddingVertical: 10,
  },
  attachButton: {
    backgroundColor: "#000000",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  attachButtonText: { color: "#FFFFFF", fontSize: 12 },
  sendButton: {
    borderWidth: 1,
    borderColor: "#FF0000",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  sendButtonText: { color: "#FF0000", fontWeight: "bold" },
  successContainer: { marginTop: 40, paddingHorizontal: 40 },
  successText: {
    color: "#FF0000",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
