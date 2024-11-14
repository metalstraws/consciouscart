// SearchBar/styles.ts
import { StyleSheet, Platform } from 'react-native';
import { theme } from '../../../constants/theme';

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.darkGreen,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.medium,
  },
  searchIcon: {
    marginRight: theme.spacing.small,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.medium,
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.darkGreen,
  },
  searchButton: {
    backgroundColor: theme.colors.darkGreen,
    padding: theme.spacing.medium,
    borderTopRightRadius: theme.borderRadius.medium,
    borderBottomRightRadius: theme.borderRadius.medium,
  },
  searchButtonPressed: {
    backgroundColor: `${theme.colors.darkGreen}E6`, // 90% opacity
  }
});