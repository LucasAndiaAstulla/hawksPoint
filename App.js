import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/login";
import Home from "./screens/home.js";
import AdmLogin from "./screens/admLogin.js";
import HomeADM from "./screens/homeAdm.js";
import Acontecimentos from "./screens/Acontecimentos.js";

const Stack = createNativeStackNavigator();

export default function App() { 

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        
        screenOptions={{
          headerTintColor: '#E0E0E0',
          headerStyle: {
            backgroundColor: "#111111",
            borderBottomWidth: 1, 
            borderBottomColor: "#1E1E1E", 
          },
          headerShadowVisible: false,
        }}
      >
        
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Área Principal" }}
        />

        <Stack.Screen
          name="AdmLogin"
          component={AdmLogin}
          options={{ title: "Adm Login" }}
        />

        <Stack.Screen
          name="HomeAdm" 
          component={HomeADM}
          options={{ title: "Área Principal ADM" }}
        />

        <Stack.Screen
          name="Acontecimentos"
          component={Acontecimentos}
          options={{ title: "Acontecimentos" }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}