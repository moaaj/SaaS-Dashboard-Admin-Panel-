import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enTranslations = {
  common: {
    dashboard: 'Dashboard',
    users: 'Users',
    analytics: 'Analytics',
    settings: 'Settings',
    auditLogs: 'Audit Logs',
    logout: 'Logout',
    profile: 'Profile',
    search: 'Search',
    notifications: 'Notifications',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
  },
  auth: {
    login: 'Login',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    rememberMe: 'Remember Me',
    forgotPassword: 'Forgot Password?',
    signIn: 'Sign In',
    signOut: 'Sign Out',
  },
  dashboard: {
    welcome: 'Welcome back',
    totalUsers: 'Total Users',
    activeUsers: 'Active Users',
    totalRevenue: 'Total Revenue',
    newSubscriptions: 'New Subscriptions',
    recentActivity: 'Recent Activity',
    viewAll: 'View All',
  },
  users: {
    addUser: 'Add User',
    editUser: 'Edit User',
    deleteUser: 'Delete User',
    userDetails: 'User Details',
    role: 'Role',
    status: 'Status',
    lastLogin: 'Last Login',
  },
  auditLogs: {
    timestamp: 'Timestamp',
    user: 'User',
    action: 'Action',
    details: 'Details',
    ipAddress: 'IP Address',
    userAgent: 'User Agent',
    filterByAction: 'Filter by Action',
    filterByUser: 'Filter by User',
    startDate: 'Start Date',
    endDate: 'End Date',
    noLogsFound: 'No logs found',
    loading: 'Loading...',
  },
  settings: {
    general: 'General',
    security: 'Security',
    notifications: 'Notifications',
    appearance: 'Appearance',
    language: 'Language',
    save: 'Save Changes',
    reset: 'Reset to Default',
  },
};

// Bangla translations
const bnTranslations = {
  common: {
    dashboard: 'ড্যাশবোর্ড',
    users: 'ব্যবহারকারী',
    analytics: 'বিশ্লেষণ',
    settings: 'সেটিংস',
    auditLogs: 'অডিট লগ',
    logout: 'লগআউট',
    profile: 'প্রোফাইল',
    search: 'অনুসন্ধান',
    notifications: 'বিজ্ঞপ্তি',
    darkMode: 'ডার্ক মোড',
    lightMode: 'লাইট মোড',
    language: 'ভাষা',
  },
  auth: {
    login: 'লগইন',
    logout: 'লগআউট',
    email: 'ইমেইল',
    password: 'পাসওয়ার্ড',
    rememberMe: 'আমাকে মনে রাখুন',
    forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
    signIn: 'সাইন ইন',
    signOut: 'সাইন আউট',
  },
  dashboard: {
    welcome: 'স্বাগতম',
    totalUsers: 'মোট ব্যবহারকারী',
    activeUsers: 'সক্রিয় ব্যবহারকারী',
    totalRevenue: 'মোট আয়',
    newSubscriptions: 'নতুন সাবস্ক্রিপশন',
    recentActivity: 'সাম্প্রতিক কার্যক্রম',
    viewAll: 'সব দেখুন',
  },
  users: {
    addUser: 'ব্যবহারকারী যোগ করুন',
    editUser: 'ব্যবহারকারী সম্পাদনা করুন',
    deleteUser: 'ব্যবহারকারী মুছুন',
    userDetails: 'ব্যবহারকারীর বিস্তারিত',
    role: 'ভূমিকা',
    status: 'অবস্থা',
    lastLogin: 'সর্বশেষ লগইন',
  },
  auditLogs: {
    timestamp: 'সময়',
    user: 'ব্যবহারকারী',
    action: 'অ্যাকশন',
    details: 'বিস্তারিত',
    ipAddress: 'আইপি ঠিকানা',
    userAgent: 'ইউজার এজেন্ট',
    filterByAction: 'অ্যাকশন অনুযায়ী ফিল্টার',
    filterByUser: 'ব্যবহারকারী অনুযায়ী ফিল্টার',
    startDate: 'শুরুর তারিখ',
    endDate: 'শেষের তারিখ',
    noLogsFound: 'কোন লগ পাওয়া যায়নি',
    loading: 'লোড হচ্ছে...',
  },
  settings: {
    general: 'সাধারণ',
    security: 'নিরাপত্তা',
    notifications: 'বিজ্ঞপ্তি',
    appearance: 'চেহারা',
    language: 'ভাষা',
    save: 'পরিবর্তন সংরক্ষণ করুন',
    reset: 'ডিফল্টে রিসেট করুন',
  },
};

// Malay translations
const msTranslations = {
  common: {
    dashboard: 'Papan Pemuka',
    users: 'Pengguna',
    analytics: 'Analisis',
    settings: 'Tetapan',
    auditLogs: 'Log Audit',
    logout: 'Log Keluar',
    profile: 'Profil',
    search: 'Cari',
    notifications: 'Pemberitahuan',
    darkMode: 'Mod Gelap',
    lightMode: 'Mod Cerah',
    language: 'Bahasa',
  },
  auth: {
    login: 'Log Masuk',
    logout: 'Log Keluar',
    email: 'E-mel',
    password: 'Kata Laluan',
    rememberMe: 'Ingat Saya',
    forgotPassword: 'Lupa Kata Laluan?',
    signIn: 'Log Masuk',
    signOut: 'Log Keluar',
  },
  dashboard: {
    welcome: 'Selamat Datang',
    totalUsers: 'Jumlah Pengguna',
    activeUsers: 'Pengguna Aktif',
    totalRevenue: 'Jumlah Pendapatan',
    newSubscriptions: 'Langganan Baru',
    recentActivity: 'Aktiviti Terkini',
    viewAll: 'Lihat Semua',
  },
  users: {
    addUser: 'Tambah Pengguna',
    editUser: 'Edit Pengguna',
    deleteUser: 'Padam Pengguna',
    userDetails: 'Butiran Pengguna',
    role: 'Peranan',
    status: 'Status',
    lastLogin: 'Log Masuk Terakhir',
  },
  auditLogs: {
    timestamp: 'Masa',
    user: 'Pengguna',
    action: 'Tindakan',
    details: 'Butiran',
    ipAddress: 'Alamat IP',
    userAgent: 'Ejen Pengguna',
    filterByAction: 'Tapis Mengikut Tindakan',
    filterByUser: 'Tapis Mengikut Pengguna',
    startDate: 'Tarikh Mula',
    endDate: 'Tarikh Tamat',
    noLogsFound: 'Tiada log dijumpai',
    loading: 'Memuat...',
  },
  settings: {
    general: 'Umum',
    security: 'Keselamatan',
    notifications: 'Pemberitahuan',
    appearance: 'Penampilan',
    language: 'Bahasa',
    save: 'Simpan Perubahan',
    reset: 'Tetapkan Semula',
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      bn: {
        translation: bnTranslations,
      },
      ms: {
        translation: msTranslations,
      },
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 