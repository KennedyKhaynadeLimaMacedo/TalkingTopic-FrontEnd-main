import { StyleSheet } from 'react-native';

export const aboutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  content: {
    padding: 24,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    color: '#4ADE80',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#4ADE80',
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: '#A0AEC0',
  },
  listItem: {
    fontSize: 15,
    lineHeight: 26,
    color: '#A0AEC0',
    marginLeft: 4,
  },
  developerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  version: {
    fontSize: 13,
    color: '#4ADE80',
    marginTop: 6,
  },
});
