import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@clerk/clerk-react';
import TabBarBackground from '@/components/ui/TabBarBackground';
import AntIcons from '@expo/vector-icons/AntDesign'

export default function TabLayout() {
  const { isSignedIn } = useAuth()
  const colorScheme = useColorScheme();

  if (!isSignedIn) {
    return <Redirect href={'/sign-in'} />
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntIcons size={20} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <AntIcons size={20} name="search1" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <AntIcons size={20} name="setting" color={color} />,
        }}
      />
    </Tabs>
  );
}
