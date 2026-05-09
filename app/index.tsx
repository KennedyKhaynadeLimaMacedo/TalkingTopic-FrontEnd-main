import { useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/button";
import { View, Text, Image } from "react-native";
import { WelcomeStyles as styles } from "../styles/screens/welcomeStyles";

export default function Welcome() {
  const router = useRouter();
  
  // Descomente estas linhas se desejar habilitar o redirecionamento automático
  /*
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user, router]);
  */

  return (
    <View style={styles.container}>
      <View>
        <Image 
          source={require('../assets/TalkingLogo.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        <Text style={styles.title}>Bem-vindo ao MeetStranger</Text>
        <Text style={styles.subtitle}>
          Conecte-se com pessoas do mundo todo e converse sobre seus interesses
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Começar" 
          onPress={() => router.push('/auth/login')} 
        />
        <Text style={styles.textHelp}>
          Não possui conta ainda? clique no botão abaixo
        </Text>
        <Button 
          title="Registrar" 
          onPress={() => router.push('/auth/register')} 
        />
      </View>
    </View>
  );
}
