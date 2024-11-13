import { Ionicons } from '@expo/vector-icons';

interface TabBarIconProps {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}

export function TabBarIcon({ name, color }: TabBarIconProps) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} name={name} color={color} />;
}

// src/components/ui/SearchBar/types.ts
export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

// src/components/ui/SearchBar/styles.ts
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