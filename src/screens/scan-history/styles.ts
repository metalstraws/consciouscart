import { StyleSheet, Platform } from 'react-native';
import { theme } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.medium,
    paddingTop: Platform.OS === 'ios' ? theme.spacing.medium : theme.spacing.xlarge * 2,
    paddingBottom: theme.spacing.medium,
    backgroundColor: theme.colors.background,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  leftSection: {
    flex: 1,
  },
  logo: {
    width: '85%',
    height: undefined,
    aspectRatio: 1036/144,
  },
  headerTitle: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.small,
  },
  title: {
    fontSize: theme.typography.sizes.large,
    color: theme.colors.text,
  },
  headerIcons: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: theme.spacing.small,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing.large,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xlarge,
  },
  loadingText: {
    marginTop: theme.spacing.medium,
    color: theme.colors.text,
    fontSize: theme.typography.sizes.medium,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.medium,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.error,
    margin: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    gap: theme.spacing.small,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.error,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  clearButtonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.sizes.medium,
    fontWeight: '600',
  },
});