import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useTheme} from '../hooks';
import {ScreenWrapper, PrimaryButton, TextInputField} from '../components';
import {setUser} from '../redux/slices/authSlice';
import {validateEmail, validatePassword, validateName} from '../utils/validation';
import {fonts} from '../constants/fonts';

const SignupScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSignup = () => {
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    if (nameErr || emailErr || passErr) {
      setErrors({name: nameErr, email: emailErr, password: passErr});
      return;
    }

    setErrors({});
    dispatch(
      setUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
      }),
    );
  };

  return (
    <ScreenWrapper scrollable withKeyboard>
      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.text, fontFamily: fonts.bold}]}>
          Create Account
        </Text>
        <Text
          style={[styles.subtitle, {color: colors.textSecondary, fontFamily: fonts.regular}]}>
          Start tracking your expenses today
        </Text>

        <TextInputField
          label="Full Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          leftIcon="person-outline"
          error={errors.name}
        />

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
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon="lock"
          error={errors.password}
        />

        <PrimaryButton title="Create Account" onPress={handleSignup} style={styles.btn} />

        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.goBack()}>
          <Text
            style={[styles.linkText, {color: colors.textSecondary, fontFamily: fonts.regular}]}>
            Already have an account?{' '}
            <Text style={{color: colors.primary, fontFamily: fonts.semiBold}}>
              Sign In
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {flex: 1, paddingTop: 50},
  title: {fontSize: 28, fontWeight: '700', marginBottom: 6},
  subtitle: {fontSize: 15, marginBottom: 28},
  btn: {marginTop: 8},
  link: {marginTop: 24, alignItems: 'center'},
  linkText: {fontSize: 14},
});

export default SignupScreen;
