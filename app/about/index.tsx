import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { aboutStyles as styles } from '../../styles/liquidGlass';

export default function About() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar barStyle="light-content" />
            <View style={styles.content}>

                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>

                <Text style={styles.pageTitle}>Sobre o{'\n'}Talking-X</Text>

                {/* O que é */}
                <View style={styles.section}>
                    <View style={styles.sectionAccent} />
                    <Text style={styles.sectionTitle}>🎭 O que é o Talking-X</Text>
                    <Text style={styles.text}>
                        O Talking-X é um app de chat anônimo que conecta pessoas do mundo todo
                        para conversas casuais por tópico. Interface moderna, privacidade total
                        e conexão instantânea.
                    </Text>
                </View>

                {/* Inspiração com chips visuais */}
                <View style={styles.section}>
                    <View style={styles.sectionAccent} />
                    <Text style={styles.sectionTitle}>💡 Inspirado em</Text>
                    <Text style={styles.text}>O Talking-X une o melhor de dois projetos lendários:</Text>
                    <View style={styles.inspoRow}>
                        <View style={styles.inspoChip}>
                            <View style={[styles.inspoChipDot, { backgroundColor: '#FF6B35' }]} />
                            <View>
                                <Text style={styles.inspoChipText}>Omegle</Text>
                                <Text style={styles.inspoChipSub}>2009–2023 · Chat aleatório</Text>
                            </View>
                        </View>
                        <View style={styles.inspoChip}>
                            <View style={[styles.inspoChipDot, { backgroundColor: '#A78BFA' }]} />
                            <View>
                                <Text style={styles.inspoChipText}>Project-Z</Text>
                                <Text style={styles.inspoChipSub}>Chat por interesses</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Privacidade */}
                <View style={styles.section}>
                    <View style={styles.sectionAccent} />
                    <Text style={styles.sectionTitle}>🔐 Privacidade</Text>
                    <Text style={styles.listItem}>• Sem coleta de dados pessoais</Text>
                    <Text style={styles.listItem}>• Mensagens não armazenadas</Text>
                    <Text style={styles.listItem}>• Saia a qualquer momento</Text>
                    <Text style={styles.listItem}>• Censura automática de palavrões</Text>
                </View>

                {/* Como funciona */}
                <View style={styles.section}>
                    <View style={styles.sectionAccent} />
                    <Text style={styles.sectionTitle}>🌐 Como funciona</Text>
                    <Text style={styles.listItem}>1. Escolha um tópico: Filmes, Jogos ou Séries</Text>
                    <Text style={styles.listItem}>2. Match automático com alguém do mesmo interesse</Text>
                    <Text style={styles.listItem}>3. Converse livremente de forma anônima</Text>
                    <Text style={styles.listItem}>4. Troque de parceiro quando quiser (↻)</Text>
                </View>

                {/* Recursos */}
                <View style={styles.section}>
                    <View style={styles.sectionAccent} />
                    <Text style={styles.sectionTitle}>⚡ Recursos</Text>
                    <Text style={styles.listItem}>1. Chat em tempo real entre 2 pessoas</Text>
                    <Text style={styles.listItem}>2. 3 categorias de interesse</Text>
                    <Text style={styles.listItem}>3. Censura automática PT-BR + EN</Text>
                    <Text style={styles.listItem}>4. Design Liquid Glass — iOS 26</Text>
                    <Text style={styles.listItem}>5. 100% gratuito e anônimo</Text>
                </View>

                {/* Dev */}
                <View style={styles.section}>
                    <View style={styles.sectionAccent} />
                    <Text style={styles.sectionTitle}>🖥️ Desenvolvedor</Text>
                    <Text style={styles.developerName}>Kennedy Khaynã</Text>
                    <Text style={styles.text}>Novo programador, mas com pensamentos grandes 🚀</Text>
                </View>

                {/* Rodapé */}
                <View style={styles.section}>
                    <View style={styles.sectionAccent} />
                    <Text style={styles.text}>Versão 1.0.0</Text>
                    <Text style={styles.version}>2026 ❤️ Feito com carinho para conectar pessoas</Text>
                </View>

            </View>
        </ScrollView>
    );
}
