import { Text, View, Image } from 'react-native';
import { Button } from '../../components/button';
import { useRouter } from 'expo-router';
//import { useAuth } from '../../hooks/useAuth';
//import { homeStyles as styles } from '../../styles/screens/homeStyle;
import React from 'react';

export default function Home() {
    const router = useRouter();
    // const { user, Logout } = useAuth();
    const user = { username: 'Kennedy' }; // Corrigido para 'username'

    const handleStartChat = () => {
        router.push('/chat/select');
    }
    const handleAbout = () => {
        router.push('/about');
    }
    const handleLogout = async () => {
        //await Logout();
        router.replace('/auth/login');
    }
return (
  <View>
    {/** Cabeçalho */}
    <View>
      <Image source={require('../../assets/favicon.png')} resizeMode='contain' />
      <Text>Bem-vindo, {user?.username || 'Stranger'}</Text>
      <Text>Pronto para se conectar com novas pessoas?</Text>
    </View>

    {/** Centro da página */}
    <View>
      {/** Sessão superior do centro */}
      <View>
        <Text>MeetStranger</Text>
        <Text>Converse com pessoas ao redor do mundo e encontre pessoas que gostam dos mesmo interreses que os seus!!!</Text>
      </View>

      {/** Sessão central do centro da página */}
      <View>
        <View>
          <Text>🌍</Text>
          <Text>Explore o mundo através do MeetStranger</Text>
        </View>
        <View>
          <Text>⚡</Text>
          <Text>Converse com pessoas ao redor do mundo de forma rápida e fácil</Text>
        </View>
      </View>
    </View>
    {/** Sessão inferior (Botões) */}
    <View>
      <Button 
        title='Começar a Conversar' 
        onPress={() => { handleStartChat(); }}
        //style={}
      />
      <Button 
        title='Conheça mais sobre o app' 
        onPress={() => { handleAbout(); }} 
        //style={}
        variant='outline' 
      />
      <Button 
        title='Sair' 
        onPress={() => { handleLogout(); }}
        //style={}
        variant='secondary' 
      />
    </View>
  </View>
  );
}