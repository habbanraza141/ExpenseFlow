import React from 'react';
import {
  StatusBar,
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../hooks';

const ScreenWrapper = ({children, scrollable, withKeyboard, style, padded = true}) => {
  const {colors} = useTheme();

  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, padded && styles.padded, style]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, padded && styles.padded, style]}>{children}</View>
  );

  const wrapped = withKeyboard ? (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar
        barStyle={colors.statusBar}
        backgroundColor={colors.background}
        translucent
      />
      {wrapped}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  flex: {flex: 1},
  content: {flex: 1},
  padded: {paddingHorizontal: 20},
  scrollContent: {flexGrow: 1, paddingBottom: 20},
});

export default ScreenWrapper;
