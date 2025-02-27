import React from "react";
import { AlertDialog, AlertDialogTrigger, Button, XStack, YStack, View } from "tamagui";

interface SignOutAlertProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function SignOutAlert({
  isOpen,
  onConfirm,
  onCancel
}: SignOutAlertProps) {
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={onCancel}
      native
    >
      <AlertDialogTrigger />
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          // animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          // animation={[
          //   'quick' ,
          //   {
          //     opacity: {
          //       overshootClamping: true,
          //     },
          //   },
          // ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack gap="$4">
            <AlertDialog.Title fontWeight={500}>Sign Out</AlertDialog.Title>
            <XStack alignItems="center">
              <View style={{ flex: 1, height: 1, backgroundColor: '$gray8' }} />
              <AlertDialog.Description paddingHorizontal="$2">
                Are you sure you want to sign out?
              </AlertDialog.Description>
              <View style={{ flex: 1, height: 1, backgroundColor: '$gray8' }} />
            </XStack>
            <XStack gap="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild onPress={() => onCancel()}>
                <Button variant="outlined">Cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild onPress={() => onConfirm()}>
                <Button theme={"accent"}>Yes, Sign Out</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}