import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch, useTheme} from '../hooks';
import {ScreenWrapper, PrimaryButton, TextInputField} from '../components';
import {setUser} from '../redux/slices/authSlice';
import {validateEmail, validatePassword} from '../utils/validation';
import {fonts} from '../constants/fonts';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    if (emailErr || passErr) {
      setErrors({email: emailErr, password: passErr});
      return;
    }

    setErrors({});
    dispatch(
      setUser({
        name: email.split('@')[0],
        email: email.trim().toLowerCase(),
      }),
    );
  };

  return (
    <ScreenWrapper scrollable withKeyboard>
      <View style={styles.content}>
        <View style={styles.logoWrap}>
          <View style={[styles.logoCircle, {backgroundColor: colors.primaryBg}]}>
            <MaterialIcons
              name="account-balance-wallet"
              size={36}
              color={colors.primary}
            />
          </View>
          <Text style={[styles.appName, {color: colors.text, fontFamily: fonts.bold}]}>
            ExpenseFlow
          </Text>
        </View>

        <Text style={[styles.title, {color: colors.text, fontFamily: fonts.bold}]}>
          Welcome Back
        </Text>
        <Text
          style={[styles.subtitle, {color: colors.textSecondary, fontFamily: fonts.regular}]}>
          Sign in to manage your expenses
        </Text>

        <TextInputField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          leftIcon="email"
          error={errors.email}
        />

        <TextInputField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon="lock"
          error={errors.password}
        />

        <PrimaryButton title="Sign In" onPress={handleLogin} style={styles.btn} />

        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('Signup')}>
          <Text
            style={[styles.linkText, {color: colors.textSecondary, fontFamily: fonts.regular}]}>
            Don't have an account?{' '}
            <Text style={{color: colors.primary, fontFamily: fonts.semiBold}}>
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {flex: 1, paddingTop: 40},
  logoWrap: {alignItems: 'center', marginBottom: 32},
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appName: {fontSize: 22, fontWeight: '700'},
  title: {fontSize: 28, fontWeight: '700', marginBottom: 6},
  subtitle: {fontSize: 15, marginBottom: 28},
  btn: {marginTop: 8},
  link: {marginTop: 24, alignItems: 'center'},
  linkText: {fontSize: 14},
});

export default LoginScreen;
