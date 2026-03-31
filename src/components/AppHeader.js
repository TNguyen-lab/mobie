import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function AppHeader({ title, navigation, rightComponent }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <MaterialCommunityIcons name="menu" size={26} color={colors.white} />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <View style={styles.right}>
        {rightComponent || <View style={{ width: 40 }} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.headerBg,
    paddingHorizontal: 8,
    paddingVertical: 14,
    paddingTop: 48,
  },
  menuButton: {
    padding: 8,
    width: 44,
  },
  title: {
    flex: 1,
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  right: {
    width: 44,
    alignItems: 'flex-end',
  },
});
