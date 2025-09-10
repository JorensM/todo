// Core
import { Text } from 'react-native';
import { Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Text>Could not find page</Text>
    </>
  );
}