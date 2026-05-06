// Importa componentes básicos do React Native para montar a interface
import { Text, View, Pressable, StyleSheet } from 'react-native';

// Importa o sistema de navegação baseado em rotas do Expo Router
import { Link } from 'expo-router';

// Importa biblioteca de ícones (FontAwesome)
import FontAwesome from '@expo/vector-icons/FontAwesome';;

// Componente principal da tela Home
export default function Home() {
    return (
        // Container principal da tela
        <View style={styles.container}>
            {/* TOPO DA TELA */}
            <View style={styles.row}>

                {/* Botão LOGIN com navegação */}
                <Link href="/auth/login" asChild>
                    {/* Pressable permite interação (clique/toque) */}
                    <Pressable style={styles.topButton}>
                        <Text>LOGIN</Text>
                    </Pressable>
                </Link>

                {/* Botão REGISTER com destaque e ícone */}
                <Link href="/auth/register" asChild>
                    <Pressable style={StyleSheet.flatten([styles.topButton, styles.highlight])}>

                        {/* TEXTO CENTRAL */}
                        <Text style={{fontSize: 32, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial', fontStyle: 'italic', color: '#008cffff'}}>
                            Register
                        </Text>

                        {/* ÍCONE À DIREITA */}
                        <FontAwesome
                            name="user-plus"
                            size={32 }
                            style={{
                                position: 'absolute',
                                right: 50, // distância da borda direita              
                            }}
                        />

                    </Pressable>
                </Link>

                {/* Botão SELECT (sem navegação ainda) */}
                <Link href="/chat/select" asChild>
                    <Pressable style={styles.topButton}>
                        <Text>SELECT</Text>
                    </Pressable>
                </Link>
            </View>

            {/* ESPAÇO FLEXÍVEL (empurra o conteúdo de cima e de baixo) */}
            <View style={{ flex: 1 }} />

            {/* BASE DA TELA */}
            <View style={styles.row}>

                {/* Botão ABOUT */}
                <Link href="/about" asChild>
                    <Pressable style={styles.bottomButton}>
                        <Text>ABOUT</Text>
                    </Pressable>
                </Link>
                {/* Botão ROOM */}
                <Link href="/chat/room" asChild>
                    <Pressable style={styles.bottomButton}>
                        <Text>ROOM</Text>
                    </Pressable>
                </Link>
                {/* Botão HOME com navegação */}
                <Link href="/home" asChild>
                    <Pressable style={styles.bottomButton}>
                        <Text>HOME</Text>
                    </Pressable>
                </Link>
            </View>


        </View>
    );
}

// Criação dos estilos da tela
const styles = StyleSheet.create({

    // Container principal
    container: {
        flex: 1, // ocupa toda a tela
        padding: 50, // espaço interno de 50px em todos os lados
        justifyContent: 'space-between', // distribui topo e base com espaço entre eles
        backgroundColor: "#7e01fbff"
    },

    


    // Estilo das linhas (topo e base)
    row: {
        flexDirection: 'row', // organiza os itens na horizontal
        justifyContent: 'space-between', // cria espaçamento automático entre os botões
        alignItems: 'center', // alinha os itens verticalmente no centro
    },

    // Botões do topo
    topButton: {
        width: 500, // largura fixa (atenção: pode quebrar no mobile)
        height: 100, // altura do botão
        borderWidth: 1, // borda visível
        justifyContent: 'center', // centraliza conteúdo verticalmente
        alignItems: 'center', // centraliza conteúdo horizontalmente
        borderRadius: 100, // cantos arredondados
        shadowColor: '#000', // cor da sombra
        shadowOffset: { width: 0, height: 5 }, // deslocamento da sombra
        shadowOpacity: 0.55, // opacidade da sombra
        shadowRadius: 10.84, // raio da sombra
        elevation: 5, // elevação para Android (sombra)
        backgroundColor: '#fff', // cor de fundo padrão
        color: '#008cffff', // cor do texto
    },

    // Botões da base
    bottomButton: {
        width: 500, // largura fixa (atenção: pode quebrar no mobile)
        height: 100, // altura do botão
        borderWidth: 1, // borda visível
        justifyContent: 'center', // centraliza conteúdo verticalmente
        alignItems: 'center', // centraliza conteúdo horizontalmente
        borderRadius: 100, // cantos arredondados
        shadowColor: '#000', // cor da sombra
        shadowOffset: { width: 0, height: 5 }, // deslocamento da sombra
        shadowOpacity: 0.55, // opacidade da sombra
        shadowRadius: 10.84, // raio da sombra
        elevation: 5, // elevação para Android (sombra)
        backgroundColor: '#fff',
    },

    // Estilo de destaque (botão Register)
    highlight: {
        backgroundColor: '#D3F2A5', // cor de fundo diferenciada
    },
});