import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StatCard from '../components/StatCard';
import { colors } from '../theme/colors';

const myTasks = [
  { id: '1', title: 'Kiểm tra máy bơm B-01', equipment: 'Máy bơm B-01', due: '10/01/2025', status: 'pending' },
  { id: '2', title: 'Thay dầu máy nén khí', equipment: 'Máy nén C-02', due: '11/01/2025', status: 'processing' },
  { id: '3', title: 'Vệ sinh bộ lọc HVAC', equipment: 'Hệ thống HVAC', due: '12/01/2025', status: 'pending' },
  { id: '4', title: 'Hiệu chuẩn cảm biến áp suất', equipment: 'Cảm biến P-05', due: '13/01/2025', status: 'done' },
];

const recentIncidents = [
  { id: '1', title: 'Máy bơm rò rỉ dầu', asset: 'Máy bơm B-01', date: '09/01/2025', status: 'pending' },
  { id: '2', title: 'Hệ thống điện nhấp nháy', asset: 'Tủ điện E-03', date: '08/01/2025', status: 'processing' },
  { id: '3', title: 'Tiếng ồn lớn từ máy nén', asset: 'Máy nén C-02', date: '07/01/2025', status: 'done' },
];

const statusLabels = {
  pending: 'Chờ xử lý',
  processing: 'Đang xử lý',
  done: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

function StatusBadge({ status }) {
  const color = colors.statusColors[status] || colors.textSecondary;
  return (
    <View style={[styles.badge, { backgroundColor: `${color}20`, borderColor: color }]}>
      <Text style={[styles.badgeText, { color }]}>{statusLabels[status] || status}</Text>
    </View>
  );
}

export default function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar backgroundColor={colors.headerBg} barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stat cards */}
        <View style={styles.statsRow}>
          <StatCard number="5" label="Sự cố hôm nay" color={colors.danger} />
          <StatCard number="3" label="Đang xử lý" color={colors.info} />
          <StatCard number="12" label="Hoàn thành" color={colors.success} />
          <StatCard number="2" label="Quá hạn" color={colors.warning} />
        </View>

        {/* My tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Công việc của tôi</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Maintenance')}>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          {myTasks.map((task) => (
            <View key={task.id} style={[styles.taskCard, { borderLeftColor: colors.statusColors[task.status] }]}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle} numberOfLines={1}>{task.title}</Text>
                <Text style={styles.taskSub}>{task.equipment}</Text>
                <Text style={styles.taskDate}>
                  <MaterialCommunityIcons name="calendar" size={12} color={colors.textSecondary} /> {task.due}
                </Text>
              </View>
              <StatusBadge status={task.status} />
            </View>
          ))}
        </View>

        {/* Recent incidents */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sự cố gần đây</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Incident')}>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          {recentIncidents.map((item) => (
            <View key={item.id} style={[styles.incidentCard, { borderLeftColor: colors.statusColors[item.status] }]}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.taskSub}>{item.asset}</Text>
                <Text style={styles.taskDate}>
                  <MaterialCommunityIcons name="clock-outline" size={12} color={colors.textSecondary} /> {item.date}
                </Text>
              </View>
              <StatusBadge status={item.status} />
            </View>
          ))}
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>

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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.headerBg,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
  },
  seeAll: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  incidentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  taskSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  taskDate: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  badge: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
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
