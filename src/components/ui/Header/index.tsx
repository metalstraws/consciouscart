// src/components/ui/Header/index.tsx
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { styles } from './styles';
import { theme } from '../../../constants/theme';
import { HeaderProps } from './types';

export function Header({ onScanPress, style }: HeaderProps) {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.leftSection}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require("../../../../assets/images/home-logo.png")}
        />
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={onScanPress}>
          <Ionicons
            name="barcode-outline"
            size={40}
            color={theme.colors.darkGreen}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}