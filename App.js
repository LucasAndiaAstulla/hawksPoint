import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importando suas telas (ajuste o caminho se necessário)
import Login from './screens/login'; 
import Home from './screens/home';
import EsqueciSenha from './screens/esqueciSenha'; // Crie este arquivo similar ao Home

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} // Esconde o cabeçalho no Login
        />
        
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Área Principal' }} 
        />
        
        <Stack.Screen 
          name="EsqueciSenha" 
          component={EsqueciSenha} 
          options={{ title: 'Recuperar Senha' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}