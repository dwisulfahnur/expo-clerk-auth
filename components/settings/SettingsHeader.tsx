import { H2, View, Button } from "tamagui";
import { SafeAreaView } from "react-native";
import SignOutAlert from "../auth/SignOutAlert";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";


export default function SettingsHeader() {
  const { signOut } = useAuth()
  const [askSignOut, setAskSignOut] = useState(false)
  return (
    <SafeAreaView>
      <View
        background={'white'}
        borderBottomColor={'$gray6'}
        borderBottomWidth={1}
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        paddingVertical={'$1'}
        paddingHorizontal={'$2.5'}
      >
        <H2 fontSize={"$3"} fontWeight="500">Settings</H2>
        <Button
          size="$2"
          variant="outlined"
          theme="red"
          fontWeight={500}
          onPress={()=>setAskSignOut(true)}
        >
          Sign Out
        </Button>
      </View>
      <SignOutAlert
        isOpen={askSignOut}
        onConfirm={() => signOut()}
        onCancel={() => setAskSignOut(false)}
      />
    </SafeAreaView>
  );
} 