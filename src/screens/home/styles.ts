import { StyleSheet, StatusBar, Platform } from 'react-native';
import { theme } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
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
    gap: theme.spacing.small, // This controls the space between title and cart icon
  },
  title: {
    fontSize: theme.typography.sizes.xlarge,
    fontFamily: 'SourceSerifPro_600SemiBold',
    color: theme.colors.surface,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
    marginTop: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    overflow: 'hidden',
    minHeight: 300,
  },
  camera: {
    flex: 1,
    minHeight: 300,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.medium,
    right: theme.spacing.medium,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
  },
  logo: {
    width: '85%',
    height: undefined,
    aspectRatio: 1036/144,
  }
});