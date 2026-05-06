import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { aboutStyles as styles } from '../../styles/screens/aboutStyles';

export default function About() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>{"< Voltar"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Sobre o App MeetStranger</Text>
      </View>

      <View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎭 O que é o MeetStranger</Text>
          <Text style={styles.text}>
            O MeetStranger é um aplicativo de encontros privados que conecta pessoas de todo mundo para conversas casuais e divertidas.
            Com uma interface simples e intuitiva, o MeetStranger permite que os usuários se conectem com outras pessoas de forma segura, proporcionando uma experiência única de socialização online.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔐 Privacidade</Text>
          <Text style={styles.text}>Sua Privacidade é nossa prioridade</Text>
          <Text style={styles.listItem}>• Não coletamos dados pessoais</Text>
          <Text style={styles.listItem}>• Você pode sair a qualquer momento</Text>
          <Text style={styles.listItem}>• Não armazenamos suas mensagens</Text>
          <Text style={styles.text}>Projeto inspirado no antigo OMEGLE</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌐 Como funciona</Text>
          <Text style={styles.listItem}>1. Escolha um tópico para iniciar a conversa (filmes, Jogos, Séries)</Text>
          <Text style={styles.listItem}>2. Seja conectado com alguém que compartilha do mesmo interesse que o seu</Text>
          <Text style={styles.listItem}>3. Converse Livremente sobre o tema escolhido</Text>
          <Text style={styles.listItem}>4. Caso não esteja gostando da conversa você pode se conectar com outro Parceiro</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Recursos</Text>
          <Text style={styles.listItem}>1. Chat em tempo Real</Text>
          <Text style={styles.listItem}>2. Múltiplas escolhas de categorias</Text>
          <Text style={styles.listItem}>3. Interface simples e intuitiva</Text>
          <Text style={styles.listItem}>4. Conexão rápida</Text>
          <Text style={styles.listItem}>5. Totalmente gratuito</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🖥️ Sobre o desenvolvedor</Text>
          <Text style={styles.developerName}>Kennedy Khaynã</Text>
          <Text style={styles.text}>Novo programador mas com pensamentos grandes</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Projeto inspirado no Projeto Omegle</Text>
          <Text style={styles.text}>Versão 1.0.0</Text>
          <Text style={styles.version}>2026 ❤️ Feito com carinho para conectar pessoas</Text>
        </View>
      </View>
    </ScrollView>
  );
}