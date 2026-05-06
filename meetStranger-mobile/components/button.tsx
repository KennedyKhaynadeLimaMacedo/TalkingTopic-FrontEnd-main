import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../constants/colors';

// Interface atualizada para aceitar o que o Login precisa
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; // Adicionado 'ghost'
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[]; // Aceita array de estilos
  textStyle?: TextStyle;           // Aceita estilo de texto personalizado
  fullWidth?: boolean;             // Aceita a prop fullWidth
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false, 
  style, 
  textStyle, 
  fullWidth 
}: ButtonProps) {
  
  // Mapeamento seguro para evitar erro de indexação no TS
  const variantStyle = styles[variant as keyof typeof styles] as ViewStyle;
  const variantTextStyle = styles[`${variant}Text` as keyof typeof styles] as TextStyle;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        variantStyle,
        fullWidth && { width: '100%' },
        disabled && styles.disabled,
        style as any,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, variantTextStyle, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 28, // Formato pílula moderno
    minHeight: 54,
  },
  primary: {
    backgroundColor: '#4ADE80', // Verde Neon
  },
  secondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4ADE80',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  primaryText: {
    color: '#000000', // Texto preto no botão verde
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#4ADE80',
  },
  ghostText: {
    color: '#FFFFFF',
  },
});