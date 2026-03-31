"# MobiE – React Native (Expo) App

Ứng dụng quản lý tài sản & bảo trì thiết bị trên mobile (React Native + Expo), tương đương UI với web app hiện tại.

---

## Screens

| Màn hình | Mô tả |
|---|---|
| Bảng điều khiển | Dashboard – thống kê, công việc gần đây |
| Sự cố | Danh sách sự cố, lọc theo trạng thái |
| Tạo phiếu hỗ trợ kỹ thuật | Form tạo phiếu sự cố |
| Bảo trì | Lịch bảo trì phòng ngừa |
| Tài sản | Danh sách tài sản, tìm kiếm & lọc |
| Hiệu chuẩn | Danh sách hiệu chuẩn thiết bị |
| Cài đặt | Thông tin tài khoản & cài đặt ứng dụng |
| Liên hệ | Thông tin liên hệ hỗ trợ kỹ thuật |

## Tech stack

- **Expo SDK 54** (Blank template, JavaScript)
- **React Navigation** v7 (Drawer Navigator)
- **React Native Paper** v5 (UI components)
- **@expo/vector-icons** (MaterialCommunityIcons)
- **react-native-gesture-handler** & **react-native-reanimated**

---

## Hướng dẫn cài đặt & chạy

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Khởi động Expo Dev Server

```bash
npx expo start
```

### 3. Chạy trên Android

**Cách 1 – Expo Go (nhanh nhất):**
1. Cài ứng dụng [Expo Go](https://expo.dev/go) trên điện thoại Android
2. Quét QR code hiển thị trong terminal

**Cách 2 – Android Emulator (Android Studio):**
1. Mở Android Studio → AVD Manager → khởi động emulator
2. Trong terminal, nhấn `a` để mở app trên emulator

```bash
npx expo start --android
```

### 4. Chạy trên iOS (macOS only)

```bash
npx expo start --ios
```

---

## Cấu trúc thư mục

```
├── App.js                   # Entry point
├── app.json                 # Expo config
├── babel.config.js          # Babel config (reanimated plugin)
├── assets/                  # Icons, splash screen
└── src/
    ├── theme/
    │   └── colors.js        # Màu sắc chủ đề
    ├── navigation/
    │   ├── AppNavigator.js  # DrawerNavigator chính
    │   └── DrawerContent.js # Custom drawer menu
    ├── components/
    │   ├── AppHeader.js     # Header component dùng chung
    │   ├── StatCard.js      # Card thống kê
    │   └── ListItem.js      # List item chung
    └── screens/
        ├── DashboardScreen.js
        ├── IncidentScreen.js
        ├── CreateTicketScreen.js
        ├── MaintenanceScreen.js
        ├── AssetScreen.js
        ├── CalibrationScreen.js
        ├── SettingsScreen.js
        └── ContactScreen.js
```

---

## Màu sắc chủ đề

| Biến | Giá trị | Ý nghĩa |
|---|---|---|
| `primary` | `#1a9a4a` | Xanh lá – buttons chính |
| `headerBg` | `#31709d` | Xanh dương – header / card title |
| `background` | `#f5f5f5` | Nền xám nhạt |
| `cardBg` | `#ffffff` | Nền card |
" 
