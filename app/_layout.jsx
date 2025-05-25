import { Slot } from "expo-router";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import SafeSreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";
export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeSreen>
        <Slot />
      </SafeSreen>
      <StatusBar style="dark" />
    </ClerkProvider>
  );
}
