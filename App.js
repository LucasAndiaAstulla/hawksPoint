import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/login";
import Home from "./screens/home";
import EsqueciSenha from "./screens/esqueciSenha";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Área Principal",
            headerTintColor: '#E0E0E0',
            headerStyle: {
              backgroundColor: "#111111",
              borderBottomWidth: 1, 
              borderBottomColor: "#1E1E1E", 
            },
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="EsqueciSenha"
          component={EsqueciSenha}
          options={{ title: "Recuperar Senha" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
