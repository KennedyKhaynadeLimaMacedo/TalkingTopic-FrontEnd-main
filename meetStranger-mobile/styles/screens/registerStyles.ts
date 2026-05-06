import { StyleSheet } from 'react-native';
import { Spacing } from '../../design-system/tokens/spacing';
import { TextStyles } from '../../design-system/tokens/typography';

export const registerStyles = StyleSheet.create({
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
  logo: {
    width: 140, 
    height: 140, 
    marginBottom: Spacing.md,
    // Brilho e sombras removidos
  },
  inputContainer: {
    width: '100%',
    gap: 12,
  },
  title: {
    ...TextStyles.title, 
    fontWeight: 'bold', 
    color: '#4ADE80', 
    marginBottom: Spacing.sm, 
    textAlign: 'center',
  },
  subtitle: {
    ...TextStyles.body, 
    color: '#A0AEC0', 
    marginBottom: Spacing.xl, 
    textAlign: 'center',
  },
  registerButton: {
    marginTop: Spacing.xl,
    width: '100%',
  },
  backButton: {
    marginTop: 20, // Aumentado para dar o espaçamento que você pediu
    width: '100%',
  }
});