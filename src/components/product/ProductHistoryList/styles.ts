import { StyleSheet } from 'react-native';
import { theme } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
  },
  productCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  label: {
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
  },
  value: {
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.darkGreen,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.medium,
    marginTop: theme.spacing.large,
  },
  gradeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradeText: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  gradeEmoji: {
    fontSize: 20,
  },
});