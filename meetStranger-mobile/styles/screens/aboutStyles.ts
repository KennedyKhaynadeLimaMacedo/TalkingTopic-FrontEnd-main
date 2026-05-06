import { StyleSheet } from 'react-native';

export const aboutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    padding: 24,
    paddingTop: 50,
  },
  header: {
    marginBottom: 30,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: '#475569',
  },
  listItem: {
    fontSize: 15,
    lineHeight: 24,
    color: '#475569',
    marginLeft: 5,
  },
  developerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 10,
  },
  version: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 5,
  },
});