// Mock async-storage
jest.mock('@react-native-async-storage/async-storage', () => {
    return {
        __esModule: true,
        default: {
            setItem: jest.fn(),
            getItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
        },
    };
});

// Mock assets such as SVGs [icons, logos, etc.]// ...remaining necessary mockups you may need

// Mock expo-constants
jest.mock('expo-constants', () => {
   return {
     __esModule: true,
     default: {
       manifest: {
       },
       appOwnership: 'standalone',
       executionEnvironment: 'standalone',
       platform: {
         ios: {
           buildNumber: '1',
           platform: 'ios',
         },
         android: {
           versionCode: 1,
           platform: 'android',
         },
       },
     },
   };
 });

// Mock expo-auth-session
jest.mock('expo-auth-session', () => {
   const actualAuthSession = jest.requireActual('expo-auth-session');
   return {
     ...actualAuthSession,
     makeRedirectUri: jest.fn(() => '<scheme><your-redirect>'),
   };
 });