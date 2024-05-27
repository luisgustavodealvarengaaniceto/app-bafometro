import { useEffect } from 'react';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const CheckPermissions = () => {
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const permission = await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
        if (permission !== RESULTS.GRANTED) {
          await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
        }
      } catch (error) {
        console.error('Erro ao verificar permissões:', error);
      }
    };

    checkPermissions();
  }, []);

  return null;
};

export default CheckPermissions;
