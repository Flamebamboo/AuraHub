// Button.jsx
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Props interface
const CustomButton = ({
  label,
  onPress,
  variant = 'solid',
  width = 300,
  height = 50,
  leftIcon,
  fontSize = 16,
  fontFamily = 'BhalooBold',
  rightIcon,
  iconSize = 17,
  iconColor = '#ffffff',
  gradientColors = ['#ef4444', '#FA4032'],
  backgroundColor = '#004086',
  fontWeight,
  style,
}) => {
  const ButtonContent = () => (
    <>
      {leftIcon && <FontAwesome name={leftIcon} size={iconSize} color={iconColor} style={styles.leftIcon} />}
      <Text style={[styles.buttonText, { fontFamily, fontSize, fontWeight }]}>{label}</Text>
      {rightIcon && <FontAwesome name={rightIcon} size={iconSize} color={iconColor} style={styles.rightIcon} />}
    </>
  );

  if (variant === 'gradient') {
    return (
      <View style={[styles.container, { width }]}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradientButton, style]}
        >
          <TouchableOpacity onPress={onPress} style={styles.touchableContent}>
            <ButtonContent />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant === 'outline' && styles.outlineButton, // if varient is strictly and exactly equal to outline, then apply the styles.outlineButton
        variant === 'solid' && { backgroundColor },
        variant === 'transparent' && { backgroundColor: 'transparent' },
        { width },
        style,
        { height },
      ]}
    >
      <ButtonContent />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  button: {
    height: 56,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  gradientButton: {
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
  },
  touchableContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outlineButton: {
    borderWidth: 5,
    borderRadius: 29,
    borderColor: '#FFF',
  },
  buttonText: {
    color: '#ffffff',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default CustomButton;
