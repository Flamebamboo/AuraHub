import React from 'react';

import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomSvg } from '../../components/CustomSvg';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: '#000',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomSvg
              style={{ marginTop: 30 }}
              height={32}
              width={32}
              fillColor={focused ? '#fff' : 'transparent'}
              variant="homeIcon"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="aura-chat"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomSvg
              style={{ marginTop: 30 }}
              height={32}
              width={32}
              fillColor={focused ? '#fff' : 'transparent'}
              variant="hubsIcon"
            />
          ),
          tabBarStyle: { display: 'none' },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomSvg
              style={{ marginTop: 30 }}
              height={32}
              width={32}
              fillColor={focused ? '#fff' : 'transparent'}
              variant="profileIcon"
            />
          ),
        }}
      />
    </Tabs>
  );
}
