import { Stack } from "expo-router";
import { ProductHistoryProvider } from "../src/contexts/ProductHistoryContext";

export default function RootLayout() {
  return (
    <ProductHistoryProvider>
      <Stack
        screenOptions={{
          animation: 'slide_from_right',
          animationDuration: 400,
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          presentation: 'card',
          animationTypeForReplace: 'pop',
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
          }} 
        />
      </Stack>
    </ProductHistoryProvider>
  );
}