import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function PontoRow({ label, hora, cor, disabled, onPress }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        <View style={[styles.timeBox, { backgroundColor: cor }]}>
          <Text style={styles.time}>{hora}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, disabled && styles.disabled]}
          disabled={disabled}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>Bater ponto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { color: "#D40F0F", fontSize: 16, marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  timeBox: {
    width: "48%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  time: { color: "#fff", fontSize: 30, fontWeight: "bold" },
  button: {
    width: "48%",
    height: 80,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  disabled: { opacity: 0.4 },
  buttonText: { color: "#aaa" },
});
