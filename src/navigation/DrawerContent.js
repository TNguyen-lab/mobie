import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const menuItems = [
  { name: 'Dashboard', label: 'Bảng điều khiển', icon: 'view-dashboard' },
  { name: 'Incident', label: 'Sự cố', icon: 'alert-circle' },
  { name: 'CreateTicket', label: 'Tạo phiếu hỗ trợ', icon: 'plus-circle' },
  { name: 'Maintenance', label: 'Bảo trì', icon: 'wrench' },
  { name: 'Asset', label: 'Tài sản', icon: 'package-variant' },
  { name: 'Calibration', label: 'Hiệu chuẩn', icon: 'tune' },
  { name: 'Settings', label: 'Cài đặt', icon: 'cog' },
  { name: 'Contact', label: 'Liên hệ', icon: 'phone' },
];

export default function DrawerContent(props) {
  const { state, navigation } = props;
  const activeRouteName = state.routes[state.index]?.name;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="tools" size={36} color={colors.white} />
        </View>
        <Text style={styles.appName}>MobiE</Text>
        <Text style={styles.appSubtitle}>Asset Management</Text>
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" size={22} color={colors.white} />
          </View>
          <View>
            <Text style={styles.userName}>Nguyễn Văn A</Text>
            <Text style={styles.userRole}>Kỹ thuật viên</Text>
          </View>
        </View>
      </View>

      {/* Menu items */}
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        <View style={styles.menuSection}>
          {menuItems.map((item) => {
            const isActive = activeRouteName === item.name;
            return (
              <TouchableOpacity
                key={item.name}
                style={[styles.menuItem, isActive && styles.menuItemActive]}
                onPress={() => navigation.navigate(item.name)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={22}
                  color={isActive ? colors.primary : colors.textSecondary}
                />
                <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                  {item.label}
                </Text>
                {isActive && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
        <Text style={styles.companyText}>© 2024 PNP Solution</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.headerBg,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  appName: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  appSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    marginBottom: 16,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userName: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  userRole: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
  },
  menuSection: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    position: 'relative',
  },
  menuItemActive: {
    backgroundColor: `${colors.primary}15`,
  },
  menuLabel: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 14,
    flex: 1,
  },
  menuLabelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  activeIndicator: {
    width: 4,
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  companyText: {
    fontSize: 11,
    color: colors.border,
    marginTop: 2,
  },
});
