import { View, Text } from 'react-native';
import React from 'react';
import CustomButton from '@/components/Onboarding/CustomButton';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
import { router } from 'expo-router';
const Card4 = () => {
  return (
    <View>
      <View style={styles.slide}>
        <Text style={styles.title}>Welcome to PixFocus</Text>
        <Text style={styles.description}>Be more productive with pixel art visual timers</Text>
        <CustomButton
          label="Get Started"
          variant="solid"
          fontSize={20}
          leftIcon="sign-in"
          onPress={() => router.push('/(auth)/sign-up')}
        />
        <CustomButton
          fontSize={16}
          label="I ALREADY HAVE AN ACCOUNT"
          rightIcon="chevron-right"
          variant="transparent"
          onPress={() => router.push('/(auth)/sign-in')}
        />
      </View>
    </View>
  );
};

export default Card4;

const styles = StyleSheet.create({
  slide: {
    width,
    height,
    justifyContent: 'flex-start',
    paddingTop: 150,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#2F1818',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'PixelifySans',
  },
  description: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 30,
    color: '#fff',
  },
});
