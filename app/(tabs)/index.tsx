import React from 'react';
import { RefreshControl, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListItem, ScrollView, Text, View, YStack } from 'tamagui';

export default function HomeTab() {
  const colorScheme = useColorScheme()
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <>
      <SafeAreaView style={{ height: '100%', flex: 1, backgroundColor: colorScheme === 'dark' ? '#9C51B6' : 'transparent' }}>
        <View
          h='100%'
          alignItems='center'
          justifyContent='center'
          backgroundColor={'$background'}
        >
          <ScrollView w={'100%'} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            <YStack gap={'$5'}>
              <ListItem>1</ListItem>
              <ListItem>2</ListItem>
              <ListItem>3</ListItem>
              <ListItem>4</ListItem>
              <ListItem>1</ListItem>
              <ListItem>2</ListItem>
              <ListItem>3</ListItem>
              <ListItem>4</ListItem>
              <ListItem>1</ListItem>
              <ListItem>2</ListItem>
              <ListItem>3</ListItem>
              <ListItem>4</ListItem>
              <ListItem>1</ListItem>
              <ListItem>2</ListItem>
              <ListItem>3</ListItem>
              <ListItem>4</ListItem>
              <ListItem>1</ListItem>
              <ListItem>2</ListItem>
              <ListItem>3</ListItem>
              <ListItem>4</ListItem>
              <ListItem>1</ListItem>
              <ListItem>2</ListItem>
              <ListItem>3</ListItem>
              <ListItem>4</ListItem>
            </YStack>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
