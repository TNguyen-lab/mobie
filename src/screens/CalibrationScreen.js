import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const calibrations = [
  { id: '1', instrument: 'Đồng hồ áp suất P-01', calibrationDate: '05/10/2024', nextDue: '05/04/2025', result: 'Pass', certificate: 'CERT-2024-001', status: 'upcoming' },
  { id: '2', instrument: 'Cảm biến nhiệt độ T-03', calibrationDate: '20/11/2024', nextDue: '20/05/2025', result: 'Pass', certificate: 'CERT-2024-002', status: 'calibrated' },
  { id: '3', instrument: 'Cân điện tử W-02', calibrationDate: '01/08/2024', nextDue: '01/02/2025', result: 'Fail', certificate: 'CERT-2024-003', status: 'overdue' },
  { id: '4', instrument: 'Máy đo lưu lượng F-05', calibrationDate: '15/09/2024', nextDue: '15/03/2025', result: 'Pass', certificate: 'CERT-2024-004', status: 'upcoming' },
  { id: '5', instrument: 'Nhiệt kế hồng ngoại IR-01', calibrationDate: '10/12/2024', nextDue: '10/06/2025', result: 'Pass', certificate: 'CERT-2024-005', status: 'calibrated' },
  { id: '6', instrument: 'Máy đo độ ẩm HM-04', calibrationDate: '25/07/2024', nextDue: '25/01/2025', result: 'Pass', certificate: 'CERT-2024-006', status: 'overdue' },
];

const filters = ['Tất cả', 'Sắp đến hạn', 'Đã hiệu chuẩn', 'Quá hạn'];
const filterMap = { 'Sắp đến hạn': 'upcoming', 'Đã hiệu chuẩn': 'calibrated', 'Quá hạn': 'overdue' };

const statusInfo = {
  upcoming: { label: 'Sắp đến hạn', color: colors.warning },
  calibrated: { label: 'Đã hiệu chuẩn', color: colors.success },
  overdue: { label: 'Quá hạn', color: colors.danger },
};

const resultInfo = {
  Pass: { color: colors.success, icon: 'check-circle' },
  Fail: { color: colors.danger, icon: 'close-circle' },
};

function StatusBadge({ status }) {
  const info = statusInfo[status] || { label: status, color: colors.textSecondary };
  return (
    <View style={[styles.badge, { backgroundColor: `${info.color}20`, borderColor: info.color }]}>
      <Text style={[styles.badgeText, { color: info.color }]}>{info.label}</Text>
    </View>
  );
}

export default function CalibrationScreen() {
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const filtered = calibrations.filter((item) =>
    activeFilter === 'Tất cả' || item.status === filterMap[activeFilter]
  );

  function renderItem({ item }) {
    const result = resultInfo[item.result] || { color: colors.textSecondary, icon: 'help-circle' };
    const borderColor = statusInfo[item.status]?.color || colors.border;
    return (
      <TouchableOpacity style={[styles.card, { borderLeftColor: borderColor }]} activeOpacity={0.75}>
        <View style={styles.cardTop}>
          <MaterialCommunityIcons name="gauge" size={20} color={colors.headerBg} style={styles.cardIcon} />
          <Text style={styles.instrumentName} numberOfLines={1}>{item.instrument}</Text>
          <StatusBadge status={item.status} />
        </View>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Ngày hiệu chuẩn</Text>
            <Text style={styles.infoValue}>{item.calibrationDate}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Ngày đến hạn</Text>
            <Text style={[styles.infoValue, item.status === 'overdue' && { color: colors.danger }]}>
              {item.nextDue}
            </Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.cardRow}>
            <MaterialCommunityIcons name="certificate" size={13} color={colors.textSecondary} />
            <Text style={styles.cardMeta}> {item.certificate}</Text>
          </View>
          <View style={styles.resultRow}>
            <MaterialCommunityIcons name={result.icon} size={15} color={result.color} />
            <Text style={[styles.resultText, { color: result.color }]}> Kết quả: {item.result}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar backgroundColor={colors.headerBg} barStyle="light-content" />

      {/* Summary */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNum, { color: colors.warning }]}>2</Text>
          <Text style={styles.summaryLabel}>Sắp đến hạn</Text>
        </View>
        <View style={[styles.summaryItem, styles.summaryDivider]}>
          <Text style={[styles.summaryNum, { color: colors.success }]}>2</Text>
          <Text style={styles.summaryLabel}>Đã hiệu chuẩn</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNum, { color: colors.danger }]}>2</Text>
          <Text style={styles.summaryLabel}>Quá hạn</Text>
        </View>
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
            <MaterialCommunityIcons name="gauge-empty" size={48} color={colors.border} />
            <Text style={styles.emptyText}>Không có dữ liệu hiệu chuẩn</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  summaryRow: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryItem: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  summaryDivider: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: colors.border },
  summaryNum: { fontSize: 22, fontWeight: 'bold', color: colors.text },
  summaryLabel: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterTab: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  filterTabActive: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  filterText: { fontSize: 11, color: colors.textSecondary },
  filterTextActive: { color: colors.primary, fontWeight: '600' },
  list: { padding: 12 },
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
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cardIcon: { marginRight: 8 },
  instrumentName: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.text, marginRight: 8 },
  infoGrid: { flexDirection: 'row', marginBottom: 8 },
  infoItem: { flex: 1 },
  infoLabel: { fontSize: 11, color: colors.textSecondary },
  infoValue: { fontSize: 13, fontWeight: '500', color: colors.text, marginTop: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  cardMeta: { fontSize: 12, color: colors.textSecondary },
  resultRow: { flexDirection: 'row', alignItems: 'center' },
  resultText: { fontSize: 12, fontWeight: '600' },
  badge: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: 10, fontWeight: '600' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 14, color: colors.textSecondary, marginTop: 12 },
});
