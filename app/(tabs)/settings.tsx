import React from "react";
import SignOutAlert from "@/components/auth/SignOutAlert";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { SafeAreaView, useColorScheme } from "react-native";
import { Avatar, Text, View, YStack, Stack, Button } from "tamagui";

export default function TabScreen() {
  const colorScheme = useColorScheme()
  const [askSignOut, setAskSignOut] = useState(false)
  const { user } = useUser()
  const { signOut } = useAuth()
  return (
    <>
      <SafeAreaView style={{ height: '100%', flex: 1, backgroundColor: colorScheme === 'dark' ? '#9C51B6' : 'transparent' }}>
        <View h={'100%'} backgroundColor={"$background"} padding={'$4'} gap={"$2"} alignItems="center" justifyContent="center">
          <YStack
            justifyContent="center"
            alignItems="center"
            w={"100%"}
            gap={"$1"}
            marginHorizontal={"auto"}
          >
            <Avatar circular size="$10">
              <Avatar.Image src={user?.imageUrl} />
            </Avatar>
            <Text>{user?.fullName}</Text>
            <Text color="gray" fontStyle="italic">{user?.primaryEmailAddress?.toString()}</Text>
          </YStack>
          <Button
            w={"100%"}
            bg={"$blue10"}
            color="white"
            fontWeight={500}
            size="xs"
            theme="accent"
            onPress={() => setAskSignOut(true)}
          >Sign Out</Button>
        </View>
      </SafeAreaView>
      <SignOutAlert
        isOpen={askSignOut}
        onConfirm={() => signOut()}
        onCancel={() => setAskSignOut(false)}
      />
    </>
  )
}