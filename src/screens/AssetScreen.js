import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const assets = [
  { id: '1', name: 'Máy bơm ly tâm', code: 'QR-B001', location: 'Tầng 1 - Khu A', status: 'active', lastMaintenance: '05/12/2024', category: 'pump' },
  { id: '2', name: 'Máy nén khí Ingersoll', code: 'QR-C002', location: 'Nhà xưởng B', status: 'maintenance', lastMaintenance: '10/01/2025', category: 'compressor' },
  { id: '3', name: 'Hệ thống HVAC tầng 2', code: 'QR-H003', location: 'Tầng 2', status: 'active', lastMaintenance: '20/12/2024', category: 'hvac' },
  { id: '4', name: 'Tủ điện phân phối MCC', code: 'QR-E004', location: 'Phòng kỹ thuật', status: 'active', lastMaintenance: '15/11/2024', category: 'electrical' },
  { id: '5', name: 'Cẩu trục 5 tấn', code: 'QR-CR005', location: 'Nhà xưởng A', status: 'broken', lastMaintenance: '01/10/2024', category: 'crane' },
  { id: '6', name: 'Máy phát điện dự phòng', code: 'QR-G006', location: 'Sân sau', status: 'active', lastMaintenance: '22/12/2024', category: 'generator' },
  { id: '7', name: 'Hệ thống xử lý nước', code: 'QR-W007', location: 'Tầng hầm', status: 'maintenance', lastMaintenance: '08/01/2025', category: 'water' },
];

const filters = ['Tất cả', 'Đang hoạt động', 'Bảo trì', 'Hỏng'];
const filterMap = { 'Đang hoạt động': 'active', 'Bảo trì': 'maintenance', 'Hỏng': 'broken' };
const statusLabels = { active: 'Hoạt động', maintenance: 'Đang bảo trì', broken: 'Hỏng' };
const statusColors = { active: colors.success, maintenance: colors.warning, broken: colors.danger };

const categoryIcons = {
  pump: 'water-pump',
  compressor: 'air-filter',
  hvac: 'air-conditioner',
  electrical: 'flash',
  crane: 'crane',
  generator: 'engine',
  water: 'water',
};

function StatusBadge({ status }) {
  const color = statusColors[status] || colors.textSecondary;
  return (
    <View style={[styles.badge, { backgroundColor: `${color}20`, borderColor: color }]}>
      <Text style={[styles.badgeText, { color }]}>{statusLabels[status] || status}</Text>
    </View>
  );
}

export default function AssetScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const filtered = assets.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'Tất cả' || item.status === filterMap[activeFilter];
    return matchSearch && matchFilter;
  });

  function renderItem({ item }) {
    const icon = categoryIcons[item.category] || 'package-variant';
    const statusColor = statusColors[item.status] || colors.border;
    return (
      <TouchableOpacity style={[styles.card, { borderLeftColor: statusColor }]} activeOpacity={0.75}>
        <View style={styles.cardLeft}>
          <View style={[styles.iconBox, { backgroundColor: `${colors.headerBg}15` }]}>
            <MaterialCommunityIcons name={icon} size={28} color={colors.headerBg} />
          </View>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardTop}>
            <Text style={styles.assetName} numberOfLines={1}>{item.name}</Text>
            <StatusBadge status={item.status} />
          </View>
          <View style={styles.cardRow}>
            <MaterialCommunityIcons name="qrcode" size={13} color={colors.textSecondary} />
            <Text style={styles.cardMeta}> {item.code}</Text>
          </View>
          <View style={styles.cardRow}>
            <MaterialCommunityIcons name="map-marker" size={13} color={colors.textSecondary} />
            <Text style={styles.cardMeta}> {item.location}</Text>
          </View>
          <View style={styles.cardRow}>
            <MaterialCommunityIcons name="wrench" size={13} color={colors.textSecondary} />
            <Text style={styles.cardMeta}> Bảo trì lần cuối: {item.lastMaintenance}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar backgroundColor={colors.headerBg} barStyle="light-content" />

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm tài sản..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <MaterialCommunityIcons name="close-circle" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter row */}
      <View style={styles.filterRow}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, activeFilter === f && styles.filterTabActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialCommunityIcons name="package-variant-closed" size={48} color={colors.border} />
            <Text style={styles.emptyText}>Không tìm thấy tài sản</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    margin: 12,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: colors.text, padding: 0 },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterTab: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  filterTabActive: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  filterText: { fontSize: 12, color: colors.textSecondary },
  filterTextActive: { color: colors.primary, fontWeight: '600' },
  list: { padding: 12 },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLeft: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${colors.headerBg}08`,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: { flex: 1, padding: 12 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  assetName: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.text, marginRight: 8 },
  cardRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  cardMeta: { fontSize: 12, color: colors.textSecondary },
  badge: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 7, paddingVertical: 2 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 14, color: colors.textSecondary, marginTop: 12 },
});
