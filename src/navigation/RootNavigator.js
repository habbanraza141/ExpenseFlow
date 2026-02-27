import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from '../hooks';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import BudgetScreen from '../screens/BudgetScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const isAuthenticated = useAppSelector(s => s.auth.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen
            name="AddExpense"
            component={AddExpenseScreen}
            options={{presentation: 'modal', animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Budget"
            component={BudgetScreen}
            options={{animation: 'slide_from_right'}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
