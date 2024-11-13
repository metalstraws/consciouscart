import { View, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { SearchBarProps } from './types';
import { theme } from '../../../constants/theme';

export function SearchBar({ 
  value, 
  onChangeText, 
  onSubmit, 
  placeholder = "Enter barcode..." 
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="always"
        keyboardType="numeric"
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
      <Pressable onPress={onSubmit}>
        <Ionicons name="arrow-forward" size={20} color={theme.colors.textSecondary} />
      </Pressable>
    </View>
  );
}