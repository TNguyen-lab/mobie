import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const contactInfo = [
  { icon: 'phone', label: 'Điện thoại', value: '0385 389 383', action: () => Linking.openURL('tel:0385389383') },
  { icon: 'email', label: 'Email', value: 'apnpsolution@gmail.com', action: () => Linking.openURL('mailto:apnpsolution@gmail.com') },
  { icon: 'map-marker', label: 'Địa chỉ', value: 'P.2 – Nhà G4B - TT Thành Công, Ba Đình, Hà Nội', action: null },
  { icon: 'web', label: 'Website', value: 'www.pnpsolution.com.vn', action: () => Linking.openURL('https://www.pnpsolution.com.vn') },
];

const hours = [
  { day: 'Thứ Hai – Thứ Sáu', time: '08:00 – 17:30' },
  { day: 'Thứ Bảy', time: '08:00 – 12:00' },
  { day: 'Chủ Nhật', time: 'Nghỉ' },
];

const supportChannels = [
  { icon: 'phone-in-talk', label: 'Gọi hỗ trợ kỹ thuật', color: colors.primary },
  { icon: 'message-text', label: 'Nhắn tin Zalo', color: '#0068ff' },
  { icon: 'email-fast', label: 'Gửi email hỗ trợ', color: colors.warning },
];

function ContactRow({ icon, label, value, onPress }) {
  return (
    <TouchableOpacity
      style={styles.contactRow}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.contactIconBox}>
        <MaterialCommunityIcons name={icon} size={20} color={colors.headerBg} />
      </View>
      <View style={styles.contactContent}>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={[styles.contactValue, onPress && { color: colors.info }]}>{value}</Text>
      </View>
      {onPress && <MaterialCommunityIcons name="open-in-new" size={16} color={colors.textSecondary} />}
    </TouchableOpacity>
  );
}

export default function ContactScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar backgroundColor={colors.headerBg} barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Company card */}
        <View style={styles.companyCard}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="domain" size={44} color={colors.white} />
          </View>
          <Text style={styles.companyName}>PNP SOLUTION</Text>
          <Text style={styles.companyTagline}>Giải pháp quản lý bảo trì thông minh</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badgeItem}>
              <MaterialCommunityIcons name="shield-check" size={14} color="rgba(255,255,255,0.9)" />
              <Text style={styles.badgeItemText}>ISO 9001</Text>
            </View>
            <View style={styles.badgeItem}>
              <MaterialCommunityIcons name="star" size={14} color="rgba(255,255,255,0.9)" />
              <Text style={styles.badgeItemText}>5 năm kinh nghiệm</Text>
            </View>
          </View>
        </View>

        {/* Contact info */}
        <View style={styles.sectionTitle}>
          <MaterialCommunityIcons name="card-account-details" size={18} color={colors.headerBg} />
          <Text style={styles.sectionTitleText}>Thông tin liên hệ</Text>
        </View>
        <View style={styles.card}>
          {contactInfo.map((item, idx) => (
            <ContactRow
              key={idx}
              icon={item.icon}
              label={item.label}
              value={item.value}
              onPress={item.action}
            />
          ))}
        </View>

        {/* Operating hours */}
        <View style={styles.sectionTitle}>
          <MaterialCommunityIcons name="clock-outline" size={18} color={colors.headerBg} />
          <Text style={styles.sectionTitleText}>Giờ làm việc</Text>
        </View>
        <View style={styles.card}>
          {hours.map((h, idx) => (
            <View key={idx} style={[styles.hourRow, idx < hours.length - 1 && styles.hourBorder]}>
              <Text style={styles.hourDay}>{h.day}</Text>
              <Text style={[styles.hourTime, h.time === 'Nghỉ' && { color: colors.danger }]}>{h.time}</Text>
            </View>
          ))}
        </View>

        {/* Map placeholder */}
        <View style={styles.sectionTitle}>
          <MaterialCommunityIcons name="map" size={18} color={colors.headerBg} />
          <Text style={styles.sectionTitleText}>Bản đồ</Text>
        </View>
        <TouchableOpacity
          style={styles.mapPlaceholder}
          onPress={() => Linking.openURL('https://maps.google.com/?q=PNP+Solution+Ba+Dinh+Ha+Noi')}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons name="map-search" size={40} color={colors.headerBg} />
          <Text style={styles.mapText}>Xem trên Google Maps</Text>
          <Text style={styles.mapAddress}>P.2 – Nhà G4B - TT Thành Công, Ba Đình, Hà Nội</Text>
        </TouchableOpacity>

        {/* Support channels */}
        <View style={styles.sectionTitle}>
          <MaterialCommunityIcons name="headset" size={18} color={colors.headerBg} />
          <Text style={styles.sectionTitleText}>Kênh hỗ trợ nhanh</Text>
        </View>
        <View style={styles.channelRow}>
          {supportChannels.map((ch, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.channelBtn, { backgroundColor: `${ch.color}18`, borderColor: ch.color }]}
              onPress={() => Alert.alert('Thông báo', `Đang kết nối ${ch.label}...`)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name={ch.icon} size={24} color={ch.color} />
              <Text style={[styles.channelText, { color: ch.color }]}>{ch.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  companyCard: {
    backgroundColor: colors.headerBg,
    padding: 28,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyName: { fontSize: 22, fontWeight: '800', color: colors.white, letterSpacing: 1.5 },
  companyTagline: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 6, textAlign: 'center' },
  badgeRow: { flexDirection: 'row', marginTop: 14, gap: 12 },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    gap: 5,
  },
  badgeItemText: { fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: '600' },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    gap: 8,
  },
  sectionTitleText: { fontSize: 14, fontWeight: '700', color: colors.headerBg },
  card: {
    backgroundColor: colors.cardBg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: `${colors.headerBg}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  contactContent: { flex: 1 },
  contactLabel: { fontSize: 12, color: colors.textSecondary },
  contactValue: { fontSize: 14, color: colors.text, fontWeight: '500', marginTop: 2 },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  hourBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  hourDay: { fontSize: 14, color: colors.text },
  hourTime: { fontSize: 14, fontWeight: '600', color: colors.primary },
  mapPlaceholder: {
    backgroundColor: colors.cardBg,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  mapText: { fontSize: 14, color: colors.headerBg, fontWeight: '600', marginTop: 10 },
  mapAddress: { fontSize: 12, color: colors.textSecondary, marginTop: 4, textAlign: 'center' },
  channelRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 8,
  },
  channelBtn: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 14,
    gap: 6,
  },
  channelText: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
});
