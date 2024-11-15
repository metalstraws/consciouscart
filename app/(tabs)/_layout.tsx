import { Tabs } from 'expo-router';
import { TabBarIcon } from '../../src/components/ui/TabBar';
import { theme } from '../../src/constants/theme';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.darkGreen,
        tabBarInactiveTintColor: 'rgba(35, 70, 33, 0.5)',
        headerShown: false,
        tabBarStyle: {
          shadowColor: 'transparent',
          shadowOffset: {
            width: 0,
            height: 0
          },
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.background,
        },
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color }) => {
          if (route.name === 'index') {
            return <TabBarIcon name="home" color={color} />;
          }
          return <TabBarIcon name="list" color={color} />;
        },
        title: route.name === 'index' ? 'Home' : 'History',
      })}
    >
      <Tabs.Screen 
        name="index"
      />
      <Tabs.Screen 
        name="scan-history"
      />
    </Tabs>
  );
}