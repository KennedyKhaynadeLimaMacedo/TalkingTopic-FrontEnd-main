  import { StyleSheet } from 'react-native';
  import { Spacing } from '../../design-system/tokens/spacing';

  export const loginStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0D1117',
    },
    content: {
      flex: 1,
      paddingHorizontal: Spacing.xl,
      justifyContent: 'center',
      alignItems: 'center',
    },
    glassCard: {
      width: '100%',
      padding: 30,
      borderRadius: 35,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      alignItems: 'center',
      gap: 12, 
    },
    logo: {
      width: 160, // Aumentado levemente para a nova logo do escudo
      height: 160,
      marginBottom: 10,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      // Brilho removido daqui
    },
    subtitle: {
      fontSize: 16,
      color: '#A0AEC0',
      textAlign: 'center',
      marginBottom: 20,
    },
    inputContainer: {
      width: '100%',
      gap: 15,
      marginBottom: 10,
    },
    loginButton: {
      width: '100%',
      backgroundColor: '#4ADE80',
      height: 56,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      // Sombras e Elevação removidas daqui
    },
    registerButton: {
      width: '100%',
      height: 56,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#4ADE80',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12, // Espaço entre os botões
    }
  });