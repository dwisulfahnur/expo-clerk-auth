import React from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';
import { Text, View } from 'tamagui';

export default function ExploreTab() {
  const colorScheme = useColorScheme()
  return (
    <>
      <SafeAreaView style={{ height: '100%', flex: 1, backgroundColor: colorScheme === 'dark' ? '#9C51B6' : 'transparent' }}>
        <View
          h='100%'
          flex={1}
          alignItems='center'
          justifyContent='center'
          backgroundColor={'$background'}
        >
          <Text>Explore</Text>
        </View>
      </SafeAreaView>
    </>
  );
}
