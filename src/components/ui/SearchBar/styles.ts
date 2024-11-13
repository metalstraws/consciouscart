import { StyleSheet } from 'react-native';
import { theme } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    marginHorizontal: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing.small,
    fontSize: theme.typography.sizes.medium,
  }
});