import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Tony',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    GoogleAuth: {
      scopes: [
        'profile',
        'email'
      ],
      serverClientId: '40120464396-7qjngrblesous38ek1sbj6oavfrvtp12.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
