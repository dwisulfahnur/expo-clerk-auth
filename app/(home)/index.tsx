import { useAuth, useUser } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'

export default function Page() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/(tabs)'} />
  } else {
    return <Redirect href={'/(auth)/sign-in'} />
  }
}