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
  labelValue: {
    marginVertical: theme.spacing.small,
    flexDirection: 'row',
    gap: theme.spacing.small,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: theme.typography.sizes.medium,
    fontWeight: '600',
    color: theme.colors.text,
    flexGrow: 0,
  },
  value: {
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.darkGreen,
    fontWeight: '500',
    flexGrow: 4,
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