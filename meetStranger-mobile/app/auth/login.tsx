import React, { useState } from 'react';
import { 
  Text, 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  Image, 
  StatusBar,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';

import { Input } from '../../components/Input';
import { Button } from '../../components/button';
import { loginStyles as styles } from '../../styles/screens/loginStyles';

export default function Login() {
  const router = useRouter();
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    router.replace("/chat/select");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? 20 : 0}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />
      
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.glassCard}>
            <Image 
              source={require('../../assets/TalkingLogo.png')} 
              style={styles.logo} 
              resizeMode='contain'
            />

            <Text style={styles.title}>Talking Topic</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>

            <View style={styles.inputContainer}>
              <Input
                label='Email'
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize='none'
                placeholder='seu@email.com'
              />
              
              <Input
                label='Senha'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder='********'
              />
            </View>

            <Button
              title='ENTRAR'
              onPress={handleLogin}
              variant="primary"
              fullWidth
              style={styles.loginButton}
            />

            <Button
              title='CADASTRE-SE'
              onPress={() => router.push('/auth/register')}
              variant="ghost"
              fullWidth
              style={{ marginTop: 8 }}
              textStyle={{ color: '#4ADE80' }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
