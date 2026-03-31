import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

function SectionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function SettingsItem({ icon, label, value, onPress, type = 'arrow', iconColor = colors.primary }) {
  return (
    <TouchableOpacity style={styles.item} onPress={type !== 'toggle' ? onPress : undefined} activeOpacity={0.7}>
      <View style={[styles.iconBox, { backgroundColor: `${iconColor}18` }]}>
        <MaterialCommunityIcons name={icon} size={20} color={iconColor} />
      </View>
      <Text style={styles.itemLabel}>{label}</Text>
      {type === 'arrow' && (
        <>
          {value ? <Text style={styles.itemValue}>{value}</Text> : null}
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.border} />
        </>
      )}
      {type === 'toggle' && (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: colors.border, true: `${colors.primary}88` }}
          thumbColor={value ? colors.primary : colors.cardBg}
        />
      )}
      {type === 'text' && <Text style={styles.itemValue}>{value}</Text>}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  function handleLogout() {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất không?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đăng xuất', style: 'destructive', onPress: () => Alert.alert('Thông báo', 'Đã đăng xuất') },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar backgroundColor={colors.headerBg} barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <MaterialCommunityIcons name="account" size={40} color={colors.white} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Nguyễn Văn A</Text>
            <Text style={styles.profileRole}>Kỹ thuật viên</Text>
            <Text style={styles.profileEmail}>nguyenvana@pnpsolution.com</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <MaterialCommunityIcons name="pencil" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Tài khoản */}
        <SectionHeader title="Tài khoản" />
        <View style={styles.group}>
          <SettingsItem icon="account-edit" label="Thông tin cá nhân" onPress={() => {}} />
          <SettingsItem icon="lock-reset" label="Đổi mật khẩu" onPress={() => {}} />
          <SettingsItem icon="camera-account" label="Ảnh đại diện" onPress={() => {}} />
        </View>

        {/* Ứng dụng */}
        <SectionHeader title="Ứng dụng" />
        <View style={styles.group}>
          <SettingsItem
            icon="translate"
            label="Ngôn ngữ"
            type="arrow"
            value="Tiếng Việt"
            onPress={() => {}}
          />
          <SettingsItem
            icon="bell"
            label="Thông báo"
            type="toggle"
            value={notificationsEnabled}
            onPress={setNotificationsEnabled}
            iconColor={colors.warning}
          />
          <SettingsItem
            icon="weather-night"
            label="Chế độ tối"
            type="toggle"
            value={darkMode}
            onPress={setDarkMode}
            iconColor={colors.textSecondary}
          />
        </View>

        {/* Hỗ trợ */}
        <SectionHeader title="Hỗ trợ" />
        <View style={styles.group}>
          <SettingsItem icon="book-open-variant" label="Hướng dẫn sử dụng" onPress={() => {}} iconColor={colors.info} />
          <SettingsItem icon="bug" label="Báo lỗi" onPress={() => {}} iconColor={colors.danger} />
          <SettingsItem icon="information" label="Phiên bản ứng dụng" type="text" value="1.0.0" iconColor={colors.textSecondary} />
        </View>

        {/* Đăng xuất */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <MaterialCommunityIcons name="logout" size={20} color={colors.white} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.headerBg,
    padding: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 17, fontWeight: '700', color: colors.white },
  profileRole: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  profileEmail: { fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 },
  editBtn: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  group: {
    backgroundColor: colors.cardBg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  itemLabel: { flex: 1, fontSize: 14, color: colors.text },
  itemValue: { fontSize: 13, color: colors.textSecondary, marginRight: 6 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.danger,
    margin: 16,
    borderRadius: 8,
    paddingVertical: 13,
    marginTop: 24,
  },
  logoutText: { color: colors.white, fontSize: 15, fontWeight: '700', marginLeft: 8 },
});
