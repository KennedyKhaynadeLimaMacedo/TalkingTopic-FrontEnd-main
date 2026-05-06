import React, { useState } from 'react';
import { ScrollView, View, Text, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../components/Input';
import { Button } from '../../components/button';
import { registerStyles as styles } from '../../styles/screens/registerStyles';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
      <Image 
      source={require('../../assets/TalkingLogo.png')} 
      style={styles.logo}
      resizeMode="contain"
      />

        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Junte-se ao Talking Topic</Text>

        <View style={styles.inputContainer}>
          <Input label="Nome" value={name} onChangeText={setName} placeholder="Seu nome" />
          <Input label="Email" value={email} onChangeText={setEmail} placeholder="seu@email.com" />
          <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry placeholder="********" />
        </View>

        <Button 
          title="CADASTRAR" 
          onPress={() => {}} 
          variant="primary"
          fullWidth
          style={styles.registerButton}
        />

        <Button 
          title="Já tem uma conta? Faça login" 
          variant="outline"
          onPress={() => router.push('/auth/login')} 
          fullWidth
          style={styles.backButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}