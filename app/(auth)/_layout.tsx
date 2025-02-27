import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { LinearGradient } from 'expo-linear-gradient'
import { View } from 'tamagui'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/(tabs)'} />
  }

  return (
    <View flex={1}>
      {/* <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      /> */}
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent'
          }
        }} 
      />
    </View>
  )
}