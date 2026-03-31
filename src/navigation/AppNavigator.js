import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/DashboardScreen';
import IncidentScreen from '../screens/IncidentScreen';
import CreateTicketScreen from '../screens/CreateTicketScreen';
import MaintenanceScreen from '../screens/MaintenanceScreen';
import AssetScreen from '../screens/AssetScreen';
import CalibrationScreen from '../screens/CalibrationScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ContactScreen from '../screens/ContactScreen';
import DrawerContent from './DrawerContent';
import { colors } from '../theme/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

function drawerIcon(name) {
  return ({ color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
  );
}

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.headerBg },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: 'bold' },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
        drawerStyle: { backgroundColor: colors.white },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Bảng điều khiển', drawerIcon: drawerIcon('view-dashboard') }}
      />
      <Drawer.Screen
        name="Incident"
        component={IncidentScreen}
        options={{ title: 'Sự cố', drawerIcon: drawerIcon('alert-circle') }}
      />
      <Drawer.Screen
        name="CreateTicket"
        component={CreateTicketScreen}
        options={{ title: 'Tạo phiếu hỗ trợ kỹ thuật', drawerIcon: drawerIcon('plus-circle') }}
      />
      <Drawer.Screen
        name="Maintenance"
        component={MaintenanceScreen}
        options={{ title: 'Bảo trì', drawerIcon: drawerIcon('wrench') }}
      />
      <Drawer.Screen
        name="Asset"
        component={AssetScreen}
        options={{ title: 'Tài sản', drawerIcon: drawerIcon('package-variant') }}
      />
      <Drawer.Screen
        name="Calibration"
        component={CalibrationScreen}
        options={{ title: 'Hiệu chuẩn', drawerIcon: drawerIcon('tune') }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Cài đặt', drawerIcon: drawerIcon('cog') }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: 'Liên hệ', drawerIcon: drawerIcon('phone') }}
      />
    </Drawer.Navigator>
  );
}
