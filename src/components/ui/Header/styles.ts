// src/components/ui/Header/styles.ts
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { theme } from '../../../constants/theme';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + theme.spacing.xlarge : theme.spacing.xlarge,
    paddingBottom: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
    backgroundColor: theme.colors.primary,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: '85%',
    height: undefined,
    aspectRatio: 1036/144,
  }
});