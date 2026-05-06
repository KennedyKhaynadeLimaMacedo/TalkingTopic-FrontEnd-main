import { StyleSheet } from 'react-native';

export const WelcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 16,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#A0AEC0',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
  },
  textHelp: {
    fontSize: 14,
    color: '#A0AEC0',
    textAlign: 'center',
    marginTop: 4,
  },
});
