import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {ScreenWrapper, PrimaryButton} from '../components';
import {useTheme, useAppSelector, useAppDispatch} from '../hooks';
import {logout} from '../redux/slices/authSlice';
import {toggleTheme} from '../redux/slices/themeSlice';
import {fonts} from '../constants/fonts';

const ProfileScreen = () => {
  const {colors, mode} = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(s => s.auth.user);

  const menuItems = [
    {
      icon: 'track-changes',
      label: 'Budget Settings',
      onPress: () => navigation.navigate('Budget'),
    },
    {
      icon: 'notifications-none',
      label: 'Notifications',
      subtitle: 'Coming soon',
      disabled: true,
    },
    {
      icon: 'file-upload',
      label: 'Export Data',
      subtitle: 'Coming soon',
      disabled: true,
    },
    {
      icon: 'verified-user',
      label: 'Privacy & Security',
      subtitle: 'Coming soon',
      disabled: true,
    },
  ];

  return (
    <ScreenWrapper scrollable>
      <Text style={[styles.pageTitle, {color: colors.text, fontFamily: fonts.bold}]}>
        Profile
      </Text>

      <View style={[styles.profileCard, {backgroundColor: colors.surface}]}>
        <View style={[styles.avatar, {backgroundColor: colors.primaryBg}]}>
          <Text style={[styles.avatarText, {color: colors.primary, fontFamily: fonts.bold}]}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={[styles.name, {color: colors.text, fontFamily: fonts.semiBold}]}>
          {user?.name || 'User'}
        </Text>
        <Text
          style={[styles.email, {color: colors.textSecondary, fontFamily: fonts.regular}]}>
          {user?.email || 'user@example.com'}
        </Text>
      </View>

      <View style={[styles.settingCard, {backgroundColor: colors.surface}]}>
        <View style={styles.settingRow}>
          <MaterialIcons
            name={mode === 'dark' ? 'nights-stay' : 'wb-sunny'}
            size={22}
            color={colors.primary}
          />
          <Text
            style={[styles.settingLabel, {color: colors.text, fontFamily: fonts.medium}]}>
            Dark Mode
          </Text>
          <Switch
            value={mode === 'dark'}
            onValueChange={() => dispatch(toggleTheme())}
            trackColor={{false: colors.border, true: colors.primaryLight}}
            thumbColor={mode === 'dark' ? colors.primary : '#fff'}
          />
        </View>
      </View>

      <View style={[styles.menuCard, {backgroundColor: colors.surface}]}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              index < menuItems.length - 1 && {borderBottomWidth: 1, borderBottomColor: colors.borderLight},
            ]}
            onPress={item.onPress}
            disabled={item.disabled}
            activeOpacity={0.7}>
            <MaterialIcons
              name={item.icon}
              size={22}
              color={item.disabled ? colors.textTertiary : colors.primary}
            />
            <View style={styles.menuInfo}>
              <Text
                style={[
                  styles.menuLabel,
                  {
                    color: item.disabled ? colors.textTertiary : colors.text,
                    fontFamily: fonts.medium,
                  },
                ]}>
                {item.label}
              </Text>
              {item.subtitle && (
                <Text
                  style={[styles.menuSub, {color: colors.textTertiary, fontFamily: fonts.regular}]}>
                  {item.subtitle}
                </Text>
              )}
            </View>
            <MaterialIcons
              name="chevron-right"
              size={20}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        ))}
      </View>

      <PrimaryButton
        title="Logout"
        variant="outline"
        onPress={() => dispatch(logout())}
        style={styles.logoutBtn}
      />

      <Text style={[styles.version, {color: colors.textTertiary, fontFamily: fonts.regular}]}>
        ExpenseFlow v1.0.0
      </Text>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  pageTitle: {fontSize: 26, fontWeight: '700', marginTop: 8, marginBottom: 20},
  profileCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {fontSize: 28, fontWeight: '700'},
  name: {fontSize: 20, fontWeight: '600'},
  email: {fontSize: 14, marginTop: 2},
  settingCard: {borderRadius: 16, padding: 4, marginBottom: 16},
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingLabel: {flex: 1, fontSize: 15, fontWeight: '500', marginLeft: 14},
  menuCard: {borderRadius: 16, overflow: 'hidden', marginBottom: 24},
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuInfo: {flex: 1, marginLeft: 14},
  menuLabel: {fontSize: 15, fontWeight: '500'},
  menuSub: {fontSize: 11, marginTop: 1},
  logoutBtn: {marginBottom: 16},
  version: {textAlign: 'center', fontSize: 12, marginBottom: 20},
});

export default ProfileScreen;
