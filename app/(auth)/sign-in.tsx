import { View, Button, Text, YStack, Input, XStack } from "tamagui";
import * as AuthSession from 'expo-auth-session'
import { useWarmUpBrowser } from "@/utils/warmupBrowser";
import { useSignIn, useSSO } from "@clerk/clerk-expo";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { Platform } from 'react-native';

type FormData = {
  email: string;
  password: string;
};

export default function SignInScreen() {
  useWarmUpBrowser();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startSSOFlow } = useSSO();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSignInPress = async (data: FormData) => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      const completeSignIn = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.error(err);
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithOauth = async (strategy: "google" | "facebook" | "apple") => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: `oauth_${strategy}`,
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      backgroundColor="$background"
    >
      <Text fontSize={"$7"} fontWeight={500} marginBottom={20} color="$gray7Dark">
        Sign in
      </Text>
      <YStack gap={'$2.5'} width={'100%'} paddingHorizontal={'$4'}>
        <YStack>
          <Controller
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                borderColor={errors.email ? '$red10' : '$gray8'}
                focusStyle={{
                  borderColor: errors.email ? '$red10' : '$blue8'
                }}
              />
            )}
          />
          {errors.email && (
            <Text color="$red10" fontSize="$3" mt={2}>{errors.email.message}</Text>
          )}
        </YStack>

        <YStack>
          <Controller
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            }}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                borderColor={errors.password ? '$red10' : '$gray8'}
                focusStyle={{
                  borderColor: errors.password ? '$red10' : '$blue8'
                }}
              />
            )}
          />
          {errors.password && (
            <Text color="$red10" fontSize="$3" mt={2}>{errors.password.message}</Text>
          )}
        </YStack>

        <Button
          variant="outlined"
          fontWeight={500}
          onPress={handleSubmit(onSignInPress)}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign In'}
        </Button>

        {/* <XStack alignItems="center" padding="$4">
          <View style={{ flex: 1, height: 1, backgroundColor: '$gray8' }} />
          <Text paddingHorizontal="$2">or continue with</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '$gray8' }} />
        </XStack> */}

        <XStack alignItems="center" my="$4">
          <View flex={1} height={1.4} backgroundColor="$gray7Light" />
          <Text mx="$2" fontWeight="bold" color="$gray7Light">
            OR
          </Text>
          <View flex={1} height={1.4} backgroundColor="$gray7Light" />
        </XStack>

        <Button
          backgroundColor="white"
          color="$gray8Dark"
          fontWeight={500}
          borderColor={"$gray6Light"}
          variant="outlined"
          onPress={() => signInWithOauth("google")}
          icon={<AntDesign name="google" size={18} color="hsl(0, 0%, 43.9%)" />}
        >
          Continue with Google
        </Button>
        <Button
          backgroundColor="#1877F2"
          color="white"
          fontWeight={500}
          onPress={() => signInWithOauth("facebook")}
          icon={<AntDesign name="facebook-square" size={18} color="white" />}
        >
          Continue with Facebook
        </Button>
        {Platform.OS === 'ios' && (
          <Button
            backgroundColor="#000000"
            color="white"
            fontWeight={500}
            borderColor={"$gray6Light"}
            onPress={() => signInWithOauth("apple")}
            icon={<AntDesign name="apple1" size={18} color="white" />}
          >
            Continue with Apple
          </Button>
        )}
      </YStack>
    </View>
  );
}
