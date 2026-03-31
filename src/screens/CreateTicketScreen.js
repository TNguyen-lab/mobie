import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const incidentTypes = ['Hỏng hóc thiết bị', 'Rò rỉ', 'Tiếng ồn bất thường', 'Cảnh báo hệ thống', 'Khác'];
const priorities = [
  { value: 'low', label: 'Thấp', color: colors.success },
  { value: 'medium', label: 'Trung bình', color: colors.warning },
  { value: 'high', label: 'Cao', color: colors.danger },
  { value: 'urgent', label: 'Khẩn cấp', color: '#8b0000' },
];

export default function CreateTicketScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [asset, setAsset] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  function handleSubmit() {
    if (!title.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tiêu đề phiếu hỗ trợ');
      return;
    }
    Alert.alert('Thành công', 'Phiếu hỗ trợ kỹ thuật đã được tạo!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar backgroundColor={colors.headerBg} barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>

          {/* Tiêu đề */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Tiêu đề <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tiêu đề sự cố..."
              placeholderTextColor={colors.textSecondary}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Loại sự cố */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Loại sự cố</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setTypeDropdownOpen(!typeDropdownOpen)}
            >
              <Text style={[styles.dropdownText, !selectedType && { color: colors.textSecondary }]}>
                {selectedType || 'Chọn loại sự cố...'}
              </Text>
              <MaterialCommunityIcons
                name={typeDropdownOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
            {typeDropdownOpen && (
              <View style={styles.dropdownList}>
                {incidentTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[styles.dropdownItem, selectedType === type && styles.dropdownItemActive]}
                    onPress={() => { setSelectedType(type); setTypeDropdownOpen(false); }}
                  >
                    <Text style={[styles.dropdownItemText, selectedType === type && { color: colors.primary }]}>
                      {type}
                    </Text>
                    {selectedType === type && (
                      <MaterialCommunityIcons name="check" size={16} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Thiết bị / Tài sản */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Thiết bị / Tài sản</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên hoặc mã thiết bị..."
              placeholderTextColor={colors.textSecondary}
              value={asset}
              onChangeText={setAsset}
            />
          </View>

          {/* Mô tả chi tiết */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Mô tả chi tiết</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Mô tả chi tiết về sự cố..."
              placeholderTextColor={colors.textSecondary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          {/* Mức độ ưu tiên */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Mức độ ưu tiên</Text>
            <View style={styles.priorityRow}>
              {priorities.map((p) => (
                <TouchableOpacity
                  key={p.value}
                  style={[
                    styles.priorityBtn,
                    { borderColor: p.color },
                    priority === p.value && { backgroundColor: p.color },
                  ]}
                  onPress={() => setPriority(p.value)}
                >
                  <Text style={[
                    styles.priorityText,
                    { color: priority === p.value ? colors.white : p.color },
                  ]}>
                    {p.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Đính kèm hình ảnh */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Đính kèm hình ảnh</Text>
            <TouchableOpacity
              style={styles.attachBtn}
              onPress={() => Alert.alert('Thông báo', 'Tính năng đính kèm ảnh sẽ sớm ra mắt!')}
            >
              <MaterialCommunityIcons name="camera-plus" size={22} color={colors.primary} />
              <Text style={styles.attachText}>Chọn ảnh từ thư viện hoặc chụp mới</Text>
            </TouchableOpacity>
          </View>

          {/* Submit */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
            <MaterialCommunityIcons name="send" size={18} color={colors.white} style={{ marginRight: 8 }} />
            <Text style={styles.submitText}>Gửi phiếu hỗ trợ</Text>
          </TouchableOpacity>

          <View style={{ height: 24 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  form: { padding: 16 },
  fieldGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 6 },
  required: { color: colors.danger },
  input: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
  },
  textarea: { height: 100, paddingTop: 10 },
  dropdown: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: { fontSize: 14, color: colors.text, flex: 1 },
  dropdownList: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginTop: 4,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownItemActive: { backgroundColor: `${colors.primary}12` },
  dropdownItemText: { fontSize: 14, color: colors.text },
  priorityRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  priorityBtn: {
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  priorityText: { fontSize: 13, fontWeight: '600' },
  attachBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  attachText: { fontSize: 13, color: colors.primary, marginLeft: 10 },
  submitBtn: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});
