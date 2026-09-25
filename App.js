import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';
import {hydrateAuth} from './src/redux/slices/authSlice';
import {hydrateExpenses} from './src/redux/slices/expenseSlice';
import {hydrateBudgets} from './src/redux/slices/budgetSlice';
import {hydrateCategories} from './src/redux/slices/categorySlice';
import {hydrateTheme} from './src/redux/slices/themeSlice';

const STORAGE_KEY = '@expenseflow/state';

const AppContent = () => {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    const hydrate = async () => {
      try {
        const storedState = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedState) {
          const state = JSON.parse(storedState);
          if (state.auth) store.dispatch(hydrateAuth(state.auth));
          if (state.expenses?.expenses) store.dispatch(hydrateExpenses(state.expenses.expenses));
          if (state.budgets?.budgets) store.dispatch(hydrateBudgets(state.budgets.budgets));
          if (state.categories?.categories) store.dispatch(hydrateCategories(state.categories.categories));
          if (state.theme?.mode) store.dispatch(hydrateTheme(state.theme.mode));
        }
      } catch (error) {
        console.warn('Unable to restore local ExpenseFlow data', error);
      } finally {
        if (isMounted) setIsReady(true);
      }
    };

    hydrate();
    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    if (!isReady) return undefined;
    const unsubscribe = store.subscribe(() => {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState())).catch(error =>
        console.warn('Unable to save local ExpenseFlow data', error),
      );
    });
    return unsubscribe;
  }, [isReady]);

  if (!isReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2F6BFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  loading: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;
