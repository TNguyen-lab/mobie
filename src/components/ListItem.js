import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function ListItem({ icon, title, subtitle, rightText, rightColor, onPress, borderColor }) {
  return (
    <TouchableOpacity
      style={[styles.item, borderColor && { borderLeftColor: borderColor, borderLeftWidth: 4 }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name={icon} size={22} color={colors.primary} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text> : null}
      </View>
      {rightText ? (
        <Text style={[styles.rightText, rightColor && { color: rightColor }]}>{rightText}</Text>
      ) : (
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.border} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.primary}18`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rightText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
  },
});
