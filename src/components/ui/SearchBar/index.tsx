// SearchBar/index.tsx
import { View, TextInput, Pressable, Platform } from 'react-native';
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
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.searchSection}>
          <Ionicons 
            name="search" 
            size={20} 
            color={theme.colors.darkGreen} 
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={`${theme.colors.darkGreen}80`}
            value={value}
            onChangeText={onChangeText}
            clearButtonMode="while-editing"
            keyboardType="numeric"
            onSubmitEditing={onSubmit}
            returnKeyType="search"
          />
        </View>
        <Pressable 
          onPress={onSubmit}
          style={({ pressed }) => [
            styles.searchButton,
            pressed && styles.searchButtonPressed
          ]}
        >
          <Ionicons 
            name="arrow-forward" 
            size={20} 
            color={theme.colors.surface} 
          />
        </Pressable>
      </View>
    </View>
  );
}