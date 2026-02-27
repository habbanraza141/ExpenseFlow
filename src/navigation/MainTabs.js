import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import ExpenseListScreen from '../screens/ExpenseListScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {useTheme} from '../hooks';
import {fonts} from '../constants/fonts';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarLabelStyle: {fontFamily: fonts.medium, fontSize: 11, fontWeight: '500'},
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.tabBarBorder,
          paddingBottom: 4,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpenseListScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="account-balance-wallet" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="show-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
