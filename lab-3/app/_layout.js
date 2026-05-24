import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Cook Book" }} />
      <Stack.Screen name="recipes" options={{ title: "Recipes" }} />
      <Stack.Screen name="personal" options={{ title: "Personal Recipes" }} />
    </Stack>
  );
}