import { StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing.xlarge * 2,
    paddingBottom: theme.spacing.medium,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: theme.typography.sizes.xlarge,
    fontWeight: 'bold',
    marginRight: theme.spacing.medium,
    color: theme.colors.surface,
  },
  content: {
    flex: 1,
    padding: theme.spacing.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});