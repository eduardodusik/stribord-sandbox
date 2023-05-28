import { ExtensionManifest } from '@stribord/react-client';

const manifest: ExtensionManifest = {
  type: 'extension',
  id: '@stribord-examples/extension',
  implementations: {
    '@stribord-examples/app': {
      'dashboard-card': () => import('./implementations/leads-dashboard-card').then(mod => mod.LeadsDashboardCard),
    },
  },
};

export default manifest;
