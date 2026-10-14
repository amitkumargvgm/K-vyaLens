import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.kavyalens.app',
  appName: 'KāvyaLens',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
