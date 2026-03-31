import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const tasks = [
  { id: '1', title: 'Thay dầu máy bơm B-01', equipment: 'Máy bơm B-01', scheduled: '10/01/2025', assignee: 'Nguyễn Văn A', status: 'pending', type: 'PM' },
  { id: '2', title: 'Kiểm tra áp suất hệ thống', equipment: 'Hệ thống thủy lực H-02', scheduled: '11/01/2025', assignee: 'Trần Thị B', status: 'processing', type: 'CM' },
  { id: '3', title: 'Vệ sinh bộ lọc HVAC tầng 2', equipment: 'Hệ thống HVAC', scheduled: '12/01/2025', assignee: 'Lê Văn C', status: 'done', type: 'PM' },
  { id: '4', title: 'Bôi trơn ổ bi máy nén C-02', equipment: 'Máy nén C-02', scheduled: '13/01/2025', assignee: 'Phạm Thị D', status: 'pending', type: 'PM' },
  { id: '5', title: 'Kiểm tra van an toàn V-05', equipment: 'Van an toàn V-05', scheduled: '14/01/2025', assignee: 'Nguyễn Văn A', status: 'done', type: 'PM' },
  { id: '6', title: 'Hiệu chỉnh cảm biến T-07', equipment: 'Cảm biến nhiệt T-07', scheduled: '15/01/2025', assignee: 'Trần Thị B', status: 'processing', type: 'CM' },
];

const dateRange = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(2025, 0, 10 + i);
  return {
    day: d.getDate(),
    weekday: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][d.getDay()],
  };
});

const statusLabels = { pending: 'Chờ xử lý', processing: 'Đang xử lý', done: 'Hoàn thành' };
const periodFilters = ['Tháng này', 'Tuần này'];

function StatusBadge({ status }) {
  const color = colors.statusColors[status] || colors.textSecondary;
  return (
    <View style={[styles.badge, { backgroundColor: `${color}20`, borderColor: color }]}>
      <Text style={[styles.badgeText, { color }]}>{statusLabels[status] || status}</Text>
    </View>
  );
}

export default function MaintenanceScreen() {
  const [selectedDate, setSelectedDate] = useState(10);
  const [period, setPeriod] = useState('Tháng này');

  function renderTask({ item }) {
    return (
      <TouchableOpacity
        style={[styles.taskCard, { borderLeftColor: colors.statusColors[item.status] || colors.border }]}
        activeOpacity={0.75}
      >
        <View style={styles.taskHeader}>
          <View style={[styles.typeBadge, { backgroundColor: item.type === 'PM' ? `${colors.info}20` : `${colors.warning}20` }]}>
            <Text style={[styles.typeText, { color: item.type === 'PM' ? colors.info : colors.warning }]}>{item.type}</Text>
          </View>
          <Text style={styles.taskTitle} numberOfLines={1}>{item.title}</Text>
        </View>
        <View style={styles.taskRow}>
          <MaterialCommunityIcons name="package-variant" size={13} color={colors.textSecondary} />
          <Text style={styles.taskMeta}> {item.equipment}</Text>
        </View>
        <View style={styles.taskFooter}>
          <View style={styles.taskRow}>
            <MaterialCommunityIcons name="calendar" size={13} color={colors.textSecondary} />
            <Text style={styles.taskMeta}> {item.scheduled}</Text>
          </View>
          <View style={styles.taskRow}>
            <MaterialCommunityIcons name="account" size={13} color={colors.textSecondary} />
            <Text style={styles.taskMeta}> {item.assignee}</Text>
          </View>
          <StatusBadge status={item.status} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar backgroundColor={colors.headerBg} barStyle="light-content" />

      {/* Period filter */}
      <View style={styles.periodRow}>
        {periodFilters.map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.periodBtn, period === p && styles.periodBtnActive]}
            onPress={() => setPeriod(p)}
          >
            <Text style={[styles.periodText, period === p && styles.periodTextActive]}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Date row */}
      <View style={styles.dateContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateRow}>
          {dateRange.map((d) => (
            <TouchableOpacity
              key={d.day}
              style={[styles.dateItem, selectedDate === d.day && styles.dateItemActive]}
              onPress={() => setSelectedDate(d.day)}
            >
              <Text style={[styles.dateWeekday, selectedDate === d.day && styles.dateTextActive]}>{d.weekday}</Text>
              <Text style={[styles.dateDay, selectedDate === d.day && styles.dateTextActive]}>{d.day}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Summary row */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>6</Text>
          <Text style={styles.summaryLabel}>Tổng công việc</Text>
        </View>
        <View style={[styles.summaryItem, styles.summaryDivider]}>
          <Text style={[styles.summaryNum, { color: colors.warning }]}>2</Text>
          <Text style={styles.summaryLabel}>Đang xử lý</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNum, { color: colors.success }]}>2</Text>
          <Text style={styles.summaryLabel}>Hoàn thành</Text>
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  periodRow: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 8,
  },
  periodBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  periodBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  periodText: { fontSize: 13, color: colors.text },
  periodTextActive: { color: colors.white, fontWeight: '600' },
  dateContainer: { backgroundColor: colors.cardBg, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  dateRow: { paddingHorizontal: 12, gap: 8 },
  dateItem: {
    width: 46,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateItemActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dateWeekday: { fontSize: 11, color: colors.textSecondary },
  dateDay: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 2 },
  dateTextActive: { color: colors.white },
  summaryRow: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    marginBottom: 8,
  },
  summaryItem: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  summaryDivider: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: colors.border },
  summaryNum: { fontSize: 22, fontWeight: 'bold', color: colors.text },
  summaryLabel: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  list: { padding: 12 },
  taskCard: {
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
  taskHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  typeBadge: { borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, marginRight: 8 },
  typeText: { fontSize: 11, fontWeight: '700' },
  taskTitle: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.text },
  taskRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  taskMeta: { fontSize: 12, color: colors.textSecondary },
  taskFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, flexWrap: 'wrap', gap: 4 },
  badge: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: 11, fontWeight: '600' },
});
