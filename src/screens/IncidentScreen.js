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

const incidents = [
  { id: '1', title: 'Máy bơm rò rỉ dầu nghiêm trọng', asset: 'Máy bơm B-01', date: '09/01/2025', status: 'pending', person: 'Nguyễn Văn A' },
  { id: '2', title: 'Hệ thống điện nhấp nháy khu A', asset: 'Tủ điện E-03', date: '08/01/2025', status: 'processing', person: 'Trần Thị B' },
  { id: '3', title: 'Tiếng ồn lớn từ máy nén khí', asset: 'Máy nén C-02', date: '07/01/2025', status: 'done', person: 'Lê Văn C' },
  { id: '4', title: 'Cảm biến nhiệt độ báo lỗi', asset: 'Cảm biến T-07', date: '06/01/2025', status: 'pending', person: 'Phạm Thị D' },
  { id: '5', title: 'Motor băng tải không hoạt động', asset: 'Băng tải CT-01', date: '05/01/2025', status: 'processing', person: 'Nguyễn Văn A' },
  { id: '6', title: 'Rò rỉ khí nén tại van V-05', asset: 'Van khí V-05', date: '04/01/2025', status: 'done', person: 'Trần Thị B' },
  { id: '7', title: 'Áp suất hệ thống thủy lực thấp', asset: 'Hệ thống thủy lực H-02', date: '03/01/2025', status: 'cancelled', person: 'Lê Văn C' },
];

const filters = ['Tất cả', 'Mới', 'Đang xử lý', 'Hoàn thành'];
const filterMap = { 'Mới': 'pending', 'Đang xử lý': 'processing', 'Hoàn thành': 'done' };

const statusLabels = { pending: 'Chờ xử lý', processing: 'Đang xử lý', done: 'Hoàn thành', cancelled: 'Đã hủy' };

function StatusBadge({ status }) {
  const color = colors.statusColors[status] || colors.textSecondary;
  return (
    <View style={[styles.badge, { backgroundColor: `${color}20`, borderColor: color }]}>
      <Text style={[styles.badgeText, { color }]}>{statusLabels[status] || status}</Text>
    </View>
  );
}

export default function IncidentScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const filtered = incidents.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.asset.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'Tất cả' || item.status === filterMap[activeFilter];
    return matchSearch && matchFilter;
  });

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={[styles.card, { borderLeftColor: colors.statusColors[item.status] || colors.border }]}
        activeOpacity={0.75}
      >
        <View style={styles.cardTop}>
          <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
          <StatusBadge status={item.status} />
        </View>
        <View style={styles.cardRow}>
          <MaterialCommunityIcons name="package-variant" size={13} color={colors.textSecondary} />
          <Text style={styles.cardMeta}> {item.asset}</Text>
        </View>
        <View style={styles.cardBottom}>
          <View style={styles.cardRow}>
            <MaterialCommunityIcons name="calendar" size={13} color={colors.textSecondary} />
            <Text style={styles.cardMeta}> {item.date}</Text>
          </View>
          <View style={styles.cardRow}>
            <MaterialCommunityIcons name="account" size={13} color={colors.textSecondary} />
            <Text style={styles.cardMeta}> {item.person}</Text>
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
          placeholder="Tìm kiếm sự cố..."
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

      {/* Filter tabs */}
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
            <MaterialCommunityIcons name="alert-circle-outline" size={48} color={colors.border} />
            <Text style={styles.emptyText}>Không có sự cố nào</Text>
          </View>
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateTicket')}
        activeOpacity={0.85}
      >
        <MaterialCommunityIcons name="plus" size={28} color={colors.white} />
      </TouchableOpacity>
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
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  filterTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  filterText: { fontSize: 13, color: colors.textSecondary },
  filterTextActive: { color: colors.primary, fontWeight: '600' },
  list: { padding: 12, paddingBottom: 80 },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  cardTitle: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.text, marginRight: 8 },
  cardRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  cardMeta: { fontSize: 12, color: colors.textSecondary },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  badge: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { fontSize: 11, fontWeight: '600' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 14, color: colors.textSecondary, marginTop: 12 },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
});
