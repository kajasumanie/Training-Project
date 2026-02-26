import AppConfig from './AppConfig';

const w = window as any;

const devConfig: AppConfig = {
  env: 'DEVELOPMENT',
  logLevel: (w._env_ && w._env_.REACT_APP_LOG_LEVEL) || 'verbose',
  X_API_KEY: (w._env_ && w._env_.REACT_APP_X_API_KEY) || '',
  keycloakEnabled: false,
  applicationConfig: {
    appTimeZone: (w._env_ && w._env_.REACT_APP_TIME_ZONE_NAME) ?? 'Asia/Manila',
    paginationConfig: {
      pageSizeOptions: [10, 15, 20],
      defaultSize: 10
    },
  },
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  keycloak: {
    keycloakUrl: (w._env_ && w._env_.REACT_APP_KEYCLOAK_URL) || '',
    realm: (w._env_ && w._env_.REACT_APP_KEYCLOAK_REALM) || '',
    clientId: (w._env_ && w._env_.REACT_APP_KEYCLOAK_CLIENT_ID) || 'wms-frontend'
  },
  roles: {
    system_admin: 'System Admin',
    admin: 'Admin',
    manager: 'Manager',
    officer: 'Officer',
  },
};

export default devConfig;
