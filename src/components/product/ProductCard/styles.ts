import { StyleSheet } from 'react-native';
import { theme } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.large,
    margin: theme.spacing.medium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: theme.typography.sizes.large,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.medium,
  },
  section: {
    marginBottom: theme.spacing.medium,
    alignItems: 'center',
  },
  label: {
    fontSize: theme.typography.sizes.medium,
    fontWeight: '600',
    marginBottom: theme.spacing.small,
  },
  storesContainer: {
    width: '100%',
    maxHeight: 80,
    marginVertical: theme.spacing.medium,
    alignItems: 'center',
  },
  store: {
    fontSize: theme.typography.sizes.medium,
    marginBottom: theme.spacing.small,
  },
  image: {
    width: 50,
    height: 70,
    resizeMode: 'contain',
  }
});