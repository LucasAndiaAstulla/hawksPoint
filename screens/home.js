import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Configure a parte da hora para a pessoa bater o ponto por aqui
const CONFIG = {
  PREVISTOS: {
    chegada: "17:00",
    pausaInicio: "19:00",
    pausaFim: "19:20",
    saida: "22:00",
  },
  KEYS: ["chegada", "pausaInicio", "pausaFim", "saida"],
  STORAGE: {
    POINTS: "@meus_pontos",
    LAST_ACCESS: "@last_access",
  },
};

export default function Home({navigation}) {
  const [agora, setAgora] = useState(new Date());
  const [pontos, setPontos] = useState({
    chegada: { time: null },
    pausaInicio: { time: null },
    pausaFim: { time: null },
    saida: { time: null },
  });

  const horaAtualStr = useMemo(() => {
    return agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [agora]);

  //Aqui é a parte para salvar, se você comentar "inicializarApp()" ele vai resetar
  //Caso n comente ele roda e salva no celular as informações
  useEffect(() => {
    const timer = setInterval(() => setAgora(new Date()), 30000);
    //inicializarApp();
    return () => clearInterval(timer);
  }, []);

  const inicializarApp = async () => {
    try {
      const hoje = new Date().toLocaleDateString("pt-BR");
      const [ultimaData, dadosSalvos] = await Promise.all([
        AsyncStorage.getItem(CONFIG.STORAGE.LAST_ACCESS),
        AsyncStorage.getItem(CONFIG.STORAGE.POINTS),
      ]);

      if (ultimaData === hoje && dadosSalvos) {
        setPontos(JSON.parse(dadosSalvos));
      } else {
        await AsyncStorage.setItem(CONFIG.STORAGE.LAST_ACCESS, hoje);
        await AsyncStorage.removeItem(CONFIG.STORAGE.POINTS);
      }
    } catch (e) {
      console.error("Erro ao carregar dados", e);
    }
  };

  // Função centralizada para definir as cores baseadas no status
  const getStatusStyle = (pontoKey) => {
    const timeReal = pontos[pontoKey].time;
    if (!timeReal) return { border: "#333", text: "#666" }; // Estado neutro/vazio

    const toMinutes = (str) => {
      const [h, m] = str.split(":").map(Number);
      return h * 60 + m;
    };

    const diff = toMinutes(timeReal) - toMinutes(CONFIG.PREVISTOS[pontoKey]);

    //configuração de cores para aparecer caso a pessoa responda fora do tempo
    if (diff >= -2 && diff <= 2) return { border: "#4ADE80", text: "#4ADE80" }; // No ponto
    if (diff < -2) return { border: "#7DD3FC", text: "#7DD3FC" }; // Cedo
    if (diff > 2 && diff <= 15) return { border: "#FBBF24", text: "#FBBF24" }; // Atraso leve
    return { border: "#FF4D4D", text: "#FF4D4D" }; // Crítico
  };

  const registrarPonto = async (key) => {
    const indexAtual = CONFIG.KEYS.indexOf(key);
    if (indexAtual > 0 && !pontos[CONFIG.KEYS[indexAtual - 1]].time) {
      return Alert.alert("Atenção", "Registre o ponto anterior primeiro!");
    }

    const novosPontos = { ...pontos, [key]: { time: horaAtualStr } };
    setPontos(novosPontos);
    await AsyncStorage.setItem(
      CONFIG.STORAGE.POINTS,
      JSON.stringify(novosPontos),
    );
  };

  const handleAcontecimentos = () => {
      Alert.alert("ADM", "Você está na tela de ocorrimentos!");
      navigation.navigate("Acontecimentos");
    };

  const PontoItem = ({ label, pontoKey, showLabel = true }) => {
    const timeRegistrado = pontos[pontoKey].time;
    const feito = !!timeRegistrado;
    const index = CONFIG.KEYS.indexOf(pontoKey);
    const habilitado = index === 0 || !!pontos[CONFIG.KEYS[index - 1]].time;

    const statusStyle = getStatusStyle(pontoKey);

    //Aqui primeiro eu tenho o content para os pontos
    return (
      <View style={styles.pontoContainer}>
        {showLabel && <Text style={styles.label}>{label}</Text>}
        <View style={styles.row}>
          <View
            style={[
              styles.timeBox,
              { borderColor: statusStyle.border, borderWidth: feito ? 2 : 1 },
            ]}
          >
            <Text
              style={[
                styles.timeText,
                { color: feito ? statusStyle.text : "#444" },
              ]}
            >
              {feito ? timeRegistrado : habilitado ? horaAtualStr : "--:--"}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.actionButton,
              { opacity: habilitado && !feito ? 1 : 0.4 },
            ]}
            onPress={() => registrarPonto(pontoKey)}
            disabled={!habilitado || feito}
          >
            <Text style={styles.actionText}>
              {feito ? "Registrado" : "Bater Ponto"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Parte principal que vai entrar o Home
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bem vindo, Lucas Andia</Text>
          <Text style={styles.dateText}>
            Hoje: {agora.toLocaleDateString("pt-BR")}
          </Text>
        </View>

        <View style={styles.cardSection}>
          <PontoItem label="Hora de chegada" pontoKey="chegada" />
        </View>

        <View style={styles.cardSection}>
          <Text style={styles.label}>Pausa</Text>
          <PontoItem pontoKey="pausaInicio" showLabel={false} />
          <View style={{ marginTop: 15 }}>
            <PontoItem pontoKey="pausaFim" showLabel={false} />
          </View>
        </View>

        <View style={styles.cardSection}>
          <PontoItem label="Hora de saída" pontoKey="saida" />
        </View>

        <TouchableOpacity style={styles.occurButton} onPress={handleAcontecimentos} >
          <Text style={styles.occurButtonText}>Aconteceu algum ocorrido?</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },
  scrollContent: { paddingBottom: 40, paddingHorizontal: 20 },
  header: { alignItems: "center", marginVertical: 30 },
  welcomeText: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  dateText: { fontSize: 14, color: "#777", marginTop: 5 },
  cardSection: {
    backgroundColor: "#161616",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#222",
  },
  label: {
    color: "#FF3B30", // O vermelho da sua marca
    fontSize: 14,
    marginBottom: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeBox: {
    width: "48%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  timeText: { fontSize: 28, fontWeight: "bold" },
  actionButton: {
    width: "48%",
    height: 70,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  actionText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  occurButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  occurButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
